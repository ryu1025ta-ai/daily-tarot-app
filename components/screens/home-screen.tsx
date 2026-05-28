'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { DateDisplay } from '@/components/date-display'
import { StreakDisplay } from '@/components/streak-display'
import { CardSymbol } from '@/components/tarot-symbols'
import { useTarot } from '@/lib/tarot-context'
import { useDebug } from '@/lib/debug-context'
import { getCardRarity, rarityKanji, type CardRarity } from '@/lib/card-rarity'
import { toKanjiNumber } from '@/lib/kanji-number'
import { getStats } from '@/lib/collection'
import {
  DEBUG_MODE,
  CONTINUOUS_DRAW_CHANGED_EVENT,
  getContinuousDrawMode,
} from '@/lib/dev-tools'
import { getStreak, wasStreakBroken } from '@/lib/streak'
import { isSekkiToday } from '@/lib/sekki'
import { getSocialProofMessage } from '@/lib/social-proof'
import { isSocialProofEnabled, SOCIAL_PROOF_CHANGED_EVENT } from '@/lib/ui-prefs'
import { hapticTap, hapticFlip, hapticLegendary } from '@/lib/haptic'
import type { TarotCard } from '@/lib/tarot-data'

type Stage = 'awaiting' | 'pre-ritual' | 'drawn'

const FAN_POSITIONS = [
  { x: -56, rotate: -15 },
  { x: 0, rotate: 0 },
  { x: 56, rotate: 15 },
] as const

// 儀式の長さ：flip 1200ms 化 + 新発見 6.6 秒の長尺化に伴い 8050ms → 13000ms に延長。
// 非 legendary や非初収録でも同じ長さの class 期間を許容（forwards で最終状態が固定されるため副作用なし）。
const RITUAL_DURATION_MS = 5050
const RITUAL_DURATION_LEGENDARY_MS = 13000

// Pre-Ritual（タメ演出）の長さ。レア度ごとに段階的に重くする。
// 「タップから flip 開始まで」の体感差で当たり予感を作る。
// 極の希少化（4%、約25日に1回）に伴い、引いた時のありがたみを補強する目的で legendary を 7s に延長。
const PRE_RITUAL_DURATIONS: Record<CardRarity, number> = {
  common: 0,
  rare: 1500,
  epic: 3000,
  legendary: 7000,
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function HomeScreen() {
  const { todayCard, hasDrawnToday, isLoaded, streak, drawCard, lastDrawWasFirstTime } = useTarot()
  const { setDebugInfo } = useDebug()

  const [stage, setStage] = useState<Stage>('awaiting')
  const [isAnimating, setIsAnimating] = useState(false)
  const [tappedIndex, setTappedIndex] = useState<number | null>(null)
  const initializedRef = useRef(false)
  // ⚠ DEV：連続抽選モード（再抽選ボタン表示と警告バナー用）
  const [continuousMode, setContinuousMode] = useState(false)
  // Pre-Ritual のレア度（rare/epic/legendary のときだけ pre-ritual ステージで使用）
  const [preRitualRarity, setPreRitualRarity] = useState<CardRarity>('common')

  // 引いたカードのレア度（legendary は特別演出）
  const isLegendary = todayCard ? getCardRarity(todayCard.card) === 'legendary' : false

  // 初期化：ロード完了時に既に引いていれば即 drawn ステージへ
  useEffect(() => {
    if (!isLoaded) return
    if (initializedRef.current) return
    initializedRef.current = true
    if (hasDrawnToday) setStage('drawn')
  }, [isLoaded, hasDrawnToday])

  // ⚠ DEV：連続抽選モードの状態を購読
  useEffect(() => {
    if (typeof window === 'undefined') return
    setContinuousMode(getContinuousDrawMode())
    const onChange: EventListener = () => setContinuousMode(getContinuousDrawMode())
    window.addEventListener(CONTINUOUS_DRAW_CHANGED_EVENT, onChange)
    return () => window.removeEventListener(CONTINUOUS_DRAW_CHANGED_EVENT, onChange)
  }, [])

  // ⚠ DEV：再抽選。ステージを awaiting に戻し、扇形に伏せ札を再表示。
  // drawCard 側は連続モード ON 中なら同日チェックをスキップして再抽選してくれる。
  const handleRedraw = () => {
    setStage('awaiting')
    setIsAnimating(false)
    setTappedIndex(null)
  }

  // デバッグ情報
  useEffect(() => {
    setDebugInfo({
      cardState: hasDrawnToday ? `引き済み: ${todayCard?.card.name}` : '未引き',
      streak,
      date: new Date().toISOString().split('T')[0],
    })
  }, [hasDrawnToday, todayCard, streak, setDebugInfo])

  const startRitual = () => {
    setStage('drawn')
    setIsAnimating(true)
    window.setTimeout(() => setIsAnimating(false), RITUAL_DURATION_LEGENDARY_MS)
  }

  const handleCardTap = (index: number) => {
    if (stage !== 'awaiting' || !isLoaded) return

    // タップ即座のフィードバック（haptic）
    hapticTap()

    setTappedIndex(index)

    // 先に抽選を実行して rarity を即時取得（pre-ritual の演出選択に必要）
    const card = drawCard()
    if (!card) return // 同日重複かつ連続モード OFF

    if (prefersReducedMotion()) {
      setStage('drawn')
      return
    }

    const rarity = getCardRarity(card)
    const preDuration = PRE_RITUAL_DURATIONS[rarity]

    // ritual の flip 開始（1750ms）に合わせて haptic を打つヘルパー
    const scheduleRitualHaptics = (offset: number) => {
      window.setTimeout(() => hapticFlip(), offset + 1750)
      if (rarity === 'legendary') {
        // legendary は flip 完了 (offset + 2950ms) で強めのバイブ
        window.setTimeout(() => hapticLegendary(), offset + 2950)
      }
    }

    if (preDuration > 0) {
      setPreRitualRarity(rarity)
      setStage('pre-ritual')
      window.setTimeout(() => startRitual(), preDuration)
      scheduleRitualHaptics(preDuration)
    } else {
      // common：直接 ritual へ
      startRitual()
      scheduleRitualHaptics(0)
    }
  }

  return (
    <div className="min-h-screen flex flex-col shoji-light washi-texture overflow-hidden relative">
      {/* 季節背景は app/page.tsx でグローバルに描画。ここでは出さない。 */}

      {/* ⚠ DEV：連続抽選モード ON 時の警告バナー（本番ビルドでは DEBUG_MODE=false で非表示） */}
      {DEBUG_MODE && continuousMode && (
        <div className="text-center text-[10px] text-destructive bg-destructive/10 py-1 tracking-[0.15em] relative z-10">
          ⚠️ 連続抽選モード（開発用）
        </div>
      )}

      <div className="h-12" />

      {/* Date display */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="px-6 pt-6"
      >
        <DateDisplay />
      </motion.div>

      {/* ホーム上部ミニバナー：節気 → お帰り or 連続日数（awaiting 時のみ、演出の邪魔をしない） */}
      {isLoaded && stage === 'awaiting' && <HomeMiniBanners />}

      {/* Main card area */}
      <div
        className={`flex-1 flex flex-col items-center justify-center px-6 py-8 relative ${
          isAnimating ? 'is-ritual' : ''
        } ${isAnimating && isLegendary ? 'is-legendary' : ''}`}
      >
        {/* 儀式中のオーバーレイ群（暗化・閃光・波紋） */}
        {isAnimating && (
          <>
            <div className="ritual-dim" aria-hidden="true" />
            <div className="ritual-flash" aria-hidden="true" />
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ zIndex: 8 }}
              aria-hidden="true"
            >
              <div className="ritual-ripple-ring" />
            </div>
          </>
        )}

        {/* Phase 7：新発見演出（このカードを初めて引いた時のみ） */}
        {isAnimating && lastDrawWasFirstTime && (
          <>
            <div className="new-discovery-text" aria-hidden="true">
              新たに発見した札
            </div>
            <div className="collection-counter-badge" aria-hidden="true">
              <span className="collection-counter-label">図鑑</span>
              <span className="collection-counter-numbers">
                {(() => {
                  const s = getStats()
                  return `${s.collected} / ${s.total}`
                })()}
              </span>
            </div>
          </>
        )}

        {/* Legendary 限定：前置きテキスト + 副題 + 32 個の金粉（上下から舞う） */}
        {isAnimating && isLegendary && (
          <>
            <div className="legendary-pre-text" aria-hidden="true">
              極めて稀なる札
            </div>
            <div className="legendary-subtitle" aria-hidden="true">
              ✦ 大アルカナ ✦
            </div>
            <div className="legendary-particles" aria-hidden="true">
              {/* 上昇 16 個（下→上） */}
              {Array.from({ length: 16 }).map((_, i) => {
                const size = 11 + (i % 3) // 11 / 12 / 13 px ランダム
                return (
                  <span
                    key={`rise-${i}`}
                    className="legendary-particle legendary-particle-rise"
                    style={
                      {
                        left: `${4 + i * 6}%`,
                        width: `${size}px`,
                        height: `${size}px`,
                        animationDelay: `${5000 + i * 90}ms`,
                        '--l-drift': `${(i % 2 === 0 ? 1 : -1) * (8 + (i % 4) * 4)}px`,
                      } as CSSProperties
                    }
                  />
                )
              })}
              {/* 落下 16 個（上→下） */}
              {Array.from({ length: 16 }).map((_, i) => {
                const size = 11 + ((i + 1) % 3) // 11 / 12 / 13 px、ライズ群とサイズ位相をずらす
                return (
                  <span
                    key={`fall-${i}`}
                    className="legendary-particle legendary-particle-fall"
                    style={
                      {
                        left: `${7 + i * 6}%`,
                        width: `${size}px`,
                        height: `${size}px`,
                        animationDelay: `${5200 + i * 95}ms`,
                        '--l-drift': `${(i % 2 === 0 ? -1 : 1) * (10 + (i % 3) * 5)}px`,
                      } as CSSProperties
                    }
                  />
                )
              })}
            </div>
          </>
        )}

        {!isLoaded ? (
          <div className="w-full max-w-[220px] aspect-[2/3]" aria-hidden="true" />
        ) : stage === 'awaiting' ? (
          <FannedCardsChooser onTap={handleCardTap} tappedIndex={tappedIndex} />
        ) : stage === 'pre-ritual' ? (
          <PreRitualScene tappedIndex={tappedIndex} rarity={preRitualRarity} />
        ) : (
          <DrawnContent
            card={todayCard?.card}
            tappedIndex={tappedIndex}
            isAnimating={isAnimating}
            streak={streak}
          />
        )}
      </div>

      {/* ⚠ DEV：連続抽選モード ON 時のみ、引き終わり状態で「もう一度引く」を出す */}
      {DEBUG_MODE && continuousMode && stage === 'drawn' && !isAnimating && (
        <div className="px-6 pb-3 text-center">
          <button
            type="button"
            onClick={handleRedraw}
            className="px-6 py-2 rounded-lg border border-destructive/40 text-xs tracking-[0.2em] text-foreground/80 hover:bg-destructive/10 transition-colors cursor-pointer touch-manipulation"
          >
            もう一度引く
          </button>
        </div>
      )}

      {/* 連続日数の大きい表示（既存、画面下） */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="px-6 pb-28"
      >
        <StreakDisplay streak={streak} />
      </motion.div>
    </div>
  )
}

// =============================================================================
// Phase 0：扇形に並ぶ 3 枚の伏せ札（呼吸 + 朱色発光）
// =============================================================================

function FannedCardsChooser({
  onTap,
  tappedIndex,
}: {
  onTap: (i: number) => void
  tappedIndex: number | null
}) {
  return (
    <div className="text-center">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="font-serif text-sm text-muted-foreground/70 mb-10 tracking-[0.2em] font-light"
      >
        今日のひと枚を選ぶ
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="relative mx-auto"
        style={{ width: 280, height: 220 }}
      >
        {FAN_POSITIONS.map((pos, i) => {
          const baseTransform = `translateX(${pos.x}px) rotate(${pos.rotate}deg)`
          return (
            <button
              key={i}
              type="button"
              onClick={() => onTap(i)}
              aria-label={`${i + 1} 枚目の札を選ぶ`}
              disabled={tappedIndex !== null}
              className="fan-slot-button absolute top-0 left-1/2 -ml-[70px] cursor-pointer touch-manipulation"
              style={{
                transform: baseTransform,
                zIndex: i === 1 ? 3 : 2,
              }}
            >
              {/* Hover/active の transform を別レイヤーに分離。
                  fan-idle-breathe は CSS animation で transform を握っているため、
                  同じ要素にホバー transform を当てると衝突して効かない。 */}
              <div className="fan-hover-lift">
                <div className="fan-idle-breathe">
                  <CardBackFace size="small" />
                </div>
              </div>
            </button>
          )
        })}
      </motion.div>
    </div>
  )
}

// =============================================================================
// Phase 1〜6：引いた後の表示（タップした札→中央→反転→象徴開示→バッジ）
// is-ritual 配下にあれば CSS が儀式を再生、なければ静的最終状態を表示
// =============================================================================

function DrawnContent({
  card,
  tappedIndex,
  isAnimating,
  streak,
}: {
  card?: TarotCard
  tappedIndex: number | null
  isAnimating: boolean
  streak: number
}) {
  const chosenPos = FAN_POSITIONS[tappedIndex ?? 1]
  // レア度ごとに墨/藍/朱/金 4 色テーマでカード本体（背景・枠・名前・シンボル）を切替
  const rarity = card ? getCardRarity(card) : 'common'

  return (
    <div
      className={`flex flex-col items-center w-full rarity-${rarity}`}
      style={{ position: 'relative', zIndex: 1 }}
    >
      {/* 非選択の 2 枚（演出中のみフェードアウト演技） */}
      {isAnimating && tappedIndex !== null && (
        <div
          className="absolute pointer-events-none"
          style={{ top: '20%', left: '50%', transform: 'translateX(-50%)', width: 280, height: 220 }}
          aria-hidden="true"
        >
          {FAN_POSITIONS.map((pos, i) => {
            if (i === tappedIndex) return null
            return (
              <div
                key={i}
                className="absolute top-0 left-1/2 -ml-[70px]"
                style={{ transform: `translateX(${pos.x}px) rotate(${pos.rotate}deg)` }}
              >
                <div className="other-recede">
                  <CardBackFace size="small" />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* 選ばれた札：5 段ネストで Phase 1〜4 の変形を分離管理 */}
      <div
        className="chosen-slide relative w-full max-w-[220px] aspect-[2/3] mx-auto"
        style={
          {
            '--draw-start-x': `${chosenPos.x}px`,
            '--draw-start-rotate': `${chosenPos.rotate}deg`,
            perspective: 1000,
          } as CSSProperties
        }
      >
        {/* halo（朱色の光輪、Phase 2） */}
        <div className="chosen-halo" aria-hidden="true" />

        <div className="chosen-commit absolute inset-0">
          <div className="chosen-lift absolute inset-0">
            <div className="chosen-shake absolute inset-0">
              <div className="chosen-flipper relative w-full h-full">
                {/* 裏面（フリップ前に見える） */}
                <div className="chosen-back-face">
                  <CardBackFace />
                </div>

                {/* 表面（フリップ後に見える） */}
                <div className="chosen-front-face flex flex-col items-center justify-center p-6 rounded-md gold-border overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-card via-card to-secondary/30 card-washi-texture" />
                  <div className="absolute inset-3 border border-gold/15 rounded-sm pointer-events-none" />

                  {/* 朱印（右上） */}
                  {card && (
                    <div className="chosen-seal absolute top-3 right-3">
                      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="3" y="3" width="18" height="18" rx="2" fill="var(--primary)" opacity="0.85" />
                        <text
                          x="12"
                          y="16"
                          textAnchor="middle"
                          fontSize="10"
                          fill="white"
                          fontFamily="var(--font-serif), serif"
                          fontWeight={500}
                        >
                          占
                        </text>
                      </svg>
                    </div>
                  )}

                  <div className="chosen-symbol relative flex-1 w-full flex items-center justify-center">
                    {card && <CardSymbol card={card} size={140} animate />}
                  </div>

                  {card && (
                    <div className="chosen-name relative mt-4 text-center">
                      <h3 className="font-serif text-xl text-foreground tracking-[0.15em]">{card.name}</h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* レア度漢字（カード下、解釈文の上）。色は rarity-symbol-{rarity} を継承 */}
      {card && (
        <div className={`chosen-rarity-kanji rarity-symbol-${rarity}`}>
          <ruby>
            <span className="chosen-rarity-kanji-char">{rarityKanji[rarity].kanji}</span>
            <rt className="chosen-rarity-kanji-reading">{rarityKanji[rarity].reading}</rt>
          </ruby>
        </div>
      )}

      {/* 解釈文と飾り罫 */}
      {card && (
        <>
          <div className="mt-10 text-center max-w-[260px]">
            <div className="chosen-decoration flex items-center justify-center gap-3 mb-4">
              <div className="w-1 h-1 rounded-full bg-gold/40" />
              <div className="w-6 h-px gold-line" />
              <div className="w-1 h-1 rounded-full bg-gold/40" />
            </div>

            <p className="chosen-message sumi-text text-foreground/75 text-sm">{card.meaningUpright}</p>

            <div className="chosen-decoration flex items-center justify-center gap-3 mt-4">
              <div className="w-1 h-1 rounded-full bg-gold/40" />
              <div className="w-6 h-px gold-line" />
              <div className="w-1 h-1 rounded-full bg-gold/40" />
            </div>
          </div>

          {/* 連続日数バッジ（Phase 6）：漢数字（旧字体）で表記 */}
          {streak > 0 && (
            <div className="chosen-streak-badge mt-6">
              <div className="streak-badge-wa">
                <div className="streak-badge-wa-dot" />
                <span className="streak-badge-wa-number">{toKanjiNumber(streak)}</span>
                <span className="streak-badge-wa-text">日連続</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// =============================================================================
// 札の裏面（扇形・フリップ前・既ロード時で共用）
// =============================================================================

// =============================================================================
// ホーム上部のミニバナー：節気 + 連続日数 or お帰り
// awaiting ステージ時のみ表示、ritual / pre-ritual には出さない
// =============================================================================

function HomeMiniBanners() {
  const sekkiToday = isSekkiToday()
  const streak = getStreak()
  const broken = wasStreakBroken()
  // 行動経済学：社会的証明（レンジ表現）、残り枚数（ザイガニク効果）
  const [socialMessage, setSocialMessage] = useState<string | null>(null)
  const [remainingCount, setRemainingCount] = useState<number | null>(null)

  useEffect(() => {
    if (isSocialProofEnabled()) {
      setSocialMessage(getSocialProofMessage().text)
    } else {
      setSocialMessage(null)
    }
    const s = getStats()
    const remaining = s.total - s.collected
    // 残り 0 か全部 揃っている時は出さない。残り少数（≤ 12）の時だけ強調表示。
    setRemainingCount(remaining > 0 && remaining <= 12 ? remaining : null)
  }, [])

  // 社会的証明のトグル変更追従
  useEffect(() => {
    if (typeof window === 'undefined') return
    const onChange = () => {
      if (isSocialProofEnabled()) setSocialMessage(getSocialProofMessage().text)
      else setSocialMessage(null)
    }
    window.addEventListener(SOCIAL_PROOF_CHANGED_EVENT, onChange)
    return () => window.removeEventListener(SOCIAL_PROOF_CHANGED_EVENT, onChange)
  }, [])

  // 何も表示するものがない場合はバナー領域自体を出さない
  const hasComeback = broken && !!streak.lastDrawDate
  const hasStreak = !hasComeback && streak.currentStreak > 0
  if (!sekkiToday && !hasComeback && !hasStreak && !socialMessage && !remainingCount) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="home-mini-banners"
    >
      {sekkiToday && (
        <div className={`sekki-banner sekki-${sekkiToday.season}`} aria-label={`本日は ${sekkiToday.name}`}>
          <span className="sekki-banner-prefix">本日は</span>
          <span className="sekki-banner-name">『{sekkiToday.name}』</span>
        </div>
      )}

      {hasComeback && (
        <p className="comeback-banner" aria-label="お帰りなさい">
          お帰りなさい。今日は気持ちを新たに 🌸
        </p>
      )}

      {hasStreak && (
        <p className="streak-banner" aria-label={`連続 ${streak.currentStreak} 日、最長 ${streak.longestStreak} 日`}>
          🔥 {streak.currentStreak}日連続
          <span className="streak-banner-sep">/</span>
          <span className="streak-banner-longest">最長 {streak.longestStreak}日</span>
        </p>
      )}

      {/* 残り枚数の柔らかい強調（ザイガニク効果）：完成手前の高揚を支える、煽らない */}
      {remainingCount !== null && (
        <p className="text-[11px] tracking-[0.18em] text-foreground/70 font-light text-center mt-1">
          図鑑、あと <span className="font-serif text-foreground/90">{remainingCount}</span> 枚
        </p>
      )}

      {/* 社会的証明：レンジ表現のみ。具体数は出さない。OFF にもできる */}
      {socialMessage && (
        <p className="text-[10px] tracking-[0.15em] text-muted-foreground/60 font-light text-center mt-1 leading-relaxed">
          {socialMessage}
        </p>
      )}
    </motion.div>
  )
}

// =============================================================================
// Pre-Ritual：レア度ごとのタメ演出を再生するシーン
// rare 1.5s / epic 3s / legendary 5.5s
// =============================================================================

function PreRitualScene({
  tappedIndex,
  rarity,
}: {
  tappedIndex: number | null
  rarity: CardRarity
}) {
  return (
    <div className="relative w-full">
      {/* 1. 背景の rarity 色染め（epic/legendary） */}
      {(rarity === 'epic' || rarity === 'legendary') && (
        <div className={`pre-ritual-bg pre-ritual-bg-${rarity}`} aria-hidden="true" />
      )}

      {/* 2. 一瞬の暗転（legendary 0-0.3s） */}
      {rarity === 'legendary' && <div className="pre-ritual-darken" aria-hidden="true" />}

      {/* 3. 亀甲文様が四隅から侵入（legendary、1500-3000ms） */}
      {rarity === 'legendary' && (
        <>
          <KikkoCorner position="tl" />
          <KikkoCorner position="tr" />
          <KikkoCorner position="bl" />
          <KikkoCorner position="br" />
        </>
      )}

      {/* 4. タップした札が rarity 色で激しく光る、他 2 枚は薄く沈む */}
      <div className="relative mx-auto" style={{ width: 280, height: 220, zIndex: 6 }}>
        {FAN_POSITIONS.map((pos, i) => {
          const isChosen = i === tappedIndex
          return (
            <div
              key={i}
              className="absolute top-0 left-1/2 -ml-[70px]"
              style={{
                transform: `translateX(${pos.x}px) rotate(${pos.rotate}deg)`,
                zIndex: isChosen ? 10 : 1,
              }}
            >
              <div
                className={
                  isChosen
                    ? `pre-ritual-chosen pre-ritual-chosen-${rarity}`
                    : 'pre-ritual-other'
                }
              >
                <CardBackFace size="small" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function KikkoCorner({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  return (
    <svg
      className={`pre-ritual-kikko-corner pre-ritual-kikko-${position}`}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <polygon
        points="50,6 90,28 90,72 50,94 10,72 10,28"
        fill="none"
        stroke="rgba(212, 160, 23, 0.85)"
        strokeWidth="2.5"
      />
      <polygon
        points="50,18 78,33 78,67 50,82 22,67 22,33"
        fill="none"
        stroke="rgba(212, 160, 23, 0.55)"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function CardBackFace({ size = 'full' }: { size?: 'full' | 'small' }) {
  const isSmall = size === 'small'
  const wrapperClass = isSmall ? 'w-[140px] h-[210px]' : 'w-full h-full'
  const sealOuter = isSmall ? 'w-9 h-9' : 'w-12 h-12'
  const sealKanji = isSmall ? 'text-lg' : 'text-2xl'

  return (
    <div className={`relative rounded-md gold-border overflow-hidden ${wrapperClass}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-card via-card to-secondary/50 card-washi-texture" />
      <div className="absolute inset-3 border border-foreground/8 rounded-sm" />
      <div className="absolute inset-4 border border-gold/15 rounded-sm" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`relative ${sealOuter}`}>
          <div className="absolute inset-0 rounded-full border border-primary/25" />
          <div className="absolute inset-2 rounded-full border border-gold/25" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-primary/40 font-serif ${sealKanji}`}>卦</span>
          </div>
        </div>
      </div>

      <div className="absolute top-5 left-5 w-4 h-4 border-t border-l border-gold/25" />
      <div className="absolute top-5 right-5 w-4 h-4 border-t border-r border-gold/25" />
      <div className="absolute bottom-5 left-5 w-4 h-4 border-b border-l border-gold/25" />
      <div className="absolute bottom-5 right-5 w-4 h-4 border-b border-r border-gold/25" />
    </div>
  )
}

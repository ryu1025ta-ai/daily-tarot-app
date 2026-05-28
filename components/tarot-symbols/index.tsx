'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { TarotCard } from '@/lib/tarot-data'
import { getCardRarity, type CardRarity } from '@/lib/card-rarity'
import { getCurrentTimeTheme, type TimeTheme } from '@/lib/time-theme'
import { getCurrentSeason, type SekkiSeason } from '@/lib/sekki'
import { MajorArcanaSymbol } from './major-arcana'
import { MinorArcanaSymbol } from './minor-arcana'

interface CardSymbolProps {
  card: TarotCard
  size?: number
  className?: string
  /**
   * 詳細画面/演出シーンで使う時のみ true を渡す。
   * true のとき svg に `is-card-animated` クラス + data-* 属性が付き、
   * カード固有アニメ・時間帯/季節モジュレーション・長押し隠し演出が有効になる。
   * 図鑑グリッドのサムネ等では false（既定値）にしてパフォーマンス確保。
   */
  animate?: boolean
}

// 長押しのしきい値（ms）。短すぎると誤発火、長すぎると気付かれない。
const LONG_PRESS_THRESHOLD_MS = 600
// 隠し演出を維持する時間（ms）。アニメが一巡するくらいの体感。
const HIDDEN_ACTIVE_DURATION_MS = 2400

// 極のうち、共通テンプレ（亀甲フレーム + 金箔四隅）から脱却して
// 固有 SVG 構図に置き換えたカードの id 集合。
// 2026-05-28: 極8枚すべて加入完了。共通テンプレ廃止。
// KikkoBackdrop/GoldLeafCorners 自体の削除は他用途確認後に別タスク。
const LEGENDARY_CUSTOM_FRAME = new Set<string>([
  'major-0',  // 愚者：縦長＋谷
  'major-10', // 運命の輪：車輪（HUB+SPOKES+RIM）
  'major-13', // 死神：斜め鎌
  'major-16', // 塔：垂直崩落
  'major-17', // 星：上下分割（七星＋池）
  'major-18', // 月：垂直（道が手前へ）
  'major-19', // 太陽：横帯3層（富士山＋向日葵）
  'major-21', // 世界：X字＋四隅張出（四神＋舞人）
])

export function CardSymbol({
  card,
  size = 120,
  className = '',
  animate = false,
}: CardSymbolProps) {
  const rarity = getCardRarity(card)
  const needsDefs = rarity === 'epic' || rarity === 'legendary'

  // 時間帯・季節（マウント時に一度取得すれば十分。1セッション中に変化しても許容範囲）
  const [timeTheme, setTimeTheme] = useState<TimeTheme | null>(null)
  const [season, setSeason] = useState<SekkiSeason | null>(null)
  useEffect(() => {
    if (!animate) return
    setTimeTheme(getCurrentTimeTheme())
    setSeason(getCurrentSeason())
  }, [animate])

  // 長押しで「隠し演出」を発動。card-* の data-hidden-active 属性経由で CSS が切り替わる。
  const [hiddenActive, setHiddenActive] = useState(false)
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const releaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => {
    if (pressTimer.current) clearTimeout(pressTimer.current)
    if (releaseTimer.current) clearTimeout(releaseTimer.current)
  }, [])

  const cancelPress = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current)
      pressTimer.current = null
    }
  }
  const onPointerDown = animate
    ? (e: React.PointerEvent<SVGSVGElement>) => {
        if (!animate) return
        // 既存の親 onClick（タップで再抽選等）を阻害しないため preventDefault しない。
        // 長押し検出のみ。
        if (pressTimer.current) clearTimeout(pressTimer.current)
        pressTimer.current = setTimeout(() => {
          setHiddenActive(true)
          if (releaseTimer.current) clearTimeout(releaseTimer.current)
          releaseTimer.current = setTimeout(
            () => setHiddenActive(false),
            HIDDEN_ACTIVE_DURATION_MS,
          )
          pressTimer.current = null
          // 視覚アクセシビリティ: スクリーンリーダーに何か起きたと伝える必要は薄い（ビジュアル演出のみ）
        }, LONG_PRESS_THRESHOLD_MS)
        // touch のスクロール検知防止は touchAction で SVG 側に指定
        e.currentTarget.setPointerCapture?.(e.pointerId)
      }
    : undefined

  const onPointerEnd = animate
    ? (_e: React.PointerEvent<SVGSVGElement>) => cancelPress()
    : undefined

  // 隠し演出用クラスは card.id 全体ではなく短縮タグで付ける（"card-{id}" は CSS から扱いやすい）
  const cardClass = `card-${card.id}`

  // 常（小アルカナ数札 1〜10）のスート別質感アニメ用クラス。
  // - common-{suit}: スート別の動きの質感（火=揺らめき / 水=波打ち / 地=重い呼吸 / 風=横ドリフト）
  // - common-num-{N}: 数別の強度段階（A=最も控えめ → 10=最も賑やか）
  // CSS は .text-primary（朱印）のみを動かす設計。主絵柄は静止。
  const commonAnimClass =
    rarity === 'common' && card.suit !== 'major'
      ? `common-${card.suit} common-num-${card.number}`
      : ''

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={`${card.name}（${card.nameEn}）の象徴`}
      fill="none"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`rarity-symbol-${rarity} [&_*]:stroke-current${animate ? ` is-card-animated ${cardClass}${commonAnimClass ? ` ${commonAnimClass}` : ''}` : ''} ${className}`}
      data-time={animate && timeTheme ? timeTheme : undefined}
      data-season={animate && season ? season : undefined}
      data-hidden-active={animate && hiddenActive ? 'true' : undefined}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerEnd}
      onPointerLeave={onPointerEnd}
      onPointerCancel={onPointerEnd}
      style={animate ? { touchAction: 'manipulation' } : undefined}
    >
      {needsDefs && <SymbolDefs rarity={rarity} />}

      {/* 1. 背景レイヤー：epic(貴=コート) = 青海波、legendary(極) = 亀甲フレーム
            極のうち LEGENDARY_CUSTOM_FRAME のカードは亀甲を出さず、
            SVG 側で固有の背景/フレームを描く（テンプレ画一化を脱却）。 */}
      {rarity === 'epic' && <SeigaihaBackdrop />}
      {rarity === 'legendary' && !LEGENDARY_CUSTOM_FRAME.has(card.id) && <KikkoBackdrop />}

      {/* 2. メインシンボル本体。
            極の8枚は per-card 固有アニメが SVG 内部の motion 要素で走る。
            ここではフィルタ枠だけ被せて立体感を出す。 */}
      <g filter={rarity === 'legendary' ? 'url(#tarot-legendary-glow)' : undefined}>
        {card.suit === 'major' ? (
          <MajorArcanaSymbol id={card.id} />
        ) : (
          <MinorArcanaSymbol suit={card.suit} number={card.number} />
        )}
      </g>

      {/* 3. 四隅の装飾：
            rare(稀=大アルカナ非極) = 麻の葉（微細）
            epic(貴=コート)         = 巴紋（控えめ）
            legendary(極)           = 金箔の流れ（CUSTOM_FRAME は SVG 側で固有装飾） */}
      {rarity === 'rare' && <AsanohaCorners />}
      {rarity === 'epic' && <TomoeCorners />}
      {rarity === 'legendary' && !LEGENDARY_CUSTOM_FRAME.has(card.id) && <GoldLeafCorners />}
    </svg>
  )
}

// =============================================================================
// 共通の defs：金グラデーション + 発光フィルタ
// =============================================================================

function SymbolDefs({ rarity }: { rarity: CardRarity }) {
  return (
    <defs>
      {rarity === 'legendary' && (
        <>
          <linearGradient id="tarot-gold-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d4a017" />
            <stop offset="50%" stopColor="#f9e9c1" />
            <stop offset="100%" stopColor="#d4a017" />
          </linearGradient>
          <filter id="tarot-legendary-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </>
      )}
      {rarity === 'epic' && (
        <filter id="tarot-epic-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feOffset dx="0" dy="0.5" result="offsetBlur" />
          <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
        </filter>
      )}
    </defs>
  )
}

// =============================================================================
// rare（稀＝大アルカナ非極 14 枚）：四隅に麻の葉。
// 微細演出（1要素のみ非常にゆっくり opacity 揺らぎ）。
// =============================================================================

const AsanohaUnit: React.FC = () => (
  <>
    <circle r="3.5" fill="none" strokeWidth="0.35" />
    <line x1="0" y1="-3.5" x2="0" y2="3.5" strokeWidth="0.35" />
    <line x1="-3" y1="-1.75" x2="3" y2="1.75" strokeWidth="0.35" />
    <line x1="-3" y1="1.75" x2="3" y2="-1.75" strokeWidth="0.35" />
  </>
)

function AsanohaCorners() {
  return (
    <g className="rarity-deco-asanoha" opacity="0.4">
      <g transform="translate(10, 10)"><AsanohaUnit /></g>
      <g transform="translate(90, 10)"><AsanohaUnit /></g>
      <g transform="translate(10, 90)"><AsanohaUnit /></g>
      <g transform="translate(90, 90)"><AsanohaUnit /></g>
    </g>
  )
}

// =============================================================================
// epic（貴＝小アルカナコート 16 枚）：四隅に巴紋 + 青海波背景。
// 控えめ演出（4〜6秒で呼吸するように揺らぐ）。
// =============================================================================

const TomoeUnit: React.FC = () => (
  <g fill="currentColor" stroke="none">
    <circle cx="0" cy="-2.6" r="1.1" />
    <circle cx="2.25" cy="1.3" r="1.1" />
    <circle cx="-2.25" cy="1.3" r="1.1" />
  </g>
)

function TomoeCorners() {
  return (
    <g className="rarity-deco-tomoe" opacity="0.5">
      <g transform="translate(10, 10) rotate(15)"><TomoeUnit /></g>
      <g transform="translate(90, 10) rotate(-15)"><TomoeUnit /></g>
      <g transform="translate(10, 90) rotate(-15)"><TomoeUnit /></g>
      <g transform="translate(90, 90) rotate(15)"><TomoeUnit /></g>
    </g>
  )
}

function SeigaihaBackdrop() {
  return (
    <g className="rarity-deco-seigaiha" opacity="0.10">
      <path d="M 4 56 A 10 10 0 0 1 24 56" fill="none" strokeWidth="0.4" />
      <path d="M 24 56 A 10 10 0 0 1 44 56" fill="none" strokeWidth="0.4" />
      <path d="M 44 56 A 10 10 0 0 1 64 56" fill="none" strokeWidth="0.4" />
      <path d="M 64 56 A 10 10 0 0 1 84 56" fill="none" strokeWidth="0.4" />
      <path d="M 84 56 A 10 10 0 0 1 104 56" fill="none" strokeWidth="0.4" />
      <path d="M 14 64 A 10 10 0 0 1 34 64" fill="none" strokeWidth="0.4" />
      <path d="M 34 64 A 10 10 0 0 1 54 64" fill="none" strokeWidth="0.4" />
      <path d="M 54 64 A 10 10 0 0 1 74 64" fill="none" strokeWidth="0.4" />
      <path d="M 74 64 A 10 10 0 0 1 94 64" fill="none" strokeWidth="0.4" />
    </g>
  )
}

// =============================================================================
// legendary（極の大アルカナ 8 枚）：亀甲フレーム + 四隅に金箔の流れ。
// 「舞台フレーム」として subtle に呼吸、per-card 固有アニメが主役。
// =============================================================================

function KikkoBackdrop() {
  return (
    <g className="rarity-deco-kikko-bg">
      <polygon
        points="50,6 90,28 90,72 50,94 10,72 10,28"
        fill="none"
        stroke="url(#tarot-gold-gradient)"
        strokeWidth="0.7"
      />
      <polygon
        points="50,16 80,32 80,68 50,84 20,68 20,32"
        fill="none"
        strokeWidth="0.35"
        opacity="0.55"
      />
      <circle cx="50" cy="50" r="38" fill="none" stroke="url(#tarot-gold-gradient)" strokeWidth="0.3" opacity="0.4" />
    </g>
  )
}

const GoldLeafUnit: React.FC = () => (
  <g>
    <path
      d="M 0 -5 Q 3 -3 4 0 Q 3 3 0 5 Q -3 3 -4 0 Q -3 -3 0 -5 Z"
      fill="none"
      stroke="url(#tarot-gold-gradient)"
      strokeWidth="0.55"
    />
    <circle r="1.4" fill="url(#tarot-gold-gradient)" stroke="none" />
  </g>
)

function GoldLeafCorners() {
  return (
    <g className="rarity-deco-gold-leaf" opacity="0.55">
      <g transform="translate(10, 10) rotate(0)"><GoldLeafUnit /></g>
      <g transform="translate(90, 10) rotate(90)"><GoldLeafUnit /></g>
      <g transform="translate(90, 90) rotate(180)"><GoldLeafUnit /></g>
      <g transform="translate(10, 90) rotate(270)"><GoldLeafUnit /></g>
    </g>
  )
}

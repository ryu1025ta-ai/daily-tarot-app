'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { TAROT_CARDS, type TarotCard } from '@/lib/tarot-data'
import { getCardRarity, getRarityLabel, type CardRarity } from '@/lib/card-rarity'
import { getCollection, getStats, type CollectionEntry, type CollectionStats } from '@/lib/collection'
import { CardSymbol } from '@/components/tarot-symbols'
import { useDebug } from '@/lib/debug-context'
import {
  DEBUG_MODE,
  SHOW_ALL_CARDS_CHANGED_EVENT,
  getShowAllCardsMode,
} from '@/lib/dev-tools'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer'

const RARITY_ORDER: readonly CardRarity[] = ['legendary', 'epic', 'rare', 'common']

type RarityFilter = 'all' | CardRarity

// SVG ドーナツチャート：レア度別 4 セグメントで収録進捗を可視化。
// 行動経済学：進捗可視化（11）。視覚で「あと少し」を直感化。
function ProgressDonut({ stats }: { stats: CollectionStats }) {
  const cx = 50, cy = 50, r = 36, sw = 10
  const C = 2 * Math.PI * r
  // セグメントを common → rare → epic → legendary の順に時計回りに積む（color強度の昇順）
  const segOrder: readonly CardRarity[] = ['common', 'rare', 'epic', 'legendary']
  // 全カードベース（total）に対する各レア度の比率
  const totalCards = stats.total
  let cumulative = 0
  const segments = segOrder.map((r) => {
    const collected = stats.byRarity[r].collected
    const ratio = collected / totalCards
    const dashLen = C * ratio
    const offset = -cumulative
    cumulative += dashLen
    return { rarity: r, dashLen, offset }
  })
  const totalProgress = stats.collected / stats.total

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="px-4 pb-4 flex items-center justify-center"
    >
      <div className="relative">
        <svg width="140" height="140" viewBox="0 0 100 100" className="-rotate-90">
          {/* 背景の薄い円 */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={sw}
            opacity="0.12"
          />
          {/* 各レア度のセグメント。stroke-dasharray で部分弧として描画 */}
          {segments.map((seg) => (
            <circle
              key={seg.rarity}
              cx={cx} cy={cy} r={r}
              fill="none"
              className={`rarity-symbol-${seg.rarity}`}
              stroke="currentColor"
              strokeWidth={sw}
              strokeLinecap="butt"
              strokeDasharray={`${seg.dashLen} ${C}`}
              strokeDashoffset={seg.offset}
              opacity="0.9"
            />
          ))}
        </svg>
        {/* 中央のパーセント表示 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span
            className="text-2xl text-foreground/85"
            style={{
              fontFamily: 'var(--font-serif), serif',
              fontVariantNumeric: 'lining-nums tabular-nums',
              fontWeight: 400,
            }}
          >
            {Math.floor(totalProgress * 100)}
            <span className="text-xs text-muted-foreground">％</span>
          </span>
          <span className="text-[9px] text-muted-foreground/70 tracking-[0.2em] mt-0.5">
            収録率
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export function CollectionScreen() {
  const { setDebugInfo } = useDebug()
  const [stats, setStats] = useState<CollectionStats | null>(null)
  const [collected, setCollected] = useState<Record<string, CollectionEntry>>({})
  // ⚠ DEV：全カード表示モード（NEXT_PUBLIC_DEBUG_MODE=true かつトグル ON で有効）
  const [showAllCards, setShowAllCards] = useState(false)
  const [filter, setFilter] = useState<RarityFilter>('all')
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null)

  // クライアントマウント後に localStorage を読む（SSR 整合）
  useEffect(() => {
    setStats(getStats())
    setCollected(getCollection())
    setShowAllCards(getShowAllCardsMode())
  }, [])

  // 設定タブからのトグル変更にも追従
  useEffect(() => {
    if (typeof window === 'undefined') return
    const onShowAll: EventListener = () => setShowAllCards(getShowAllCardsMode())
    window.addEventListener(SHOW_ALL_CARDS_CHANGED_EVENT, onShowAll)
    return () => window.removeEventListener(SHOW_ALL_CARDS_CHANGED_EVENT, onShowAll)
  }, [])

  const devShowAll = DEBUG_MODE && showAllCards

  useEffect(() => {
    setDebugInfo({
      cardState: stats
        ? devShowAll
          ? `図鑑(全表示) ${TAROT_CARDS.length}/${TAROT_CARDS.length}`
          : `図鑑 ${stats.collected}/${stats.total}`
        : '読込中',
    })
  }, [stats, devShowAll, setDebugInfo])

  const visibleRarities: readonly CardRarity[] =
    filter === 'all' ? RARITY_ORDER : [filter]

  return (
    <div className="min-h-screen flex flex-col shoji-light washi-texture pb-28">
      <div className="h-12" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-6 pt-6 pb-4 text-center"
      >
        <h1 className="font-serif text-xl tracking-[0.25em] text-foreground">
          図鑑
        </h1>
        {devShowAll && (
          <p className="mt-2 text-[10px] tracking-[0.25em] text-destructive/80 font-light">
            ⚠ 全カード表示モード（開発用）
          </p>
        )}
      </motion.div>

      {/* Total */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="px-6 pb-6 text-center"
      >
        <p
          className="text-4xl text-foreground/85"
          style={{
            fontFamily: 'var(--font-serif), serif',
            fontWeight: 400,
            fontVariantNumeric: 'lining-nums tabular-nums',
          }}
        >
          {devShowAll ? TAROT_CARDS.length : stats ? stats.collected : 0}
          <span className="text-base text-muted-foreground/60 mx-1">/</span>
          <span className="text-2xl text-muted-foreground">
            {stats ? stats.total : TAROT_CARDS.length}
          </span>
        </p>
        <p className="text-[10px] text-muted-foreground/70 tracking-[0.3em] mt-2 font-light">
          集めた札
        </p>

        {/* 行動経済学：残り枚数強調（ザイガニク効果）。煽らず、完成手前の高揚だけ示す */}
        {stats && !devShowAll && stats.collected > 0 && stats.collected < stats.total && (
          <p className="text-[11px] tracking-[0.18em] text-foreground/65 mt-3 font-light">
            あと <span className="font-serif text-foreground/90 text-sm">{stats.total - stats.collected}</span> 枚で満棚
          </p>
        )}
        {stats && !devShowAll && stats.collected === stats.total && (
          <p className="text-[11px] tracking-[0.25em] text-primary mt-3 font-serif">
            満棚 ── すべての札と縁を結びました
          </p>
        )}

        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="w-1 h-1 rounded-full bg-gold/40" />
          <div className="w-8 h-px gold-line" />
          <div className="w-1 h-1 rounded-full bg-gold/40" />
        </div>
      </motion.div>

      {/* 進捗の円グラフ（レア度別 4 セグメント、収録率の可視化） */}
      {stats && !devShowAll && (
        <ProgressDonut stats={stats} />
      )}

      {/* Rarity breakdown */}
      {stats && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="px-4 pb-6 grid grid-cols-4 gap-2"
        >
          {RARITY_ORDER.map((r) => (
            <div key={r} className="text-center bg-card/60 border border-border rounded p-2">
              <p className={`text-[11px] tracking-[0.25em] mb-1 rarity-symbol-${r}`}>
                {getRarityLabel(r)}
              </p>
              <p
                className="text-foreground/85"
                style={{
                  fontFamily: 'var(--font-serif), serif',
                  fontVariantNumeric: 'lining-nums tabular-nums',
                  fontSize: '14px',
                }}
              >
                {devShowAll
                  ? `${stats.byRarity[r].total} / ${stats.byRarity[r].total}`
                  : `${stats.byRarity[r].collected} / ${stats.byRarity[r].total}`}
              </p>
            </div>
          ))}
        </motion.div>
      )}

      {/* レア度フィルタタブ：開発時の検証効率向上のため常時表示 */}
      <div className="px-4 pb-6">
        <div className="flex gap-1.5 justify-center" role="tablist" aria-label="レア度で絞り込む">
          {(['all', ...RARITY_ORDER] as const).map((f) => {
            const active = filter === f
            const label = f === 'all' ? '全' : getRarityLabel(f)
            return (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full border text-xs tracking-[0.2em] transition-colors cursor-pointer touch-manipulation ${
                  active
                    ? f === 'all'
                      ? 'bg-foreground/10 border-foreground/40 text-foreground'
                      : `border-foreground/30 bg-card rarity-symbol-${f}`
                    : 'border-border text-muted-foreground/70 hover:border-foreground/20'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Card grid by rarity sections */}
      {visibleRarities.map((rarity) => {
        const cards = TAROT_CARDS.filter((c) => getCardRarity(c) === rarity)
        return (
          <section key={rarity} className={`px-4 pb-6 rarity-${rarity}`}>
            <h2 className="text-xs tracking-[0.3em] mb-3 px-1 font-light text-muted-foreground/80 flex items-center gap-2">
              <span className={`rarity-symbol-${rarity} text-sm`}>{getRarityLabel(rarity)}</span>
              <span className="opacity-60">{rarity}</span>
              <span className="opacity-50 ml-auto">
                {stats
                  ? devShowAll
                    ? `${stats.byRarity[rarity].total}/${stats.byRarity[rarity].total}`
                    : `${stats.byRarity[rarity].collected}/${stats.byRarity[rarity].total}`
                  : ''}
              </span>
            </h2>
            <div className="grid grid-cols-4 gap-2">
              {cards.map((card) => {
                const got = devShowAll || !!collected[card.id]
                const isClickable = got
                const cellClasses = `relative aspect-[2/3] rounded border flex flex-col items-center justify-center p-1 transition-opacity ${
                  got
                    ? 'bg-card border-gold/20 card-shadow'
                    : 'bg-secondary/30 border-foreground/5 opacity-50'
                }`
                const inner = got ? (
                  <>
                    <CardSymbol card={card} size={56} />
                    <p className="text-[8px] text-foreground/70 text-center font-serif truncate w-full px-0.5 mt-0.5">
                      {card.name}
                    </p>
                  </>
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <span className="text-muted-foreground/40 font-serif text-2xl">？</span>
                  </div>
                )

                return isClickable ? (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => setSelectedCard(card)}
                    aria-label={`${card.name}の詳細を見る`}
                    className={`${cellClasses} cursor-pointer touch-manipulation hover:brightness-105 active:scale-95`}
                  >
                    {inner}
                  </button>
                ) : (
                  <div
                    key={card.id}
                    className={cellClasses}
                    aria-label="未発見"
                  >
                    {inner}
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}

      {/* 詳細ドロワー：取得済 or 全カード表示モード時、セルタップで開く。
          カレンダー画面と同じ DrawerContent 構造（washi-texture は内側 wrapper に当てない）。 */}
      <Drawer
        open={selectedCard !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedCard(null)
        }}
      >
        <DrawerContent className="shoji-light">
          <DrawerHeader className="border-b border-border/40 pb-4">
            <DrawerTitle className="font-serif tracking-[0.2em] text-base text-foreground/85 font-light text-center">
              {selectedCard?.name ?? ''}
            </DrawerTitle>
            <DrawerDescription className="sr-only">
              カードの詳細と意味
            </DrawerDescription>
          </DrawerHeader>

          {selectedCard && (
            <div
              className={`px-6 py-6 flex flex-col items-center text-center rarity-${getCardRarity(selectedCard)}`}
            >
              {/* レア度漢字：常 / 稀 / 貴 / 極 */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-px gold-line" />
                <span
                  className={`text-[11px] tracking-[0.3em] font-light rarity-symbol-${getCardRarity(selectedCard)}`}
                >
                  {getRarityLabel(getCardRarity(selectedCard))}
                </span>
                <div className="w-4 h-px gold-line" />
              </div>

              {/* 大きいサイズのカード SVG イラスト */}
              <div className="mb-3">
                <CardSymbol card={selectedCard} size={160} animate />
              </div>

              {/* カード名（日本語） */}
              <h3 className="font-serif text-2xl tracking-[0.15em] mb-1 card-name-text">
                {selectedCard.name}
              </h3>

              {/* カード名（英語） */}
              <p
                className="text-xs text-muted-foreground/70 tracking-[0.2em] mb-6"
                style={{ fontFamily: 'var(--font-cormorant), serif' }}
              >
                {selectedCard.nameEn}
              </p>

              {/* 飾り罫 */}
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="w-1 h-1 rounded-full bg-gold/40" />
                <div className="w-8 h-px gold-line" />
                <div className="w-1 h-1 rounded-full bg-gold/40" />
              </div>

              {/* 意味（正位置） */}
              <p className="sumi-text text-foreground/75 text-sm max-w-[300px] pb-6">
                {selectedCard.meaningUpright}
              </p>

              {/* キーワード */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                {selectedCard.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="text-[10px] tracking-[0.15em] text-muted-foreground/70 border border-border/60 rounded-sm px-2 py-0.5"
                  >
                    {kw}
                  </span>
                ))}
              </div>

              {/* 閉じるボタン */}
              <button
                type="button"
                onClick={() => setSelectedCard(null)}
                className="mt-2 mb-4 px-8 py-2 text-xs tracking-[0.3em] text-muted-foreground hover:text-foreground border border-border/60 rounded-sm transition-colors cursor-pointer touch-manipulation"
              >
                閉じる
              </button>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  )
}

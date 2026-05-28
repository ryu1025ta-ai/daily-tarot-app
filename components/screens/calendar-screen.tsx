'use client'

import { motion } from 'framer-motion'
import { useTarot } from '@/lib/tarot-context'
import { useState, useMemo, useEffect } from 'react'
import { TAROT_CARDS } from '@/lib/tarot-data'
import { getCardRarity, getRarityLabel } from '@/lib/card-rarity'
import { CardSymbol } from '@/components/tarot-symbols'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer'

function getJapaneseMonth(date: Date): string {
  const months = [
    '睦月', '如月', '弥生', '卯月', '皐月', '水無月',
    '文月', '葉月', '長月', '神無月', '霜月', '師走'
  ]
  return months[date.getMonth()]
}

function getJapaneseEra(date: Date): string {
  const year = date.getFullYear()
  const reiwaYear = year - 2018
  return `令和${reiwaYear === 1 ? '元' : reiwaYear}年`
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

// ドロワーで詳細を表示する用に、YYYY-MM-DD を「YYYY年M月D日」に整形
function formatDateForDrawer(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number)
  return `${y}年${m}月${d}日`
}

// JST 基準で YYYY-MM-DD を返すフォーマッタ。lib/tarot-context.tsx の getTodayString と同一基準。
// 文字列比較（YYYY-MM-DD は辞書順=時系列順）で過去/今日/未来を判定するため、Date オブジェクトの
// タイムゾーン解釈の罠（"YYYY-MM-DD" は UTC midnight として解釈される）を避ける。
const JST_FORMATTER = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo' })


export function CalendarScreen() {
  const { history, getCardForDate } = useTarot()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // ⚠ DEBUG（v1.0 公開前の検証用）：Drawer が開かない事象の根本原因を切り分けるためのログ。
  // 公開時に削除する。コンソールで以下が確認できればクリック経路は生きている：
  //   1. "[CALENDAR] Cell tapped" がクリック時に出る
  //   2. "[CALENDAR] selectedDate ->" が state 変更時に出る
  // 1 が出ない → button onClick が発火していない（z-index / pointer-events を疑う）
  // 1 出る・2 出ない → setSelectedDate が走っていない（早期 return 等）
  // どちらも出る・Drawer 見えない → Drawer の position 上書きを疑う
  useEffect(() => {
    if (typeof window === 'undefined') return
    console.log('[CALENDAR] selectedDate ->', selectedDate)
  }, [selectedDate])

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = []
    for (let i = 0; i < firstDay; i++) days.push(null)
    for (let day = 1; day <= daysInMonth; day++) days.push(day)
    return days
  }, [daysInMonth, firstDay])

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    const today = new Date()
    const nextMonth = new Date(year, month + 1, 1)
    if (nextMonth <= today) {
      setCurrentDate(nextMonth)
    }
  }

  const canGoNext = () => {
    const today = new Date()
    const nextMonth = new Date(year, month + 1, 1)
    return nextMonth <= today
  }

  const selectedCard = selectedDate ? getCardForDate(selectedDate) : null

  return (
    <div className="min-h-screen flex flex-col shoji-light washi-texture pb-20">
      {/* Top spacing */}
      <div className="h-12" />

      {/* Month header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-6 pt-6 pb-4"
      >
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={goToPrevMonth}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer touch-manipulation"
            aria-label="前の月"
          >
            <svg className="pointer-events-none" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="text-center">
            <h2 className="font-serif text-lg tracking-[0.2em] text-foreground">
              {getJapaneseEra(currentDate)} {getJapaneseMonth(currentDate)}
            </h2>
          </div>

          <button
            type="button"
            onClick={goToNextMonth}
            disabled={!canGoNext()}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 cursor-pointer touch-manipulation"
            aria-label="次の月"
          >
            <svg className="pointer-events-none" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Weekday headers */}
      <div className="px-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['日', '月', '火', '水', '木', '金', '土'].map((day, i) => (
            <div
              key={day}
              className={`text-center text-xs tracking-wider py-2 ${
                i === 0 ? 'text-primary/70' : i === 6 ? 'text-muted-foreground' : 'text-muted-foreground'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid - shoji style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-7 gap-1"
        >
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="aspect-square" />
            }

            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            const card = getCardForDate(dateStr)
            const todayStr = JST_FORMATTER.format(new Date())
            const isToday = dateStr === todayStr
            const isFuture = dateStr > todayStr
            const isClickable = card !== null && !isFuture

            const cellInner = (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-1 pointer-events-none">
                <span
                  className={`text-xs ${
                    isFuture
                      ? 'text-muted-foreground/30'
                      : card
                        ? 'text-foreground/70'
                        : 'text-muted-foreground/50'
                  }`}
                  style={{ fontFamily: 'var(--font-cormorant), serif' }}
                >
                  {day}
                </span>

                {card && (
                  <div className="mt-0.5 w-full px-0.5">
                    <div className="text-[8px] text-foreground/60 text-center truncate font-serif">
                      {card.name}
                    </div>
                  </div>
                )}

                {!card && !isFuture && (
                  <div className="mt-1 w-1 h-1 rounded-full bg-muted-foreground/20" />
                )}
              </div>
            )

            const cellClasses = `aspect-square min-h-[44px] rounded border transition-all duration-300 ${
              card
                ? 'bg-card border-gold/20 card-shadow'
                : isFuture
                  ? 'bg-transparent border-transparent'
                  : 'bg-secondary/30 border-foreground/5'
            } ${isToday ? 'ring-1 ring-primary/30' : ''}`

            return (
              <motion.div
                key={dateStr}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.01 }}
              >
                {isClickable ? (
                  <button
                    type="button"
                    onClick={() => {
                      console.log('[CALENDAR] Cell tapped:', dateStr, '/ card:', card?.name)
                      setSelectedDate(dateStr)
                    }}
                    aria-label={`${formatDateForDrawer(dateStr)} ${card.name}の詳細を見る`}
                    className={`${cellClasses} w-full cursor-pointer touch-manipulation hover:brightness-105 active:scale-95`}
                  >
                    {cellInner}
                  </button>
                ) : (
                  <div className={cellClasses} aria-hidden={isFuture}>
                    {cellInner}
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="px-6 pt-8"
      >
        <div className="flex items-center justify-center gap-8 text-center">
          <div>
            <p
              className="text-2xl text-foreground"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              {Object.keys(history).filter(d => {
                const date = new Date(d)
                return date.getFullYear() === year && date.getMonth() === month
              }).length}
            </p>
            <p className="text-xs text-muted-foreground tracking-wider mt-1">
              この月の引いた日
            </p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div>
            <p
              className="text-2xl text-foreground"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              {TAROT_CARDS.length}
            </p>
            <p className="text-xs text-muted-foreground tracking-wider mt-1">
              全カード種類
            </p>
          </div>
        </div>
      </motion.div>

      {/* 詳細ドロワー：履歴のある日のセルをタップすると開く。
          ⚠ DrawerContent には washi-texture を当てない：
          globals.css の .washi-texture { position: relative } が Tailwind の
          .fixed { position: fixed } をソース順で上書きしてしまい、drawer が
          画面下に張り付かず通常フローで描画 → 視覚的に開かないバグを引き起こす。
          texture が欲しい場合は DrawerContent の内側の wrapper に当てる。 */}
      <Drawer
        open={selectedDate !== null}
        onOpenChange={(open) => {
          console.log('[CALENDAR] Drawer onOpenChange:', open)
          if (!open) setSelectedDate(null)
        }}
      >
        <DrawerContent className="shoji-light">
          <DrawerHeader className="border-b border-border/40 pb-4">
            <DrawerTitle className="font-serif tracking-[0.2em] text-base text-foreground/85 font-light">
              {selectedDate ? formatDateForDrawer(selectedDate) : ''}
            </DrawerTitle>
            <DrawerDescription className="sr-only">
              この日に引いたカードの詳細
            </DrawerDescription>
          </DrawerHeader>

          {selectedCard && (
            <div
              className={`px-6 py-6 flex flex-col items-center text-center rarity-${getCardRarity(selectedCard)}`}
            >
              {/* レア度の控えめな印 */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-px gold-line" />
                <span className={`text-[10px] tracking-[0.3em] font-light rarity-symbol-${getCardRarity(selectedCard)}`}>
                  {getRarityLabel(getCardRarity(selectedCard))}
                </span>
                <div className="w-4 h-px gold-line" />
              </div>

              {/* シンボル：カード名の上に控えめに */}
              <div className="mb-3">
                <CardSymbol card={selectedCard} size={100} animate />
              </div>

              {/* カード名（日本語）。card-name-text クラスでレア度連動の色を適用 */}
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
              <p className="sumi-text text-foreground/75 text-sm max-w-[300px] pb-8">
                {selectedCard.meaningUpright}
              </p>

              {/* 閉じるボタン */}
              <button
                type="button"
                onClick={() => setSelectedDate(null)}
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

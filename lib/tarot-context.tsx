'use client'

import { createContext, useContext, useState, useEffect, useRef, ReactNode, useCallback } from 'react'
import { TAROT_CARDS, TarotCard } from './tarot-data'
import { drawWeightedCard } from './card-draw'
import { applyForcePick, getContinuousDrawMode } from './dev-tools'
import { markCardAsDrawn } from './collection'
import { updateStreak } from './streak'

interface DrawnCard {
  card: TarotCard
  date: string
}

interface TarotContextType {
  todayCard: DrawnCard | null
  hasDrawnToday: boolean
  isLoaded: boolean
  streak: number
  history: Record<string, string>
  /** 直近の drawCard が「図鑑初収録」だったかどうか。Phase 7 演出の発火条件。 */
  lastDrawWasFirstTime: boolean
  /** 抽選を実行し、結果のカードを返す（home-screen の pre-ritual 演出が rarity を即座に判定するため）。
   *  既に同日引き済みかつ連続抽選 OFF の場合は null を返す。 */
  drawCard: () => TarotCard | null
  getCardForDate: (date: string) => TarotCard | null
}

const TarotContext = createContext<TarotContextType | undefined>(undefined)

const STORAGE_KEY = 'wa-tarot-history'

// 日本時間（Asia/Tokyo）ベースで YYYY-MM-DD を返す
const dateFormatter = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo' })

function getTodayString(): string {
  return dateFormatter.format(new Date())
}

/** 「JST 基準で 24 時間前の日付」。JST は DST なしなので単純減算で安全。 */
function getYesterdayString(): string {
  return dateFormatter.format(new Date(Date.now() - 24 * 60 * 60 * 1000))
}

function isValidHistory(value: unknown): value is Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  return Object.values(value as Record<string, unknown>).every(v => typeof v === 'string')
}

export function TarotProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<Record<string, string>>({})
  const [todayCard, setTodayCard] = useState<DrawnCard | null>(null)
  const [streak, setStreak] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  // 「直近の drawCard が初収録だったか」を Phase 7 発火条件として保持
  const [lastDrawWasFirstTime, setLastDrawWasFirstTime] = useState(false)

  // setState の非同期反映を待たず、最新の履歴を同期的に参照するための ref。
  // 「初期ロード前の race」「同一 tick 内の連打」両方に対する二重抽選防止に使う。
  const historyRef = useRef<Record<string, string>>({})

  const calculateStreak = useCallback((hist: Record<string, string>): number => {
    let count = 0
    const todayStr = getTodayString()
    const base = new Date(`${todayStr}T00:00:00Z`)
    const utcFormatter = new Intl.DateTimeFormat('en-CA', { timeZone: 'UTC' })
    const dayMs = 24 * 60 * 60 * 1000

    for (let i = 0; i < 365; i++) {
      const date = new Date(base.getTime() - i * dayMs)
      const dateStr = utcFormatter.format(date)

      if (hist[dateStr] !== undefined) {
        count++
      } else if (i > 0) {
        break
      }
    }

    return count
  }, [])

  useEffect(() => {
    const finish = () => setIsLoaded(true)

    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      finish()
      return
    }

    let parsed: unknown
    try {
      parsed = JSON.parse(stored)
    } catch {
      localStorage.removeItem(STORAGE_KEY)
      finish()
      return
    }

    if (!isValidHistory(parsed)) {
      // 旧フォーマット（値が number）など互換性のないデータは破棄
      localStorage.removeItem(STORAGE_KEY)
      finish()
      return
    }

    historyRef.current = parsed
    setHistory(parsed)
    setStreak(calculateStreak(parsed))

    const today = getTodayString()
    const todayId = parsed[today]
    if (todayId !== undefined) {
      const card = TAROT_CARDS.find(c => c.id === todayId)
      if (card) {
        setTodayCard({ card, date: today })
      }
    }
    finish()
  }, [calculateStreak])

  const drawCard = useCallback((): TarotCard | null => {
    // 1日1枚の厳格化：初期ロード前は触らせない
    if (!isLoaded) return null

    const today = getTodayString()
    // ref を見ることで、setState の反映遅延・クロージャの陳腐化を跨いだ多重抽選を弾く。
    // ⚠ DEV：連続抽選モード ON の時は同日チェックをスキップして再抽選を許可（履歴は最後で上書き）
    if (!getContinuousDrawMode() && historyRef.current[today] !== undefined) return null

    // ⚠ DEV：開発ツールで強制カードが設定されていれば、そちらを最優先で採用する
    // （v1.0 公開時に dev-tools.ts ごと削除可能）
    //
    // 通常抽選：レア度別重み付き + 昨日のカードを除外。
    //   重み: 極0.5% / 貴1.0% / 稀1.43% / 常1.5%（per card）
    //   除外: 昨日の card.id があれば候補から外す（中毒誘発の「直近7日除外」は採用しない）
    const yesterdayId = historyRef.current[getYesterdayString()]
    const excludeIds = yesterdayId ? [yesterdayId] : []
    const card = applyForcePick() ?? drawWeightedCard(TAROT_CARDS, excludeIds)

    // 図鑑に記録。初収録なら Phase 7 演出のトリガーを立てる。
    const isFirstTime = markCardAsDrawn(card.id)
    setLastDrawWasFirstTime(isFirstTime)

    // 連続日数を更新。連続抽選モード（開発用）では汚さない。
    if (!getContinuousDrawMode()) {
      updateStreak(new Date())
    }

    const newHistory = { ...historyRef.current, [today]: card.id }

    // ref を同期的に確定 → 直後の連打でも次の判定は必ず弾かれる
    historyRef.current = newHistory

    setHistory(newHistory)
    setTodayCard({ card, date: today })
    setStreak(calculateStreak(newHistory))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory))

    return card
  }, [isLoaded, calculateStreak])

  const getCardForDate = useCallback((date: string): TarotCard | null => {
    const cardId = history[date]
    if (cardId === undefined) return null
    return TAROT_CARDS.find(c => c.id === cardId) || null
  }, [history])

  const hasDrawnToday = todayCard !== null

  return (
    <TarotContext.Provider value={{
      todayCard,
      hasDrawnToday,
      isLoaded,
      streak,
      history,
      lastDrawWasFirstTime,
      drawCard,
      getCardForDate
    }}>
      {children}
    </TarotContext.Provider>
  )
}

export function useTarot() {
  const context = useContext(TarotContext)
  if (!context) {
    throw new Error('useTarot must be used within a TarotProvider')
  }
  return context
}

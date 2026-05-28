// 連続日数・最長記録・累計日数を独立した永続化キーで管理する。
// 既存の useTarot.streak（history から都度計算）とは別系統。
// 健全設計：途切れても責めない、最長記録は残す、煽り文言は使わない。

const STORAGE_KEY = 'wa-no-koyomi:streak'

export type StreakData = {
  currentStreak: number
  longestStreak: number
  lastDrawDate: string // 'YYYY-MM-DD' (JST)
  totalDrawDays: number
}

const DEFAULT: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastDrawDate: '',
  totalDrawDays: 0,
}

const dateFormatter = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo' })

function toYMD(d: Date): string {
  return dateFormatter.format(d)
}

function shiftDays(d: Date, delta: number): Date {
  const out = new Date(d)
  out.setDate(out.getDate() + delta)
  return out
}

export function getStreak(): StreakData {
  if (typeof window === 'undefined') return DEFAULT
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT
    const parsed = JSON.parse(raw)
    if (
      parsed &&
      typeof parsed === 'object' &&
      typeof parsed.currentStreak === 'number' &&
      typeof parsed.longestStreak === 'number' &&
      typeof parsed.lastDrawDate === 'string' &&
      typeof parsed.totalDrawDays === 'number'
    ) {
      return parsed as StreakData
    }
  } catch {
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }
  return DEFAULT
}

function writeStreak(data: StreakData): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {}
}

/**
 * 今日カードを引いた事実を記録する。
 *  - lastDrawDate が「昨日」      → currentStreak + 1
 *  - lastDrawDate が「今日」      → 何もしない（既に記録済み）
 *  - lastDrawDate が「2日以上前」 → currentStreak = 1（リセット）
 *  - longestStreak は常に max(current, longest)
 *  - totalDrawDays は新しい日付ごとに +1
 */
export function updateStreak(today: Date = new Date()): void {
  const todayStr = toYMD(today)
  const current = getStreak()

  if (current.lastDrawDate === todayStr) return // 今日は既に記録済み

  const yesterdayStr = toYMD(shiftDays(today, -1))

  const newCurrent = current.lastDrawDate === yesterdayStr ? current.currentStreak + 1 : 1
  const newLongest = Math.max(newCurrent, current.longestStreak)
  const newTotal = current.totalDrawDays + 1

  writeStreak({
    currentStreak: newCurrent,
    longestStreak: newLongest,
    lastDrawDate: todayStr,
    totalDrawDays: newTotal,
  })
}

/**
 * 連続記録が「途切れている」かどうか。
 *  - 初回ユーザー（lastDrawDate 空）は false
 *  - 今日既に引いた場合は false
 *  - lastDrawDate が昨日でも今日でもない場合 true
 * 「お帰りなさい」メッセージの表示判定に使う。
 */
export function wasStreakBroken(today: Date = new Date()): boolean {
  const data = getStreak()
  if (!data.lastDrawDate) return false
  const todayStr = toYMD(today)
  if (data.lastDrawDate === todayStr) return false
  const yesterdayStr = toYMD(shiftDays(today, -1))
  return data.lastDrawDate !== yesterdayStr
}

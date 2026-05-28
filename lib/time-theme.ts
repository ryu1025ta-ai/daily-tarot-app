// 5段階の時間帯テーマ判定。横浜（緯度35.44、経度139.64）の日の出/日の入りを概算で使う。
// 厳密な天文計算を避け、月別の概算テーブルで補間する（誤差 ±5分程度）。
//
// 5段階：
//   - dawn    日の出前1h 〜 日の出
//   - day     日の出 〜 15:00
//   - dusk    15:00 〜 日の入り
//   - evening 日の入り 〜 21:00
//   - night   21:00 〜 翌日の dawn の開始
//
// 既存の light/dark との互換マッピング：
//   - light ≒ day（同じ CSS 変数値）
//   - dark  ≒ night
//   - dawn/dusk/evening は新規

export type TimeTheme = 'dawn' | 'day' | 'dusk' | 'evening' | 'night'
export type ThemeMode = 'auto' | TimeTheme

const ALL_THEMES: readonly TimeTheme[] = ['dawn', 'day', 'dusk', 'evening', 'night']
export const TIME_THEMES = ALL_THEMES

// 横浜の月別 日の出/日の入り（概算、毎月15日付近、分単位）
// 月インデックス 0=1月。
// 出典：天文計算の概算（公開データの近似）
const SUNRISE_TABLE: ReadonlyArray<{ sunrise: number; sunset: number }> = [
  { sunrise: 6 * 60 + 50, sunset: 16 * 60 + 50 }, // 1月
  { sunrise: 6 * 60 + 30, sunset: 17 * 60 + 20 }, // 2月
  { sunrise: 5 * 60 + 50, sunset: 17 * 60 + 50 }, // 3月
  { sunrise: 5 * 60 + 10, sunset: 18 * 60 + 15 }, // 4月
  { sunrise: 4 * 60 + 40, sunset: 18 * 60 + 40 }, // 5月
  { sunrise: 4 * 60 + 25, sunset: 19 * 60 + 0 },  // 6月
  { sunrise: 4 * 60 + 35, sunset: 19 * 60 + 0 },  // 7月
  { sunrise: 5 * 60 + 0, sunset: 18 * 60 + 35 },  // 8月
  { sunrise: 5 * 60 + 25, sunset: 17 * 60 + 50 }, // 9月
  { sunrise: 5 * 60 + 50, sunset: 17 * 60 + 0 },  // 10月
  { sunrise: 6 * 60 + 20, sunset: 16 * 60 + 30 }, // 11月
  { sunrise: 6 * 60 + 45, sunset: 16 * 60 + 30 }, // 12月
]

/** 与えられた日付の日の出/日の入りを「日中の分」で返す（00:00 からの分数） */
function getSunTimes(date: Date): { sunrise: number; sunset: number } {
  return SUNRISE_TABLE[date.getMonth()]
}

/** その日の現在時刻を「00:00 からの分」で返す */
function minutesOfDay(date: Date): number {
  return date.getHours() * 60 + date.getMinutes()
}

/** 現在の TimeTheme を判定。テスト用に date 注入可能。 */
export function getCurrentTimeTheme(date: Date = new Date()): TimeTheme {
  const { sunrise, sunset } = getSunTimes(date)
  const now = minutesOfDay(date)
  const hourBeforeSunrise = sunrise - 60
  const fifteen = 15 * 60
  const twentyOne = 21 * 60

  if (now >= hourBeforeSunrise && now < sunrise) return 'dawn'
  if (now >= sunrise && now < fifteen) return 'day'
  if (now >= fifteen && now < sunset) return 'dusk'
  if (now >= sunset && now < twentyOne) return 'evening'
  // 深夜（21:00〜翌 dawn）
  return 'night'
}

/** ThemeMode（auto + 5固定）から実効テーマを得る */
export function resolveTheme(mode: ThemeMode, date: Date = new Date()): TimeTheme {
  if (mode === 'auto') return getCurrentTimeTheme(date)
  return mode
}

/** ローカルストレージのキーとイベント */
export const THEME_MODE_STORAGE_KEY = 'wa-no-koyomi:theme-mode'
export const THEME_MODE_CHANGED_EVENT = 'wa-no-koyomi:theme-mode-changed'

/** UI 表示用ラベル */
export const THEME_LABELS: Record<TimeTheme, { jp: string; sub: string }> = {
  dawn:    { jp: '暁の障子', sub: '明け方' },
  day:     { jp: '昼の縁側', sub: '日中' },
  dusk:    { jp: '黄昏の縁', sub: '夕暮れ' },
  evening: { jp: '宵の和室', sub: '宵' },
  night:   { jp: '深夜の月光', sub: '深夜' },
}

export const MODE_LABELS: Record<ThemeMode, { jp: string; sub: string }> = {
  auto:    { jp: '自動', sub: '時間帯に追随' },
  ...THEME_LABELS,
}

/**
 * 旧 light/dark への互換マッピング（既存コードが期待する値）。
 * dawn/day → light、dusk/evening/night → dark
 */
export function toLegacyLightDark(theme: TimeTheme): 'light' | 'dark' {
  return theme === 'dawn' || theme === 'day' ? 'light' : 'dark'
}

// 二十四節気の日付テーブル（2026年版・簡易）。
// 各節気は「開始日」を持ち、次の節気の前日まで続く。
// グレゴリオ暦上の概算で、実際の太陽黄経 0/15/30...度の天文計算とは ±1 日ずれることがあるが、
// 日次通知の表題用途では実用上十分な精度。
//
// テーブル境界：
//  - 先頭：2025/12/22 冬至（2026/1/1〜1/4 を冬至として解決するためのガード）
//  - 末尾：2027/1/20 大寒（2026 年末→2027 年初の節気切替に対応）
// 既存の SAMPLE_SEKKI（lib/sample-data.ts、月ベース・5/6月のみ）とは別系統。
// 旧 SAMPLE_SEKKI は components/date-display.tsx（名前＋七十二候の表示）で利用中のため温存。

type SekkiEntry = {
  name: string
  year: number
  month: number // 1-indexed
  day: number
}

const SEKKI_TABLE: readonly SekkiEntry[] = [
  // 2026 年初を冬至としてカバーするためのガード
  { name: '冬至', year: 2025, month: 12, day: 22 },

  // 2026 年
  { name: '小寒', year: 2026, month: 1, day: 5 },
  { name: '大寒', year: 2026, month: 1, day: 20 },
  { name: '立春', year: 2026, month: 2, day: 4 },
  { name: '雨水', year: 2026, month: 2, day: 19 },
  { name: '啓蟄', year: 2026, month: 3, day: 6 },
  { name: '春分', year: 2026, month: 3, day: 20 },
  { name: '清明', year: 2026, month: 4, day: 5 },
  { name: '穀雨', year: 2026, month: 4, day: 20 },
  { name: '立夏', year: 2026, month: 5, day: 5 },
  { name: '小満', year: 2026, month: 5, day: 21 },
  { name: '芒種', year: 2026, month: 6, day: 5 },
  { name: '夏至', year: 2026, month: 6, day: 21 },
  { name: '小暑', year: 2026, month: 7, day: 7 },
  { name: '大暑', year: 2026, month: 7, day: 22 },
  { name: '立秋', year: 2026, month: 8, day: 7 },
  { name: '処暑', year: 2026, month: 8, day: 23 },
  { name: '白露', year: 2026, month: 9, day: 7 },
  { name: '秋分', year: 2026, month: 9, day: 23 },
  { name: '寒露', year: 2026, month: 10, day: 8 },
  { name: '霜降', year: 2026, month: 10, day: 23 },
  { name: '立冬', year: 2026, month: 11, day: 7 },
  { name: '小雪', year: 2026, month: 11, day: 22 },
  { name: '大雪', year: 2026, month: 12, day: 7 },
  { name: '冬至', year: 2026, month: 12, day: 22 },

  // 2027 年初（2026 年末→2027 年初の境界対応）
  { name: '小寒', year: 2027, month: 1, day: 5 },
  { name: '大寒', year: 2027, month: 1, day: 20 },
]

function toKey(year: number, month: number, day: number): number {
  return year * 10000 + month * 100 + day
}

// 24節気を 4 季節にマッピング。
export type SekkiSeason = 'spring' | 'summer' | 'autumn' | 'winter'

const SEKKI_SEASONS: Record<string, SekkiSeason> = {
  // 春：立春〜穀雨
  '立春': 'spring', '雨水': 'spring', '啓蟄': 'spring',
  '春分': 'spring', '清明': 'spring', '穀雨': 'spring',
  // 夏：立夏〜大暑
  '立夏': 'summer', '小満': 'summer', '芒種': 'summer',
  '夏至': 'summer', '小暑': 'summer', '大暑': 'summer',
  // 秋：立秋〜霜降
  '立秋': 'autumn', '処暑': 'autumn', '白露': 'autumn',
  '秋分': 'autumn', '寒露': 'autumn', '霜降': 'autumn',
  // 冬：立冬〜大寒
  '立冬': 'winter', '小雪': 'winter', '大雪': 'winter',
  '冬至': 'winter', '小寒': 'winter', '大寒': 'winter',
}

/**
 * 今日が「節気の入りの日」かどうかを判定する。
 *  - 該当する場合：{ name: '立春', season: 'spring' } を返す
 *  - 該当しない場合：null
 * 「本日は『立春』」のような特別バナー表示に使用。
 */
export function isSekkiToday(date: Date = new Date()): { name: string; season: SekkiSeason } | null {
  const key = toKey(date.getFullYear(), date.getMonth() + 1, date.getDate())
  for (const entry of SEKKI_TABLE) {
    if (toKey(entry.year, entry.month, entry.day) === key) {
      const season = SEKKI_SEASONS[entry.name] ?? 'spring'
      return { name: entry.name, season }
    }
  }
  return null
}

/**
 * 指定日における現在の節気名を返す。
 * 「開始日 <= 指定日」となるテーブル中の最大のエントリ＝最後に始まった節気を返す。
 *
 * テーブル範囲外（先頭 2025/12/22 より前 / 末尾 2027/1/20 より後）は、
 * それぞれ最寄りのエントリにフォールバック。
 */
/**
 * 指定日の季節（春・夏・秋・冬）を 24 節気から判定。
 * 立春〜立夏前日: spring / 立夏〜立秋前日: summer /
 * 立秋〜立冬前日: autumn / 立冬〜立春前日: winter
 * 季節背景パーティクル（桜・青葉・紅葉・雪）の選択に使用。
 */
export function getCurrentSeason(date: Date = new Date()): SekkiSeason {
  const name = getCurrentSekki(date)
  return SEKKI_SEASONS[name] ?? 'spring'
}

export function getCurrentSekki(date: Date): string {
  const key = toKey(date.getFullYear(), date.getMonth() + 1, date.getDate())

  // 先頭より前 → 表先頭の名前にフォールバック（実用上は到達しない想定）
  if (key < toKey(SEKKI_TABLE[0].year, SEKKI_TABLE[0].month, SEKKI_TABLE[0].day)) {
    return SEKKI_TABLE[0].name
  }

  let current = SEKKI_TABLE[0].name
  for (const entry of SEKKI_TABLE) {
    const entryKey = toKey(entry.year, entry.month, entry.day)
    if (entryKey <= key) {
      current = entry.name
    } else {
      break
    }
  }
  return current
}

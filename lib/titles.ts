// 称号システム。ストリーク・収録数・節気から称号を生成する。
//
// 倫理ガードレール：
//   - 称号は「誇り」「敬意」方向のみ。罪悪感・煽りを含む表現は禁止。
//   - 達成不能/プレッシャーになる表現は避ける（「あと N 日で X」は使うが「逃すと」「失う」は使わない）。
//   - 連続日数 = 0 や少ない場合も、温かい中立表現を返す。

import { isSekkiToday } from './sekki'

export interface Title {
  /** 漢字の称号（短く） */
  kanji: string
  /** ふりがな */
  reading: string
  /** 1行の説明（褒めるトーン、罪悪感ゼロ） */
  description: string
}

// ストリーク段階の閾値（日数）と対応称号
const STREAK_TITLES: ReadonlyArray<{ min: number; title: Title }> = [
  { min: 0,   title: { kanji: '初客',     reading: 'しょかく',     description: '今日からの旅人' } },
  { min: 3,   title: { kanji: '一見',     reading: 'いちげん',     description: '三日続けた札読み' } },
  { min: 7,   title: { kanji: '七日連客', reading: 'なぬかれんかく', description: '七日続けた札読み' } },
  { min: 14,  title: { kanji: '半月客',   reading: 'はんげつかく', description: '半月続けた札読み' } },
  { min: 30,  title: { kanji: '一月客',   reading: 'ひとつきかく', description: 'ひと月続けた札読み' } },
  { min: 49,  title: { kanji: '七候客',   reading: 'ななこうかく', description: '七候を渡った人' } },
  { min: 77,  title: { kanji: '常客',     reading: 'じょうきゃく', description: '常連の札読み' } },
  { min: 100, title: { kanji: '百日縁',   reading: 'ひゃくにちえん', description: '百日の縁を結んだ人' } },
  { min: 180, title: { kanji: '半年縁',   reading: 'はんねんえん', description: '半年の縁を結んだ人' } },
  { min: 365, title: { kanji: '一年縁',   reading: 'いちねんえん', description: '一年の縁を結んだ人' } },
  { min: 730, title: { kanji: '二年縁',   reading: 'にねんえん',   description: '二年の縁を結んだ人' } },
]

/** 連続日数からストリーク称号を引く。0 日も「初客」で歓迎する。 */
export function getStreakTitle(streakDays: number): Title {
  let best = STREAK_TITLES[0].title
  for (const entry of STREAK_TITLES) {
    if (streakDays >= entry.min) best = entry.title
  }
  return best
}

/** 次の称号までの日数（次の閾値 - 現在日数）。最終段階の場合は null。 */
export function getNextStreakStep(streakDays: number): { daysToNext: number; nextTitle: Title } | null {
  for (const entry of STREAK_TITLES) {
    if (entry.min > streakDays) {
      return { daysToNext: entry.min - streakDays, nextTitle: entry.title }
    }
  }
  return null
}

// 収録数の称号（コレクション）
const COLLECTION_TITLES: ReadonlyArray<{ min: number; title: Title }> = [
  { min: 0,  title: { kanji: '空棚',     reading: 'くうだな',   description: '札棚は静か' } },
  { min: 1,  title: { kanji: '初札',     reading: 'はつふだ',   description: '最初の一枚と出会った人' } },
  { min: 10, title: { kanji: '十札',     reading: 'じゅっさつ', description: '十枚の縁を集めた人' } },
  { min: 22, title: { kanji: '大札半',   reading: 'おおふだはん', description: '大アルカナを半ば集めた人' } },
  { min: 39, title: { kanji: '半棚',     reading: 'はんだな',   description: '半棚を埋めた人' } },
  { min: 56, title: { kanji: '七割札',   reading: 'しちわりふだ', description: '七割の札を集めた人' } },
  { min: 77, title: { kanji: '札守',     reading: 'ふだもり',   description: '七十七枚の札を守る人' } },
  { min: 78, title: { kanji: '満棚',     reading: 'まんだな',   description: '全札を集めきった人' } },
]

export function getCollectionTitle(collected: number): Title {
  let best = COLLECTION_TITLES[0].title
  for (const entry of COLLECTION_TITLES) {
    if (collected >= entry.min) best = entry.title
  }
  return best
}

/** 節気バナーが立つ日のみ返す「節気限定の今日称号」。 */
export function getSekkiTodayTitle(date: Date = new Date()): Title | null {
  const sekki = isSekkiToday(date)
  if (!sekki) return null
  return {
    kanji: `${sekki.name}の客`,
    reading: '今日だけの称号',
    description: `${sekki.name}に札を引いた人`,
  }
}

/** 数字を漢数字（旧字含む）に変換。1〜9999 まで対応。 */
export function toKanjiNumber(n: number): string {
  if (n < 0) return '零'
  if (n === 0) return '零'
  const digits = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const units = ['', '十', '百', '千']
  // 1〜9
  if (n < 10) return digits[n]
  // 10〜99
  if (n < 100) {
    const t = Math.floor(n / 10)
    const o = n % 10
    return (t === 1 ? '' : digits[t]) + '十' + (o === 0 ? '' : digits[o])
  }
  // 100〜999
  if (n < 1000) {
    const h = Math.floor(n / 100)
    const rest = n % 100
    return (h === 1 ? '' : digits[h]) + '百' + (rest === 0 ? '' : toKanjiNumber(rest))
  }
  // 1000〜9999
  if (n < 10000) {
    const k = Math.floor(n / 1000)
    const rest = n % 1000
    return (k === 1 ? '' : digits[k]) + '千' + (rest === 0 ? '' : toKanjiNumber(rest))
  }
  // それ以上は西暦表示
  return String(n)
}

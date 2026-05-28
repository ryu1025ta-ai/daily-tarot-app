// コレクション（図鑑）データ層。
// タロット占いの本質（重複 OK の抽選）を保ちつつ、別レイヤーで「初回発見」の記録を持つ。
// 履歴（wa-tarot-history）とは独立した永続化：「いつ初めてその札に出会ったか」を保存する。

import { TAROT_CARDS } from './tarot-data'
import { getCardRarity, type CardRarity } from './card-rarity'

const STORAGE_KEY = 'wa-no-koyomi:collection'

export type CollectionEntry = {
  firstDrawnAt: string // ISO 8601
}

export type CollectionData = {
  cards: Record<string, CollectionEntry>
}

export type CollectionStats = {
  total: number
  collected: number
  byRarity: Record<CardRarity, { collected: number; total: number }>
}

function readCollection(): CollectionData {
  if (typeof window === 'undefined') return { cards: {} }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { cards: {} }
    const parsed = JSON.parse(raw)
    if (
      parsed &&
      typeof parsed === 'object' &&
      parsed.cards &&
      typeof parsed.cards === 'object' &&
      !Array.isArray(parsed.cards)
    ) {
      return parsed as CollectionData
    }
  } catch {
    // 不正データは破棄
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }
  return { cards: {} }
}

function writeCollection(data: CollectionData): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // quota exceeded などは無視
  }
}

/**
 * カードを引いた事実を記録する。
 * 初めて引いた札なら true、既に図鑑に登録済みなら false を返す。
 * drawCard 直後に呼ぶ想定。
 */
export function markCardAsDrawn(cardId: string): boolean {
  const data = readCollection()
  if (data.cards[cardId]) return false
  data.cards[cardId] = { firstDrawnAt: new Date().toISOString() }
  writeCollection(data)
  return true
}

/** 全コレクションエントリ（cardId → 初回日時）を取得 */
export function getCollection(): Record<string, CollectionEntry> {
  return readCollection().cards
}

/** 指定カードが「未取得」かどうか */
export function isFirstTime(cardId: string): boolean {
  return !readCollection().cards[cardId]
}

/** 集計：全体・レア度別の取得状況 */
export function getStats(): CollectionStats {
  const cards = readCollection().cards
  const collected = Object.keys(cards).length

  // レア度別の総数を一度だけ集計
  const totals: Record<CardRarity, number> = { common: 0, rare: 0, epic: 0, legendary: 0 }
  TAROT_CARDS.forEach((c) => {
    totals[getCardRarity(c)]++
  })

  // レア度別の取得数
  const got: Record<CardRarity, number> = { common: 0, rare: 0, epic: 0, legendary: 0 }
  Object.keys(cards).forEach((id) => {
    const card = TAROT_CARDS.find((c) => c.id === id)
    if (card) got[getCardRarity(card)]++
  })

  return {
    total: TAROT_CARDS.length,
    collected,
    byRarity: {
      common:    { collected: got.common,    total: totals.common },
      rare:      { collected: got.rare,      total: totals.rare },
      epic:      { collected: got.epic,      total: totals.epic },
      legendary: { collected: got.legendary, total: totals.legendary },
    },
  }
}

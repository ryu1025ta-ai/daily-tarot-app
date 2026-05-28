// 開発時のみの「次の抽選を強制する」状態管理。
// ⚠ v1.0 公開時に呼び出し側ごと削除する想定（NEXT_PUBLIC_DEBUG_MODE=false で UI 非表示にも対応）。

import type { TarotCard } from './tarot-data'
import { TAROT_CARDS } from './tarot-data'
import { getCardRarity } from './card-rarity'

const STORAGE_KEY = 'wa-no-koyomi:dev-force-card'
export const DEV_FORCE_CHANGED_EVENT = 'wa-no-koyomi:dev-force-changed'

export type ForceMode =
  | { type: 'none' }
  | { type: 'legendary' }              // 次回 drawCard で Legendary 8枚から選ぶ
  | { type: 'specific'; cardId: string } // 次回必ずこの card.id を引く

// LocalStorage / 環境変数のセーフな読み出し
export function getForceMode(): ForceMode {
  if (typeof window === 'undefined') return { type: 'none' }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { type: 'none' }
    const parsed = JSON.parse(raw)
    if (parsed?.type === 'legendary') return { type: 'legendary' }
    if (parsed?.type === 'specific' && typeof parsed.cardId === 'string') {
      return { type: 'specific', cardId: parsed.cardId }
    }
  } catch {
    // 不正データなら破棄
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }
  return { type: 'none' }
}

export function setForceMode(mode: ForceMode): void {
  if (typeof window === 'undefined') return
  if (mode.type === 'none') {
    localStorage.removeItem(STORAGE_KEY)
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mode))
  }
  window.dispatchEvent(new CustomEvent(DEV_FORCE_CHANGED_EVENT))
}

export function clearForceMode(): void {
  setForceMode({ type: 'none' })
}

/**
 * drawCard から呼ばれる。強制設定があればそのカードを返し、なければ null。
 * Legendary 強制：8枚のうちランダム1枚。Specific 強制：完全に固定。
 */
export function applyForcePick(): TarotCard | null {
  const mode = getForceMode()
  if (mode.type === 'none') return null
  if (mode.type === 'legendary') {
    const pool = TAROT_CARDS.filter(c => getCardRarity(c) === 'legendary')
    if (pool.length === 0) return null
    return pool[Math.floor(Math.random() * pool.length)]
  }
  if (mode.type === 'specific') {
    return TAROT_CARDS.find(c => c.id === mode.cardId) ?? null
  }
  return null
}

// NEXT_PUBLIC_DEBUG_MODE: 未指定 or 'true' で有効、'false' で完全無効
export const DEBUG_MODE = process.env.NEXT_PUBLIC_DEBUG_MODE !== 'false'

// ---------------------------------------------------------------------------
// 連続抽選モード（同一日に何度でも引ける）。v1.0 公開時に削除。
// ---------------------------------------------------------------------------

const CONTINUOUS_DRAW_KEY = 'wa-no-koyomi:continuous-draw'
export const CONTINUOUS_DRAW_CHANGED_EVENT = 'wa-no-koyomi:continuous-draw-changed'

export function getContinuousDrawMode(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem(CONTINUOUS_DRAW_KEY) === 'true'
  } catch {
    return false
  }
}

export function setContinuousDrawMode(on: boolean): void {
  if (typeof window === 'undefined') return
  if (on) localStorage.setItem(CONTINUOUS_DRAW_KEY, 'true')
  else localStorage.removeItem(CONTINUOUS_DRAW_KEY)
  window.dispatchEvent(new CustomEvent(CONTINUOUS_DRAW_CHANGED_EVENT))
}

// ---------------------------------------------------------------------------
// 全カード表示モード（図鑑で 78 枚すべてのイラストを確認できる）。v1.0 公開時に削除。
// ---------------------------------------------------------------------------

const SHOW_ALL_CARDS_KEY = 'wa-no-koyomi:dev-show-all-cards'
export const SHOW_ALL_CARDS_CHANGED_EVENT = 'wa-no-koyomi:dev-show-all-cards-changed'

export function getShowAllCardsMode(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem(SHOW_ALL_CARDS_KEY) === 'true'
  } catch {
    return false
  }
}

export function setShowAllCardsMode(on: boolean): void {
  if (typeof window === 'undefined') return
  if (on) localStorage.setItem(SHOW_ALL_CARDS_KEY, 'true')
  else localStorage.removeItem(SHOW_ALL_CARDS_KEY)
  window.dispatchEvent(new CustomEvent(SHOW_ALL_CARDS_CHANGED_EVENT))
}

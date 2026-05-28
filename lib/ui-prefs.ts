// 一般ユーザー向けの UI 設定（演出のオン/オフ）。
// dev-tools.ts は開発専用フラグ、こちらは本番でも使う恒久設定。

const SEASONAL_KEY = 'wa-no-koyomi:seasonal-bg'
const SOCIAL_PROOF_KEY = 'wa-no-koyomi:social-proof'

export const SEASONAL_BG_CHANGED_EVENT = 'wa-no-koyomi:seasonal-bg-changed'
export const SOCIAL_PROOF_CHANGED_EVENT = 'wa-no-koyomi:social-proof-changed'

// 季節演出（パーティクル）：デフォルト ON
export function isSeasonalBgEnabled(): boolean {
  if (typeof window === 'undefined') return true
  try {
    const v = localStorage.getItem(SEASONAL_KEY)
    if (v === null) return true
    return v === 'true'
  } catch {
    return true
  }
}

export function setSeasonalBgEnabled(on: boolean): void {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(SEASONAL_KEY, on ? 'true' : 'false') } catch {}
  window.dispatchEvent(new CustomEvent(SEASONAL_BG_CHANGED_EVENT))
}

// 社会的証明（レンジ表現）：デフォルト ON だが、いつでも OFF にできる
export function isSocialProofEnabled(): boolean {
  if (typeof window === 'undefined') return true
  try {
    const v = localStorage.getItem(SOCIAL_PROOF_KEY)
    if (v === null) return true
    return v === 'true'
  } catch {
    return true
  }
}

export function setSocialProofEnabled(on: boolean): void {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(SOCIAL_PROOF_KEY, on ? 'true' : 'false') } catch {}
  window.dispatchEvent(new CustomEvent(SOCIAL_PROOF_CHANGED_EVENT))
}

// バイブレーションフィードバック。
// Navigator.vibrate を薄くラップし、ON/OFF を LocalStorage で永続化する。
// iOS Safari は vibrate を未サポートのため try/catch で silent fail。
// 通常ユーザーには見えない（プラットフォーム依存）。

const STORAGE_KEY = 'wa-no-koyomi:haptic-enabled'
export const HAPTIC_CHANGED_EVENT = 'wa-no-koyomi:haptic-changed'

/** API レベルでサポートされているかどうか */
export function isHapticSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof navigator !== 'undefined' &&
    typeof navigator.vibrate === 'function'
  )
}

/** ユーザー設定で振動が有効か（デフォルト ON） */
export function isHapticEnabled(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem(STORAGE_KEY) !== 'false'
  } catch {
    return false
  }
}

export function setHapticEnabled(on: boolean): void {
  if (typeof window === 'undefined') return
  try {
    if (on) localStorage.removeItem(STORAGE_KEY)        // デフォルト ON：キー削除で復元
    else localStorage.setItem(STORAGE_KEY, 'false')
    window.dispatchEvent(new CustomEvent(HAPTIC_CHANGED_EVENT))
  } catch {}
}

/** 共通の発火ヘルパー（無効・非サポート時は無音失敗） */
function fire(pattern: number | number[]): void {
  if (!isHapticEnabled() || !isSupported()) return
  try {
    navigator.vibrate(pattern)
  } catch {
    // iOS Safari 等は例外を投げないが念のため
  }
}
function isSupported(): boolean {
  return isHapticSupported()
}

/** タップ：単発の軽い振動（10ms） */
export function hapticTap(): void {
  fire(10)
}

/** フリップ：「カチッ」感のある二段振動 */
export function hapticFlip(): void {
  fire([20, 30, 20])
}

/** Legendary 開示：強めの 3 連続振動（極めて稀なる札に到達した感覚） */
export function hapticLegendary(): void {
  fire([40, 60, 30, 60, 80])
}

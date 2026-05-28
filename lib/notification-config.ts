// 通知関連の共有定数。
// hooks/use-daily-reminder.ts と components/screens/settings-screen.tsx が同じキー / イベント名を
// 参照するために切り出している。Step 3 で Service Worker 導入時もここを起点に再利用する。

export const NOTIFICATION_TIME_STORAGE_KEY = 'wa-no-koyomi:notificationTime'
export const NOTIFICATION_TIME_CHANGED_EVENT = 'wa-no-koyomi:notificationTime-changed'
export const DEFAULT_NOTIFICATION_TIME = '07:00'

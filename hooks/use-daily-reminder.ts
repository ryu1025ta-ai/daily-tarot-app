'use client'

import { useEffect, useRef } from 'react'
import { useTarot } from '@/lib/tarot-context'
import { getCurrentSekki } from '@/lib/sekki'
import {
  NOTIFICATION_TIME_STORAGE_KEY,
  NOTIFICATION_TIME_CHANGED_EVENT,
  DEFAULT_NOTIFICATION_TIME,
} from '@/lib/notification-config'

// アプリ起動中（フォアグラウンド）に、毎日の指定時刻でブラウザ通知を発火させるフック。
// バックグラウンド配信は Step 3 で Service Worker + Push API を用いて別途実装する想定。
//
// 設計上の選択：
// - hasDrawnToday は ref 経由で参照することで、抽選後の state 変化で useEffect 全体を再実行させず、
//   スケジュールをリセットしない（既存タイマーの正確性を維持）
// - 設定画面で時刻が変わった時は CustomEvent を介して再スケジュールする
// - 既に今日のカードを引き終えている場合は、催促を不要と判断して通知をスキップする

// 設定時刻が「ほんの少し過去」になっていても、ユーザーが直前に設定した直後の
// 秒単位の遅延を吸収して当日中に通知させるためのグレース期間。
const GRACE_WINDOW_MS = 5 * 60 * 1000

function getNextOccurrence(time: string): Date | null {
  const match = time.match(/^(\d{1,2}):(\d{2})$/)
  if (!match) return null
  const hour = parseInt(match[1], 10)
  const minute = parseInt(match[2], 10)
  if (hour > 23 || minute > 59) return null

  const now = Date.now()
  const target = new Date()
  target.setHours(hour, minute, 0, 0)
  const diff = target.getTime() - now

  if (diff > 0) {
    // 未来 → そのまま今日扱い
    return target
  }
  if (diff >= -GRACE_WINDOW_MS) {
    // 5分以内の過去 → 直後（1秒後）に発火させて、保存タイミングの遅延ぶんを救済
    return new Date(now + 1000)
  }
  // 5分以上前 → 翌日へ
  target.setDate(target.getDate() + 1)
  return target
}

// 毎日の催促通知を発火。タイトルは現在の節気を反映（例「立夏のひと枚」「小満のひと枚」）。
// テスト通知側でも再利用するため export。tag は呼び出し側で差し替え可能。
export function fireDailyNotification(options?: { tag?: string }) {
  if (typeof window === 'undefined') return
  if (!('Notification' in window)) return
  if (Notification.permission !== 'granted') return

  const sekki = getCurrentSekki(new Date())
  // tag を指定することで、過去の同一通知があれば置き換えられる（OS レベルで重複表示しない）
  new Notification(`${sekki}のひと枚`, {
    body: '今日の運命を、紙に問いましょう。',
    icon: '/apple-icon.png',
    tag: options?.tag ?? 'wa-no-koyomi-daily',
  })
}

export function useDailyReminder() {
  const { hasDrawnToday } = useTarot()
  const hasDrawnTodayRef = useRef(hasDrawnToday)

  // 最新の hasDrawnToday を ref に転記しておく（タイマー発火時に参照する用）
  useEffect(() => {
    hasDrawnTodayRef.current = hasDrawnToday
  }, [hasDrawnToday])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!('Notification' in window)) return

    let timeoutId: number | null = null

    const schedule = () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId)
        timeoutId = null
      }

      const stored = localStorage.getItem(NOTIFICATION_TIME_STORAGE_KEY) ?? DEFAULT_NOTIFICATION_TIME
      const next = getNextOccurrence(stored)
      if (!next) return

      const delay = next.getTime() - Date.now()
      timeoutId = window.setTimeout(() => {
        // 発火直前に最新状態をチェック：既に今日引いていれば通知不要
        if (!hasDrawnTodayRef.current) {
          fireDailyNotification()
        }
        // 翌日分を再スケジュール
        schedule()
      }, delay)
    }

    schedule()

    // 設定画面で時刻が変わったら即座に再スケジュール
    const onTimeChanged: EventListener = () => schedule()
    window.addEventListener(NOTIFICATION_TIME_CHANGED_EVENT, onTimeChanged)

    return () => {
      if (timeoutId !== null) window.clearTimeout(timeoutId)
      window.removeEventListener(NOTIFICATION_TIME_CHANGED_EVENT, onTimeChanged)
    }
  }, [])
}

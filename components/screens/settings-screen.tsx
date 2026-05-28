'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from '@/lib/theme-context'
import { MODE_LABELS, type ThemeMode } from '@/lib/time-theme'
import { useDebug } from '@/lib/debug-context'
import { useTarot } from '@/lib/tarot-context'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  NOTIFICATION_TIME_STORAGE_KEY,
  NOTIFICATION_TIME_CHANGED_EVENT,
  DEFAULT_NOTIFICATION_TIME,
} from '@/lib/notification-config'
import { fireDailyNotification } from '@/hooks/use-daily-reminder'
import {
  isHapticEnabled,
  setHapticEnabled,
  isHapticSupported,
  HAPTIC_CHANGED_EVENT,
} from '@/lib/haptic'
import { TAROT_CARDS } from '@/lib/tarot-data'
import { getCardRarity, getRarityLabel } from '@/lib/card-rarity'
import {
  DEBUG_MODE,
  DEV_FORCE_CHANGED_EVENT,
  CONTINUOUS_DRAW_CHANGED_EVENT,
  SHOW_ALL_CARDS_CHANGED_EVENT,
  getForceMode,
  setForceMode,
  clearForceMode,
  getContinuousDrawMode,
  setContinuousDrawMode,
  getShowAllCardsMode,
  setShowAllCardsMode,
  type ForceMode,
} from '@/lib/dev-tools'
import {
  isSeasonalBgEnabled,
  setSeasonalBgEnabled,
  isSocialProofEnabled,
  setSocialProofEnabled,
  SEASONAL_BG_CHANGED_EVENT,
  SOCIAL_PROOF_CHANGED_EVENT,
} from '@/lib/ui-prefs'
import { getStreak } from '@/lib/streak'
import { getStats } from '@/lib/collection'
import { getStreakTitle, getCollectionTitle } from '@/lib/titles'

// Notification.permission の値に "unsupported"（非対応ブラウザ）を加えた拡張型
type PermissionState = NotificationPermission | 'unsupported'

// hook の getNextOccurrence と同じ閾値。「直後発火」扱いになる過去側の許容幅。
const GRACE_WINDOW_MS = 5 * 60 * 1000

export function SettingsScreen() {
  const { effectiveTheme, mode, setMode } = useTheme()
  const { setDebugInfo } = useDebug()
  const { hasDrawnToday } = useTarot()
  // 初期値は SSR/ハイドレーション一致のため固定。useEffect で localStorage の値に上書き。
  const [notificationTime, setNotificationTime] = useState(DEFAULT_NOTIFICATION_TIME)
  const [permission, setPermission] = useState<PermissionState>('default')
  const [testNotificationSent, setTestNotificationSent] = useState(false)
  // ⚠ DEV：開発ツールで設定中の強制カードモード（v1.0 公開時に削除予定）
  const [forceMode, setForceModeState] = useState<ForceMode>({ type: 'none' })
  // ⚠ DEV：連続抽選モード（同日内で何度でも引ける）
  const [continuousMode, setContinuousModeState] = useState(false)
  // ⚠ DEV：図鑑で 78 枚すべてのカードイラストを見られるモード
  const [showAllCards, setShowAllCardsState] = useState(false)
  // 振動 (haptic) 設定
  const [hapticEnabled, setHapticEnabledState] = useState(true)
  const hapticSupported = isHapticSupported()
  // 演出設定（季節背景・社会的証明）
  const [seasonalBg, setSeasonalBg] = useState(true)
  const [socialProof, setSocialProof] = useState(true)
  // プロフィール用：ストリーク・収録数（プロフィール表示のため）
  const [streakDays, setStreakDays] = useState(0)
  const [collected, setCollected] = useState(0)
  const [collectedTotal, setCollectedTotal] = useState(78)
  // 「次の通知」表示を 1 分単位で再評価するためのティックカウンタ
  const [minuteTick, setMinuteTick] = useState(0)
  // テスト通知の「✓ 送信しました」表示を 2 秒で戻すタイマー
  const testTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    setDebugInfo({ theme: effectiveTheme })
  }, [effectiveTheme, setDebugInfo])

  // 1 分ごとに minuteTick を更新（時刻の経過で「今日/明日」「グレース範囲内/外」が変わる）
  useEffect(() => {
    if (typeof window === 'undefined') return
    const id = window.setInterval(() => setMinuteTick(t => t + 1), 60_000)
    return () => window.clearInterval(id)
  }, [])

  // unmount 時にテストタイマーを cleanup
  useEffect(() => {
    return () => {
      if (testTimeoutRef.current !== null) {
        window.clearTimeout(testTimeoutRef.current)
      }
    }
  }, [])

  // 「次の通知」の表示用情報を計算（useDailyReminder の getNextOccurrence と同じ判定ロジックに、
  // hasDrawnToday=true なら強制的に翌日扱い、を上乗せ）
  const nextNotification = useMemo(() => {
    if (permission !== 'granted') return null
    const match = notificationTime.match(/^(\d{1,2}):(\d{2})$/)
    if (!match) return null
    const hour = parseInt(match[1], 10)
    const minute = parseInt(match[2], 10)
    if (hour > 23 || minute > 59) return null

    const target = new Date()
    target.setHours(hour, minute, 0, 0)
    const diff = target.getTime() - Date.now()

    let isToday: boolean
    if (hasDrawnToday) {
      // 今日のカードを引いた後 → 催促は明日へ持ち越し
      isToday = false
    } else if (diff > 0) {
      isToday = true
    } else if (diff >= -GRACE_WINDOW_MS) {
      // 5分以内の過去 → 直後に発火扱い（=今日）
      isToday = true
    } else {
      isToday = false
    }

    const formatted = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
    return { isToday, time: formatted }
    // minuteTick を deps に入れて 1 分ごとに再評価
  }, [permission, hasDrawnToday, notificationTime, minuteTick])

  // 初回マウントで localStorage 復元 + Notification 許可状態の取得
  useEffect(() => {
    if (typeof window === 'undefined') return

    // 通知時刻の復元
    const stored = localStorage.getItem(NOTIFICATION_TIME_STORAGE_KEY)
    if (stored && /^\d{1,2}:\d{2}$/.test(stored)) {
      setNotificationTime(stored)
    }

    // 通知 API の対応 + 現在の許可状態
    if (!('Notification' in window)) {
      setPermission('unsupported')
    } else {
      setPermission(Notification.permission)
    }

    // ⚠ DEV：強制抽選モード・連続抽選モード・全カード表示モードを復元
    setForceModeState(getForceMode())
    setContinuousModeState(getContinuousDrawMode())
    setShowAllCardsState(getShowAllCardsMode())
    // 振動設定を復元
    setHapticEnabledState(isHapticEnabled())
    // 演出設定を復元
    setSeasonalBg(isSeasonalBgEnabled())
    setSocialProof(isSocialProofEnabled())
    // プロフィール用データ
    const s = getStreak()
    setStreakDays(s.currentStreak)
    const stats = getStats()
    setCollected(stats.collected)
    setCollectedTotal(stats.total)
  }, [])

  // 他コンポーネントからの設定変更にも追従
  useEffect(() => {
    if (typeof window === 'undefined') return
    const onForce: EventListener = () => setForceModeState(getForceMode())
    const onContinuous: EventListener = () => setContinuousModeState(getContinuousDrawMode())
    const onShowAll: EventListener = () => setShowAllCardsState(getShowAllCardsMode())
    const onHaptic: EventListener = () => setHapticEnabledState(isHapticEnabled())
    const onSeasonal: EventListener = () => setSeasonalBg(isSeasonalBgEnabled())
    const onSocial: EventListener = () => setSocialProof(isSocialProofEnabled())
    window.addEventListener(DEV_FORCE_CHANGED_EVENT, onForce)
    window.addEventListener(CONTINUOUS_DRAW_CHANGED_EVENT, onContinuous)
    window.addEventListener(SHOW_ALL_CARDS_CHANGED_EVENT, onShowAll)
    window.addEventListener(HAPTIC_CHANGED_EVENT, onHaptic)
    window.addEventListener(SEASONAL_BG_CHANGED_EVENT, onSeasonal)
    window.addEventListener(SOCIAL_PROOF_CHANGED_EVENT, onSocial)
    return () => {
      window.removeEventListener(DEV_FORCE_CHANGED_EVENT, onForce)
      window.removeEventListener(CONTINUOUS_DRAW_CHANGED_EVENT, onContinuous)
      window.removeEventListener(SHOW_ALL_CARDS_CHANGED_EVENT, onShowAll)
      window.removeEventListener(HAPTIC_CHANGED_EVENT, onHaptic)
      window.removeEventListener(SEASONAL_BG_CHANGED_EVENT, onSeasonal)
      window.removeEventListener(SOCIAL_PROOF_CHANGED_EVENT, onSocial)
    }
  }, [])

  const handleNotificationTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNotificationTime(value)
    if (typeof window === 'undefined') return
    localStorage.setItem(NOTIFICATION_TIME_STORAGE_KEY, value)
    // useDailyReminder（app/page.tsx で常駐）にスケジュール再計算を通知
    window.dispatchEvent(new CustomEvent(NOTIFICATION_TIME_CHANGED_EVENT))
  }

  const handleRequestPermission = async () => {
    if (typeof window === 'undefined') return
    if (!('Notification' in window)) return
    try {
      const result = await Notification.requestPermission()
      setPermission(result)
    } catch {
      // 古いブラウザは callback ベース：実用上ほぼないので無視
    }
  }

  // テスト通知：本番と同一の節気連動ロジック（fireDailyNotification）を再利用。
  // hasDrawnToday は意図的に無視（動作確認用途のため）。tag を test 用に差し替えて本番通知と分離。
  const handleTestNotification = () => {
    fireDailyNotification({ tag: 'wa-no-koyomi-test' })

    setTestNotificationSent(true)
    if (testTimeoutRef.current !== null) {
      window.clearTimeout(testTimeoutRef.current)
    }
    testTimeoutRef.current = window.setTimeout(() => {
      setTestNotificationSent(false)
      testTimeoutRef.current = null
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col washi-texture pb-20">
      {/* Top spacing */}
      <div className="h-12" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-6 pb-8"
      >
        <h1 className="font-serif text-xl tracking-[0.2em] text-foreground text-center">
          設定
        </h1>
      </motion.div>

      {/* Settings list */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="px-6 space-y-6"
      >
        {/* プロフィール（行動経済学：役割期待・投資効果）
            称号・ストリーク・収録数を一望。罪悪感ゼロ、温かい表記のみ */}
        <ProfileCard
          streakDays={streakDays}
          collected={collected}
          collectedTotal={collectedTotal}
        />

        {/* Notification time + permission */}
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-foreground text-sm">
                お知らせ時間
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                毎日のカードを引く時間
              </p>
            </div>
            <input
              type="time"
              value={notificationTime}
              onChange={handleNotificationTimeChange}
              className="bg-secondary border border-border rounded px-3 py-1.5 text-sm text-foreground"
            />
          </div>

          {/* 通知許可状態：時刻入力欄の下に控えめに配置 */}
          <div className="mt-4 pt-4 border-t border-border/40">
            {permission === 'granted' ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <svg
                    className="text-emerald-700/80 dark:text-emerald-400/80 pointer-events-none"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span className="text-xs tracking-[0.15em] text-emerald-700/80 dark:text-emerald-400/80">
                    通知が許可されています
                  </span>
                </div>

                {/* 次の通知予定：墨色・控えめに表示。1分ごとに再評価される */}
                {nextNotification && (
                  <p className="text-[11px] text-foreground/55 tracking-[0.12em] font-light pl-5">
                    次の通知：{nextNotification.isToday ? '今日' : '明日'} {nextNotification.time}
                  </p>
                )}

                {/* テスト通知ボタン：朱印的アクセントの細い枠線、墨色文字 */}
                <button
                  type="button"
                  onClick={handleTestNotification}
                  disabled={testNotificationSent}
                  className="w-full py-2.5 rounded-lg border border-primary/20 text-xs tracking-[0.2em] font-light text-foreground/75 hover:bg-secondary/30 hover:border-primary/40 transition-all duration-300 cursor-pointer touch-manipulation disabled:cursor-default disabled:hover:bg-transparent disabled:hover:border-primary/20"
                >
                  {testNotificationSent ? '✓ 送信しました' : 'テスト通知を送信'}
                </button>
              </div>
            ) : permission === 'denied' ? (
              <p className="text-xs text-destructive/80 tracking-[0.1em] leading-relaxed">
                通知がブロックされています。
                <br />
                ブラウザの設定から有効にしてください
              </p>
            ) : permission === 'unsupported' ? (
              <p className="text-xs text-muted-foreground/70 tracking-[0.1em]">
                このブラウザは通知に対応していません
              </p>
            ) : (
              <button
                type="button"
                onClick={handleRequestPermission}
                className="w-full py-3 rounded-lg border border-border text-sm font-light tracking-[0.15em] text-foreground hover:bg-secondary/50 hover:border-primary/30 transition-all duration-300 cursor-pointer touch-manipulation"
              >
                通知を許可する
              </button>
            )}
          </div>
        </div>

        {/* Theme mode：自動 + 5段階固定 */}
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-baseline justify-between mb-3">
            <h3 className="font-medium text-foreground text-sm">テーマ</h3>
            {mode === 'auto' && (
              <span className="text-[10px] text-muted-foreground tracking-[0.2em]">
                いま：{MODE_LABELS[effectiveTheme].jp}
              </span>
            )}
          </div>
          {/* 自動行 */}
          <button
            type="button"
            onClick={() => setMode('auto')}
            className={`w-full py-2.5 rounded-lg border text-sm transition-all duration-300 mb-2 ${
              mode === 'auto'
                ? 'bg-secondary border-primary/30 text-foreground'
                : 'bg-transparent border-border text-muted-foreground hover:border-foreground/20'
            }`}
          >
            <span className="block font-serif">自動</span>
            <span className="block text-[10px] mt-0.5 opacity-60 tracking-[0.15em]">
              時間帯に追随
            </span>
          </button>
          {/* 5段階固定の grid */}
          <div className="grid grid-cols-5 gap-1.5">
            {(['dawn', 'day', 'dusk', 'evening', 'night'] as const).map((t) => {
              const active = mode === t
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setMode(t as ThemeMode)}
                  className={`py-2 rounded-md border text-[11px] tracking-[0.1em] transition-all duration-300 ${
                    active
                      ? 'bg-secondary border-primary/30 text-foreground'
                      : 'bg-transparent border-border text-muted-foreground hover:border-foreground/20'
                  }`}
                >
                  <span className="block font-serif">{MODE_LABELS[t].jp}</span>
                  <span className="block text-[9px] mt-0.5 opacity-60">{MODE_LABELS[t].sub}</span>
                </button>
              )
            })}
          </div>
          <p className="text-[10px] text-muted-foreground/70 mt-3 leading-relaxed">
            自動：時間帯（暁・昼・黄昏・宵・深夜）で背景がゆっくり変わります
          </p>
        </div>

        {/* 季節の演出（パーティクル：桜・青葉・紅葉・雪） */}
        <div className="bg-card rounded-lg border border-border p-4">
          <label className="flex items-center justify-between gap-3 cursor-pointer touch-manipulation">
            <div className="flex-1">
              <h3 className="font-medium text-foreground text-sm">季節の演出</h3>
              <p className="text-xs text-muted-foreground mt-1">
                節気に合わせて背景に花弁・葉・雪が舞います
              </p>
            </div>
            <input
              type="checkbox"
              checked={seasonalBg}
              onChange={(e) => setSeasonalBgEnabled(e.target.checked)}
              className="w-5 h-5 cursor-pointer touch-manipulation accent-primary"
            />
          </label>
        </div>

        {/* 社会的証明の表示（レンジ表現のみ・OFF 可） */}
        <div className="bg-card rounded-lg border border-border p-4">
          <label className="flex items-center justify-between gap-3 cursor-pointer touch-manipulation">
            <div className="flex-1">
              <h3 className="font-medium text-foreground text-sm">他の人の気配</h3>
              <p className="text-xs text-muted-foreground mt-1">
                ホームに「今、数百人が…」のような穏やかな一文を出します
              </p>
            </div>
            <input
              type="checkbox"
              checked={socialProof}
              onChange={(e) => setSocialProofEnabled(e.target.checked)}
              className="w-5 h-5 cursor-pointer touch-manipulation accent-primary"
            />
          </label>
        </div>

        {/* 振動を使う（haptic） */}
        <div className="bg-card rounded-lg border border-border p-4">
          <label className="flex items-center justify-between gap-3 cursor-pointer touch-manipulation">
            <div className="flex-1">
              <h3 className="font-medium text-foreground text-sm">振動を使う</h3>
              <p className="text-xs text-muted-foreground mt-1">
                カードを引く時に端末がそっと反応します
                {!hapticSupported && (
                  <span className="block mt-1 text-[10px] text-muted-foreground/70">
                    ※ お使いの端末は振動に対応していない可能性があります
                  </span>
                )}
              </p>
            </div>
            <input
              type="checkbox"
              checked={hapticEnabled}
              onChange={(e) => setHapticEnabled(e.target.checked)}
              disabled={!hapticSupported}
              className="w-5 h-5 cursor-pointer touch-manipulation accent-primary disabled:opacity-40 disabled:cursor-not-allowed"
            />
          </label>
        </div>

        {/* Divider */}
        <div className="h-px bg-border my-4" />

        {/* Legal links */}
        <div className="space-y-2">
          <Link
            href="/terms"
            className="block py-3 px-4 bg-card rounded-lg border border-border text-sm text-foreground hover:bg-secondary/50 transition-colors cursor-pointer touch-manipulation"
          >
            利用規約
          </Link>
          <Link
            href="/privacy"
            className="block py-3 px-4 bg-card rounded-lg border border-border text-sm text-foreground hover:bg-secondary/50 transition-colors cursor-pointer touch-manipulation"
          >
            プライバシーポリシー
          </Link>
        </div>

        {/* ⚠ 開発者ツール（NEXT_PUBLIC_DEBUG_MODE=false で非表示、v1.0 公開時に削除） */}
        {DEBUG_MODE && (
          <div className="mt-4 rounded-lg border border-destructive/40 bg-destructive/5 p-4 space-y-3">
            <div>
              <h3 className="text-sm font-medium text-destructive">⚠️ 開発者ツール</h3>
              <p className="text-[10px] text-muted-foreground tracking-wider mt-1">
                公開時には削除予定
              </p>
            </div>

            {/* 現在の強制状態 */}
            <div className="text-[11px] text-muted-foreground/80 bg-card/60 rounded px-3 py-2 border border-border">
              現在：
              {forceMode.type === 'none' && '通常抽選'}
              {forceMode.type === 'legendary' && 'Legendary 8枚から強制'}
              {forceMode.type === 'specific' &&
                `固定 → ${TAROT_CARDS.find(c => c.id === forceMode.cardId)?.name ?? '不明'}`}
            </div>

            {/* Legendary 強制 */}
            <button
              type="button"
              onClick={() => setForceMode({ type: 'legendary' })}
              className="w-full py-2.5 rounded-lg border border-destructive/40 text-xs tracking-[0.15em] text-foreground/80 hover:bg-destructive/10 transition-colors cursor-pointer touch-manipulation"
            >
              Legendary 強制抽選
            </button>

            {/* 特定カード指定 */}
            <select
              value={forceMode.type === 'specific' ? forceMode.cardId : ''}
              onChange={(e) => {
                const v = e.target.value
                if (v) setForceMode({ type: 'specific', cardId: v })
              }}
              className="w-full bg-secondary border border-border rounded px-3 py-2 text-xs text-foreground"
            >
              <option value="">— 特定カードを指定 —</option>
              {(['legendary', 'epic', 'rare', 'common'] as const).map((r) => (
                <optgroup key={r} label={`${getRarityLabel(r)}（${r}）`}>
                  {TAROT_CARDS.filter((c) => getCardRarity(c) === r).map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}（{c.id}）
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>

            {/* リセット */}
            <button
              type="button"
              onClick={() => clearForceMode()}
              className="w-full py-2 rounded-lg border border-border text-xs tracking-[0.15em] text-muted-foreground hover:bg-secondary/50 transition-colors cursor-pointer touch-manipulation"
            >
              強制設定リセット
            </button>

            <p className="text-[10px] text-muted-foreground/70 leading-relaxed">
              ※ 既に今日のカードを引いている場合は明日の抽選から反映されます。
              下の連続抽選モードを ON にすると即時テスト可能です。
            </p>

            {/* 連続抽選モードトグル */}
            <label className="mt-3 flex items-start justify-between gap-3 cursor-pointer touch-manipulation">
              <div className="flex-1">
                <span className="text-xs text-foreground/85">連続抽選モード</span>
                <p className="text-[10px] text-muted-foreground/70 mt-1 leading-relaxed">
                  ON にすると同日内で何度でもカードを引けます
                  <br />
                  （履歴は最後のものに上書き）
                </p>
              </div>
              <input
                type="checkbox"
                checked={continuousMode}
                onChange={(e) => setContinuousDrawMode(e.target.checked)}
                className="mt-1 w-4 h-4 cursor-pointer touch-manipulation accent-destructive"
              />
            </label>

            {/* 全カード表示モードトグル */}
            <label className="mt-3 flex items-start justify-between gap-3 cursor-pointer touch-manipulation">
              <div className="flex-1">
                <span className="text-xs text-foreground/85">全カード表示モード（開発用）</span>
                <p className="text-[10px] text-muted-foreground/70 mt-1 leading-relaxed">
                  ON にすると図鑑で全 78 枚のカードイラストが見られます
                </p>
              </div>
              <input
                type="checkbox"
                checked={showAllCards}
                onChange={(e) => setShowAllCardsMode(e.target.checked)}
                className="mt-1 w-4 h-4 cursor-pointer touch-manipulation accent-destructive"
              />
            </label>
          </div>
        )}

        {/* App info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="pt-8 pb-4 text-center"
        >
          <p className="font-serif text-foreground/40 text-sm tracking-widest">
            和の暦
          </p>
          <p className="text-xs text-muted-foreground/50 mt-2">
            バージョン 1.0.0
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

// プロフィールカード：行動経済学の「役割期待」「投資効果」を反映。
// 称号は事実ベース（連続日数・収録枚数）、煽り・罪悪感ゼロ。
function ProfileCard({
  streakDays,
  collected,
  collectedTotal,
}: {
  streakDays: number
  collected: number
  collectedTotal: number
}) {
  const streakTitle = getStreakTitle(streakDays)
  const collectionTitle = getCollectionTitle(collected)
  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <h3 className="text-[11px] tracking-[0.3em] text-muted-foreground/70 font-light mb-3">
        あなたの札
      </h3>
      <div className="flex items-center gap-4">
        {/* 朱の家紋風アイコン（プロフィール写真の代わり） */}
        <div className="w-14 h-14 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center flex-shrink-0">
          <span className="font-serif text-xl text-primary/85">
            {streakTitle.kanji.charAt(0)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          {/* 称号（連続日数） */}
          <p className="font-serif text-base text-foreground/90 tracking-[0.1em] truncate">
            {streakTitle.kanji}
          </p>
          <p className="text-[10px] text-muted-foreground/70 tracking-[0.15em] truncate">
            {streakTitle.description}
          </p>
          <div className="flex items-baseline gap-3 mt-2">
            <span className="text-xs text-foreground/75">
              連続
              <span
                className="ml-1 text-foreground/90"
                style={{ fontFamily: 'var(--font-serif), serif', fontVariantNumeric: 'lining-nums tabular-nums' }}
              >
                {streakDays}
              </span>
              <span className="ml-0.5 text-[10px] text-muted-foreground">日</span>
            </span>
            <span className="text-xs text-foreground/75">
              収録
              <span
                className="ml-1 text-foreground/90"
                style={{ fontFamily: 'var(--font-serif), serif', fontVariantNumeric: 'lining-nums tabular-nums' }}
              >
                {collected}
              </span>
              <span className="ml-0.5 text-[10px] text-muted-foreground">/ {collectedTotal}</span>
            </span>
          </div>
          {/* 収録称号（小） */}
          <p className="text-[10px] text-muted-foreground/60 tracking-[0.15em] mt-1.5 truncate">
            棚は『{collectionTitle.kanji}』── {collectionTitle.description}
          </p>
        </div>
      </div>
    </div>
  )
}

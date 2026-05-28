'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider } from '@/lib/theme-context'
import { TarotProvider } from '@/lib/tarot-context'
import { DebugProvider } from '@/lib/debug-context'
import { DebugOverlay } from '@/components/debug-overlay'
import { BottomNav } from '@/components/bottom-nav'
import { HomeScreen } from '@/components/screens/home-screen'
import { CalendarScreen } from '@/components/screens/calendar-screen'
import { CollectionScreen } from '@/components/screens/collection-screen'
import { SettingsScreen } from '@/components/screens/settings-screen'
import { useDailyReminder } from '@/hooks/use-daily-reminder'
import { SeasonalBackground } from '@/components/seasonal-background'

type TabId = 'today' | 'calendar' | 'collection' | 'settings'

const ACTIVE_TAB_STORAGE_KEY = 'wa-no-koyomi:activeTab'

function isValidTabId(value: string | null): value is TabId {
  return (
    value === 'today' ||
    value === 'calendar' ||
    value === 'collection' ||
    value === 'settings'
  )
}

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabId>('today')

  // /privacy /terms から router.back() で戻ってきた時に直前のタブへ復帰させる。
  // 初期 state は SSR/ハイドレーション一致のため 'today' 固定。
  // マウント直後に sessionStorage を読みに行く。
  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = sessionStorage.getItem(ACTIVE_TAB_STORAGE_KEY)
    if (isValidTabId(stored)) {
      setActiveTab(stored)
    }
  }, [])

  // フォアグラウンドの毎日リマインダー（指定時刻に Notification API で通知）
  useDailyReminder()

  const screenVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  }

  return (
    <div className="min-h-screen bg-background">
      <DebugOverlay />

      {/* 季節背景は全タブ共通でレイヤ。固定配置・pointer-events なし・最背面。 */}
      <SeasonalBackground />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          {activeTab === 'today' && <HomeScreen />}
          {activeTab === 'calendar' && <CalendarScreen />}
          {activeTab === 'collection' && <CollectionScreen />}
          {activeTab === 'settings' && <SettingsScreen />}
        </motion.div>
      </AnimatePresence>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export default function TarotApp() {
  return (
    <ThemeProvider>
      <TarotProvider>
        <DebugProvider>
          <AppContent />
        </DebugProvider>
      </TarotProvider>
    </ThemeProvider>
  )
}

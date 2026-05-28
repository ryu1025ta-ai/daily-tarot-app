'use client'

import { motion } from 'framer-motion'

type TabId = 'today' | 'calendar' | 'collection' | 'settings'

// /privacy /terms 等の別ページから router.back() で / に戻った際にも
// 直前のタブを復元できるよう sessionStorage に保存する。
// localStorage ではなく sessionStorage：タブを閉じたらリセットされるのが正しい挙動。
const ACTIVE_TAB_STORAGE_KEY = 'wa-no-koyomi:activeTab'

interface BottomNavProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    {
      id: 'today',
      label: '今日',
      icon: (
        <svg className="pointer-events-none" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Simplified torii gate icon */}
          <path d="M4 6h16M6 6v14M18 6v14M3 4h18M3 8h18" />
        </svg>
      ),
    },
    {
      id: 'calendar',
      label: '暦',
      icon: (
        <svg className="pointer-events-none" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Simplified moon/calendar icon */}
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l3 2" />
        </svg>
      ),
    },
    {
      id: 'collection',
      label: '図鑑',
      icon: (
        <svg className="pointer-events-none" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          {/* 開いた巻物（書物）のシルエット */}
          <path d="M4 5 L4 19 L12 17 L20 19 L20 5 L12 7 Z" />
          <line x1="12" y1="7" x2="12" y2="17" />
        </svg>
      ),
    },
    {
      id: 'settings',
      label: '設定',
      icon: (
        <svg className="pointer-events-none" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Simplified settings icon */}
          <circle cx="12" cy="12" r="3" />
          <path d="M12 4v2M12 18v2M4 12h2M18 12h2" />
        </svg>
      ),
    },
  ]

  return (
    // z-50: globals.css の .washi-texture > * (z-index: 1) より確実に上に置く。
    // 画面コンテンツの stacking がナビを覆ってクリックを吸収するのを防ぐための保険。
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-t border-border/50 safe-area-pb">
      {/* items-stretch + 各 button に flex-1 を当て、ナビ全幅を 3 等分のタップ領域に分割。
          justify-around 時のアイコン中心位置 (1/6, 3/6, 5/6) と数学的に同一なので見た目は不変、
          一方でデッドゾーンの gap が消えて 1 ボタンあたりの hit area が ~64px → ~133px に拡張される。 */}
      <div className="flex items-stretch h-16 max-w-md mx-auto px-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined') {
                sessionStorage.setItem(ACTIVE_TAB_STORAGE_KEY, tab.id)
              }
              onTabChange(tab.id)
            }}
            aria-label={tab.label}
            aria-current={activeTab === tab.id ? 'page' : undefined}
            // flex-1: 親の 1/3 を占有して hit area を最大化（visual はアイコンが中央寄せで不変）。
            // h-full + min-h-[44px]: 縦 64px(iOS HIG 推奨 44px 超)を保証。
            // touch-manipulation: モバイルでダブルタップズーム判定の遅延 (300ms) を排除してタップを即発火。
            className="relative flex flex-1 flex-col items-center justify-center h-full min-h-[44px] cursor-pointer touch-manipulation"
          >
            <motion.div
              animate={{
                color: activeTab === tab.id ? 'var(--foreground)' : 'var(--muted-foreground)',
                opacity: activeTab === tab.id ? 1 : 0.6,
              }}
              transition={{ duration: 0.3 }}
              // pointer-events-none: 内側の SVG / span がクリックを吸収しないように、
              // クリックは必ず button 自身が拾うようにする。
              className="flex flex-col items-center gap-1.5 pointer-events-none"
            >
              {tab.icon}
              <span className="text-[10px] tracking-[0.1em] font-light pointer-events-none">{tab.label}</span>
            </motion.div>

            {/* Active indicator - small vermillion dot */}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                // 装飾用 dot もクリックは button へ通す
                className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary pointer-events-none"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}

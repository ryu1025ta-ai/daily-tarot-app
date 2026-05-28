'use client'

import { useDebug } from '@/lib/debug-context'
import { motion, AnimatePresence } from 'framer-motion'

export function DebugOverlay() {
  const { isDebugAvailable, isDebugVisible, toggleDebug, debugInfo } = useDebug()

  // 本番ビルドではトグルボタンごと描画しない
  if (!isDebugAvailable) return null

  return (
    <>
      {/* Debug Toggle Button */}
      <button
        onClick={toggleDebug}
        className="fixed top-2 right-2 z-50 w-6 h-6 rounded-full bg-foreground/10 text-foreground/50 text-[10px] font-mono flex items-center justify-center hover:bg-foreground/20 transition-colors"
        aria-label="Toggle debug info"
      >
        D
      </button>

      {/* Debug Panel */}
      <AnimatePresence>
        {isDebugVisible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-10 right-2 z-50 bg-foreground/90 text-background text-[10px] font-mono p-2 rounded shadow-lg max-w-[160px]"
          >
            <div className="space-y-0.5">
              <div>カード: {debugInfo.cardState}</div>
              <div>連続: {debugInfo.streak}日</div>
              <div>日付: {debugInfo.date}</div>
              <div>テーマ: {debugInfo.theme}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface DebugInfo {
  cardState: string
  streak: number
  date: string
  theme: string
}

interface DebugContextType {
  isDebugAvailable: boolean
  isDebugVisible: boolean
  toggleDebug: () => void
  debugInfo: DebugInfo
  setDebugInfo: (info: Partial<DebugInfo>) => void
}

const DebugContext = createContext<DebugContextType | undefined>(undefined)

// 本番ビルド（NODE_ENV === 'production'）ではデバッグ機能を完全に無効化
const DEBUG_ENABLED = process.env.NODE_ENV !== 'production'

export function DebugProvider({ children }: { children: ReactNode }) {
  const [isDebugVisible, setIsDebugVisible] = useState(DEBUG_ENABLED)
  const [debugInfo, setDebugInfoState] = useState<DebugInfo>({
    cardState: '未引き',
    streak: 0,
    date: new Date().toISOString().split('T')[0],
    theme: 'light',
  })

  const toggleDebug = useCallback(() => setIsDebugVisible(prev => !prev), [])

  const setDebugInfo = useCallback((info: Partial<DebugInfo>) => {
    setDebugInfoState(prev => ({ ...prev, ...info }))
  }, [])

  return (
    <DebugContext.Provider value={{ isDebugAvailable: DEBUG_ENABLED, isDebugVisible, toggleDebug, debugInfo, setDebugInfo }}>
      {children}
    </DebugContext.Provider>
  )
}

export function useDebug() {
  const context = useContext(DebugContext)
  if (!context) {
    throw new Error('useDebug must be used within a DebugProvider')
  }
  return context
}

'use client'

import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react'
import {
  THEME_MODE_STORAGE_KEY,
  THEME_MODE_CHANGED_EVENT,
  resolveTheme,
  toLegacyLightDark,
  type ThemeMode,
  type TimeTheme,
} from './time-theme'

// 旧 API（light/dark）と新 API（mode/effectiveTheme）の両方を提供。
// 既存コード（settings-screen.tsx の theme/setTheme 比較など）を壊さないため互換レイヤーを残す。

interface ThemeContextType {
  // 旧 API（互換維持）
  theme: 'light' | 'dark'
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
  // 新 API（5段階＋自動）
  mode: ThemeMode
  effectiveTheme: TimeTheme
  setMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// 旧 'light'/'dark' localStorage を新 mode に移行：light→day、dark→night、未指定→auto
function readInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'auto'
  try {
    const stored = localStorage.getItem(THEME_MODE_STORAGE_KEY) as ThemeMode | null
    if (stored && ['auto', 'dawn', 'day', 'dusk', 'evening', 'night'].includes(stored)) {
      return stored
    }
    // 旧キーからの移行
    const legacy = localStorage.getItem('wa-theme')
    if (legacy === 'light') return 'day'
    if (legacy === 'dark') return 'night'
  } catch {}
  return 'auto'
}

function applyThemeToDocument(theme: TimeTheme) {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = theme
  // 旧 .dark クラスの互換維持（evening/night/dusk は dark 寄り）
  const isDarkLike = theme === 'evening' || theme === 'night'
  document.documentElement.classList.toggle('dark', isDarkLike)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('auto')
  const [effectiveTheme, setEffectiveTheme] = useState<TimeTheme>('day')

  // 初回マウント：localStorage から復元
  useEffect(() => {
    const initial = readInitialMode()
    setModeState(initial)
    const resolved = resolveTheme(initial)
    setEffectiveTheme(resolved)
    applyThemeToDocument(resolved)
  }, [])

  // 自動モードのとき、1分ごとに再評価
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (mode !== 'auto') return
    const tick = () => {
      const resolved = resolveTheme('auto')
      setEffectiveTheme((prev) => {
        if (prev !== resolved) applyThemeToDocument(resolved)
        return resolved
      })
    }
    tick()
    const id = window.setInterval(tick, 60_000)
    return () => window.clearInterval(id)
  }, [mode])

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode)
    try { localStorage.setItem(THEME_MODE_STORAGE_KEY, newMode) } catch {}
    const resolved = resolveTheme(newMode)
    setEffectiveTheme(resolved)
    applyThemeToDocument(resolved)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(THEME_MODE_CHANGED_EVENT))
    }
  }, [])

  // 旧 API：light/dark を受け取って day/night にマッピング
  const setTheme = useCallback((legacy: 'light' | 'dark') => {
    setMode(legacy === 'light' ? 'day' : 'night')
  }, [setMode])

  const toggleTheme = useCallback(() => {
    setTheme(toLegacyLightDark(effectiveTheme) === 'light' ? 'dark' : 'light')
  }, [effectiveTheme, setTheme])

  return (
    <ThemeContext.Provider
      value={{
        theme: toLegacyLightDark(effectiveTheme),
        toggleTheme,
        setTheme,
        mode,
        effectiveTheme,
        setMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

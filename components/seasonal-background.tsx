'use client'

import { useEffect, useState } from 'react'
import { getCurrentSeason, type SekkiSeason } from '@/lib/sekki'
import {
  SEASONAL_BG_CHANGED_EVENT,
  isSeasonalBgEnabled,
} from '@/lib/ui-prefs'

// 季節に応じた粒子（桜・青葉/蛍・紅葉・雪）を背景にゆっくり漂わせる。
// - 季節判定は 24 節気ベース（立春〜立夏が春、など）
// - prefers-reduced-motion ではグローバルに停止
// - 設定で OFF にすると完全に消える
// - position: fixed inset-0 で全タブに被さる（pointer-events: none）

// 季節ごとの粒子数（パフォーマンスと密度のバランス）
const COUNTS: Record<SekkiSeason, number> = {
  spring: 8,    // 桜
  summer: 6,    // 青葉
  autumn: 7,    // 紅葉
  winter: 15,   // 雪
}

export function SeasonalBackground() {
  // SSR ハイドレーション整合：初期は null
  const [season, setSeason] = useState<SekkiSeason | null>(null)
  const [enabled, setEnabled] = useState<boolean>(true)
  // 夜（evening/night）判定：蛍を出すかどうか
  const [isNight, setIsNight] = useState<boolean>(false)

  useEffect(() => {
    setSeason(getCurrentSeason())
    setEnabled(isSeasonalBgEnabled())
    // 蛍判定（21時以降 or 5時前）
    const h = new Date().getHours()
    setIsNight(h >= 19 || h < 5)
  }, [])

  // ユーザーがトグル変更したときに追従
  useEffect(() => {
    if (typeof window === 'undefined') return
    const onChange = () => setEnabled(isSeasonalBgEnabled())
    window.addEventListener(SEASONAL_BG_CHANGED_EVENT, onChange)
    return () => window.removeEventListener(SEASONAL_BG_CHANGED_EVENT, onChange)
  }, [])

  if (!season || !enabled) return null

  const count = COUNTS[season]

  return (
    <div className="seasonal-background" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`seasonal-particle seasonal-particle--${season}`}
          style={{
            left: `${(i * 17 + 5) % 95}%`,
            animationDelay: `${-(i * 1.8) % 18}s`,
            animationDuration: `${14 + (i % 5) * 2}s`,
          }}
        />
      ))}

      {/* 夏の夜のみ蛍を追加（青葉に加えて点滅光） */}
      {season === 'summer' && isNight &&
        Array.from({ length: 5 }).map((_, i) => (
          <span
            key={`firefly-${i}`}
            className="seasonal-firefly"
            style={{
              left: `${(i * 23 + 11) % 90}%`,
              top: `${(i * 37 + 22) % 80}%`,
              animationDelay: `${-(i * 1.3)}s`,
            }}
          />
        ))
      }
    </div>
  )
}

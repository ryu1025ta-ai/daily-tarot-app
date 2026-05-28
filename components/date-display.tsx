'use client'

import { useState, useEffect } from 'react'
import { SAMPLE_SEKKI } from '@/lib/sample-data'

function getJapaneseEra(date: Date): string {
  const year = date.getFullYear()
  const reiwaYear = year - 2018
  return `令和${reiwaYear === 1 ? '元' : reiwaYear}年`
}

function getJapaneseMonth(date: Date): string {
  const months = [
    '睦月', '如月', '弥生', '卯月', '皐月', '水無月',
    '文月', '葉月', '長月', '神無月', '霜月', '師走'
  ]
  return months[date.getMonth()]
}

function getJapaneseDay(date: Date): string {
  const day = date.getDate()
  const kanjiDays = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
  
  if (day <= 10) {
    return `${kanjiDays[day - 1]}日`
  } else if (day < 20) {
    return `十${day > 10 ? kanjiDays[day - 11] : ''}日`
  } else if (day === 20) {
    return '二十日'
  } else if (day < 30) {
    return `二十${kanjiDays[day - 21]}日`
  } else if (day === 30) {
    return '三十日'
  } else {
    return '三十一日'
  }
}

function getSekki(date: Date): { name: string; kou: string } | null {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return SAMPLE_SEKKI[month] || null
}

// Vermillion seal SVG component
function VermillionSeal() {
  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      className="inline-block ml-2 -mt-0.5"
      style={{ opacity: 0.85 }}
    >
      <rect 
        x="3" 
        y="3" 
        width="18" 
        height="18" 
        rx="2" 
        fill="currentColor" 
        className="text-primary"
      />
      <text 
        x="12" 
        y="16" 
        textAnchor="middle" 
        fontSize="10" 
        fill="white" 
        fontFamily="var(--font-serif)"
        fontWeight="500"
      >
        卜
      </text>
    </svg>
  )
}

export function DateDisplay() {
  const [mounted, setMounted] = useState(false)
  const [dateInfo, setDateInfo] = useState({
    era: '',
    month: '',
    day: '',
    sekki: null as { name: string; kou: string } | null,
  })

  useEffect(() => {
    const now = new Date()
    setDateInfo({
      era: getJapaneseEra(now),
      month: getJapaneseMonth(now),
      day: getJapaneseDay(now),
      sekki: getSekki(now),
    })
    setMounted(true)
  }, [])

  // Show placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center">
          <p className="font-serif text-lg tracking-[0.25em] text-foreground/80">
            &nbsp;
          </p>
        </div>
        <p className="text-sm text-muted-foreground tracking-wider">
          &nbsp;
        </p>
      </div>
    )
  }

  return (
    <div className="text-center space-y-3">
      {/* Main date with vermillion seal */}
      <div className="flex items-center justify-center">
        <p className="font-serif text-lg tracking-[0.25em] text-foreground/85">
          {dateInfo.era} {dateInfo.month}{dateInfo.day}
        </p>
        <VermillionSeal />
      </div>
      
      {/* Sekki (24 solar terms) and Kou (72 pentads) */}
      {dateInfo.sekki && (
        <p className="text-sm text-muted-foreground/80 tracking-[0.15em] font-light">
          {dateInfo.sekki.name}・{dateInfo.sekki.kou}
        </p>
      )}
    </div>
  )
}

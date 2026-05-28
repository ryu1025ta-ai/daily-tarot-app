'use client'

import { motion } from 'framer-motion'
import { getStreakTitle, getNextStreakStep, toKanjiNumber } from '@/lib/titles'

interface StreakDisplayProps {
  streak: number
}

// 行動経済学：
//   - アンカリング：日数を漢数字でも示すことで「一週間」「百日」を直感化
//   - 投資効果：連続日数とともに「称号」を提示。これまでの蓄積を見える化
//   - 次の到達まで：圧ではなく「もうすぐ次」の楽しみ。罪悪感誘導はしない
export function StreakDisplay({ streak }: StreakDisplayProps) {
  if (streak === 0) return null

  const title = getStreakTitle(streak)
  const next = getNextStreakStep(streak)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="text-center"
    >
      <div className="w-12 h-px mx-auto mb-6 gold-line" />

      {/* 連続日数（算用数字、大きく） */}
      <p
        className="text-5xl text-foreground/90 tracking-wider mb-2"
        style={{
          fontFamily: 'var(--font-serif), serif',
          fontWeight: 400,
          fontVariantNumeric: 'lining-nums tabular-nums',
        }}
      >
        {streak}
      </p>

      {/* 漢数字（小さく副題、アンカリング効果） */}
      <p className="text-[10px] text-muted-foreground/60 tracking-[0.25em] mb-3 font-light">
        {toKanjiNumber(streak)}日連続
      </p>

      {/* 称号（朱の控えめなチップ） */}
      <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-primary/30 bg-primary/5">
        <span className="text-xs tracking-[0.2em] text-foreground/85 font-serif">
          {title.kanji}
        </span>
        <span className="text-[9px] text-muted-foreground/70 tracking-[0.15em]">
          {title.reading}
        </span>
      </div>

      <p className="text-muted-foreground/60 text-[11px] tracking-[0.2em] font-light">
        {title.description}
      </p>

      {/* 次の称号まで（圧ではなく「楽しみ」として柔らかく） */}
      {next && (
        <p className="text-[10px] text-muted-foreground/50 tracking-[0.18em] mt-3 font-light">
          あと {next.daysToNext} 日で「{next.nextTitle.kanji}」
        </p>
      )}

      <div className="w-8 h-px mx-auto mt-6 gold-line" />
    </motion.div>
  )
}

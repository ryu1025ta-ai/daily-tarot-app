'use client'

import { motion } from 'framer-motion'
import { TarotCard } from '@/lib/tarot-data'
import { getCardRarity } from '@/lib/card-rarity'
import { CardSymbol } from '@/components/tarot-symbols'

interface TarotCardDisplayProps {
  card?: TarotCard | null
  isRevealed: boolean
  onDraw?: () => void
}

export function TarotCardDisplay({ card, isRevealed, onDraw }: TarotCardDisplayProps) {
  // レア度ごとに墨/藍/朱/金 4 色のカード本体テーマを適用
  const rarity = card ? getCardRarity(card) : 'common'
  return (
    <div className={`relative w-full max-w-[220px] aspect-[2/3] mx-auto rarity-${rarity}`}>
      {/* Floating animation wrapper */}
      <motion.div
        className="w-full h-full"
        animate={!isRevealed ? {
          y: [0, -4, 0, 3, 0],
          rotate: [0, 0.5, 0, -0.5, 0],
        } : {}}
        transition={{
          duration: 6,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop"
        }}
      >
        {/* Card container with 3D perspective */}
        <motion.div
          className="relative w-full h-full cursor-pointer"
          style={{ perspective: 1000 }}
          onClick={!isRevealed ? onDraw : undefined}
          whileHover={!isRevealed ? { scale: 1.02 } : {}}
          whileTap={!isRevealed ? { scale: 0.98 } : {}}
        >
          {/* Card flip container */}
          <motion.div
            className="relative w-full h-full"
            initial={false}
            animate={{ rotateY: isRevealed ? 180 : 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Card Back (unrevealed) */}
            <div
              className="absolute inset-0 rounded-md overflow-hidden gold-border"
              style={{ backfaceVisibility: 'hidden' }}
            >
              {/* Washi paper texture background with subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-card via-card to-secondary/50 card-washi-texture" />
              
              {/* Decorative inner border */}
              <div className="absolute inset-3 border border-foreground/8 rounded-sm" />
              <div className="absolute inset-4 border border-gold/15 rounded-sm" />
              
              {/* Center pattern - simplified Japanese motif */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-20 h-20">
                  {/* Outer circle */}
                  <div className="absolute inset-0 rounded-full border border-primary/20" />
                  {/* Middle circle */}
                  <div className="absolute inset-2 rounded-full border border-gold/25" />
                  {/* Inner circle */}
                  <div className="absolute inset-4 rounded-full border border-primary/15" />
                  {/* Center kanji */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-primary/35 font-serif text-3xl">卦</span>
                  </div>
                </div>
              </div>

              {/* Corner accents with gold */}
              <div className="absolute top-5 left-5 w-4 h-4 border-t border-l border-gold/25" />
              <div className="absolute top-5 right-5 w-4 h-4 border-t border-r border-gold/25" />
              <div className="absolute bottom-5 left-5 w-4 h-4 border-b border-l border-gold/25" />
              <div className="absolute bottom-5 right-5 w-4 h-4 border-b border-r border-gold/25" />
              
              {/* Small decorative dots at corners */}
              <div className="absolute top-6 left-6 w-1 h-1 rounded-full bg-gold/30" />
              <div className="absolute top-6 right-6 w-1 h-1 rounded-full bg-gold/30" />
              <div className="absolute bottom-6 left-6 w-1 h-1 rounded-full bg-gold/30" />
              <div className="absolute bottom-6 right-6 w-1 h-1 rounded-full bg-gold/30" />
            </div>

            {/* Card Front (revealed) */}
            <div
              className="absolute inset-0 rounded-md overflow-hidden gold-border"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              {/* Washi paper texture background */}
              <div className="absolute inset-0 bg-gradient-to-b from-card via-card to-secondary/30 card-washi-texture" />
              
              {/* Inner decorative border */}
              <div className="absolute inset-3 border border-gold/15 rounded-sm" />
              
              {/* Card content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                {/* シンボル領域：card があれば SVG シンボル、なければ枠だけ */}
                <div className="flex-1 w-full flex items-center justify-center">
                  {card ? (
                    <CardSymbol card={card} size={140} />
                  ) : (
                    <div className="w-full aspect-square max-w-[130px] rounded-sm border border-foreground/8 bg-secondary/40" />
                  )}
                </div>

                {/* Card name */}
                {card && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-4 text-center"
                  >
                    <h3 className="font-serif text-xl text-foreground tracking-[0.15em]">
                      {card.name}
                    </h3>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

import React from 'react'
import type { Suit } from '@/lib/tarot-data'
import { WandsNumberCard } from './wands'
import { CupsNumberCard } from './cups'
import { SwordsNumberCard } from './swords'
import { PentaclesNumberCard } from './pentacles'
import { WandsCourtCard } from './wands-court'
import { CupsCourtCard } from './cups-court'
import { SwordsCourtCard } from './swords-court'
import { PentaclesCourtCard } from './pentacles-court'

// 小アルカナのスート記号（viewBox 0 0 100 100 内、上半分 y=8〜52 に描画）。
// 下半分（y=58〜95）には数字/コート文字を text 要素で重ねる。
// stroke は親 SVG の [&_*]:stroke-current で currentColor になる。
// 朱印的アクセントは className="text-primary" で。
//
// 注：杖（wands）の 1〜10 は wands.tsx 側でカード固有の絵を持つため、
// この汎用シンボルはコートカード（11〜14）でのみ使用される。

const WandsSymbol: React.FC = () => (
  <>
    {/* 杖の本体（縦） */}
    <line x1="50" y1="10" x2="50" y2="48" strokeWidth="2.5" />
    {/* 上端の輪 */}
    <circle cx="50" cy="10" r="3" />
    {/* 中ほどの結び */}
    <line x1="42" y1="26" x2="58" y2="26" />
    {/* 朱の魂（火種） */}
    <circle className="text-primary" fill="currentColor" cx="50" cy="48" r="2" />
  </>
)

const CupsSymbol: React.FC = () => (
  <>
    {/* 杯（茶碗）口 */}
    <line x1="28" y1="14" x2="72" y2="14" />
    {/* 杯側面（弧） */}
    <path d="M 30 14 Q 30 40 50 46 Q 70 40 70 14" />
    {/* 高台 */}
    <line x1="42" y1="46" x2="58" y2="46" />
    <line x1="40" y1="50" x2="60" y2="50" />
    {/* 朱の雫 */}
    <circle className="text-primary" fill="currentColor" cx="50" cy="24" r="2" />
  </>
)

const SwordsSymbol: React.FC = () => (
  <>
    {/* 刀身の左輪郭 */}
    <line x1="48" y1="38" x2="48" y2="10" />
    {/* 刀身の右輪郭 */}
    <line x1="52" y1="38" x2="52" y2="10" />
    {/* 切先 */}
    <path d="M 48 10 L 50 6 L 52 10" />
    {/* 鍔 */}
    <line x1="38" y1="40" x2="62" y2="40" />
    {/* 柄 */}
    <line x1="50" y1="40" x2="50" y2="50" strokeWidth="2.5" />
    {/* 柄頭（朱） */}
    <circle className="text-primary" fill="currentColor" cx="50" cy="52" r="2" />
  </>
)

const PentaclesSymbol: React.FC = () => (
  <>
    {/* 銅銭の外円 */}
    <circle cx="50" cy="28" r="18" />
    {/* 内側の四角穴 */}
    <rect x="44" y="22" width="12" height="12" />
    {/* 朱の中央点（光） */}
    <circle className="text-primary" fill="currentColor" cx="50" cy="28" r="1.8" />
  </>
)

const SUIT_SYMBOLS: Record<Exclude<Suit, 'major'>, React.FC> = {
  wands: WandsSymbol,
  cups: CupsSymbol,
  swords: SwordsSymbol,
  pentacles: PentaclesSymbol,
}

// 数字/コート文字を漢字一文字で表現
function rankLabel(num: number): string {
  if (num >= 1 && num <= 10) {
    const kanji = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
    return kanji[num - 1]
  }
  if (num === 11) return '童' // Page（小姓）
  if (num === 12) return '騎' // Knight（騎士）
  if (num === 13) return '妃' // Queen（女王）
  if (num === 14) return '王' // King（王）
  return ''
}

export function MinorArcanaSymbol({ suit, number }: { suit: Suit; number: number }) {
  if (suit === 'major') return null

  // 各スートの数札（1〜10）はカード固有の絵を使う。漢字数字は出さない。
  if (suit === 'wands' && number >= 1 && number <= 10) {
    return <WandsNumberCard number={number} />
  }
  if (suit === 'cups' && number >= 1 && number <= 10) {
    return <CupsNumberCard number={number} />
  }
  if (suit === 'swords' && number >= 1 && number <= 10) {
    return <SwordsNumberCard number={number} />
  }
  if (suit === 'pentacles' && number >= 1 && number <= 10) {
    return <PentaclesNumberCard number={number} />
  }

  // コートカード（11〜14）も各スートでキャラを描く。漢字は使わない。
  if (number >= 11 && number <= 14) {
    if (suit === 'wands') return <WandsCourtCard number={number} />
    if (suit === 'cups') return <CupsCourtCard number={number} />
    if (suit === 'swords') return <SwordsCourtCard number={number} />
    if (suit === 'pentacles') return <PentaclesCourtCard number={number} />
  }

  const Symbol = SUIT_SYMBOLS[suit]
  return (
    <>
      <Symbol />
      {/* 数字/コート文字。stroke="none" で枠線が乗らないように */}
      <text
        x="50"
        y="76"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="32"
        fontFamily="var(--font-serif), serif"
        fontWeight={300}
        fill="currentColor"
        stroke="none"
      >
        {rankLabel(number)}
      </text>
    </>
  )
}

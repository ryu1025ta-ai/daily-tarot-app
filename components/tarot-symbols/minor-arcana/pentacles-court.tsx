import React from 'react'
import { Koban } from './pentacles'

// 金貨のコートカード（11=童 / 12=騎 / 13=妃 / 14=王）。
// 金貨のトーン：地の重・静止・長期的・豊かな金茶。
// 共通の Koban（pentacles.tsx）を再利用。

// 金貨の童：両手で大きな小判を抱えて見下ろす若い見習い
const PageOfPentacles: React.FC = () => (
  <>
    {/* 草原（足元・地面）：page-pent-grass で揺れる */}
    <line x1="6" y1="88" x2="94" y2="88" strokeWidth="0.6" />
    <g strokeWidth="0.4" opacity="0.5">
      <path className="page-pent-grass page-pent-grass-1" d="M 10 90 Q 14 86 18 90" />
      <path className="page-pent-grass page-pent-grass-2" d="M 22 90 Q 26 86 30 90" />
      <path className="page-pent-grass page-pent-grass-3" d="M 70 90 Q 74 86 78 90" />
      <path className="page-pent-grass page-pent-grass-4" d="M 82 90 Q 86 86 90 90" />
    </g>

    {/* 若い見習い（小柄、両手で大きな小判を抱える） */}
    <g>
      {/* 頭（下向き、小判を見つめる） */}
      <circle cx="50" cy="30" r="4.5" strokeWidth="0.9" />
      {/* 髷 */}
      <path d="M 48 26 Q 50 22 52 26" strokeWidth="0.6" />
      {/* 胴体（前傾、見下ろす） */}
      <path d="M 46 35 Q 40 50 42 70 L 58 70 Q 60 50 54 35 Z" strokeWidth="0.9" />
      {/* 帯 */}
      <line x1="42" y1="54" x2="58" y2="54" strokeWidth="0.7" />
      {/* 両腕（前で小判を支える） */}
      <path d="M 44 38 Q 38 48 42 56" strokeWidth="0.7" />
      <path d="M 56 38 Q 62 48 58 56" strokeWidth="0.7" />
      {/* 足 */}
      <line x1="46" y1="70" x2="44" y2="86" strokeWidth="0.8" />
      <line x1="54" y1="70" x2="56" y2="86" strokeWidth="0.8" />
    </g>

    {/* 大きな小判（両手の中）：page-pent-koban で金の輝き脈動 */}
    <g className="page-pent-koban">
      <Koban cx={50} cy={64} rx={12} ry={8} />
    </g>

    {/* 視線の朱（じっと見つめる）：court-gaze で脈動 */}
    <circle className="text-primary court-gaze" fill="currentColor" cx="51" cy="30" r="0.5" stroke="none" />
  </>
)

// 金貨の騎：宝（大きな小判）を掲げる静止した騎馬武者
const KnightOfPentacles: React.FC = () => (
  <>
    {/* 大地（豊かな実り）：草が静かに揺れる */}
    <line x1="6" y1="92" x2="94" y2="92" strokeWidth="0.7" />
    <g strokeWidth="0.4" opacity="0.55">
      {[12, 26, 40, 58, 72, 86].map((x, i) => (
        <path key={x} className={`page-pent-grass page-pent-grass-${(i % 4) + 1}`} d={`M ${x} 92 Q ${x + 2} 88 ${x + 4} 92`} />
      ))}
    </g>

    {/* 馬＋騎手＋小判：knight-pent-breathe で重く呼吸 */}
    <g className="knight-pent-breathe">
      {/* 馬（静止・どっしり） */}
      <g>
        <path d="M 22 58 Q 24 48 50 48 Q 76 48 78 58 Q 80 74 72 80 L 28 80 Q 20 74 22 58 Z" strokeWidth="1" />
        {/* 首・頭（直立、静か） */}
        <path d="M 76 58 Q 84 56 88 62 L 86 70" strokeWidth="1" />
        <line x1="86" y1="58" x2="88" y2="54" strokeWidth="0.6" />
        <path d="M 74 54 Q 78 50 82 52" strokeWidth="0.5" />
        {/* 4本足（直立） */}
        <line x1="30" y1="80" x2="30" y2="90" strokeWidth="0.9" />
        <line x1="44" y1="80" x2="44" y2="90" strokeWidth="0.9" />
        <line x1="60" y1="80" x2="60" y2="90" strokeWidth="0.9" />
        <line x1="72" y1="80" x2="72" y2="90" strokeWidth="0.9" />
        {/* 尾（下に垂れる） */}
        <path d="M 22 60 Q 14 66 16 76" strokeWidth="0.7" />
      </g>

      {/* 騎手（静かに小判を掲げる） */}
      <g>
        <circle cx="50" cy="30" r="3.5" strokeWidth="0.8" />
        {/* 兜 */}
        <path d="M 46 28 L 46 22 L 54 22 L 54 28 Z" strokeWidth="0.6" />
        {/* 胴体（直立・重厚） */}
        <path d="M 46 34 Q 44 44 48 50 L 54 50 Q 56 44 54 34 Z" strokeWidth="0.9" />
        {/* 両腕（小判を前に掲げる） */}
        <path d="M 46 38 Q 38 38 36 44" strokeWidth="0.7" />
        <path d="M 54 38 Q 62 38 64 44" strokeWidth="0.7" />
      </g>

      {/* 大きな小判（前に掲げる）：page-pent-koban で輝き */}
      <g className="page-pent-koban">
        <Koban cx={50} cy={44} rx={11} ry={7} />
      </g>
    </g>
  </>
)

// 金貨の妃：豊かさを司る姫（座、装姿、小判、足元に作物）
const QueenOfPentacles: React.FC = () => (
  <>
    {/* 背景の豊作の図（薄く）：queen-pent-rice で稲穂が静かに揺れる */}
    <g className="queen-pent-rice" strokeWidth="0.4" opacity="0.4">
      {/* 稲穂（背後） */}
      <path d="M 14 30 Q 14 18 14 8" />
      <path d="M 18 32 Q 18 20 18 10" />
      <path d="M 82 30 Q 82 18 82 8" />
      <path d="M 86 32 Q 86 20 86 10" />
      {/* 実 */}
      <circle cx="14" cy="14" r="1" />
      <circle cx="18" cy="16" r="1" />
      <circle cx="82" cy="14" r="1" />
      <circle cx="86" cy="16" r="1" />
    </g>

    {/* 姫（座した、装姿、優雅） */}
    <g>
      {/* 頭 */}
      <circle cx="50" cy="36" r="5" strokeWidth="0.9" />
      {/* 長い髪（背中に流れる）：court-hair-sway */}
      <path className="court-hair-sway" d="M 46 34 Q 38 42 36 58 Q 38 72 44 78" strokeWidth="0.7" />
      <path className="court-hair-sway" d="M 54 34 Q 58 38 56 42" strokeWidth="0.5" opacity="0.7" />
      {/* 顔の朱（柔らかい表情） */}
      <line x1="51" y1="36" x2="54" y2="36" strokeWidth="0.4" />
      {/* 胴体（豪華な装束） */}
      <path d="M 42 41 Q 34 54 32 76 L 68 76 Q 66 54 58 41 Z" strokeWidth="1" />
      {/* 帯（金茶） */}
      <line x1="34" y1="58" x2="66" y2="58" strokeWidth="1.2" />
      {/* 帯飾り（朱）：queen-pent-obi で脈動 */}
      <circle className="text-primary queen-pent-obi" fill="currentColor" cx="50" cy="58" r="1.4" stroke="none" />
      {/* 右腕（小判を手に） */}
      <path d="M 56 44 Q 64 50 68 60" strokeWidth="0.7" />
      {/* 裾の広がり */}
      <path d="M 32 76 L 24 92 L 76 92 L 68 76" strokeWidth="0.9" />
      <line x1="50" y1="76" x2="50" y2="92" strokeWidth="0.4" opacity="0.6" />
    </g>

    {/* 大きな小判（右手）：page-pent-koban で輝き */}
    <g className="page-pent-koban">
      <Koban cx={72} cy={64} rx={9} ry={6} />
    </g>

    {/* 足元の作物（豊かさの徴）：queen-pent-fruit で実が脈動 */}
    <g>
      {/* 米俵 */}
      <ellipse cx="30" cy="88" rx="6" ry="3" strokeWidth="0.7" />
      <line x1="30" y1="85" x2="30" y2="91" strokeWidth="0.4" opacity="0.6" />
      {/* 果実 */}
      <circle cx="22" cy="86" r="1.6" strokeWidth="0.5" />
      <circle className="text-primary queen-pent-fruit" cx="22" cy="86" r="0.6" fill="currentColor" stroke="none" />
    </g>
  </>
)

// 金貨の王：豊作を司る老者（高座、足元に作物、家紋、大きな小判）
const KingOfPentacles: React.FC = () => (
  <>
    {/* 高座（重厚・豊か） */}
    <g>
      <line x1="6" y1="94" x2="94" y2="94" strokeWidth="0.8" />
      <line x1="10" y1="80" x2="90" y2="80" strokeWidth="1" />
      <line x1="14" y1="80" x2="14" y2="94" strokeWidth="0.7" />
      <line x1="86" y1="80" x2="86" y2="94" strokeWidth="0.7" />
      {/* 背もたれ（最も高く・豪華） */}
      <line x1="18" y1="80" x2="18" y2="28" strokeWidth="1" />
      <line x1="82" y1="80" x2="82" y2="28" strokeWidth="1" />
      <line x1="18" y1="28" x2="82" y2="28" strokeWidth="1.2" />
      <line x1="16" y1="28" x2="84" y2="28" strokeWidth="1.4" />
      {/* 背もたれの家紋（大きな）：king-pent-crest で威厳脈動 */}
      <circle cx="50" cy="38" r="5" strokeWidth="0.8" />
      <circle cx="50" cy="38" r="3" strokeWidth="0.5" opacity="0.7" />
      <circle className="text-primary king-pent-crest" fill="currentColor" cx="50" cy="38" r="1.4" stroke="none" />
      {/* 家紋の輻射（豊作の象徴）：king-pent-ray で順次脈動 */}
      <g strokeWidth="0.4" opacity="0.6">
        <line className="king-pent-ray king-pent-ray-1" x1="50" y1="32" x2="50" y2="34" />
        <line className="king-pent-ray king-pent-ray-2" x1="46" y1="34" x2="47" y2="35" />
        <line className="king-pent-ray king-pent-ray-3" x1="44" y1="38" x2="46" y2="38" />
        <line className="king-pent-ray king-pent-ray-4" x1="46" y1="42" x2="47" y2="41" />
        <line className="king-pent-ray king-pent-ray-5" x1="50" y1="42" x2="50" y2="44" />
        <line className="king-pent-ray king-pent-ray-6" x1="54" y1="42" x2="53" y2="41" />
        <line className="king-pent-ray king-pent-ray-7" x1="54" y1="38" x2="56" y2="38" />
        <line className="king-pent-ray king-pent-ray-8" x1="54" y1="34" x2="53" y2="35" />
      </g>
    </g>

    {/* 老者（最大、座した、最も重厚） */}
    <g>
      {/* 頭 */}
      <circle cx="50" cy="54" r="6" strokeWidth="1" />
      {/* 烏帽子（高い） */}
      <path d="M 46 48 L 46 40 L 54 40 L 54 48 Z" strokeWidth="0.7" />
      {/* 長い髭 */}
      <path d="M 46 60 Q 44 76 50 78 Q 56 76 54 60" strokeWidth="0.6" />
      <line x1="48" y1="62" x2="48" y2="76" strokeWidth="0.4" opacity="0.5" />
      <line x1="52" y1="62" x2="52" y2="76" strokeWidth="0.4" opacity="0.5" />
      {/* 胴体（最も大きい） */}
      <path d="M 38 62 Q 28 74 26 90 L 74 90 Q 72 74 62 62 Z" strokeWidth="1" />
      {/* 肩当て（金茶） */}
      <path d="M 40 64 Q 32 60 26 66 L 30 74" strokeWidth="0.8" />
      <path d="M 60 64 Q 68 60 74 66 L 70 74" strokeWidth="0.8" />
      {/* 帯飾り（朱の家紋）：court-obi で脈動 */}
      <circle className="text-primary court-pent-obi" fill="currentColor" cx="50" cy="80" r="1.2" stroke="none" />
    </g>

    {/* 手前に大きな小判（豪奢）：page-pent-koban で輝き */}
    <g className="page-pent-koban">
      <Koban cx={50} cy={88} rx={10} ry={6} />
    </g>

    {/* 足元の作物（米俵・果実） */}
    <g>
      <ellipse cx="14" cy="92" rx="5" ry="2.5" strokeWidth="0.6" />
      <ellipse cx="86" cy="92" rx="5" ry="2.5" strokeWidth="0.6" />
    </g>
  </>
)

const PENTACLES_COURT: Record<number, React.FC> = {
  11: PageOfPentacles,
  12: KnightOfPentacles,
  13: QueenOfPentacles,
  14: KingOfPentacles,
}

export function PentaclesCourtCard({ number }: { number: number }): React.ReactElement | null {
  const C = PENTACLES_COURT[number]
  if (!C) return null
  return <C />
}

export { PageOfPentacles, KnightOfPentacles, QueenOfPentacles, KingOfPentacles }

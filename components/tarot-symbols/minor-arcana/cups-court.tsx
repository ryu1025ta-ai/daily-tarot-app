import React from 'react'

// 聖杯のコートカード（11=童 / 12=騎 / 13=妃 / 14=王）。
// 杖と同様の階級差別化 + 聖杯のトーン（水・静・柔らかな藍）。
// 朱は控えめに、共通の墨色＋滴の朱印で表現。

// 聖杯の童：両手で杯を掲げる若い巫女、杯から鳥の予兆
const PageOfCups: React.FC = () => (
  <>
    {/* 水面（足元）：court-water-surface で 2層が opacity 揺らぎ */}
    <g strokeWidth="0.5" opacity="0.6">
      <ellipse className="court-water-1" cx="50" cy="92" rx="46" ry="2" />
      <ellipse className="court-water-2" cx="50" cy="88" rx="38" ry="1.6" opacity="0.7" />
    </g>

    {/* 巫女（小柄、両手で杯を掲げる） */}
    <g>
      {/* 頭 */}
      <circle cx="50" cy="46" r="4.5" strokeWidth="0.9" />
      {/* 髪（おかっぱ風、短め） */}
      <path d="M 46 42 Q 44 38 50 36 Q 56 38 54 42" strokeWidth="0.7" />
      {/* 胴体（巫女装束） */}
      <path d="M 44 51 Q 40 64 42 82 L 58 82 Q 60 64 56 51 Z" strokeWidth="0.9" />
      {/* 帯 */}
      <line x1="42" y1="68" x2="58" y2="68" strokeWidth="0.7" />
      {/* 両腕（杯を高く） */}
      <path d="M 46 52 Q 42 42 44 30" strokeWidth="0.7" />
      <path d="M 54 52 Q 58 42 56 30" strokeWidth="0.7" />
      {/* 袖（袴下） */}
      <path d="M 42 82 L 38 88 L 46 88" strokeWidth="0.6" />
      <path d="M 58 82 L 62 88 L 54 88" strokeWidth="0.6" />
    </g>

    {/* 杯（巫女の頭上） */}
    <g>
      <line x1="42" y1="22" x2="58" y2="22" strokeWidth="1" />
      <path d="M 44 22 Q 44 32 50 34 Q 56 32 56 22" strokeWidth="1" />
      <line x1="46" y1="34" x2="54" y2="34" strokeWidth="0.6" />
    </g>

    {/* 杯の中から鳥の予兆（1本の線で鳥を暗示）：page-bird で静かに上下 */}
    <g className="page-bird">
      <path d="M 50 22 Q 48 12 44 8 Q 50 4 56 8 Q 52 12 50 22" strokeWidth="0.6" />
      {/* 鳥の頭の朱 */}
      <circle className="text-primary page-bird-head" fill="currentColor" cx="50" cy="6" r="0.8" stroke="none" />
    </g>

    {/* 杯から滴る一滴：page-drip で落下＋出現ループ */}
    <path className="page-drip" d="M 46 24 Q 44 28 46 32" strokeWidth="0.5" opacity="0.7" />
  </>
)

// 聖杯の騎：杯を掲げてゆったり進む騎馬武者
const KnightOfCups: React.FC = () => (
  <>
    {/* 水面：3層が opacity 順次揺らぎ */}
    <g strokeWidth="0.5" opacity="0.55">
      <ellipse className="court-water-1" cx="50" cy="92" rx="48" ry="2" />
      <ellipse className="court-water-2" cx="50" cy="88" rx="40" ry="1.6" />
      <ellipse className="court-water-3" cx="50" cy="84" rx="32" ry="1.4" opacity="0.7" />
    </g>

    {/* 馬＋騎手＋杯：court-rider-bob で全体が静かに上下動（ゆったり歩く） */}
    <g className="court-rider-bob">
      {/* 馬 */}
      <g>
        {/* 胴体 */}
        <path d="M 26 60 Q 28 52 50 52 Q 70 52 74 60 Q 76 72 70 78 L 30 78 Q 24 72 26 60 Z" strokeWidth="1" />
        {/* 首・頭（やや下向きでゆったり） */}
        <path d="M 72 60 Q 80 60 86 64 L 88 70 L 82 70" strokeWidth="0.9" />
        <line x1="82" y1="64" x2="84" y2="60" strokeWidth="0.5" />
        <path d="M 70 56 Q 74 54 78 56" strokeWidth="0.4" />
        {/* 4本足（静かに） */}
        <line x1="32" y1="78" x2="32" y2="84" strokeWidth="0.9" />
        <line x1="44" y1="78" x2="44" y2="84" strokeWidth="0.9" />
        <line x1="58" y1="78" x2="58" y2="84" strokeWidth="0.9" />
        <line x1="70" y1="78" x2="70" y2="84" strokeWidth="0.9" />
        {/* 尾 */}
        <path d="M 26 62 Q 18 64 16 72" strokeWidth="0.7" />
      </g>

      {/* 騎手（杯を掲げる） */}
      <g>
        <circle cx="50" cy="34" r="3.5" strokeWidth="0.8" />
        {/* 兜 */}
        <path d="M 46 32 Q 50 26 54 32 Z" strokeWidth="0.6" />
        {/* 胴体（直立、優雅） */}
        <path d="M 46 38 Q 44 48 48 54 L 54 54 Q 56 48 54 38 Z" strokeWidth="0.9" />
        {/* 右腕（杯を掲げる） */}
        <line x1="52" y1="40" x2="64" y2="28" strokeWidth="0.7" />
      </g>

      {/* 掲げる杯 */}
      <g>
        <line x1="60" y1="28" x2="72" y2="28" strokeWidth="0.9" />
        <path d="M 61 28 Q 62 36 66 38 Q 70 36 71 28" strokeWidth="0.9" />
        <line x1="63" y1="38" x2="69" y2="38" strokeWidth="0.5" />
      </g>
    </g>

    {/* 杯から零れる雫の流れ（後方へ波紋）：knight-drop-trail で opacity flow */}
    <path className="knight-drop-trail" d="M 60 32 Q 56 38 58 46 Q 60 54 56 60" strokeWidth="0.4" opacity="0.6" />
    <circle className="text-primary knight-drop-trail-seal" fill="currentColor" cx="58" cy="56" r="0.7" stroke="none" opacity="0.85" />
  </>
)

// 聖杯の妃：杯を見つめる姫（長髪、満月、水面）
const QueenOfCups: React.FC = () => (
  <>
    {/* 背後の満月：queen-moon で柔らかく脈動 */}
    <g className="queen-moon">
      <circle cx="76" cy="22" r="9" strokeWidth="0.7" />
      <path d="M 71 19 Q 76 22 81 20" strokeWidth="0.4" opacity="0.5" />
      <circle cx="73" cy="24" r="1.2" strokeWidth="0.4" opacity="0.5" />
    </g>

    {/* 水面：3層が opacity 順次揺らぎ */}
    <g strokeWidth="0.5" opacity="0.55">
      <ellipse className="court-water-1" cx="50" cy="92" rx="48" ry="2.5" />
      <ellipse className="court-water-2" cx="50" cy="88" rx="40" ry="2" />
      <ellipse className="court-water-3" cx="50" cy="84" rx="32" ry="1.8" opacity="0.7" />
    </g>

    {/* 姫（座して両手で杯） */}
    <g>
      {/* 頭 */}
      <circle cx="44" cy="30" r="5" strokeWidth="0.9" />
      {/* 長い髪（背中に流れる）：court-hair-sway */}
      <path className="court-hair-sway" d="M 40 28 Q 32 36 30 52 Q 32 68 40 76" strokeWidth="0.7" />
      <path className="court-hair-sway" d="M 48 28 Q 50 32 49 38" strokeWidth="0.5" opacity="0.7" />
      {/* 顔の朱 */}
      <line x1="45" y1="30" x2="48" y2="30" strokeWidth="0.4" />
      {/* 胴体（着物） */}
      <path d="M 38 35 Q 32 50 30 70 L 56 70 Q 56 50 50 35 Z" strokeWidth="0.9" />
      {/* 帯 */}
      <line x1="32" y1="52" x2="56" y2="52" strokeWidth="0.9" />
      {/* 両腕（前で杯を双ぶ） */}
      <path d="M 38 40 Q 44 50 50 52" strokeWidth="0.7" />
      <path d="M 50 40 Q 56 50 56 52" strokeWidth="0.7" />
      {/* 下半身（裾） */}
      <path d="M 30 70 L 26 90 L 60 90 L 56 70" strokeWidth="0.9" />
    </g>

    {/* 杯（両手で持つ・中央） */}
    <g>
      <line x1="44" y1="50" x2="60" y2="50" strokeWidth="0.9" />
      <path d="M 46 50 Q 46 60 52 62 Q 58 60 58 50" strokeWidth="0.9" />
      <line x1="48" y1="62" x2="56" y2="62" strokeWidth="0.5" />
      {/* 中の水面 */}
      <line x1="46" y1="53" x2="58" y2="53" strokeWidth="0.4" opacity="0.7" />
    </g>

    {/* 朱の中央（杯の中、感情の中心）：queen-heart で脈動 */}
    <circle className="text-primary queen-heart" fill="currentColor" cx="52" cy="56" r="0.9" stroke="none" />
  </>
)

// 聖杯の王：水を司る老者（杯、波紋、長い髭、魚の影、笏）
// 強化：線太く・烏帽子大きく・髭重ね・肩当て・笏・装飾的杯・足元の波・複数の魚
const KingOfCups: React.FC = () => (
  <>
    {/* 高座（背景）：枠太く重厚に */}
    <g opacity="0.65">
      <line x1="6" y1="94" x2="94" y2="94" strokeWidth="1" />
      <line x1="10" y1="80" x2="90" y2="80" strokeWidth="1.2" />
      <line x1="14" y1="80" x2="14" y2="94" strokeWidth="0.9" />
      <line x1="86" y1="80" x2="86" y2="94" strokeWidth="0.9" />
      {/* 背もたれ（高い） */}
      <line x1="18" y1="80" x2="18" y2="32" strokeWidth="1.2" />
      <line x1="82" y1="80" x2="82" y2="32" strokeWidth="1.2" />
      <line x1="18" y1="32" x2="82" y2="32" strokeWidth="1.4" />
      <line x1="16" y1="32" x2="84" y2="32" strokeWidth="1" />
      {/* 背もたれ中央に大きな家紋（水紋） */}
      <circle cx="50" cy="40" r="4" strokeWidth="0.9" />
      <circle cx="50" cy="40" r="2.5" strokeWidth="0.6" opacity="0.7" />
      <path d="M 47 40 Q 50 38 53 40 Q 50 42 47 40 Z" strokeWidth="0.5" opacity="0.8" />
      <circle className="text-primary king-cups-crest" fill="currentColor" cx="50" cy="40" r="1.2" stroke="none" />
    </g>

    {/* 背景の波紋（多層、左右別位相） */}
    <g strokeWidth="0.5" opacity="0.5">
      <path className="king-ripple king-ripple-1" d="M 4 56 Q 14 52 24 56 Q 30 58 36 56" />
      <path className="king-ripple king-ripple-2" d="M 64 56 Q 70 58 76 56 Q 86 52 96 56" />
      <path className="king-ripple king-ripple-3" d="M 4 64 Q 16 60 28 64" />
      <path className="king-ripple king-ripple-4" d="M 72 64 Q 84 60 96 64" />
      <path className="king-ripple king-ripple-5" d="M 4 70 Q 14 66 24 70" />
      <path className="king-ripple king-ripple-6" d="M 76 70 Q 86 66 96 70" />
    </g>

    {/* 魚の影（右上・大きく） */}
    <g className="king-fish-swim" opacity="0.65">
      <path d="M 68 28 Q 78 22 88 28 Q 92 30 88 34 Q 78 40 68 34 Q 66 31 68 28 Z" strokeWidth="0.7" />
      <path d="M 88 28 L 96 22 L 92 32 L 96 40 L 88 34" strokeWidth="0.6" />
      {/* 目 */}
      <circle cx="76" cy="29" r="0.5" fill="currentColor" stroke="none" />
    </g>
    {/* 魚の影（左下・小さく、対の意） */}
    <g className="king-fish-swim-rev" opacity="0.5">
      <path d="M 22 76 Q 16 73 10 76 Q 8 78 10 80 Q 16 83 22 80 Z" strokeWidth="0.5" />
      <path d="M 10 76 L 4 73 L 8 80 L 4 85 L 10 80" strokeWidth="0.4" />
    </g>

    {/* 老者（大柄、座した、長い髭、威厳） */}
    <g>
      {/* 頭（大きく） */}
      <circle cx="50" cy="52" r="6" strokeWidth="1.2" />
      {/* 烏帽子（高く、立派に） */}
      <path d="M 44 46 L 44 36 L 56 36 L 56 46 Z" strokeWidth="1" />
      <line x1="44" y1="40" x2="56" y2="40" strokeWidth="0.5" opacity="0.6" />
      {/* 烏帽子の頂飾り（朱） */}
      <circle className="text-primary king-cups-eboshi-jewel" fill="currentColor" cx="50" cy="34" r="1" stroke="none" />
      {/* 顔の眼（凛とした） */}
      <line x1="46" y1="51" x2="48.5" y2="51" strokeWidth="0.5" />
      <line x1="51.5" y1="51" x2="54" y2="51" strokeWidth="0.5" />
      {/* 鼻筋 */}
      <line x1="50" y1="52" x2="50" y2="55" strokeWidth="0.4" opacity="0.7" />
      {/* 長い髭（多層、流麗に） */}
      <path d="M 44 56 Q 40 70 46 80 Q 50 78 50 66" strokeWidth="0.8" />
      <path d="M 56 56 Q 60 70 54 80 Q 50 78 50 66" strokeWidth="0.8" />
      <line x1="48" y1="60" x2="48" y2="78" strokeWidth="0.4" opacity="0.55" />
      <line x1="50" y1="60" x2="50" y2="80" strokeWidth="0.4" opacity="0.55" />
      <line x1="52" y1="60" x2="52" y2="78" strokeWidth="0.4" opacity="0.55" />
      {/* 胴体（重厚な装束、太線） */}
      <path d="M 38 58 Q 28 72 26 92 L 74 92 Q 72 72 62 58 Z" strokeWidth="1.3" />
      {/* 肩当て（左右、藍） */}
      <path d="M 40 60 Q 32 58 26 64 L 30 72" strokeWidth="1" />
      <path d="M 60 60 Q 68 58 74 64 L 70 72" strokeWidth="1" />
      <line x1="32" y1="62" x2="34" y2="68" strokeWidth="0.5" opacity="0.7" />
      <line x1="68" y1="62" x2="66" y2="68" strokeWidth="0.5" opacity="0.7" />
      {/* 帯 */}
      <line x1="34" y1="78" x2="66" y2="78" strokeWidth="1.2" />
      {/* 帯飾り（朱） */}
      <circle className="text-primary king-cups-obi" fill="currentColor" cx="50" cy="78" r="1.4" stroke="none" />
      {/* 右手（大きな杯を持つ） */}
      <path d="M 60 66 Q 68 66 74 70" strokeWidth="0.9" />
      {/* 左手（笏を握る） */}
      <path d="M 40 66 Q 32 66 28 72" strokeWidth="0.9" />
    </g>

    {/* 左手の笏（権威の象徴） */}
    <g>
      <line x1="22" y1="60" x2="28" y2="80" strokeWidth="1.4" />
      <ellipse cx="22" cy="60" rx="2.5" ry="3" strokeWidth="0.7" />
      <circle className="text-primary king-cups-shaku-jewel" fill="currentColor" cx="22" cy="60" r="1" stroke="none" />
    </g>

    {/* 大きな杯（右手、装飾的） */}
    <g>
      {/* 杯の口縁 */}
      <line x1="70" y1="68" x2="88" y2="68" strokeWidth="1.3" />
      {/* 杯の本体（大きく、優雅な曲線） */}
      <path d="M 71 68 Q 72 80 79 84 Q 86 80 87 68" strokeWidth="1.2" />
      {/* 装飾の縁 */}
      <line x1="72" y1="70" x2="86" y2="70" strokeWidth="0.4" opacity="0.6" />
      {/* 杯の足 */}
      <line x1="75" y1="84" x2="83" y2="84" strokeWidth="0.7" />
      <line x1="79" y1="84" x2="79" y2="88" strokeWidth="0.8" />
      <ellipse cx="79" cy="88" rx="3" ry="1" strokeWidth="0.7" />
      {/* 杯の中の水面（揺れる） */}
      <path className="king-cups-water" d="M 73 72 Q 76 70 79 72 Q 82 74 85 72" strokeWidth="0.5" opacity="0.7" />
    </g>

    {/* 杯の中の朱（水の魂）：king-cups-soul で強脈動 */}
    <circle className="text-primary king-cups-soul" fill="currentColor" cx="79" cy="76" r="1.2" stroke="none" />

    {/* 足元の水（波紋、王の領域を示す） */}
    <g className="king-cups-foot-water" opacity="0.4">
      <path d="M 26 88 Q 38 86 50 88 Q 62 90 74 88" strokeWidth="0.5" />
    </g>
  </>
)

const CUPS_COURT: Record<number, React.FC> = {
  11: PageOfCups,
  12: KnightOfCups,
  13: QueenOfCups,
  14: KingOfCups,
}

export function CupsCourtCard({ number }: { number: number }): React.ReactElement | null {
  const C = CUPS_COURT[number]
  if (!C) return null
  return <C />
}

export { PageOfCups, KnightOfCups, QueenOfCups, KingOfCups }

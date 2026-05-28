import React from 'react'

// 剣のコートカード（11=童 / 12=騎 / 13=妃 / 14=王）。
// 剣のトーン：風の鋭利・冷ややかな銀灰。シャープに、鮮烈に。

// 剣の童：刀を見上げる若侍、足元の風
const PageOfSwords: React.FC = () => (
  <>
    {/* 足元の風（3本の水平線）：court-windline で左に流れる */}
    <g className="court-windline" strokeWidth="0.4" opacity="0.55" strokeDasharray="4 3">
      <line x1="6" y1="84" x2="44" y2="84" />
      <line x1="6" y1="88" x2="40" y2="88" />
      <line x1="6" y1="92" x2="46" y2="92" />
    </g>

    {/* 若侍（小柄、見上げる、刀を構える） */}
    <g>
      {/* 頭（上向き） */}
      <circle cx="40" cy="50" r="4.5" strokeWidth="0.9" />
      {/* 髷 */}
      <path d="M 38 46 Q 40 42 42 46" strokeWidth="0.6" />
      {/* 胴体（後ろ反り、見上げ姿） */}
      <path d="M 36 55 Q 32 66 36 80 L 46 80 Q 50 66 46 55 Z" strokeWidth="0.9" />
      {/* 帯 */}
      <line x1="34" y1="68" x2="48" y2="68" strokeWidth="0.6" />
      {/* 両腕（刀を頭上に） */}
      <line x1="38" y1="56" x2="44" y2="36" strokeWidth="0.7" />
      <line x1="44" y1="56" x2="50" y2="36" strokeWidth="0.7" />
      {/* 足 */}
      <line x1="40" y1="80" x2="38" y2="90" strokeWidth="0.7" />
      <line x1="44" y1="80" x2="46" y2="90" strokeWidth="0.7" />
    </g>

    {/* 掲げた刀（垂直） */}
    <g>
      {/* 刀身 */}
      <line x1="46" y1="36" x2="46" y2="6" strokeWidth="1.5" />
      <line x1="48" y1="36" x2="48" y2="6" strokeWidth="1.5" />
      <path d="M 45 8 L 47 2 L 49 8" strokeWidth="1" />
      {/* 鎬 */}
      <line x1="47" y1="36" x2="47" y2="6" strokeWidth="0.4" opacity="0.6" />
      {/* 鍔 */}
      <line x1="41" y1="36" x2="53" y2="36" strokeWidth="1.4" />
      {/* 柄 */}
      <line x1="47" y1="36" x2="47" y2="42" strokeWidth="2.4" />
      {/* 朱の柄頭：court-pommel で脈動 */}
      <circle className="text-primary court-pommel" fill="currentColor" cx="47" cy="44" r="1" stroke="none" />
    </g>

    {/* 刀身の光（白光、kira-kira で流れる） */}
    <line className="court-blade-shine" x1="47" y1="10" x2="47" y2="34" strokeWidth="0.4" opacity="0.5" strokeDasharray="2 3" />
  </>
)

// 剣の騎：刀を振り上げて突進する騎馬武者
const KnightOfSwords: React.FC = () => (
  <>
    {/* 風の流線（強い、左→右）：court-windline-strong で速く流れる */}
    <g className="court-windline-strong" strokeWidth="0.4" opacity="0.5" strokeDasharray="6 3">
      <line x1="4" y1="14" x2="40" y2="14" />
      <line x1="4" y1="24" x2="36" y2="24" />
      <line x1="4" y1="60" x2="38" y2="60" />
      <line x1="4" y1="80" x2="32" y2="80" />
    </g>

    {/* 馬＋騎手＋刀：court-charge-bob で前傾の突進感を表現（強い bob） */}
    <g className="court-charge-bob">
      {/* 馬 */}
      <g>
        <path d="M 24 56 Q 30 46 50 46 Q 68 46 74 56 Q 78 70 70 78 L 30 78 Q 22 70 24 56 Z" strokeWidth="1" />
        {/* 首・頭（前へ伸ばす） */}
        <path d="M 72 56 Q 84 48 92 42 L 96 46 L 90 52" strokeWidth="1" />
        <line x1="90" y1="42" x2="92" y2="36" strokeWidth="0.6" />
        <path d="M 70 50 Q 76 46 82 48" strokeWidth="0.5" />
        <path d="M 66 54 Q 72 50 78 54" strokeWidth="0.5" />
        {/* 4本足（疾走、跳ねる） */}
        <line x1="28" y1="78" x2="22" y2="92" strokeWidth="0.9" />
        <line x1="38" y1="78" x2="44" y2="86" strokeWidth="0.9" />
        <line x1="60" y1="78" x2="54" y2="86" strokeWidth="0.9" />
        <line x1="70" y1="78" x2="74" y2="92" strokeWidth="0.9" />
        {/* 尾（流れる） */}
        <path d="M 24 58 Q 12 52 8 58" strokeWidth="0.7" />
      </g>

      {/* 騎手（刀を振り上げ） */}
      <g>
        <circle cx="50" cy="30" r="3.5" strokeWidth="0.8" />
        {/* 兜（角・三日月） */}
        <path d="M 46 28 L 46 20 L 54 20 L 54 28 Z" strokeWidth="0.7" />
        <path d="M 48 20 Q 50 14 52 20" strokeWidth="0.5" />
        {/* 胴体（前傾・突進） */}
        <path d="M 46 34 Q 42 44 46 50 L 56 50 Q 60 44 56 34 Z" strokeWidth="0.9" />
        {/* 右腕（刀を振り上げる） */}
        <line x1="56" y1="36" x2="68" y2="14" strokeWidth="0.8" />
      </g>

      {/* 振り上げた刀：knight-swords-blade で軽くきらめき */}
      <g className="knight-swords-blade">
        {/* 刀身 */}
        <line x1="68" y1="14" x2="84" y2="2" strokeWidth="1.4" />
        <line x1="66" y1="12" x2="82" y2="0" strokeWidth="1.4" />
        <path d="M 82 0 L 86 -2 L 84 4" strokeWidth="0.8" />
        {/* 鍔 */}
        <line x1="64" y1="18" x2="70" y2="10" strokeWidth="1" />
        {/* 朱の柄頭：court-pommel で脈動 */}
        <circle className="text-primary court-pommel" fill="currentColor" cx="64" cy="20" r="1" stroke="none" />
      </g>
    </g>

    {/* 地面 */}
    <line x1="6" y1="94" x2="94" y2="94" strokeWidth="0.5" />
  </>
)

// 剣の妃：刀を両手で掲げて立つ姫武者（袖タスキ）
const QueenOfSwords: React.FC = () => (
  <>
    {/* 背景の薄い雲：opacity 揺らぎ＋微妙な水平流動 */}
    <g strokeWidth="0.4" opacity="0.4">
      <path className="queen-swords-cloud queen-swords-cloud-1" d="M 4 26 Q 16 22 28 26" />
      <path className="queen-swords-cloud queen-swords-cloud-2" d="M 72 22 Q 84 18 96 22" />
      <path className="queen-swords-cloud queen-swords-cloud-3" d="M 8 36 Q 24 32 40 36" />
    </g>

    {/* 姫武者（中型、立ち姿） */}
    <g>
      {/* 頭 */}
      <circle cx="50" cy="34" r="5" strokeWidth="0.9" />
      {/* 長い髪（後ろ）：court-hair-sway */}
      <path className="court-hair-sway" d="M 46 30 Q 38 38 36 56 Q 38 70 44 76" strokeWidth="0.7" />
      <path className="court-hair-sway" d="M 54 30 Q 58 34 56 38" strokeWidth="0.5" opacity="0.7" />
      {/* 顔の朱（凛とした目） */}
      <line x1="51" y1="33" x2="54" y2="33" strokeWidth="0.4" />
      {/* 胴体（タスキ姿、引き締まる） */}
      <path d="M 44 39 Q 38 54 38 72 L 62 72 Q 62 54 56 39 Z" strokeWidth="0.9" />
      {/* タスキ（X字に襷掛け） */}
      <line x1="42" y1="42" x2="60" y2="60" strokeWidth="0.7" />
      <line x1="58" y1="42" x2="42" y2="60" strokeWidth="0.7" />
      {/* 帯 */}
      <line x1="40" y1="56" x2="60" y2="56" strokeWidth="0.9" />
      {/* 両腕（刀を構える） */}
      <line x1="44" y1="42" x2="36" y2="50" strokeWidth="0.7" />
      <line x1="56" y1="42" x2="64" y2="50" strokeWidth="0.7" />
      {/* 下半身 */}
      <path d="M 38 72 L 32 92 L 68 92 L 62 72" strokeWidth="0.9" />
    </g>

    {/* 刀（両手で水平に構える、画面下部）：queen-swords-blade で時折ひらめき */}
    <g className="queen-swords-blade">
      <line x1="20" y1="52" x2="76" y2="52" strokeWidth="1.6" />
      <path d="M 76 52 L 82 50 L 76 54" strokeWidth="0.9" />
      <line x1="20" y1="54" x2="76" y2="54" strokeWidth="0.5" opacity="0.5" />
      {/* 鎬 */}
      <line x1="22" y1="53" x2="74" y2="53" strokeWidth="0.3" opacity="0.6" />
      {/* 鍔 */}
      <line x1="32" y1="48" x2="32" y2="56" strokeWidth="1" />
      {/* 柄 */}
      <line x1="32" y1="52" x2="20" y2="52" strokeWidth="2.4" />
      {/* 朱の柄頭：court-pommel で脈動 */}
      <circle className="text-primary court-pommel" fill="currentColor" cx="18" cy="52" r="1.2" stroke="none" />
    </g>

    {/* 地面 */}
    <line x1="6" y1="94" x2="94" y2="94" strokeWidth="0.5" />
  </>
)

// 剣の王：高座の老武将（長髭、肩に刀、静謐）
// 強化：太線・肩当て立体感・烏帽子に頂飾り・髭多層
const KingOfSwords: React.FC = () => (
  <>
    {/* 高座（背景、太線で重厚） */}
    <g>
      <line x1="6" y1="94" x2="94" y2="94" strokeWidth="1" />
      <line x1="10" y1="78" x2="90" y2="78" strokeWidth="1.2" />
      <line x1="14" y1="78" x2="14" y2="94" strokeWidth="0.9" />
      <line x1="86" y1="78" x2="86" y2="94" strokeWidth="0.9" />
      {/* 背もたれ（高い、太線） */}
      <line x1="18" y1="78" x2="18" y2="28" strokeWidth="1.2" />
      <line x1="82" y1="78" x2="82" y2="28" strokeWidth="1.2" />
      <line x1="18" y1="28" x2="82" y2="28" strokeWidth="1.4" />
      <line x1="16" y1="28" x2="84" y2="28" strokeWidth="1" />
      {/* 古い柱の節 */}
      <line x1="18" y1="50" x2="22" y2="50" strokeWidth="0.5" />
      <line x1="78" y1="50" x2="82" y2="50" strokeWidth="0.5" />
      <line x1="18" y1="66" x2="22" y2="66" strokeWidth="0.5" />
      <line x1="78" y1="66" x2="82" y2="66" strokeWidth="0.5" />
      {/* 背もたれ中央の家紋（大きく、十字を強調） */}
      <circle cx="50" cy="36" r="4" strokeWidth="0.9" />
      <circle cx="50" cy="36" r="2.5" strokeWidth="0.5" opacity="0.7" />
      <line x1="50" y1="32" x2="50" y2="40" strokeWidth="0.6" />
      <line x1="46" y1="36" x2="54" y2="36" strokeWidth="0.6" />
      <circle className="text-primary king-swords-crest" fill="currentColor" cx="50" cy="36" r="1.2" stroke="none" />
    </g>

    {/* 老武将（大柄、座した、長い髭、太線で威厳） */}
    <g>
      {/* 頭 */}
      <circle cx="50" cy="52" r="6" strokeWidth="1.2" />
      {/* 烏帽子（高く、頂飾り） */}
      <path d="M 44 46 L 44 38 L 56 38 L 56 46 Z" strokeWidth="1" />
      <line x1="44" y1="42" x2="56" y2="42" strokeWidth="0.5" opacity="0.6" />
      {/* 烏帽子の頂飾り（朱） */}
      <circle className="text-primary king-swords-eboshi" fill="currentColor" cx="50" cy="36" r="0.9" stroke="none" />
      {/* 顔の眼（凛と） */}
      <line x1="46" y1="51" x2="48.5" y2="51" strokeWidth="0.5" />
      <line x1="51.5" y1="51" x2="54" y2="51" strokeWidth="0.5" />
      {/* 長い髭（多層） */}
      <path d="M 44 58 Q 40 74 50 80 Q 60 74 56 58" strokeWidth="0.8" />
      <line x1="48" y1="60" x2="48" y2="78" strokeWidth="0.4" opacity="0.5" />
      <line x1="50" y1="60" x2="50" y2="80" strokeWidth="0.4" opacity="0.55" />
      <line x1="52" y1="60" x2="52" y2="78" strokeWidth="0.4" opacity="0.5" />
      {/* 胴体（太線） */}
      <path d="M 38 60 Q 28 72 26 90 L 74 90 Q 72 72 62 60 Z" strokeWidth="1.3" />
      {/* 肩当て（立体） */}
      <path d="M 40 62 Q 32 60 28 66 L 32 72" strokeWidth="1" />
      <path d="M 60 62 Q 68 60 72 66 L 68 72" strokeWidth="1" />
      <line x1="34" y1="64" x2="35" y2="70" strokeWidth="0.5" opacity="0.65" />
      <line x1="66" y1="64" x2="65" y2="70" strokeWidth="0.5" opacity="0.65" />
      {/* 帯 */}
      <line x1="34" y1="76" x2="66" y2="76" strokeWidth="1.2" />
      <circle className="text-primary king-swords-obi" fill="currentColor" cx="50" cy="76" r="1.3" stroke="none" />
    </g>

    {/* 肩に立てかける刀（右肩、垂直）：king-swords-blade で全体光る */}
    <g className="king-swords-blade">
      {/* 刀身（太線） */}
      <line x1="74" y1="60" x2="74" y2="12" strokeWidth="1.7" />
      <line x1="76" y1="60" x2="76" y2="12" strokeWidth="1.7" />
      <path d="M 73 14 L 75 6 L 77 14" strokeWidth="1.1" />
      {/* 鎬 */}
      <line x1="75" y1="60" x2="75" y2="14" strokeWidth="0.4" opacity="0.6" />
      {/* 鍔 */}
      <line x1="68" y1="60" x2="82" y2="60" strokeWidth="1.5" />
      {/* 柄 */}
      <line x1="75" y1="60" x2="75" y2="72" strokeWidth="2.6" />
      {/* 朱の柄頭 */}
      <circle className="text-primary court-pommel" fill="currentColor" cx="75" cy="74" r="1.3" stroke="none" />
    </g>

    {/* 刀身の光（権威の印）：king-swords-shine で dash flow */}
    <line className="king-swords-shine" x1="75" y1="16" x2="75" y2="58" strokeWidth="0.5" opacity="0.55" strokeDasharray="3 4" />
  </>
)

const SWORDS_COURT: Record<number, React.FC> = {
  11: PageOfSwords,
  12: KnightOfSwords,
  13: QueenOfSwords,
  14: KingOfSwords,
}

export function SwordsCourtCard({ number }: { number: number }): React.ReactElement | null {
  const C = SWORDS_COURT[number]
  if (!C) return null
  return <C />
}

export { PageOfSwords, KnightOfSwords, QueenOfSwords, KingOfSwords }

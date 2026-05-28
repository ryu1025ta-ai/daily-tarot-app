import React from 'react'

// 杖のコートカード（11=童 / 12=騎 / 13=妃 / 14=王）。
// 設計原則：人物のシルエットを描き、漢字1文字+小アイコンの旧パターンを完全に脱却。
// 階級ごとにサイズ・ポーズを差別化：
//   - 童：小柄、見上げる
//   - 騎：中型、動的（馬上）
//   - 妃：中型、静かな立ち姿
//   - 王：大柄、高座

// 杖の童：三足の火鉢の前に座る若い見習い、見上げる
const PageOfWands: React.FC = () => (
  <>
    {/* 地面 */}
    <line x1="6" y1="92" x2="94" y2="92" strokeWidth="0.5" />

    {/* 三足の火鉢 */}
    <g>
      {/* 鉢の上縁 */}
      <ellipse cx="68" cy="58" rx="14" ry="3" strokeWidth="1" />
      {/* 鉢の側面 */}
      <path d="M 54 58 Q 54 70 60 76 L 76 76 Q 82 70 82 58" strokeWidth="1" />
      {/* 三本足 */}
      <line x1="58" y1="74" x2="56" y2="86" strokeWidth="0.8" />
      <line x1="68" y1="76" x2="68" y2="86" strokeWidth="0.8" />
      <line x1="78" y1="74" x2="80" y2="86" strokeWidth="0.8" />
    </g>

    {/* 火（鉢の中から大きく）：3層の炎が flame-flicker で揺らぐ */}
    <g className="text-primary" fill="currentColor" stroke="none">
      <path className="court-flame court-flame-outer" d="M 56 58 Q 52 42 60 28 Q 64 38 68 24 Q 70 36 76 26 Q 80 40 80 58 Z" opacity="0.45" />
      <path className="court-flame court-flame-mid" d="M 60 58 Q 58 46 64 36 Q 66 42 68 32 Q 72 42 76 36 Q 78 46 76 58 Z" opacity="0.85" />
      <path className="court-flame court-flame-inner" d="M 64 58 Q 64 50 68 44 Q 72 50 72 58 Z" />
      {/* 火の粉：上昇＋フェードで生まれる */}
      <circle className="court-ember court-ember-1" cx="56" cy="22" r="0.6" opacity="0.7" />
      <circle className="court-ember court-ember-2" cx="72" cy="16" r="0.5" opacity="0.6" />
      <circle className="court-ember court-ember-3" cx="80" cy="22" r="0.5" opacity="0.55" />
      <circle className="court-ember court-ember-4" cx="48" cy="38" r="0.4" opacity="0.5" />
    </g>

    {/* 若い見習い（小柄、地面に座って見上げる） */}
    <g>
      {/* 頭（やや上向き） */}
      <circle cx="24" cy="58" r="4" strokeWidth="0.9" />
      {/* 髷（小さく） */}
      <path d="M 22 54 Q 24 50 26 54" strokeWidth="0.6" />
      {/* 胴体（座って前傾） */}
      <path d="M 20 62 Q 16 72 18 80 L 32 80 Q 30 72 28 62 Z" strokeWidth="0.9" />
      {/* 腕（火を指差す） */}
      <path d="M 28 66 Q 36 64 44 60" strokeWidth="0.7" />
      {/* 折りたたんだ脚 */}
      <path d="M 18 80 Q 14 86 22 90 L 30 90 Q 32 86 30 80" strokeWidth="0.7" />
    </g>

    {/* 視線の朱（火を見つめる目印）：脈動で「見つめる集中」を表現 */}
    <circle className="text-primary court-gaze" fill="currentColor" cx="28" cy="58" r="0.5" stroke="none" />
  </>
)

// 杖の騎：火のついた松明を掲げて駆ける騎馬武者
const KnightOfWands: React.FC = () => (
  <>
    {/* 地面（速度線）：左に流れて疾走感 */}
    <line x1="6" y1="86" x2="94" y2="86" strokeWidth="0.5" />
    <g className="court-speedline" strokeWidth="0.3" opacity="0.4" strokeDasharray="4 3">
      <line x1="6" y1="80" x2="40" y2="80" />
      <line x1="6" y1="92" x2="40" y2="92" />
    </g>

    {/* 馬と騎手（駈ける）：horse-bob で上下に揺れる疾走感 */}
    <g className="court-rider-bob">
      <g>
        {/* 胴体 */}
        <path d="M 28 58 Q 32 50 50 50 Q 68 50 72 58 Q 74 70 68 76 L 32 76 Q 26 70 28 58 Z" strokeWidth="1" />
        {/* 首 + 頭 */}
        <path d="M 70 58 Q 78 50 84 44 L 88 46 L 90 50 L 82 56" strokeWidth="0.9" />
        {/* 耳・鬣 */}
        <line x1="84" y1="44" x2="82" y2="40" strokeWidth="0.6" />
        <path d="M 72 52 Q 76 48 80 50" strokeWidth="0.5" />
        <path d="M 68 56 Q 72 52 76 56" strokeWidth="0.5" />
        {/* 4本足（駈ける動き） */}
        <line x1="34" y1="76" x2="30" y2="88" strokeWidth="0.9" />
        <line x1="42" y1="76" x2="46" y2="86" strokeWidth="0.9" />
        <line x1="60" y1="76" x2="56" y2="86" strokeWidth="0.9" />
        <line x1="68" y1="76" x2="72" y2="88" strokeWidth="0.9" />
        {/* 尾 */}
        <path d="M 30 60 Q 18 58 14 66" strokeWidth="0.7" />
      </g>

      {/* 騎手（馬上） */}
      <g>
        {/* 頭 */}
        <circle cx="50" cy="32" r="3.5" strokeWidth="0.8" />
        {/* 兜 */}
        <path d="M 46 30 Q 50 24 54 30 Z" strokeWidth="0.6" />
        {/* 胴体（前傾） */}
        <path d="M 46 36 Q 42 46 48 52 L 56 52 Q 58 46 54 36 Z" strokeWidth="0.9" />
        {/* 腕（松明を掲げる） */}
        <line x1="52" y1="38" x2="64" y2="22" strokeWidth="0.8" />
      </g>

      {/* 松明 */}
      <line x1="64" y1="22" x2="78" y2="8" strokeWidth="1.4" />
      <line x1="68" y1="20" x2="70" y2="14" strokeWidth="0.6" />
      {/* 火（松明先端）：torch-flame で揺らぐ */}
      <g className="text-primary court-torch-flame" fill="currentColor" stroke="none">
        <path d="M 78 8 Q 70 4 74 -4 Q 78 2 82 -4 Q 86 4 78 8 Z" opacity="0.5" />
        <path d="M 78 8 Q 74 4 76 0 Q 78 4 80 0 Q 82 4 78 8 Z" />
      </g>
    </g>

    {/* 火の粉の軌跡（駈ける後ろに）：左に流れて消える */}
    <g className="text-primary" fill="currentColor" stroke="none">
      <circle className="court-spark-trail court-spark-trail-1" cx="56" cy="14" r="0.6" opacity="0.7" />
      <circle className="court-spark-trail court-spark-trail-2" cx="44" cy="20" r="0.5" opacity="0.6" />
      <circle className="court-spark-trail court-spark-trail-3" cx="34" cy="26" r="0.4" opacity="0.5" />
      <circle className="court-spark-trail court-spark-trail-4" cx="24" cy="32" r="0.4" opacity="0.4" />
    </g>
  </>
)

// 杖の妃：火を司る姫武者（長髪・側面、松明を掲げる）
const QueenOfWands: React.FC = () => (
  <>
    {/* 地面 */}
    <line x1="6" y1="92" x2="94" y2="92" strokeWidth="0.5" />

    {/* 玉座（控えめ） */}
    <g opacity="0.6">
      <line x1="20" y1="92" x2="80" y2="92" strokeWidth="0.8" />
      <line x1="22" y1="92" x2="22" y2="74" strokeWidth="0.6" />
      <line x1="78" y1="92" x2="78" y2="74" strokeWidth="0.6" />
      <line x1="22" y1="74" x2="78" y2="74" strokeWidth="0.5" />
    </g>

    {/* 姫武者（中型、立ち姿） */}
    <g>
      {/* 頭（側面） */}
      <circle cx="50" cy="26" r="5" strokeWidth="0.9" />
      {/* 千代田型の髪（長く後ろへ）：court-hair-sway で静かに揺れる */}
      <path className="court-hair-sway" d="M 46 22 Q 38 26 32 38 Q 30 50 36 60" strokeWidth="0.7" />
      <path className="court-hair-sway" d="M 48 22 Q 42 26 38 36" strokeWidth="0.5" />
      {/* 顔の朱（眉/口の印） */}
      <line x1="51" y1="26" x2="54" y2="26" strokeWidth="0.4" />
      {/* 胴体（着物の流れ） */}
      <path d="M 44 31 Q 38 50 40 70 L 60 70 Q 62 50 56 31 Z" strokeWidth="1" />
      {/* 帯（中央） */}
      <line x1="40" y1="48" x2="60" y2="48" strokeWidth="1" />
      {/* 袖（左、火を掲げる） */}
      <path d="M 44 36 Q 32 36 28 30 L 30 24 Q 36 20 44 28" strokeWidth="0.8" />
      {/* 袖（右、扇を持つ） */}
      <path d="M 56 36 Q 68 38 70 50 L 66 60 Q 60 50 56 44" strokeWidth="0.8" />
      {/* 下半身（裾の広がり） */}
      <path d="M 40 70 L 34 90 L 66 90 L 60 70" strokeWidth="0.9" />
      <line x1="50" y1="70" x2="50" y2="90" strokeWidth="0.4" opacity="0.6" />
    </g>

    {/* 掲げる松明（左手の上、画面外左へ向かう） */}
    <g>
      <line x1="28" y1="24" x2="16" y2="14" strokeWidth="1.4" />
      {/* 火：court-torch-flame で揺らぐ */}
      <g className="text-primary court-torch-flame" fill="currentColor" stroke="none">
        <path d="M 16 14 Q 6 10 8 2 Q 12 8 16 0 Q 20 8 24 2 Q 24 10 16 14 Z" opacity="0.5" />
        <path d="M 16 14 Q 10 10 12 4 Q 16 8 20 4 Q 22 10 16 14 Z" />
      </g>
    </g>

    {/* 扇（右手）の朱の縁：court-fan-glow で脈動 */}
    <path className="text-primary court-fan-glow" d="M 64 56 Q 72 50 74 42" strokeWidth="0.6" stroke="currentColor" fill="none" opacity="0.85" />
  </>
)

// 杖の王：火を使う老武将（高座、能装、大きな竹杯の火、刀）
const KingOfWands: React.FC = () => (
  <>
    {/* 高座（大きく、重厚） */}
    <g>
      <line x1="6" y1="94" x2="94" y2="94" strokeWidth="0.7" />
      <line x1="10" y1="78" x2="90" y2="78" strokeWidth="1" />
      <line x1="14" y1="78" x2="14" y2="94" strokeWidth="0.7" />
      <line x1="86" y1="78" x2="86" y2="94" strokeWidth="0.7" />
      {/* 背もたれ */}
      <line x1="18" y1="78" x2="18" y2="36" strokeWidth="1" />
      <line x1="82" y1="78" x2="82" y2="36" strokeWidth="1" />
      <line x1="18" y1="36" x2="82" y2="36" strokeWidth="1.2" />
      {/* 装飾（家紋）：court-crest で威厳脈動 */}
      <circle cx="50" cy="42" r="3" strokeWidth="0.7" opacity="0.7" />
      <circle className="text-primary court-crest" fill="currentColor" cx="50" cy="42" r="1.2" stroke="none" />
    </g>

    {/* 老武将（座した、大柄） */}
    <g>
      {/* 頭 */}
      <circle cx="50" cy="56" r="5.5" strokeWidth="1" />
      {/* 烏帽子 */}
      <path d="M 46 50 L 46 44 L 54 44 L 54 50 Z" strokeWidth="0.7" />
      {/* 髭（長く） */}
      <path d="M 48 60 Q 46 70 50 72 Q 54 70 52 60" strokeWidth="0.6" />
      {/* 胴体（能装、重厚） */}
      <path d="M 40 62 Q 32 72 30 88 L 70 88 Q 68 72 60 62 Z" strokeWidth="1" />
      {/* 肩当て（左右） */}
      <path d="M 42 62 Q 36 60 30 64 L 34 70" strokeWidth="0.7" />
      <path d="M 58 62 Q 64 60 70 64 L 66 70" strokeWidth="0.7" />
      {/* 腰の刀（左腰、斜め） */}
      <line x1="36" y1="76" x2="22" y2="86" strokeWidth="1.4" />
      <line x1="34" y1="74" x2="38" y2="78" strokeWidth="0.6" />
      {/* 朱の柄頭：court-pommel で脈動 */}
      <circle className="text-primary court-pommel" fill="currentColor" cx="22" cy="86" r="1.2" stroke="none" />
    </g>

    {/* 右側の大きな竹杯型の火（背後・象徴） */}
    <g>
      {/* 竹杯 */}
      <line x1="74" y1="76" x2="86" y2="76" strokeWidth="1" />
      <path d="M 76 76 Q 76 70 80 66 L 80 60" strokeWidth="0.8" />
      <path d="M 84 76 Q 84 70 80 66" strokeWidth="0.8" />
      {/* 大きな火：king-flame で雄壮に揺らぐ */}
      <g className="text-primary" fill="currentColor" stroke="none">
        <path className="king-flame king-flame-outer" d="M 72 64 Q 64 50 74 32 Q 78 42 80 30 Q 82 42 86 32 Q 92 48 88 64 Z" opacity="0.45" />
        <path className="king-flame king-flame-inner" d="M 76 64 Q 72 52 78 42 Q 80 48 82 38 Q 86 48 84 64 Z" opacity="0.8" />
        {/* 火の粉：court-ember で上昇 */}
        <circle className="court-ember court-ember-1" cx="68" cy="22" r="0.5" opacity="0.7" />
        <circle className="court-ember court-ember-2" cx="82" cy="20" r="0.4" opacity="0.6" />
        <circle className="court-ember court-ember-3" cx="92" cy="26" r="0.5" opacity="0.6" />
      </g>
    </g>
  </>
)

const WANDS_COURT: Record<number, React.FC> = {
  11: PageOfWands,
  12: KnightOfWands,
  13: QueenOfWands,
  14: KingOfWands,
}

export function WandsCourtCard({ number }: { number: number }): React.ReactElement | null {
  const C = WANDS_COURT[number]
  if (!C) return null
  return <C />
}

export { PageOfWands, KnightOfWands, QueenOfWands, KingOfWands }

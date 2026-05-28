import React from 'react'

// 聖杯（Cups）Common 数札 一〜十。
// 設計原則（wands.tsx と統一）：
//   - viewBox 0 0 100 100 のフル領域に絵を描く。
//   - 線は親 SVG の rarity-symbol-common から currentColor 継承（墨）。
//   - 朱赤アクセント（雫・花の中心）は className="text-primary"。
//   - 聖杯は「水＝下方向・広がり・柔らかさ」の表現。点ではなく線（波・流線）で動きを示す。
//   - 杖が「火の動・鮮やかな朱」なら聖杯は「水の静・柔らかな藍」。

// 共通：抹茶碗型の盃
const Bowl: React.FC<{ x: number; y: number; r?: number; opacity?: number }> = ({ x, y, r = 8, opacity = 1 }) => (
  <g opacity={opacity}>
    {/* 口（上端） */}
    <line x1={x - r} y1={y} x2={x + r} y2={y} strokeWidth="1.1" />
    {/* 側面（碗の弧） */}
    <path
      d={`M ${x - r} ${y} Q ${x - r * 0.95} ${y + r * 1.3} ${x} ${y + r * 1.5} Q ${x + r * 0.95} ${y + r * 1.3} ${x + r} ${y}`}
      strokeWidth="1.1"
    />
    {/* 高台 */}
    <line x1={x - r * 0.55} y1={y + r * 1.5} x2={x + r * 0.55} y2={y + r * 1.5} strokeWidth="0.7" />
    <line x1={x - r * 0.75} y1={y + r * 1.7} x2={x + r * 0.75} y2={y + r * 1.7} strokeWidth="0.7" />
  </g>
)

// 一：抹茶碗から一滴 + 3重の波紋 ★★☆☆☆
const AceOfCups: React.FC = () => (
  <>
    {/* 抹茶碗（上部・大きめ） */}
    <Bowl x={50} y={22} r={12} />
    {/* 抹茶の水面（碗の中） */}
    <line x1="40" y1="26" x2="60" y2="26" strokeWidth="0.5" opacity="0.7" />

    {/* 零れる一滴（碗の口縁から） */}
    <path d="M 62 22 Q 64 34 60 46 Q 56 52 60 60" strokeWidth="0.5" opacity="0.6" />
    {/* 滴本体（朱） */}
    <path
      d="M 60 60 Q 56 64 58 68 Q 62 70 64 66 Q 64 62 60 60 Z"
      className="text-primary"
      fill="currentColor"
      stroke="none"
    />

    {/* 着水後の3重の波紋 */}
    <ellipse cx="60" cy="74" rx="8" ry="2" strokeWidth="0.7" />
    <ellipse cx="60" cy="78" rx="18" ry="3" strokeWidth="0.5" opacity="0.75" />
    <ellipse cx="60" cy="82" rx="30" ry="4" strokeWidth="0.4" opacity="0.5" />
  </>
)

// 二：二つの盃が触れ合い、間に湯気のような曲線3本 ★★☆☆☆
const TwoOfCups: React.FC = () => (
  <>
    {/* 左盃 */}
    <Bowl x={30} y={50} r={11} />
    {/* 右盃 */}
    <Bowl x={70} y={50} r={11} />

    {/* 触れ合う中央の交わり（湯気） */}
    <path d="M 44 48 Q 50 38 56 48" strokeWidth="0.7" opacity="0.7" />
    <path d="M 44 42 Q 50 32 56 42" strokeWidth="0.6" opacity="0.55" />
    <path d="M 44 36 Q 50 26 56 36" strokeWidth="0.5" opacity="0.4" />

    {/* 中央の朱（縁結びの印） */}
    <circle className="text-primary" fill="currentColor" cx="50" cy="50" r="1.4" stroke="none" />

    {/* 地（水盤） */}
    <line x1="14" y1="80" x2="86" y2="80" strokeWidth="0.5" opacity="0.5" />
  </>
)

// 三：三つの盃が三角に並び、上から雫が落ちる ★★★☆☆
const ThreeOfCups: React.FC = () => (
  <>
    {/* 上中央 */}
    <Bowl x={50} y={26} r={10} />
    {/* 左下 */}
    <Bowl x={26} y={58} r={10} />
    {/* 右下 */}
    <Bowl x={74} y={58} r={10} />

    {/* 上空から3つの雫（朱） */}
    <g className="text-primary" fill="currentColor" stroke="none">
      <path d="M 50 14 Q 47 18 49 22 Q 52 22 51 18 Q 50 16 50 14 Z" />
      <path d="M 26 46 Q 23 50 25 54 Q 28 54 27 50 Q 26 48 26 46 Z" />
      <path d="M 74 46 Q 71 50 73 54 Q 76 54 75 50 Q 74 48 74 46 Z" />
    </g>
    {/* 雫の軌跡 */}
    <path d="M 50 16 L 50 22" strokeWidth="0.4" strokeDasharray="1 1.5" />
    <path d="M 26 48 L 26 54" strokeWidth="0.4" strokeDasharray="1 1.5" />
    <path d="M 74 48 L 74 54" strokeWidth="0.4" strokeDasharray="1 1.5" />

    {/* 各盃の口元に小さな波紋 */}
    <line x1="42" y1="27" x2="58" y2="27" strokeWidth="0.4" opacity="0.7" />
    <line x1="18" y1="59" x2="34" y2="59" strokeWidth="0.4" opacity="0.7" />
    <line x1="66" y1="59" x2="82" y2="59" strokeWidth="0.4" opacity="0.7" />

    {/* 地の薄い線 */}
    <line x1="6" y1="88" x2="94" y2="88" strokeWidth="0.4" opacity="0.5" />
  </>
)

// 四：四つの盃、三つは並び・一つだけ離れて空 ★★★☆☆
const FourOfCups: React.FC = () => (
  <>
    {/* 並ぶ三つ（水盤に整列、満ちている） */}
    <Bowl x={24} y={50} r={9} />
    <Bowl x={50} y={50} r={9} />
    <Bowl x={76} y={50} r={9} />
    {/* 水面ライン（満たされた印） */}
    <line x1="17" y1="52" x2="31" y2="52" strokeWidth="0.5" opacity="0.7" />
    <line x1="43" y1="52" x2="57" y2="52" strokeWidth="0.5" opacity="0.7" />
    <line x1="69" y1="52" x2="83" y2="52" strokeWidth="0.5" opacity="0.7" />

    {/* 離れた一つ（下部、空・点線で「？」気を示す） */}
    <Bowl x={50} y={82} r={8} opacity={0.85} />
    {/* 空っぽマーク：中に水なし、上に「?」の気 */}
    <path d="M 47 76 Q 50 72 53 76" strokeWidth="0.5" strokeDasharray="1 1.5" opacity="0.8" />
    <path d="M 50 78 L 50 80" strokeWidth="0.5" opacity="0.7" />

    {/* 三つから離れた盃へ向かう疑問の細い気（点線） */}
    <path d="M 50 60 L 50 74" strokeWidth="0.4" strokeDasharray="1 2" opacity="0.5" />

    {/* 朱の小さな印（離れた盃の中央、寂しさ） */}
    <circle className="text-primary" fill="currentColor" cx="50" cy="92" r="0.8" stroke="none" opacity="0.7" />

    {/* 地 */}
    <line x1="6" y1="68" x2="94" y2="68" strokeWidth="0.4" opacity="0.5" />
  </>
)

// 五：五つの盃、三つは倒れて水が流れ・二つは立つ ★★★★☆
const FiveOfCups: React.FC = () => (
  <>
    {/* 手前下部の倒れた3つ（横向き） */}
    {/* 倒れた盃1（左） */}
    <g>
      <path d="M 12 78 Q 12 70 22 70 L 26 70 Q 26 78 22 80 Q 16 80 12 78 Z" strokeWidth="1" />
      <line x1="22" y1="70" x2="22" y2="80" strokeWidth="0.5" />
      {/* 流れ出る水 */}
      <path d="M 12 78 Q 8 84 10 92" strokeWidth="0.5" opacity="0.7" />
      <path d="M 6 86 Q 10 90 12 92" strokeWidth="0.4" opacity="0.5" />
    </g>
    {/* 倒れた盃2（中央） */}
    <g>
      <path d="M 38 82 Q 38 74 48 74 L 52 74 Q 52 82 48 84 Q 42 84 38 82 Z" strokeWidth="1" />
      <line x1="48" y1="74" x2="48" y2="84" strokeWidth="0.5" />
      <path d="M 38 82 Q 34 86 36 92" strokeWidth="0.5" opacity="0.7" />
      <path d="M 32 88 Q 38 92 42 94" strokeWidth="0.4" opacity="0.5" />
    </g>
    {/* 倒れた盃3（右） */}
    <g>
      <path d="M 64 80 Q 64 72 74 72 L 78 72 Q 78 80 74 82 Q 68 82 64 80 Z" strokeWidth="1" />
      <line x1="74" y1="72" x2="74" y2="82" strokeWidth="0.5" />
      <path d="M 64 80 Q 60 86 62 92" strokeWidth="0.5" opacity="0.7" />
      <path d="M 58 86 Q 64 90 66 92" strokeWidth="0.4" opacity="0.5" />
    </g>

    {/* 奥に立つ2つ（小さく描いて遠近感） */}
    <Bowl x={32} y={28} r={7} opacity={0.9} />
    <Bowl x={62} y={32} r={7} opacity={0.9} />
    {/* 水面（満ちている印） */}
    <line x1="26" y1="30" x2="38" y2="30" strokeWidth="0.5" opacity="0.7" />
    <line x1="56" y1="34" x2="68" y2="34" strokeWidth="0.5" opacity="0.7" />

    {/* 残された希望の朱（立つ盃の中央） */}
    <circle className="text-primary" fill="currentColor" cx="32" cy="32" r="0.9" stroke="none" />
    <circle className="text-primary" fill="currentColor" cx="62" cy="36" r="0.9" stroke="none" />

    {/* 雨（喪失の演出） */}
    <g strokeWidth="0.4" opacity="0.4">
      <line x1="14" y1="12" x2="18" y2="22" />
      <line x1="34" y1="8" x2="38" y2="18" />
      <line x1="50" y1="14" x2="54" y2="24" />
      <line x1="78" y1="10" x2="82" y2="20" />
    </g>
  </>
)

// 六：六つの盃が満月の下、各盃に小さな花 ★★★☆☆
const SixOfCups: React.FC = () => (
  <>
    {/* 上部の満月 */}
    <circle cx="50" cy="20" r="10" strokeWidth="0.8" />
    {/* 月の模様（薄く） */}
    <path d="M 46 17 Q 50 20 54 18" strokeWidth="0.4" opacity="0.5" />
    <circle cx="46" cy="22" r="1.2" strokeWidth="0.4" opacity="0.5" />

    {/* 3+3 の配置：上段3つ */}
    <Bowl x={20} y={48} r={8} />
    <Bowl x={50} y={48} r={8} />
    <Bowl x={80} y={48} r={8} />
    {/* 下段3つ */}
    <Bowl x={20} y={78} r={8} />
    <Bowl x={50} y={78} r={8} />
    <Bowl x={80} y={78} r={8} />

    {/* 各盃に小さな桜の五弁の花（朱） */}
    {[
      { x: 20, y: 50 }, { x: 50, y: 50 }, { x: 80, y: 50 },
      { x: 20, y: 80 }, { x: 50, y: 80 }, { x: 80, y: 80 },
    ].map((p, i) => (
      <g key={i} className="text-primary" fill="currentColor" stroke="none">
        {/* 5つの花弁 */}
        {[0, 72, 144, 216, 288].map((deg) => {
          const rad = (deg * Math.PI) / 180
          const px = p.x + Math.cos(rad) * 1.6
          const py = p.y + Math.sin(rad) * 1.6
          return <circle key={deg} cx={px.toFixed(2)} cy={py.toFixed(2)} r="0.9" />
        })}
        {/* 中心 */}
        <circle cx={p.x} cy={p.y} r="0.6" opacity="0.6" />
      </g>
    ))}
  </>
)

// 七：七つの盃が雲の上に、それぞれから異なる気 ★★★★☆
const SevenOfCups: React.FC = () => (
  <>
    {/* 下部の雲（曲線） */}
    <path d="M 4 76 Q 14 70 24 76 Q 34 70 44 76 Q 54 70 64 76 Q 74 70 84 76 Q 94 70 96 78" strokeWidth="1" />
    <path d="M 4 82 Q 16 78 28 82 Q 40 78 52 82 Q 64 78 76 82 Q 88 78 96 82" strokeWidth="0.6" opacity="0.7" />

    {/* 雲の上に7つの盃（小さめ、上下にバラつき） */}
    {[
      { x: 14, y: 60 }, { x: 28, y: 56 }, { x: 42, y: 60 },
      { x: 56, y: 56 }, { x: 70, y: 60 }, { x: 84, y: 56 },
      { x: 50, y: 44 },
    ].map((p, i) => (
      <Bowl key={i} x={p.x} y={p.y} r={5} opacity={0.95} />
    ))}

    {/* 各盃から立ち上る異なる気 */}
    <g strokeWidth="0.5" opacity="0.75">
      {/* 1: 真上 */}
      <path d="M 14 58 L 14 44" />
      {/* 2: 波打ち */}
      <path d="M 28 54 Q 26 48 28 42 Q 30 38 28 32" />
      {/* 3: 螺旋 */}
      <path d="M 42 58 Q 46 54 42 50 Q 38 46 42 42" />
      {/* 4: 二股 */}
      <path d="M 56 54 L 52 42" />
      <path d="M 56 54 L 60 42" />
      {/* 5: 蛇行 */}
      <path d="M 70 58 Q 74 52 70 48 Q 66 44 70 38" />
      {/* 6: 点線（霧） */}
      <path d="M 84 54 L 84 38" strokeDasharray="1.5 2" />
      {/* 7: 中央上、星形に発散 */}
      <path d="M 50 42 L 50 30" />
      <path d="M 50 42 L 44 32" />
      <path d="M 50 42 L 56 32" />
    </g>

    {/* 朱の中心点（盃ごとに微かに） */}
    <g className="text-primary" fill="currentColor" stroke="none">
      <circle cx="14" cy="62" r="0.6" />
      <circle cx="28" cy="58" r="0.6" />
      <circle cx="42" cy="62" r="0.6" />
      <circle cx="56" cy="58" r="0.6" />
      <circle cx="70" cy="62" r="0.6" />
      <circle cx="84" cy="58" r="0.6" />
      <circle cx="50" cy="46" r="0.8" />
    </g>
  </>
)

// 八：手前に八つの盃 + 奥に去る人影 + 山のシルエット ★★★★☆
const EightOfCups: React.FC = () => (
  <>
    {/* 背景の山のシルエット（薄く） */}
    <path d="M 0 36 L 20 22 L 36 30 L 54 18 L 70 28 L 84 22 L 100 32 L 100 50 L 0 50 Z" strokeWidth="0.5" opacity="0.4" />
    {/* 月（小さく） */}
    <circle cx="76" cy="14" r="3" strokeWidth="0.5" opacity="0.7" />

    {/* 奥に去る人影（萈付きの小さなシルエット） */}
    <g opacity="0.85">
      {/* 頭 */}
      <circle cx="50" cy="38" r="1.8" strokeWidth="0.6" />
      {/* 笠（萈） */}
      <path d="M 46 36 Q 50 32 54 36 Z" strokeWidth="0.6" />
      {/* 胴体（マント風） */}
      <path d="M 48 40 L 46 50 L 54 50 L 52 40 Z" strokeWidth="0.6" />
      {/* 杖 */}
      <line x1="55" y1="40" x2="58" y2="52" strokeWidth="0.5" />
    </g>

    {/* 手前の 4+4 の盃（大きく、満たされている） */}
    {/* 上段4つ */}
    <Bowl x={14} y={66} r={6} />
    <Bowl x={32} y={66} r={6} />
    <Bowl x={68} y={66} r={6} />
    <Bowl x={86} y={66} r={6} />
    {/* 下段4つ */}
    <Bowl x={14} y={84} r={6} />
    <Bowl x={32} y={84} r={6} />
    <Bowl x={68} y={84} r={6} />
    <Bowl x={86} y={84} r={6} />

    {/* 中央の空白（去った跡） */}
    <line x1="42" y1="74" x2="58" y2="74" strokeWidth="0.4" strokeDasharray="2 2" opacity="0.5" />
    <line x1="46" y1="62" x2="54" y2="62" strokeWidth="0.4" opacity="0.4" />

    {/* 月光の朱（旅立ちの祝福） */}
    <circle className="text-primary" fill="currentColor" cx="50" cy="56" r="0.7" stroke="none" opacity="0.7" />
  </>
)

// 九：九つの盃が半円に並び、全て満たされる + 上部の薄い虹 ★★★★☆
const NineOfCups: React.FC = () => (
  <>
    {/* 上部の薄い虹（1本の弧） */}
    <path d="M 10 36 Q 50 4 90 36" strokeWidth="1" opacity="0.7" />
    <path d="M 14 38 Q 50 8 86 38" strokeWidth="0.6" opacity="0.5" />
    <path d="M 18 40 Q 50 12 82 40" strokeWidth="0.4" opacity="0.35" />

    {/* 半円に並ぶ9つの盃 */}
    {Array.from({ length: 9 }).map((_, i) => {
      // -90° から 90° まで等分（180°半円）
      const angle = -90 + (180 * i) / 8
      const rad = (angle * Math.PI) / 180
      const cx = 50 + 32 * Math.cos(rad)
      const cy = 70 + 32 * Math.sin(rad)
      return <Bowl key={i} x={cx} y={cy} r={5.5} />
    })}

    {/* 各盃に水面ライン（満ちている印） */}
    {Array.from({ length: 9 }).map((_, i) => {
      const angle = -90 + (180 * i) / 8
      const rad = (angle * Math.PI) / 180
      const cx = 50 + 32 * Math.cos(rad)
      const cy = 70 + 32 * Math.sin(rad)
      return (
        <line
          key={`fill-${i}`}
          x1={cx - 4} y1={cy + 1.5}
          x2={cx + 4} y2={cy + 1.5}
          strokeWidth="0.4"
          opacity="0.7"
        />
      )
    })}

    {/* 中央の祝福の朱印 */}
    <circle cx="50" cy="78" r="3" strokeWidth="0.6" />
    <circle className="text-primary" fill="currentColor" cx="50" cy="78" r="1.2" stroke="none" />
  </>
)

// 十：十の盃が空に弧を描き虹のように + 下に二軒の家 ★★★★★
const TenOfCups: React.FC = () => (
  <>
    {/* 3重の虹（明確に） */}
    <path d="M 6 60 Q 50 0 94 60" strokeWidth="1.4" />
    <path d="M 10 62 Q 50 6 90 62" strokeWidth="1" opacity="0.7" />
    <path d="M 14 64 Q 50 12 86 64" strokeWidth="0.6" opacity="0.45" />

    {/* 10個の盃を弧に沿って配置（上層） */}
    {Array.from({ length: 10 }).map((_, i) => {
      // -75° から 75° の範囲に10個
      const angle = -75 + (150 * i) / 9
      const rad = (angle * Math.PI) / 180
      // 虹に乗るように半径を調整
      const r = 48
      const cx = 50 + r * Math.cos((angle - 90) * Math.PI / 180)
      // 弧の上に乗せる
      const t = i / 9
      const bx = 6 + 88 * t
      const by = 60 - 60 * Math.sin(Math.PI * t)
      return <Bowl key={i} x={bx} y={by} r={4.5} />
    })}

    {/* 各盃の小さな朱（満ちる喜び） */}
    {Array.from({ length: 10 }).map((_, i) => {
      const t = i / 9
      const bx = 6 + 88 * t
      const by = 60 - 60 * Math.sin(Math.PI * t)
      return (
        <circle
          key={`acc-${i}`}
          className="text-primary"
          fill="currentColor"
          cx={bx} cy={by + 1.5}
          r="0.5"
          stroke="none"
          opacity="0.85"
        />
      )
    })}

    {/* 下に二軒の家（市松シルエット） */}
    {/* 左家 */}
    <g>
      <rect x="18" y="78" width="20" height="14" strokeWidth="1" />
      <path d="M 16 78 L 28 68 L 40 78 Z" strokeWidth="1" />
      {/* 窓 */}
      <rect x="22" y="82" width="4" height="4" strokeWidth="0.5" />
      <rect x="30" y="82" width="4" height="4" strokeWidth="0.5" />
      {/* 扉 */}
      <rect x="26" y="87" width="4" height="5" strokeWidth="0.5" />
    </g>
    {/* 右家 */}
    <g>
      <rect x="62" y="78" width="20" height="14" strokeWidth="1" />
      <path d="M 60 78 L 72 68 L 84 78 Z" strokeWidth="1" />
      <rect x="66" y="82" width="4" height="4" strokeWidth="0.5" />
      <rect x="74" y="82" width="4" height="4" strokeWidth="0.5" />
      <rect x="70" y="87" width="4" height="5" strokeWidth="0.5" />
    </g>

    {/* 家の煙突から立ち上る煙（家庭の温もり） */}
    <path d="M 34 68 Q 32 64 34 60 Q 36 56 34 52" strokeWidth="0.4" opacity="0.5" />
    <path d="M 78 68 Q 76 64 78 60 Q 80 56 78 52" strokeWidth="0.4" opacity="0.5" />

    {/* 地（連なる縁側） */}
    <line x1="6" y1="92" x2="94" y2="92" strokeWidth="0.5" />
  </>
)

const CUPS_BY_NUMBER: Record<number, React.FC> = {
  1: AceOfCups,
  2: TwoOfCups,
  3: ThreeOfCups,
  4: FourOfCups,
  5: FiveOfCups,
  6: SixOfCups,
  7: SevenOfCups,
  8: EightOfCups,
  9: NineOfCups,
  10: TenOfCups,
}

export function CupsNumberCard({ number }: { number: number }): React.ReactElement | null {
  const C = CUPS_BY_NUMBER[number]
  if (!C) return null
  return <C />
}

export {
  AceOfCups,
  TwoOfCups,
  ThreeOfCups,
  FourOfCups,
  FiveOfCups,
  SixOfCups,
  SevenOfCups,
  EightOfCups,
  NineOfCups,
  TenOfCups,
}

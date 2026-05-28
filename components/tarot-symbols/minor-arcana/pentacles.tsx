import React from 'react'

// 金貨（Pentacles）Common 数札 一〜十。
// 設計原則（wands/cups/swords と統一）：
//   - viewBox 0 0 100 100 のフル領域。
//   - 線は親の rarity-symbol-common から currentColor 継承（墨）。
//   - 朱赤アクセント（小判の中央孔の光、稲穂の実りなど）は className="text-primary"。
//   - 金貨は「地の重・静止・長期的・豊かな金茶」。装飾を多めに、安定感重視。

// 共通：小判（横長楕円 + 中央四角孔 + 縁の彫り）
const Koban: React.FC<{
  cx: number
  cy: number
  rx?: number
  ry?: number
  opacity?: number
  rotation?: number
}> = ({ cx, cy, rx = 9, ry = 6, opacity = 1, rotation = 0 }) => {
  const transform = rotation ? `rotate(${rotation} ${cx} ${cy})` : undefined
  const holeW = rx * 0.35
  const holeH = ry * 0.35
  return (
    <g transform={transform} opacity={opacity}>
      {/* 外形 */}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} strokeWidth="1" />
      {/* 内側の縁（彫り） */}
      <ellipse cx={cx} cy={cy} rx={rx - 1.5} ry={ry - 1} strokeWidth="0.4" opacity="0.7" />
      {/* 中央の四角孔 */}
      <rect x={cx - holeW / 2} y={cy - holeH / 2} width={holeW} height={holeH} strokeWidth="0.7" />
      {/* 朱の小印（中央） */}
      <circle className="text-primary" fill="currentColor" cx={cx} cy={cy} r={Math.min(holeW, holeH) * 0.25} stroke="none" opacity="0.85" />
    </g>
  )
}

// 一：地面付近に一粒の小判 + 周囲に新芽3本 ★★☆☆☆
const AceOfPentacles: React.FC = () => (
  <>
    {/* 地面（横線） */}
    <line x1="6" y1="68" x2="94" y2="68" strokeWidth="0.7" />
    <line x1="6" y1="72" x2="94" y2="72" strokeWidth="0.4" opacity="0.6" />
    <line x1="6" y1="76" x2="94" y2="76" strokeWidth="0.3" opacity="0.4" />

    {/* 小判（中央下） */}
    <Koban cx={50} cy={56} rx={14} ry={9} />

    {/* 周囲に3本の新芽 */}
    {/* 左 */}
    <g>
      <path d="M 22 68 Q 18 56 22 44" strokeWidth="0.8" />
      <path d="M 22 56 Q 16 52 14 46" strokeWidth="0.5" />
      <path d="M 22 48 Q 28 46 30 40" strokeWidth="0.5" />
      {/* 葉先（朱） */}
      <circle className="text-primary" fill="currentColor" cx="22" cy="44" r="0.8" stroke="none" />
    </g>
    {/* 右 */}
    <g>
      <path d="M 78 68 Q 82 56 78 44" strokeWidth="0.8" />
      <path d="M 78 56 Q 84 52 86 46" strokeWidth="0.5" />
      <path d="M 78 48 Q 72 46 70 40" strokeWidth="0.5" />
      <circle className="text-primary" fill="currentColor" cx="78" cy="44" r="0.8" stroke="none" />
    </g>
    {/* 上中央 */}
    <g>
      <path d="M 50 42 Q 48 32 50 22" strokeWidth="0.8" />
      <path d="M 50 30 Q 44 26 42 20" strokeWidth="0.5" />
      <path d="M 50 26 Q 56 22 58 16" strokeWidth="0.5" />
      <circle className="text-primary" fill="currentColor" cx="50" cy="22" r="1" stroke="none" />
    </g>

    {/* 地中の根（点線） */}
    <path d="M 50 65 L 50 80" strokeWidth="0.4" strokeDasharray="1.5 2" opacity="0.5" />
    <path d="M 50 76 L 40 84" strokeWidth="0.3" strokeDasharray="1.5 2" opacity="0.4" />
    <path d="M 50 76 L 60 84" strokeWidth="0.3" strokeDasharray="1.5 2" opacity="0.4" />
  </>
)

// 二：二つの小判が8の字（無限大）の軌跡 ★★★☆☆
const TwoOfPentacles: React.FC = () => (
  <>
    {/* 8の字の軌跡（点線で薄く） */}
    <path
      d="M 30 50 Q 20 30 50 30 Q 80 30 70 50 Q 80 70 50 70 Q 20 70 30 50 Z"
      strokeWidth="0.5"
      strokeDasharray="2 2"
      opacity="0.55"
    />
    {/* 中心の交差点 */}
    <circle cx="50" cy="50" r="1" strokeWidth="0.5" opacity="0.5" />

    {/* 二つの小判（軌跡上の対角位置に） */}
    <Koban cx={28} cy={36} rx={8} ry={5.5} rotation={-15} />
    <Koban cx={72} cy={64} rx={8} ry={5.5} rotation={15} />

    {/* 動きの流線（朱の尾） */}
    <g className="text-primary" stroke="currentColor" fill="none" strokeWidth="0.5" opacity="0.7">
      <path d="M 28 32 Q 24 26 22 22" />
      <path d="M 72 68 Q 76 74 78 78" />
    </g>

    {/* 地面 */}
    <line x1="6" y1="90" x2="94" y2="90" strokeWidth="0.4" opacity="0.5" />
  </>
)

// 三：三つの小判が三角に + 下に職人3人のシルエット + 棟木 ★★★★☆
const ThreeOfPentacles: React.FC = () => (
  <>
    {/* 棟木（背景：建築の骨組み） */}
    <line x1="10" y1="20" x2="90" y2="20" strokeWidth="1" />
    <line x1="18" y1="20" x2="18" y2="68" strokeWidth="0.8" />
    <line x1="82" y1="20" x2="82" y2="68" strokeWidth="0.8" />
    <line x1="18" y1="40" x2="82" y2="40" strokeWidth="0.5" />
    {/* 斜めの梁 */}
    <line x1="18" y1="20" x2="50" y2="8" strokeWidth="0.7" />
    <line x1="82" y1="20" x2="50" y2="8" strokeWidth="0.7" />

    {/* 上部に三角形に三つの小判 */}
    <Koban cx={50} cy={14} rx={7} ry={5} />
    <Koban cx={28} cy={32} rx={7} ry={5} />
    <Koban cx={72} cy={32} rx={7} ry={5} />

    {/* 三人の職人のシルエット（下部） */}
    {[28, 50, 72].map((x, i) => (
      <g key={i}>
        {/* 頭 */}
        <circle cx={x} cy="62" r="2.4" strokeWidth="0.6" />
        {/* 体 */}
        <path d={`M ${x - 3} 65 L ${x - 4} 78 L ${x + 4} 78 L ${x + 3} 65 Z`} strokeWidth="0.6" />
        {/* 腕（道具を持つ） */}
        <line x1={x - 3} y1="68" x2={x - 7} y2="72" strokeWidth="0.5" />
        <line x1={x + 3} y1="68" x2={x + 7} y2="72" strokeWidth="0.5" />
        {/* 道具（ノミ・ハンマー） */}
        <line x1={x - 7} y1="72" x2={x - 8} y2="76" strokeWidth="0.5" />
        <line x1={x + 7} y1="72" x2={x + 8} y2="76" strokeWidth="0.5" />
      </g>
    ))}

    {/* 地面 */}
    <line x1="6" y1="84" x2="94" y2="84" strokeWidth="0.5" />
    <line x1="6" y1="88" x2="94" y2="88" strokeWidth="0.3" opacity="0.5" />

    {/* 朱の小印（協力の徴） */}
    <circle className="text-primary" fill="currentColor" cx="50" cy="50" r="0.9" stroke="none" />
  </>
)

// 四：四つの小判を抱える人影 ★★★☆☆
const FourOfPentacles: React.FC = () => (
  <>
    {/* 中央の人影（うずくまり、抱え込む） */}
    <g>
      {/* 頭 */}
      <circle cx="50" cy="22" r="5" strokeWidth="1" />
      {/* 胴体（前傾、閉じた姿勢） */}
      <path d="M 44 26 Q 36 36 36 56 Q 36 72 44 80 L 56 80 Q 64 72 64 56 Q 64 36 56 26 Z" strokeWidth="1" />
      {/* 両腕（抱きしめる） */}
      <path d="M 36 50 Q 30 56 36 66" strokeWidth="0.7" />
      <path d="M 64 50 Q 70 56 64 66" strokeWidth="0.7" />
      {/* 足 */}
      <line x1="42" y1="80" x2="40" y2="92" strokeWidth="0.8" />
      <line x1="58" y1="80" x2="60" y2="92" strokeWidth="0.8" />
    </g>

    {/* 4つの小判：頭上・両脇・足元 */}
    <Koban cx={50} cy={8} rx={6} ry={4} />
    <Koban cx={20} cy={52} rx={6} ry={4} rotation={-90} />
    <Koban cx={80} cy={52} rx={6} ry={4} rotation={90} />
    <Koban cx={50} cy={94} rx={6} ry={4} />

    {/* 抱え込みの線（小判と人を繋ぐ） */}
    <g strokeWidth="0.3" strokeDasharray="1 1.5" opacity="0.45">
      <line x1="50" y1="14" x2="50" y2="17" />
      <line x1="26" y1="52" x2="36" y2="52" />
      <line x1="74" y1="52" x2="64" y2="52" />
      <line x1="50" y1="90" x2="50" y2="84" />
    </g>
  </>
)

// 五：寺の灯りの中に4枚 + 雪中の旅人と1枚 ★★★★☆
const FiveOfPentacles: React.FC = () => (
  <>
    {/* 雪の結晶（背景） */}
    <g strokeWidth="0.4" opacity="0.5">
      {[
        { x: 16, y: 14 }, { x: 30, y: 22 }, { x: 50, y: 10 }, { x: 70, y: 18 }, { x: 86, y: 12 },
        { x: 12, y: 36 }, { x: 88, y: 38 }, { x: 22, y: 56 }, { x: 80, y: 60 },
      ].map((p, i) => (
        <g key={i}>
          <line x1={p.x - 2} y1={p.y} x2={p.x + 2} y2={p.y} />
          <line x1={p.x} y1={p.y - 2} x2={p.x} y2={p.y + 2} />
          <line x1={p.x - 1.4} y1={p.y - 1.4} x2={p.x + 1.4} y2={p.y + 1.4} />
          <line x1={p.x - 1.4} y1={p.y + 1.4} x2={p.x + 1.4} y2={p.y - 1.4} />
        </g>
      ))}
    </g>

    {/* 左の寺・鳥居（灯りの中） */}
    <g>
      {/* 鳥居 */}
      <line x1="10" y1="38" x2="38" y2="38" strokeWidth="1.4" />
      <line x1="12" y1="42" x2="36" y2="42" strokeWidth="1" />
      <line x1="16" y1="38" x2="16" y2="74" strokeWidth="1.2" />
      <line x1="32" y1="38" x2="32" y2="74" strokeWidth="1.2" />
      {/* 灯火 */}
      <circle cx="24" cy="50" r="1.4" strokeWidth="0.5" />
      <circle className="text-primary" fill="currentColor" cx="24" cy="50" r="0.9" stroke="none" />
      {/* 灯りのオーラ */}
      <circle cx="24" cy="50" r="8" strokeWidth="0.4" opacity="0.4" strokeDasharray="2 2" />
    </g>

    {/* 灯りの中の4つの小判 */}
    <Koban cx={18} cy={60} rx={4} ry={2.8} />
    <Koban cx={30} cy={60} rx={4} ry={2.8} />
    <Koban cx={18} cy={68} rx={4} ry={2.8} />
    <Koban cx={30} cy={68} rx={4} ry={2.8} />

    {/* 右下の雪中の旅人 */}
    <g>
      {/* 頭 + 笠 */}
      <circle cx="72" cy="62" r="3" strokeWidth="0.7" />
      <path d="M 68 60 Q 72 56 76 60 Z" strokeWidth="0.6" />
      {/* 体（屈んだ） */}
      <path d="M 69 65 Q 65 76 68 84 L 76 84 Q 79 76 75 65 Z" strokeWidth="0.7" />
      {/* 杖 */}
      <line x1="80" y1="64" x2="84" y2="84" strokeWidth="0.5" />
    </g>

    {/* 旅人の足元の1つの小判 */}
    <Koban cx={72} cy={90} rx={4} ry={2.8} opacity={0.85} />

    {/* 地面（雪原） */}
    <line x1="6" y1="92" x2="94" y2="92" strokeWidth="0.4" />
  </>
)

// 六：上に三つを差し出す手 + 下に三つを受け取る手 + 中央天秤 ★★★☆☆
const SixOfPentacles: React.FC = () => (
  <>
    {/* 上の手（差し出す） */}
    <g>
      {/* 手のひら */}
      <path d="M 32 14 Q 24 18 26 28 L 30 32 L 70 32 L 74 28 Q 76 18 68 14 Z" strokeWidth="0.8" />
      {/* 指の表現（4本） */}
      <line x1="36" y1="14" x2="34" y2="8" strokeWidth="0.5" />
      <line x1="46" y1="13" x2="46" y2="6" strokeWidth="0.5" />
      <line x1="54" y1="13" x2="54" y2="6" strokeWidth="0.5" />
      <line x1="64" y1="14" x2="66" y2="8" strokeWidth="0.5" />
    </g>

    {/* 上の手の上に3つの小判（差し出される） */}
    <Koban cx={36} cy={22} rx={5} ry={3.5} />
    <Koban cx={50} cy={20} rx={5} ry={3.5} />
    <Koban cx={64} cy={22} rx={5} ry={3.5} />

    {/* 中央の天秤（衡） */}
    <g>
      <line x1="50" y1="38" x2="50" y2="58" strokeWidth="1" />
      <line x1="34" y1="48" x2="66" y2="48" strokeWidth="0.8" />
      <line x1="34" y1="48" x2="32" y2="54" strokeWidth="0.5" />
      <line x1="66" y1="48" x2="68" y2="54" strokeWidth="0.5" />
      <circle cx="50" cy="38" r="1.2" strokeWidth="0.5" />
      {/* 朱の中心（公平の徴） */}
      <circle className="text-primary" fill="currentColor" cx="50" cy="48" r="1" stroke="none" />
    </g>

    {/* 下の手の上に3つの小判（受け取る） */}
    <Koban cx={36} cy={72} rx={5} ry={3.5} />
    <Koban cx={50} cy={74} rx={5} ry={3.5} />
    <Koban cx={64} cy={72} rx={5} ry={3.5} />

    {/* 下の手（受け取る、上下反転） */}
    <g transform="rotate(180 50 86)">
      <path d="M 32 78 Q 24 82 26 92 L 30 96 L 70 96 L 74 92 Q 76 82 68 78 Z" strokeWidth="0.8" />
      <line x1="36" y1="78" x2="34" y2="72" strokeWidth="0.5" />
      <line x1="46" y1="77" x2="46" y2="70" strokeWidth="0.5" />
      <line x1="54" y1="77" x2="54" y2="70" strokeWidth="0.5" />
      <line x1="64" y1="78" x2="66" y2="72" strokeWidth="0.5" />
    </g>
  </>
)

// 七：稲穂のように実る7つの小判 + 下に農夫 ★★★★☆
const SevenOfPentacles: React.FC = () => (
  <>
    {/* 茎（3本） */}
    <path d="M 22 78 Q 24 50 26 26" strokeWidth="1" />
    <path d="M 50 80 Q 50 48 50 22" strokeWidth="1" />
    <path d="M 78 78 Q 76 50 74 26" strokeWidth="1" />

    {/* 各茎に実る小判（左2、中央3、右2 = 計7） */}
    {/* 左茎 */}
    <Koban cx={22} cy={38} rx={4.5} ry={3.2} />
    <Koban cx={24} cy={26} rx={4.5} ry={3.2} />
    {/* 中央茎 */}
    <Koban cx={50} cy={42} rx={5} ry={3.4} />
    <Koban cx={50} cy={30} rx={5} ry={3.4} />
    <Koban cx={50} cy={18} rx={5} ry={3.4} />
    {/* 右茎 */}
    <Koban cx={78} cy={38} rx={4.5} ry={3.2} />
    <Koban cx={76} cy={26} rx={4.5} ry={3.2} />

    {/* 葉（茎から） */}
    <g strokeWidth="0.5">
      <path d="M 24 60 Q 18 58 14 52" />
      <path d="M 26 50 Q 32 48 36 42" />
      <path d="M 50 60 Q 44 58 40 52" />
      <path d="M 50 54 Q 56 52 60 46" />
      <path d="M 76 60 Q 82 58 86 52" />
      <path d="M 74 50 Q 68 48 64 42" />
    </g>

    {/* 農夫（下部、見上げる） */}
    <g>
      {/* 頭 + 笠 */}
      <circle cx="40" cy="82" r="2.4" strokeWidth="0.7" />
      <path d="M 36 80 Q 40 76 44 80 Z" strokeWidth="0.5" />
      {/* 体 */}
      <path d="M 38 84 L 36 92 L 44 92 L 42 84 Z" strokeWidth="0.7" />
      {/* 鍬を持つ */}
      <line x1="42" y1="86" x2="50" y2="92" strokeWidth="0.6" />
      <line x1="50" y1="92" x2="54" y2="88" strokeWidth="0.6" />
    </g>

    {/* 地面 */}
    <line x1="6" y1="94" x2="94" y2="94" strokeWidth="0.5" />

    {/* 朱の実り（豊作の徴、中央の最上の小判） */}
    <circle className="text-primary" fill="currentColor" cx="50" cy="18" r="0.7" stroke="none" />
  </>
)

// 八：4-4 縦に並ぶ8つの小判 + 下に作業台と職人 ★★★★☆
const EightOfPentacles: React.FC = () => (
  <>
    {/* 棚（背景） */}
    <line x1="14" y1="10" x2="86" y2="10" strokeWidth="0.6" />
    <line x1="14" y1="44" x2="86" y2="44" strokeWidth="0.6" />
    <line x1="14" y1="10" x2="14" y2="46" strokeWidth="0.5" />
    <line x1="86" y1="10" x2="86" y2="46" strokeWidth="0.5" />

    {/* 4-4 縦に並ぶ8つの小判（左列・右列、各4個） */}
    {[18, 30, 42].map((y) => (
      <React.Fragment key={`left-${y}`}>
        <Koban cx={28} cy={y - 2} rx={5} ry={3.3} />
        <Koban cx={72} cy={y - 2} rx={5} ry={3.3} />
      </React.Fragment>
    ))}
    {/* 4枚目 */}
    <Koban cx={28} cy={42} rx={5} ry={3.3} />
    <Koban cx={72} cy={42} rx={5} ry={3.3} />

    {/* 作業台 */}
    <line x1="22" y1="64" x2="78" y2="64" strokeWidth="1.2" />
    <line x1="26" y1="64" x2="26" y2="80" strokeWidth="0.8" />
    <line x1="74" y1="64" x2="74" y2="80" strokeWidth="0.8" />
    <line x1="22" y1="80" x2="78" y2="80" strokeWidth="0.6" />

    {/* 作業中の小判（彫っている9枚目相当の対象） */}
    <Koban cx={50} cy={62} rx={5.5} ry={3.6} />

    {/* 職人 */}
    <g>
      <circle cx="50" cy="50" r="3" strokeWidth="0.7" />
      <path d="M 47 53 L 45 64 L 55 64 L 53 53 Z" strokeWidth="0.7" />
      {/* 腕（道具を握る） */}
      <line x1="47" y1="56" x2="42" y2="60" strokeWidth="0.5" />
      <line x1="53" y1="56" x2="58" y2="60" strokeWidth="0.5" />
    </g>

    {/* ノミと鎚（朱） */}
    <g className="text-primary" stroke="currentColor" fill="currentColor">
      <line x1="40" y1="60" x2="44" y2="64" strokeWidth="0.8" stroke="currentColor" fill="none" />
      <rect x="56" y="59" width="4" height="2.5" stroke="currentColor" strokeWidth="0.6" fill="none" />
    </g>

    {/* 削りカス（小点） */}
    <circle cx="44" cy="68" r="0.4" fill="currentColor" stroke="none" opacity="0.5" />
    <circle cx="56" cy="68" r="0.4" fill="currentColor" stroke="none" opacity="0.5" />
    <circle cx="50" cy="70" r="0.3" fill="currentColor" stroke="none" opacity="0.4" />
  </>
)

// 九：枝に並ぶ9つの小判 + 鶴 + 老松 ★★★★☆
const NineOfPentacles: React.FC = () => (
  <>
    {/* 老松のシルエット（背景） */}
    <path d="M 4 90 Q 14 50 24 86" strokeWidth="0.8" opacity="0.7" />
    <path d="M 8 80 Q 14 70 20 80" strokeWidth="0.5" opacity="0.6" />
    <path d="M 12 70 Q 16 60 22 68" strokeWidth="0.5" opacity="0.6" />
    {/* 松の葉（雲のような塊） */}
    <ellipse cx="14" cy="58" rx="8" ry="4" strokeWidth="0.5" opacity="0.6" />
    <ellipse cx="20" cy="48" rx="6" ry="3" strokeWidth="0.5" opacity="0.55" />

    {/* 枝（曲線、9つの小判を載せる） */}
    <path d="M 24 84 Q 50 60 96 70" strokeWidth="1.2" />

    {/* 9つの小判（枝に沿って） */}
    {[
      { x: 30, y: 80 }, { x: 38, y: 75 }, { x: 46, y: 70 },
      { x: 54, y: 66 }, { x: 62, y: 64 }, { x: 70, y: 64 },
      { x: 78, y: 66 }, { x: 86, y: 68 }, { x: 92, y: 70 },
    ].map((p, i) => (
      <Koban key={i} cx={p.x} cy={p.y} rx={4} ry={2.8} />
    ))}

    {/* 鶴（長い首） */}
    <g>
      {/* 胴体 */}
      <ellipse cx="58" cy="38" rx="8" ry="4" strokeWidth="0.8" />
      {/* 首（長く優雅に） */}
      <path d="M 64 36 Q 70 24 72 14" strokeWidth="0.9" />
      {/* 頭 */}
      <circle cx="72" cy="14" r="1.6" strokeWidth="0.7" />
      {/* くちばし */}
      <path d="M 73 14 L 78 16 L 73 16 Z" strokeWidth="0.5" />
      {/* 朱（鶴頂） */}
      <circle className="text-primary" fill="currentColor" cx="71" cy="12" r="0.9" stroke="none" />
      {/* 足 */}
      <line x1="56" y1="42" x2="56" y2="50" strokeWidth="0.6" />
      <line x1="60" y1="42" x2="60" y2="50" strokeWidth="0.6" />
      <line x1="54" y1="50" x2="58" y2="50" strokeWidth="0.5" />
      <line x1="58" y1="50" x2="62" y2="50" strokeWidth="0.5" />
      {/* 尾羽 */}
      <path d="M 50 38 L 44 36 L 50 40 Z" strokeWidth="0.5" />
    </g>

    {/* 地面 */}
    <line x1="6" y1="92" x2="94" y2="92" strokeWidth="0.5" />
  </>
)

// 十：家系図のような10の小判 + 背景に大きな家 ★★★★★
const TenOfPentacles: React.FC = () => (
  <>
    {/* 背景の大きな家 */}
    <g opacity="0.55">
      {/* 屋根（市松） */}
      <path d="M 8 38 L 50 14 L 92 38 Z" strokeWidth="0.8" />
      {/* 屋根の格子 */}
      <line x1="20" y1="38" x2="32" y2="22" strokeWidth="0.3" />
      <line x1="32" y1="38" x2="44" y2="18" strokeWidth="0.3" />
      <line x1="44" y1="38" x2="50" y2="14" strokeWidth="0.3" />
      <line x1="56" y1="38" x2="50" y2="14" strokeWidth="0.3" />
      <line x1="68" y1="38" x2="56" y2="18" strokeWidth="0.3" />
      <line x1="80" y1="38" x2="68" y2="22" strokeWidth="0.3" />
      {/* 柱・壁 */}
      <line x1="12" y1="38" x2="12" y2="90" strokeWidth="0.6" />
      <line x1="88" y1="38" x2="88" y2="90" strokeWidth="0.6" />
      <line x1="12" y1="90" x2="88" y2="90" strokeWidth="0.8" />
      {/* 障子の格子 */}
      <line x1="30" y1="44" x2="30" y2="80" strokeWidth="0.3" />
      <line x1="50" y1="44" x2="50" y2="80" strokeWidth="0.3" />
      <line x1="70" y1="44" x2="70" y2="80" strokeWidth="0.3" />
      <line x1="12" y1="60" x2="88" y2="60" strokeWidth="0.3" />
    </g>

    {/* 家系図ツリー（10個の小判）
       上 1 / 中 2 / その下 3 / 下 4 = 10 */}
    {/* 1段目（祖父母・最上） */}
    <Koban cx={50} cy={20} rx={5.5} ry={3.7} />
    {/* 2段目（父母・2人） */}
    <Koban cx={34} cy={38} rx={5} ry={3.4} />
    <Koban cx={66} cy={38} rx={5} ry={3.4} />
    {/* 3段目（兄弟・3人） */}
    <Koban cx={22} cy={58} rx={4.5} ry={3.1} />
    <Koban cx={50} cy={58} rx={4.5} ry={3.1} />
    <Koban cx={78} cy={58} rx={4.5} ry={3.1} />
    {/* 4段目（孫・4人） */}
    <Koban cx={14} cy={76} rx={4} ry={2.8} />
    <Koban cx={38} cy={76} rx={4} ry={2.8} />
    <Koban cx={62} cy={76} rx={4} ry={2.8} />
    <Koban cx={86} cy={76} rx={4} ry={2.8} />

    {/* 系図の線（世代を繋ぐ） */}
    <g strokeWidth="0.4" opacity="0.6">
      {/* 1→2 */}
      <line x1="50" y1="24" x2="34" y2="34" />
      <line x1="50" y1="24" x2="66" y2="34" />
      {/* 2→3 */}
      <line x1="34" y1="42" x2="22" y2="54" />
      <line x1="34" y1="42" x2="50" y2="54" />
      <line x1="66" y1="42" x2="50" y2="54" />
      <line x1="66" y1="42" x2="78" y2="54" />
      {/* 3→4 */}
      <line x1="22" y1="62" x2="14" y2="72" />
      <line x1="22" y1="62" x2="38" y2="72" />
      <line x1="50" y1="62" x2="38" y2="72" />
      <line x1="50" y1="62" x2="62" y2="72" />
      <line x1="78" y1="62" x2="62" y2="72" />
      <line x1="78" y1="62" x2="86" y2="72" />
    </g>

    {/* 永続の朱印（最上の小判の中央を強調） */}
    <circle className="text-primary" fill="currentColor" cx="50" cy="20" r="1.4" stroke="none" />

    {/* 地面 */}
    <line x1="4" y1="94" x2="96" y2="94" strokeWidth="0.5" />
  </>
)

const PENTACLES_BY_NUMBER: Record<number, React.FC> = {
  1: AceOfPentacles,
  2: TwoOfPentacles,
  3: ThreeOfPentacles,
  4: FourOfPentacles,
  5: FiveOfPentacles,
  6: SixOfPentacles,
  7: SevenOfPentacles,
  8: EightOfPentacles,
  9: NineOfPentacles,
  10: TenOfPentacles,
}

export function PentaclesNumberCard({ number }: { number: number }): React.ReactElement | null {
  const C = PENTACLES_BY_NUMBER[number]
  if (!C) return null
  return <C />
}

export {
  AceOfPentacles,
  TwoOfPentacles,
  ThreeOfPentacles,
  FourOfPentacles,
  FiveOfPentacles,
  SixOfPentacles,
  SevenOfPentacles,
  EightOfPentacles,
  NineOfPentacles,
  TenOfPentacles,
  Koban,
}

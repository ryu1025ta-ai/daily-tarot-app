import React from 'react'

// 剣（Swords）Common 数札 一〜十。
// 設計原則（wands/cups と統一）：
//   - viewBox 0 0 100 100 のフル領域。
//   - 線は親の rarity-symbol-common から currentColor 継承（墨）。
//   - 朱赤アクセント（菊の御紋・血の点・刃光のスパーク）は className="text-primary"。
//   - 剣のトーン：風の鋭利・冷ややかな銀灰。シャープに、鮮烈に。
//   - 動きは「斜線（雨）」「ジグザグ（破断）」「金属の光（スパーク）」で表現。

// 共通：日本刀（縦・反り付き）
// x: 中心 X 座標、tipY: 切先 Y、guardY: 鍔 Y、pommelY: 柄頭 Y
const Katana: React.FC<{
  x: number
  tipY: number
  guardY: number
  pommelY: number
  rotation?: number
  pivotY?: number
  width?: number
  opacity?: number
}> = ({ x, tipY, guardY, pommelY, rotation = 0, pivotY, width = 1.6, opacity = 1 }) => {
  const halfBlade = width * 0.7
  const transform = rotation ? `rotate(${rotation} ${x} ${pivotY ?? guardY})` : undefined
  return (
    <g transform={transform} opacity={opacity}>
      {/* 刀身：左輪郭・右輪郭・切先 */}
      <line x1={x - halfBlade} y1={guardY} x2={x - halfBlade * 0.6} y2={tipY + 2} strokeWidth="0.8" />
      <line x1={x + halfBlade} y1={guardY} x2={x + halfBlade * 0.6} y2={tipY + 2} strokeWidth="0.8" />
      <path d={`M ${x - halfBlade * 0.6} ${tipY + 2} L ${x} ${tipY} L ${x + halfBlade * 0.6} ${tipY + 2}`} strokeWidth="0.8" />
      {/* 鎬（しのぎ）：刀身中央の縦線 */}
      <line x1={x} y1={tipY + 1} x2={x} y2={guardY} strokeWidth="0.35" opacity="0.6" />
      {/* 鍔（つば） */}
      <line x1={x - 5} y1={guardY} x2={x + 5} y2={guardY} strokeWidth="1.2" />
      <line x1={x - 5} y1={guardY + 1.2} x2={x + 5} y2={guardY + 1.2} strokeWidth="0.5" />
      {/* 柄（つか） */}
      <line x1={x} y1={guardY + 1.2} x2={x} y2={pommelY} strokeWidth="2.4" />
      {/* 柄頭（朱の小点） */}
      <circle className="text-primary" fill="currentColor" cx={x} cy={pommelY + 1} r="1.1" stroke="none" />
    </g>
  )
}

// 一：垂直の刀 + 刀身に光の反射 + 柄に菊の御紋 + 4本の放射光 ★★☆☆☆
const AceOfSwords: React.FC = () => (
  <>
    {/* 上部の放射光（4本） */}
    <g opacity="0.7">
      <line x1="50" y1="2" x2="50" y2="10" strokeWidth="0.5" />
      <line x1="38" y1="6" x2="44" y2="12" strokeWidth="0.5" />
      <line x1="62" y1="6" x2="56" y2="12" strokeWidth="0.5" />
      <line x1="30" y1="14" x2="38" y2="18" strokeWidth="0.4" />
      <line x1="70" y1="14" x2="62" y2="18" strokeWidth="0.4" />
    </g>

    {/* 刀（垂直に大きく立つ） */}
    <Katana x={50} tipY={10} guardY={64} pommelY={80} width={2.2} />

    {/* 刀身の白光（反射） */}
    <line x1="50" y1="14" x2="50" y2="62" strokeWidth="0.4" opacity="0.5" strokeDasharray="2 3" />

    {/* 菊の御紋（柄に） */}
    <g className="text-primary" fill="currentColor" stroke="none">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180
        const cx = 50 + Math.cos(rad) * 2.2
        const cy = 72 + Math.sin(rad) * 2.2
        return <circle key={deg} cx={cx.toFixed(2)} cy={cy.toFixed(2)} r="0.7" />
      })}
      <circle cx="50" cy="72" r="1" />
    </g>

    {/* 地 */}
    <line x1="20" y1="86" x2="80" y2="86" strokeWidth="0.4" opacity="0.5" />
  </>
)

// 二：交差した二本の刀（X字） + 中央に三日月 + 背景に霧 ★★★☆☆
const TwoOfSwords: React.FC = () => (
  <>
    {/* 背景：霧（3本の水平線） */}
    <g opacity="0.35" strokeDasharray="3 3">
      <line x1="6" y1="32" x2="94" y2="32" strokeWidth="0.5" />
      <line x1="6" y1="50" x2="94" y2="50" strokeWidth="0.5" />
      <line x1="6" y1="68" x2="94" y2="68" strokeWidth="0.5" />
    </g>

    {/* 左の刀（右下→左上、+30°回転） */}
    <Katana x={50} tipY={12} guardY={70} pommelY={86} rotation={-35} pivotY={50} width={1.6} />
    {/* 右の刀（左下→右上、-30°回転） */}
    <Katana x={50} tipY={12} guardY={70} pommelY={86} rotation={35} pivotY={50} width={1.6} />

    {/* 中央の三日月 */}
    <g>
      <path d="M 50 42 Q 46 50 50 58 Q 54 54 54 50 Q 54 46 50 42 Z" strokeWidth="0.7" />
    </g>

    {/* 朱の小印（決断保留の中央） */}
    <circle className="text-primary" fill="currentColor" cx="50" cy="50" r="0.8" stroke="none" opacity="0.85" />
  </>
)

// 三：心臓型を3本の刀が貫く + 背景に斜めの雨 ★★★★☆
const ThreeOfSwords: React.FC = () => (
  <>
    {/* 斜めの雨（多数） */}
    <g strokeWidth="0.45" opacity="0.55">
      <line x1="10" y1="6" x2="14" y2="18" />
      <line x1="22" y1="8" x2="26" y2="20" />
      <line x1="34" y1="4" x2="38" y2="16" />
      <line x1="78" y1="6" x2="82" y2="18" />
      <line x1="86" y1="10" x2="90" y2="22" />
      <line x1="6" y1="74" x2="10" y2="86" />
      <line x1="86" y1="76" x2="90" y2="88" />
      <line x1="14" y1="86" x2="18" y2="98" />
      <line x1="78" y1="84" x2="82" y2="96" />
    </g>

    {/* 心臓型（中央） */}
    <path
      d="M 50 38 C 38 26 28 36 28 46 C 28 58 50 72 50 72 C 50 72 72 58 72 46 C 72 36 62 26 50 38 Z"
      strokeWidth="1.2"
    />
    {/* 心臓の内側ハイライト */}
    <path d="M 38 42 Q 42 38 44 42" strokeWidth="0.5" opacity="0.6" />
    {/* 朱の血しずく */}
    <g className="text-primary" fill="currentColor" stroke="none">
      <path d="M 46 74 Q 44 78 46 82 Q 48 82 48 78 Q 48 76 46 74 Z" />
      <path d="M 52 76 Q 50 80 52 84 Q 54 84 54 80 Q 54 78 52 76 Z" opacity="0.85" />
      <circle cx="50" cy="56" r="1.2" />
    </g>

    {/* 中央垂直の刀 */}
    <Katana x={50} tipY={20} guardY={74} pommelY={88} width={1.8} />
    {/* 左斜め（右上→左下） */}
    <Katana x={50} tipY={20} guardY={74} pommelY={88} rotation={-45} pivotY={50} width={1.5} />
    {/* 右斜め（左上→右下） */}
    <Katana x={50} tipY={20} guardY={74} pommelY={88} rotation={45} pivotY={50} width={1.5} />
  </>
)

// 四：一本横たわり + 三本壁に並ぶ ★★★☆☆
const FourOfSwords: React.FC = () => (
  <>
    {/* 背景の壁（瞑想の静謐） */}
    <line x1="6" y1="64" x2="94" y2="64" strokeWidth="0.5" opacity="0.5" />

    {/* 上部に壁掛けの3本（縦・並列） */}
    <Katana x={26} tipY={10} guardY={48} pommelY={58} width={1.4} />
    <Katana x={50} tipY={10} guardY={48} pommelY={58} width={1.4} />
    <Katana x={74} tipY={10} guardY={48} pommelY={58} width={1.4} />

    {/* 横たわる1本（下部・棺のように水平） */}
    <g transform="rotate(90 50 80)">
      <Katana x={50} tipY={62} guardY={94} pommelY={104} width={1.5} />
    </g>

    {/* 横たわる剣の上に小さな花（敬意・追悼） */}
    <g className="text-primary" fill="currentColor" stroke="none">
      {[0, 72, 144, 216, 288].map((deg) => {
        const rad = (deg * Math.PI) / 180
        const cx = 50 + Math.cos(rad) * 1.8
        const cy = 80 + Math.sin(rad) * 1.8
        return <circle key={deg} cx={cx.toFixed(2)} cy={cy.toFixed(2)} r="0.8" />
      })}
      <circle cx="50" cy="80" r="0.6" opacity="0.6" />
    </g>

    {/* 地 */}
    <line x1="6" y1="92" x2="94" y2="92" strokeWidth="0.5" />
  </>
)

// 五：二本折れ + 三本地に斜めに ★★★★☆
const FiveOfSwords: React.FC = () => (
  <>
    {/* 地面 */}
    <line x1="6" y1="86" x2="94" y2="86" strokeWidth="0.6" />
    <line x1="6" y1="89" x2="94" y2="89" strokeWidth="0.3" opacity="0.5" />

    {/* 折れた刀1（ジグザグ、左下） */}
    <g>
      <path d="M 12 86 L 16 70 L 14 60 L 22 48" strokeWidth="1.4" />
      <line x1="9" y1="86" x2="19" y2="86" strokeWidth="1" />
      {/* 折れ口（鋭利） */}
      <line x1="14" y1="60" x2="11" y2="58" strokeWidth="0.5" />
    </g>
    {/* 折れた刀2（ジグザグ、右上） */}
    <g>
      <path d="M 80 86 L 76 72 L 82 60 L 74 44" strokeWidth="1.4" />
      <line x1="77" y1="86" x2="87" y2="86" strokeWidth="1" />
      <line x1="82" y1="60" x2="85" y2="58" strokeWidth="0.5" />
    </g>

    {/* 地に斜めに突き刺さる3本 */}
    <Katana x={36} tipY={70} guardY={84} pommelY={94} rotation={-25} pivotY={84} width={1.5} />
    <Katana x={50} tipY={66} guardY={82} pommelY={92} rotation={15} pivotY={82} width={1.5} />
    <Katana x={64} tipY={68} guardY={84} pommelY={94} rotation={-10} pivotY={84} width={1.5} />

    {/* 散る朱の小点（屈辱） */}
    <g className="text-primary" fill="currentColor" stroke="none">
      <circle cx="22" cy="80" r="0.6" opacity="0.7" />
      <circle cx="42" cy="78" r="0.5" opacity="0.6" />
      <circle cx="58" cy="80" r="0.5" opacity="0.6" />
      <circle cx="72" cy="82" r="0.6" opacity="0.7" />
    </g>

    {/* 風の流線（敗北の風） */}
    <g strokeWidth="0.35" opacity="0.4" strokeDasharray="2 2">
      <line x1="6" y1="30" x2="34" y2="34" />
      <line x1="66" y1="34" x2="94" y2="30" />
      <line x1="10" y1="40" x2="40" y2="42" />
    </g>
  </>
)

// 六：六本の刀が船型に + 水面の波紋 + 遠い岸 ★★★★☆
const SixOfSwords: React.FC = () => (
  <>
    {/* 遠い岸のシルエット */}
    <path d="M 4 38 L 16 32 L 30 36 L 48 30 L 64 34 L 80 30 L 96 36 L 96 42 L 4 42 Z" strokeWidth="0.5" opacity="0.4" />

    {/* 中央の船型（6本の刀） */}
    {/* 船底ライン（弧） */}
    <path d="M 16 64 Q 50 78 84 64" strokeWidth="1.2" />
    {/* 6本の刀を縦に並べる（マスト風） */}
    {[24, 32, 40, 50, 60, 76].map((cx, i) => (
      <Katana key={i} x={cx} tipY={36 + (i % 2) * 2} guardY={60} pommelY={66} width={1.2} />
    ))}

    {/* 水面の波紋（横長の楕円） */}
    <g strokeWidth="0.4" opacity="0.55">
      <ellipse cx="50" cy="76" rx="40" ry="2" />
      <ellipse cx="50" cy="82" rx="46" ry="2.5" opacity="0.7" />
      <ellipse cx="50" cy="88" rx="50" ry="3" opacity="0.5" />
    </g>

    {/* 船首の朱（旅の希望） */}
    <circle className="text-primary" fill="currentColor" cx="84" cy="64" r="1" stroke="none" />

    {/* 月（薄く） */}
    <circle cx="78" cy="14" r="3.5" strokeWidth="0.4" opacity="0.6" />
  </>
)

// 七：五本を抱えて去る人影 + 二本残る ★★★★☆
const SevenOfSwords: React.FC = () => (
  <>
    {/* 地面 */}
    <line x1="6" y1="92" x2="94" y2="92" strokeWidth="0.5" />

    {/* 残された2本（地に立つ） */}
    <Katana x={70} tipY={56} guardY={84} pommelY={92} rotation={-5} pivotY={84} width={1.3} />
    <Katana x={82} tipY={58} guardY={86} pommelY={94} rotation={8} pivotY={86} width={1.3} />

    {/* 去る人影（右→左へ、後ろ姿） */}
    <g>
      {/* 頭 */}
      <circle cx="30" cy="40" r="3.5" strokeWidth="0.8" />
      {/* 笠 */}
      <path d="M 24 38 Q 30 32 36 38 Z" strokeWidth="0.6" />
      {/* 胴体（マント・前傾） */}
      <path d="M 26 44 Q 22 60 26 72 L 36 72 Q 38 60 34 44 Z" strokeWidth="0.8" />
      {/* 足（前後） */}
      <line x1="28" y1="72" x2="22" y2="86" strokeWidth="0.8" />
      <line x1="34" y1="72" x2="36" y2="86" strokeWidth="0.8" />
      {/* 草履 */}
      <line x1="18" y1="86" x2="26" y2="86" strokeWidth="0.6" />
      <line x1="32" y1="86" x2="40" y2="86" strokeWidth="0.6" />
    </g>

    {/* 抱えた5本の刀（人影の前～脇に斜めに重ねる） */}
    <g opacity="0.95">
      <line x1="14" y1="44" x2="42" y2="56" strokeWidth="1.2" />
      <line x1="16" y1="48" x2="44" y2="60" strokeWidth="1.2" />
      <line x1="18" y1="52" x2="46" y2="64" strokeWidth="1.2" />
      <line x1="14" y1="56" x2="42" y2="68" strokeWidth="1.2" />
      <line x1="16" y1="60" x2="44" y2="72" strokeWidth="1.2" />
      {/* 切先（左端） */}
      <path d="M 14 44 L 10 42 L 14 46 Z" strokeWidth="0.4" />
      <path d="M 16 48 L 12 46 L 16 50 Z" strokeWidth="0.4" />
      <path d="M 18 52 L 14 50 L 18 54 Z" strokeWidth="0.4" />
    </g>

    {/* 朱の小印（盗みの徴） */}
    <circle className="text-primary" fill="currentColor" cx="28" cy="56" r="0.7" stroke="none" opacity="0.7" />

    {/* 足跡（点線） */}
    <g strokeWidth="0.4" opacity="0.4" strokeDasharray="2 3">
      <line x1="42" y1="88" x2="86" y2="88" />
    </g>
  </>
)

// 八：八本の刀が円形に + 中央に縛られた人影 ★★★★☆
const EightOfSwords: React.FC = () => (
  <>
    {/* 8本の刀を円周に配置（切先が中央向き） */}
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 360) / 8 - 90
      const rad = (angle * Math.PI) / 180
      const r = 36
      const tipX = 50 + (r - 18) * Math.cos(rad)
      const tipY = 50 + (r - 18) * Math.sin(rad)
      const baseX = 50 + r * Math.cos(rad)
      const baseY = 50 + r * Math.sin(rad)
      // 中央に向かう刀を回転で表現するために、回転角度計算
      const rotation = angle + 90
      return (
        <Katana
          key={i}
          x={baseX}
          tipY={baseY - 12}
          guardY={baseY + 4}
          pommelY={baseY + 14}
          rotation={rotation + 180}
          pivotY={baseY}
          width={1.4}
        />
      )
    })}

    {/* 中央の縛られた人影 */}
    <g>
      {/* 頭 */}
      <circle cx="50" cy="42" r="3.5" strokeWidth="0.8" />
      {/* 胴体 */}
      <path d="M 46 46 L 44 62 L 56 62 L 54 46 Z" strokeWidth="0.8" />
      {/* 縄（縛り） */}
      <g strokeWidth="0.5">
        <line x1="42" y1="50" x2="58" y2="50" />
        <line x1="42" y1="54" x2="58" y2="54" />
        <line x1="42" y1="58" x2="58" y2="58" />
      </g>
      {/* 結び目（朱） */}
      <circle className="text-primary" fill="currentColor" cx="50" cy="54" r="1" stroke="none" />
      {/* 足元の縄 */}
      <line x1="44" y1="62" x2="40" y2="68" strokeWidth="0.5" />
      <line x1="56" y1="62" x2="60" y2="68" strokeWidth="0.5" />
      <path d="M 38 68 Q 50 72 62 68" strokeWidth="0.5" />
    </g>

    {/* 地 */}
    <line x1="22" y1="80" x2="78" y2="80" strokeWidth="0.4" opacity="0.5" />
  </>
)

// 九：上に9本の刀の壁 + 下に頭を抱える人影 + 闇のヘッチング ★★★★★
const NineOfSwords: React.FC = () => (
  <>
    {/* 背景の闇のヘッチング（細かい斜線） */}
    <g strokeWidth="0.3" opacity="0.35">
      {Array.from({ length: 14 }).map((_, i) => {
        const x = 4 + i * 7
        return <line key={`h1-${i}`} x1={x} y1={2} x2={x + 4} y2={14} />
      })}
      {Array.from({ length: 14 }).map((_, i) => {
        const x = 0 + i * 7
        return <line key={`h2-${i}`} x1={x + 4} y1={2} x2={x} y2={14} />
      })}
    </g>

    {/* 上部の9本の刀（壁のように並列、下向き＝切先下） */}
    {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((x, i) => (
      <g key={i} transform={`rotate(180 ${x} 30)`}>
        <Katana x={x} tipY={14} guardY={42} pommelY={50} width={1.2} />
      </g>
    ))}
    {/* 壁の梁（刀を支える） */}
    <line x1="4" y1="20" x2="96" y2="20" strokeWidth="0.6" />
    <line x1="4" y1="50" x2="96" y2="50" strokeWidth="0.6" />

    {/* 下部の頭を抱える人影 */}
    <g>
      {/* 頭 */}
      <circle cx="50" cy="66" r="5" strokeWidth="1" />
      {/* 両手（頭を抱える） */}
      <path d="M 42 64 Q 38 60 38 64 Q 38 68 44 70" strokeWidth="0.7" />
      <path d="M 58 64 Q 62 60 62 64 Q 62 68 56 70" strokeWidth="0.7" />
      {/* 胴体（うずくまる） */}
      <path d="M 44 70 Q 38 80 36 92 L 64 92 Q 62 80 56 70 Z" strokeWidth="1" />
      {/* 顔の悲しみ（中央に細い線） */}
      <line x1="48" y1="66" x2="48" y2="68" strokeWidth="0.4" />
      <line x1="52" y1="66" x2="52" y2="68" strokeWidth="0.4" />
    </g>

    {/* 朱の涙 */}
    <g className="text-primary" fill="currentColor" stroke="none" opacity="0.85">
      <path d="M 47 70 Q 45 74 47 76 Q 49 74 47 70 Z" />
      <path d="M 53 70 Q 51 74 53 76 Q 55 74 53 70 Z" />
    </g>
  </>
)

// 十：地に倒れた人影に十本の刀 + 夜明けのグラデーション ★★★★★
const TenOfSwords: React.FC = () => (
  <>
    {/* 背景：夜明けのグラデーション（下から薄明） */}
    <g strokeWidth="0.6" opacity="0.45">
      <line x1="0" y1="86" x2="100" y2="86" />
      <line x1="0" y1="80" x2="100" y2="80" opacity="0.7" />
      <line x1="0" y1="74" x2="100" y2="74" opacity="0.5" />
      <line x1="0" y1="68" x2="100" y2="68" opacity="0.3" />
    </g>
    {/* 遠い太陽（極小） */}
    <path d="M 38 86 Q 50 78 62 86" strokeWidth="0.7" opacity="0.55" />

    {/* 倒れた人影（横たわる、下部） */}
    <g>
      {/* 頭（左） */}
      <circle cx="22" cy="72" r="3.5" strokeWidth="0.8" />
      {/* 胴体（横たわる） */}
      <path d="M 26 72 L 30 76 L 70 78 L 74 74 L 70 72 L 30 70 Z" strokeWidth="0.8" />
      {/* 足（右端） */}
      <line x1="74" y1="74" x2="80" y2="76" strokeWidth="0.7" />
      <line x1="74" y1="76" x2="80" y2="78" strokeWidth="0.7" />
    </g>

    {/* 10本の刀が斜めに刺さる（各位置で角度違い、1本だけ違う角度） */}
    {[
      { x: 22, rot: -20 }, // 1
      { x: 30, rot: -10 },
      { x: 38, rot: -5 },
      { x: 46, rot: 0 },
      { x: 54, rot: 5 },
      { x: 62, rot: 10 },
      { x: 70, rot: 15 },
      { x: 78, rot: 20 },
      { x: 40, rot: 60 }, // 違う角度（ドラマ）
      { x: 60, rot: -55 },
    ].map((s, i) => (
      <Katana
        key={i}
        x={s.x}
        tipY={20}
        guardY={66}
        pommelY={56}
        rotation={s.rot}
        pivotY={72}
        width={1.4}
        opacity={i === 8 || i === 9 ? 0.9 : 1}
      />
    ))}

    {/* 血の滴り（朱） */}
    <g className="text-primary" fill="currentColor" stroke="none" opacity="0.85">
      <circle cx="38" cy="78" r="0.7" />
      <circle cx="48" cy="80" r="0.6" />
      <circle cx="58" cy="78" r="0.7" />
      <circle cx="32" cy="82" r="0.5" opacity="0.7" />
      <circle cx="66" cy="82" r="0.5" opacity="0.7" />
    </g>

    {/* 夜明けの兆し（薄い水平光） */}
    <line x1="6" y1="92" x2="94" y2="92" strokeWidth="0.4" opacity="0.6" />
  </>
)

const SWORDS_BY_NUMBER: Record<number, React.FC> = {
  1: AceOfSwords,
  2: TwoOfSwords,
  3: ThreeOfSwords,
  4: FourOfSwords,
  5: FiveOfSwords,
  6: SixOfSwords,
  7: SevenOfSwords,
  8: EightOfSwords,
  9: NineOfSwords,
  10: TenOfSwords,
}

export function SwordsNumberCard({ number }: { number: number }): React.ReactElement | null {
  const C = SWORDS_BY_NUMBER[number]
  if (!C) return null
  return <C />
}

export {
  AceOfSwords,
  TwoOfSwords,
  ThreeOfSwords,
  FourOfSwords,
  FiveOfSwords,
  SixOfSwords,
  SevenOfSwords,
  EightOfSwords,
  NineOfSwords,
  TenOfSwords,
}

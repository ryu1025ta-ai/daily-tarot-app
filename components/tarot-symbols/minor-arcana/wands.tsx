import React from 'react'

// 杖（Wands）Common 数札 一〜十。
// 設計原則：
//   - viewBox は親 SVG（0 0 100 100）を共有。フル領域を絵として使う。
//   - stroke は親の rarity-symbol-common により currentColor（墨）として継承される。
//     CSS 変数 --rarity-common-color を rarity-symbol-common クラスで参照。
//   - 朱印的アクセント（炎・火種）は className="text-primary" + fill="currentColor"。
//   - レア度 common なのでフレームは付けず、絵そのもので語る。
//   - 線の密度は設計書（Notion）の★評価を厳守。

// 一: 火打石から散る一粒の火花 ★★☆☆☆
const AceOfWands: React.FC = () => (
  <>
    {/* 火打石（中央下） */}
    <path d="M 36 80 Q 35 72 44 70 L 58 70 Q 66 71 64 80 Q 60 86 48 86 Q 38 85 36 80 Z" strokeWidth="1.4" />
    {/* 火打石の質感（割れ目） */}
    <path d="M 42 74 L 50 78 L 56 73" strokeWidth="0.6" />
    {/* 火花の軌跡（点） */}
    <circle cx="54" cy="62" r="0.7" fill="currentColor" stroke="none" />
    <circle cx="52" cy="54" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="49" cy="46" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="47" cy="38" r="0.5" fill="currentColor" stroke="none" />
    {/* 火花本体（朱） */}
    <g className="text-primary" fill="currentColor" stroke="currentColor">
      <circle cx="45" cy="26" r="2.2" stroke="none" />
      <line x1="45" y1="20" x2="45" y2="32" strokeWidth="0.7" />
      <line x1="39" y1="26" x2="51" y2="26" strokeWidth="0.7" />
      <line x1="41" y1="22" x2="49" y2="30" strokeWidth="0.5" />
      <line x1="49" y1="22" x2="41" y2="30" strokeWidth="0.5" />
    </g>
  </>
)

// 二: 二本の燭台が向かい合う ★★☆☆☆
const TwoOfWands: React.FC = () => (
  <>
    {/* 左燭台 */}
    <g>
      <line x1="20" y1="84" x2="36" y2="84" strokeWidth="1.4" />
      <line x1="23" y1="80" x2="33" y2="80" />
      <line x1="28" y1="80" x2="28" y2="44" strokeWidth="1.2" />
      <line x1="22" y1="42" x2="34" y2="42" strokeWidth="1.2" />
      {/* ろうそく */}
      <line x1="28" y1="42" x2="28" y2="32" />
      {/* 炎 */}
      <path d="M 28 32 Q 24 26 28 18 Q 32 26 28 32 Z" className="text-primary" fill="currentColor" stroke="none" />
    </g>
    {/* 右燭台（鏡像） */}
    <g>
      <line x1="64" y1="84" x2="80" y2="84" strokeWidth="1.4" />
      <line x1="67" y1="80" x2="77" y2="80" />
      <line x1="72" y1="80" x2="72" y2="44" strokeWidth="1.2" />
      <line x1="66" y1="42" x2="78" y2="42" strokeWidth="1.2" />
      <line x1="72" y1="42" x2="72" y2="32" />
      <path d="M 72 32 Q 68 26 72 18 Q 76 26 72 32 Z" className="text-primary" fill="currentColor" stroke="none" />
    </g>
    {/* 余白に控えめな水平線（地） */}
    <line x1="14" y1="90" x2="86" y2="90" strokeWidth="0.4" opacity="0.5" />
  </>
)

// 三: 三本の松明、手前から奥へ遠近 ★★★☆☆
const ThreeOfWands: React.FC = () => (
  <>
    {/* 地平線（遠近を補強） */}
    <line x1="8" y1="80" x2="92" y2="80" strokeWidth="0.4" strokeDasharray="2 2" opacity="0.55" />

    {/* 奥の松明（小・中央上） */}
    <g>
      <line x1="50" y1="56" x2="50" y2="38" strokeWidth="1" />
      <line x1="47" y1="44" x2="53" y2="44" strokeWidth="0.7" />
      <line x1="47" y1="50" x2="53" y2="50" strokeWidth="0.7" />
      <path d="M 50 36 Q 47 30 50 24 Q 53 30 50 36 Z" className="text-primary" fill="currentColor" stroke="none" />
    </g>
    {/* 手前左の松明（大） */}
    <g>
      <line x1="22" y1="92" x2="22" y2="48" strokeWidth="2" />
      <line x1="17" y1="56" x2="27" y2="56" strokeWidth="1" />
      <line x1="17" y1="68" x2="27" y2="68" strokeWidth="1" />
      <line x1="17" y1="80" x2="27" y2="80" strokeWidth="1" />
      <path d="M 22 46 Q 14 36 22 18 Q 30 36 22 46 Z" className="text-primary" fill="currentColor" stroke="none" />
      <path d="M 22 42 Q 18 34 22 24 Q 26 34 22 42 Z" className="text-primary" fill="currentColor" stroke="none" opacity="0.65" />
    </g>
    {/* 手前右の松明（大） */}
    <g>
      <line x1="78" y1="92" x2="78" y2="48" strokeWidth="2" />
      <line x1="73" y1="56" x2="83" y2="56" strokeWidth="1" />
      <line x1="73" y1="68" x2="83" y2="68" strokeWidth="1" />
      <line x1="73" y1="80" x2="83" y2="80" strokeWidth="1" />
      <path d="M 78 46 Q 70 36 78 18 Q 86 36 78 46 Z" className="text-primary" fill="currentColor" stroke="none" />
      <path d="M 78 42 Q 74 34 78 24 Q 82 34 78 42 Z" className="text-primary" fill="currentColor" stroke="none" opacity="0.65" />
    </g>
  </>
)

// 四: 四方竹の祭壇、中央に大きめの炎 ★★★☆☆
// 修正版（v2）：四本の竹を「単純な四角枠」ではなく明確に4本の柱として描き、
//   - 竹は太く・節を多く・色付き帯で強調
//   - 上部のしめ縄＋紙垂を太く拡大、稲妻型に明確化
//   - 中央のろうそく台を組み、炎を一段大きく多層化
const FourOfWands: React.FC = () => (
  <>
    {/* 地面 */}
    <line x1="6" y1="90" x2="94" y2="90" strokeWidth="0.6" />

    {/* 四本の竹（柱） — 左奥／右奥／左前／右前。前後で太さ違い、4本独立 */}
    {/* 左奥 */}
    <line x1="22" y1="84" x2="22" y2="22" strokeWidth="2.4" />
    <line x1="18" y1="38" x2="26" y2="38" strokeWidth="1" />
    <line x1="18" y1="54" x2="26" y2="54" strokeWidth="1" />
    <line x1="18" y1="70" x2="26" y2="70" strokeWidth="1" />
    {/* 葉飾り（左奥の上） */}
    <path d="M 22 22 Q 14 18 12 12" strokeWidth="0.7" />
    <path d="M 22 22 Q 26 16 30 14" strokeWidth="0.7" />

    {/* 右奥 */}
    <line x1="78" y1="84" x2="78" y2="22" strokeWidth="2.4" />
    <line x1="74" y1="38" x2="82" y2="38" strokeWidth="1" />
    <line x1="74" y1="54" x2="82" y2="54" strokeWidth="1" />
    <line x1="74" y1="70" x2="82" y2="70" strokeWidth="1" />
    {/* 葉飾り（右奥の上） */}
    <path d="M 78 22 Q 86 18 88 12" strokeWidth="0.7" />
    <path d="M 78 22 Q 74 16 70 14" strokeWidth="0.7" />

    {/* 左前（短い・前面） */}
    <line x1="34" y1="88" x2="34" y2="34" strokeWidth="1.6" />
    <line x1="31" y1="50" x2="37" y2="50" strokeWidth="0.7" />
    <line x1="31" y1="66" x2="37" y2="66" strokeWidth="0.7" />
    <line x1="31" y1="80" x2="37" y2="80" strokeWidth="0.7" />

    {/* 右前（短い・前面） */}
    <line x1="66" y1="88" x2="66" y2="34" strokeWidth="1.6" />
    <line x1="63" y1="50" x2="69" y2="50" strokeWidth="0.7" />
    <line x1="63" y1="66" x2="69" y2="66" strokeWidth="0.7" />
    <line x1="63" y1="80" x2="69" y2="80" strokeWidth="0.7" />

    {/* しめ縄（拡大・しっかり） */}
    <path d="M 22 26 Q 30 18 38 26 Q 46 34 54 26 Q 62 18 70 26 Q 76 30 78 26" strokeWidth="1.4" />
    {/* 紙垂（しで・三段） */}
    <path d="M 30 26 L 30 36 L 32 32 L 32 40 L 34 36 L 34 42" strokeWidth="0.7" />
    <path d="M 50 30 L 50 42 L 52 38 L 52 46 L 54 42 L 54 48" strokeWidth="0.7" />
    <path d="M 70 26 L 70 36 L 68 32 L 68 40 L 66 36 L 66 42" strokeWidth="0.7" />

    {/* 朱の鈴（しめ縄中央） */}
    <circle className="text-primary" fill="currentColor" cx="46" cy="30" r="1.2" stroke="none" />

    {/* 中央の三方台（祭壇） */}
    <rect x="40" y="80" width="20" height="4" strokeWidth="0.8" />
    <line x1="42" y1="84" x2="42" y2="88" strokeWidth="0.6" />
    <line x1="58" y1="84" x2="58" y2="88" strokeWidth="0.6" />
    {/* ろうそく */}
    <line x1="46" y1="80" x2="54" y2="80" strokeWidth="0.7" />
    <line x1="50" y1="80" x2="50" y2="64" strokeWidth="1.4" />

    {/* 中央の炎（多層） */}
    <g className="text-primary" fill="currentColor" stroke="none">
      <path d="M 50 64 Q 40 52 44 38 Q 47 48 50 38 Q 53 48 56 38 Q 60 52 50 64 Z" opacity="0.45" />
      <path d="M 50 62 Q 44 52 47 42 Q 50 48 53 42 Q 56 52 50 62 Z" opacity="0.85" />
      <path d="M 50 60 Q 47 54 50 46 Q 53 54 50 60 Z" />
      {/* 火の粉 */}
      <circle cx="44" cy="34" r="0.5" opacity="0.7" />
      <circle cx="56" cy="32" r="0.5" opacity="0.7" />
      <circle cx="50" cy="28" r="0.5" opacity="0.6" />
    </g>
  </>
)

// 五: 五つの薪が乱雑、荒い炎 ★★★★☆
const FiveOfWands: React.FC = () => (
  <>
    {/* 5本の薪（乱雑な五角配置） */}
    <line x1="14" y1="88" x2="46" y2="56" strokeWidth="2" />
    <line x1="86" y1="86" x2="54" y2="58" strokeWidth="2" />
    <line x1="30" y1="92" x2="52" y2="62" strokeWidth="1.7" />
    <line x1="70" y1="90" x2="48" y2="60" strokeWidth="1.7" />
    <line x1="50" y1="94" x2="50" y2="60" strokeWidth="2.2" />

    {/* 焚き付けの細枝（密度上げ） */}
    <line x1="34" y1="80" x2="62" y2="72" strokeWidth="0.6" />
    <line x1="38" y1="84" x2="66" y2="78" strokeWidth="0.6" />
    <line x1="28" y1="74" x2="50" y2="70" strokeWidth="0.5" />
    <line x1="56" y1="68" x2="72" y2="76" strokeWidth="0.5" />

    {/* 薪の節・木目（小） */}
    <line x1="22" y1="78" x2="26" y2="80" strokeWidth="0.5" />
    <line x1="40" y1="68" x2="44" y2="70" strokeWidth="0.5" />
    <line x1="74" y1="80" x2="78" y2="82" strokeWidth="0.5" />

    {/* 荒い炎（多層・歪み） */}
    <g className="text-primary" fill="currentColor" stroke="none">
      <path d="M 26 58 Q 22 40 30 28 Q 32 42 38 32 Q 40 20 46 14 Q 48 28 52 18 Q 56 8 60 16 Q 62 28 66 22 Q 70 36 74 30 Q 78 42 74 58 Z" opacity="0.5" />
      <path d="M 32 58 Q 30 46 36 38 Q 38 48 44 40 Q 46 28 50 22 Q 54 30 56 22 Q 58 36 62 32 Q 66 44 68 58 Z" opacity="0.75" />
      <path d="M 40 58 Q 38 50 42 42 Q 46 50 50 38 Q 54 50 58 42 Q 62 50 60 58 Z" />
      {/* 火の粉 */}
      <circle cx="20" cy="22" r="0.7" />
      <circle cx="30" cy="10" r="0.6" />
      <circle cx="68" cy="8" r="0.7" />
      <circle cx="82" cy="20" r="0.6" />
      <circle cx="76" cy="34" r="0.5" opacity="0.7" />
    </g>
  </>
)

// 六: 六本の松明、亀甲（六角形）配置、中央が空 ★★★☆☆
// 修正版（v2）：松明を「点」ではなく明確な棒＋炎の口に拡大。
//   - 松明長さ 18 → 棒として明確に視認
//   - 炎は外向き火の口（菱形→ハート型の3層）に置き換え
//   - 結び帯は2段に
const SixOfWands: React.FC = () => {
  // 六角形の頂点を中心(50,50) 半径30で配置。
  const cx = 50, cy = 50, r = 30
  const vertices = [0, 60, 120, 180, 240, 300].map((deg) => {
    const rad = ((deg - 90) * Math.PI) / 180
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  })
  return (
    <>
      {/* 亀甲の薄い枠 */}
      <path
        d={`M ${vertices.map(v => `${v.x.toFixed(1)} ${v.y.toFixed(1)}`).join(' L ')} Z`}
        strokeWidth="0.5"
        strokeDasharray="2 2"
        opacity="0.45"
      />
      {/* 中央の朱印（小さく勝利の印） */}
      <circle cx={cx} cy={cy} r="3.5" strokeWidth="0.5" />
      <circle className="text-primary" fill="currentColor" cx={cx} cy={cy} r="1.2" stroke="none" />

      {/* 6本の松明：各頂点を起点に、外向きの大きめ松明＋火の口 */}
      {vertices.map((v, i) => {
        const dx = v.x - cx
        const dy = v.y - cy
        const len = Math.hypot(dx, dy)
        const ux = dx / len, uy = dy / len
        // 直交ベクトル（帯と火の口の幅）
        const px = -uy, py = ux

        // 棒：内側（中心寄り）から頂点まで、長く太く
        const base = { x: v.x - ux * 18, y: v.y - uy * 18 }
        const tip = { x: v.x, y: v.y }

        // 帯（結び）2段
        const knot1Mid = { x: v.x - ux * 6, y: v.y - uy * 6 }
        const knot2Mid = { x: v.x - ux * 10, y: v.y - uy * 10 }
        const k1A = { x: knot1Mid.x + px * 2.2, y: knot1Mid.y + py * 2.2 }
        const k1B = { x: knot1Mid.x - px * 2.2, y: knot1Mid.y - py * 2.2 }
        const k2A = { x: knot2Mid.x + px * 2.6, y: knot2Mid.y + py * 2.6 }
        const k2B = { x: knot2Mid.x - px * 2.6, y: knot2Mid.y - py * 2.6 }

        // 火の口：tip から外向き、3層
        const flameOuterTip = { x: v.x + ux * 10, y: v.y + uy * 10 }
        const flameMidTip = { x: v.x + ux * 7, y: v.y + uy * 7 }
        const flameOuterA = { x: v.x + ux * 3 + px * 4, y: v.y + uy * 3 + py * 4 }
        const flameOuterB = { x: v.x + ux * 3 - px * 4, y: v.y + uy * 3 - py * 4 }
        const flameMidA = { x: v.x + ux * 2.5 + px * 2.8, y: v.y + uy * 2.5 + py * 2.8 }
        const flameMidB = { x: v.x + ux * 2.5 - px * 2.8, y: v.y + uy * 2.5 - py * 2.8 }

        return (
          <g key={i}>
            {/* 棒本体 */}
            <line
              x1={base.x.toFixed(1)} y1={base.y.toFixed(1)}
              x2={tip.x.toFixed(1)} y2={tip.y.toFixed(1)}
              strokeWidth="2.2"
            />
            {/* 結び 2 段 */}
            <line x1={k1A.x.toFixed(1)} y1={k1A.y.toFixed(1)} x2={k1B.x.toFixed(1)} y2={k1B.y.toFixed(1)} strokeWidth="0.8" />
            <line x1={k2A.x.toFixed(1)} y1={k2A.y.toFixed(1)} x2={k2B.x.toFixed(1)} y2={k2B.y.toFixed(1)} strokeWidth="0.8" />
            {/* 炎 外層・中層・芯 */}
            <g className="text-primary" fill="currentColor" stroke="none">
              <path
                d={`M ${tip.x.toFixed(1)} ${tip.y.toFixed(1)} Q ${flameOuterA.x.toFixed(1)} ${flameOuterA.y.toFixed(1)} ${flameOuterTip.x.toFixed(1)} ${flameOuterTip.y.toFixed(1)} Q ${flameOuterB.x.toFixed(1)} ${flameOuterB.y.toFixed(1)} ${tip.x.toFixed(1)} ${tip.y.toFixed(1)} Z`}
                opacity="0.45"
              />
              <path
                d={`M ${tip.x.toFixed(1)} ${tip.y.toFixed(1)} Q ${flameMidA.x.toFixed(1)} ${flameMidA.y.toFixed(1)} ${flameMidTip.x.toFixed(1)} ${flameMidTip.y.toFixed(1)} Q ${flameMidB.x.toFixed(1)} ${flameMidB.y.toFixed(1)} ${tip.x.toFixed(1)} ${tip.y.toFixed(1)} Z`}
              />
            </g>
          </g>
        )
      })}
    </>
  )
}

// 七: 高所の一本 + 下から迫る六つの小炎 ★★★★☆
const SevenOfWands: React.FC = () => (
  <>
    {/* 高所（上半分）の大松明 */}
    <line x1="50" y1="44" x2="50" y2="14" strokeWidth="2.4" />
    <line x1="44" y1="22" x2="56" y2="22" strokeWidth="1.1" />
    <line x1="44" y1="30" x2="56" y2="30" strokeWidth="1.1" />
    <line x1="44" y1="38" x2="56" y2="38" strokeWidth="1.1" />
    {/* 上端の大きな炎（多層） */}
    <g className="text-primary" fill="currentColor" stroke="none">
      <path d="M 50 14 Q 40 6 44 -2 Q 46 4 50 -4 Q 54 4 56 -2 Q 60 6 50 14 Z" opacity="0.5" />
      <path d="M 50 12 Q 44 6 47 0 Q 50 4 53 0 Q 56 6 50 12 Z" opacity="0.85" />
    </g>

    {/* 中央の境界線（高所と地上） */}
    <line x1="10" y1="58" x2="90" y2="58" strokeWidth="0.4" strokeDasharray="2 3" opacity="0.4" />

    {/* 下から迫る6つの小炎 */}
    <g className="text-primary" fill="currentColor" stroke="none">
      <path d="M 14 88 Q 11 80 14 72 Q 17 80 14 88 Z" />
      <path d="M 26 92 Q 23 82 26 74 Q 29 82 26 92 Z" opacity="0.9" />
      <path d="M 38 88 Q 35 80 38 70 Q 41 80 38 88 Z" />
      <path d="M 50 94 Q 47 82 50 68 Q 53 82 50 94 Z" opacity="0.9" />
      <path d="M 62 88 Q 59 80 62 70 Q 65 80 62 88 Z" />
      <path d="M 74 92 Q 71 82 74 74 Q 77 82 74 92 Z" opacity="0.9" />
      <path d="M 86 88 Q 83 80 86 72 Q 89 80 86 88 Z" />
      {/* 火の粉 */}
      <circle cx="20" cy="66" r="0.5" opacity="0.7" />
      <circle cx="44" cy="62" r="0.5" opacity="0.6" />
      <circle cx="68" cy="64" r="0.5" opacity="0.7" />
      <circle cx="82" cy="66" r="0.5" opacity="0.6" />
    </g>
  </>
)

// 八: 八本の火矢、流線・斜めの動き ★★★☆☆
const EightOfWands: React.FC = () => {
  // 左下から右上へ、8本平行に配置
  const arrows = [
    { x1: 6, y1: 86, x2: 38, y2: 54 },
    { x1: 14, y1: 88, x2: 46, y2: 56 },
    { x1: 22, y1: 90, x2: 54, y2: 58 },
    { x1: 30, y1: 86, x2: 62, y2: 54 },
    { x1: 38, y1: 88, x2: 70, y2: 56 },
    { x1: 46, y1: 90, x2: 78, y2: 58 },
    { x1: 54, y1: 86, x2: 86, y2: 54 },
    { x1: 22, y1: 76, x2: 54, y2: 44 },
  ]
  return (
    <>
      {/* 流線（速度の尾） */}
      <g strokeWidth="0.5" opacity="0.55" strokeDasharray="3 2">
        {arrows.map((a, i) => (
          <line key={`tail-${i}`} x1={a.x1 - 4} y1={a.y1 + 4} x2={a.x1} y2={a.y1} />
        ))}
      </g>
      {/* 矢の軸 */}
      <g strokeWidth="1.2">
        {arrows.map((a, i) => (
          <line key={`shaft-${i}`} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} />
        ))}
      </g>
      {/* 羽（矢羽根） */}
      <g strokeWidth="0.7">
        {arrows.map((a, i) => {
          // 軸の方向ベクトル
          const dx = a.x2 - a.x1, dy = a.y2 - a.y1
          const len = Math.hypot(dx, dy)
          const ux = dx / len, uy = dy / len
          // 末端付近に小さな羽
          const fb = { x: a.x1 + ux * 4, y: a.y1 + uy * 4 }
          return (
            <g key={`fletch-${i}`}>
              <line x1={a.x1} y1={a.y1} x2={fb.x - uy * 3} y2={fb.y + ux * 3} />
              <line x1={a.x1} y1={a.y1} x2={fb.x + uy * 3} y2={fb.y - ux * 3} />
            </g>
          )
        })}
      </g>
      {/* 矢尻と先端の火 */}
      <g className="text-primary" fill="currentColor" stroke="currentColor">
        {arrows.map((a, i) => {
          const dx = a.x2 - a.x1, dy = a.y2 - a.y1
          const len = Math.hypot(dx, dy)
          const ux = dx / len, uy = dy / len
          // 火炎（先端の三角＋小さな尾）
          const tip = { x: a.x2 + ux * 3, y: a.y2 + uy * 3 }
          const sideA = { x: a.x2 - uy * 2.2, y: a.y2 + ux * 2.2 }
          const sideB = { x: a.x2 + uy * 2.2, y: a.y2 - ux * 2.2 }
          return (
            <path
              key={`head-${i}`}
              d={`M ${a.x2} ${a.y2} L ${sideA.x.toFixed(1)} ${sideA.y.toFixed(1)} L ${tip.x.toFixed(1)} ${tip.y.toFixed(1)} L ${sideB.x.toFixed(1)} ${sideB.y.toFixed(1)} Z`}
              stroke="none"
            />
          )
        })}
      </g>
    </>
  )
}

// 九: 九本の松明、八本は燃え尽き、最後の一本だけ強く ★★★★☆
const NineOfWands: React.FC = () => {
  const xs = [12, 21.5, 31, 40.5, 50, 59.5, 69, 78.5, 88]
  return (
    <>
      {/* 地面 */}
      <line x1="6" y1="86" x2="94" y2="86" strokeWidth="0.7" />
      <line x1="6" y1="89" x2="94" y2="89" strokeWidth="0.3" opacity="0.5" />

      {/* 9本の松明 */}
      {xs.map((x, i) => {
        const isLive = i === 4 // 中央の1本のみ強く燃える
        return (
          <g key={i}>
            <line x1={x} y1="86" x2={x} y2={isLive ? 36 : 50} strokeWidth={isLive ? 2.2 : 1.1} />
            {/* 結び（小さく） */}
            <line x1={x - 3} y1={isLive ? 50 : 58} x2={x + 3} y2={isLive ? 50 : 58} strokeWidth="0.6" />
            <line x1={x - 3} y1={isLive ? 62 : 70} x2={x + 3} y2={isLive ? 62 : 70} strokeWidth="0.6" />
            {isLive ? (
              <g className="text-primary" fill="currentColor" stroke="none">
                {/* 強い炎・多層 */}
                <path d={`M ${x} 36 Q ${x - 9} 22 ${x - 3} 10 Q ${x} 18 ${x + 3} 10 Q ${x + 9} 22 ${x} 36 Z`} opacity="0.5" />
                <path d={`M ${x} 34 Q ${x - 6} 24 ${x - 2} 16 Q ${x} 22 ${x + 2} 16 Q ${x + 6} 24 ${x} 34 Z`} opacity="0.9" />
                <path d={`M ${x} 32 Q ${x - 3} 26 ${x} 22 Q ${x + 3} 26 ${x} 32 Z`} />
                {/* 火の粉 */}
                <circle cx={x - 5} cy={6} r="0.6" opacity="0.7" />
                <circle cx={x + 4} cy={4} r="0.5" opacity="0.6" />
              </g>
            ) : (
              // 燃え尽きた残り火（微小な点・煙の名残）
              <g>
                <circle cx={x} cy="48" r="0.6" fill="currentColor" stroke="none" opacity="0.45" />
                <path d={`M ${x - 1} 44 Q ${x + 1.2} 38 ${x - 0.5} 32`} strokeWidth="0.4" opacity="0.35" />
              </g>
            )}
          </g>
        )
      })}
    </>
  )
}

// 十: 燃え盛る大焚き火、十本の薪 ★★★★★
const TenOfWands: React.FC = () => (
  <>
    {/* 地面 */}
    <line x1="6" y1="92" x2="94" y2="92" strokeWidth="0.5" />

    {/* 10本の薪を井桁・X字に乱雑に組む */}
    {/* 1〜2: 上層の渡し */}
    <line x1="20" y1="68" x2="80" y2="68" strokeWidth="1.7" />
    <line x1="22" y1="74" x2="78" y2="74" strokeWidth="1.6" />
    {/* 3〜4: 大きなX */}
    <line x1="14" y1="86" x2="78" y2="60" strokeWidth="2" />
    <line x1="86" y1="86" x2="22" y2="60" strokeWidth="2" />
    {/* 5〜6: 内側のX */}
    <line x1="28" y1="90" x2="68" y2="62" strokeWidth="1.5" />
    <line x1="72" y1="90" x2="32" y2="62" strokeWidth="1.5" />
    {/* 7: 中央の柱 */}
    <line x1="50" y1="92" x2="50" y2="60" strokeWidth="2.4" />
    {/* 8〜9: 斜めの細い薪 */}
    <line x1="40" y1="90" x2="56" y2="64" strokeWidth="1.2" />
    <line x1="60" y1="90" x2="44" y2="64" strokeWidth="1.2" />
    {/* 10: 上面の留め */}
    <line x1="38" y1="62" x2="62" y2="62" strokeWidth="1.4" />

    {/* 木目・節（密度の追加） */}
    <line x1="30" y1="78" x2="36" y2="76" strokeWidth="0.4" />
    <line x1="58" y1="76" x2="64" y2="78" strokeWidth="0.4" />
    <line x1="42" y1="84" x2="48" y2="82" strokeWidth="0.4" />
    <line x1="52" y1="82" x2="58" y2="84" strokeWidth="0.4" />
    <line x1="68" y1="80" x2="72" y2="78" strokeWidth="0.4" />
    <line x1="20" y1="80" x2="24" y2="78" strokeWidth="0.4" />

    {/* 大焚き火（多層・画面上部まで） */}
    <g className="text-primary" fill="currentColor" stroke="none">
      {/* 最外層（最も大きく薄い） */}
      <path d="M 14 62 Q 4 38 16 14 Q 22 28 26 12 Q 30 26 36 6 Q 40 24 46 2 Q 50 22 54 2 Q 58 24 64 6 Q 68 26 74 12 Q 78 28 84 14 Q 96 38 86 62 Z" opacity="0.35" />
      {/* 中層 */}
      <path d="M 22 62 Q 16 44 26 26 Q 30 40 34 22 Q 38 38 44 14 Q 48 32 50 8 Q 52 32 56 14 Q 62 38 66 22 Q 70 40 74 26 Q 84 44 78 62 Z" opacity="0.6" />
      {/* 内層 */}
      <path d="M 30 60 Q 26 48 34 36 Q 38 46 42 30 Q 46 42 50 18 Q 54 42 58 30 Q 62 46 66 36 Q 74 48 70 60 Z" opacity="0.85" />
      {/* 芯 */}
      <path d="M 40 60 Q 38 50 44 42 Q 48 48 50 36 Q 52 48 56 42 Q 62 50 60 60 Z" />

      {/* 火の粉（多数） */}
      <circle cx="14" cy="10" r="0.8" opacity="0.7" />
      <circle cx="22" cy="4" r="0.6" opacity="0.6" />
      <circle cx="32" cy="2" r="0.7" opacity="0.7" />
      <circle cx="44" cy="-1" r="0.5" opacity="0.55" />
      <circle cx="56" cy="-1" r="0.5" opacity="0.55" />
      <circle cx="68" cy="2" r="0.7" opacity="0.7" />
      <circle cx="78" cy="4" r="0.6" opacity="0.6" />
      <circle cx="88" cy="10" r="0.8" opacity="0.7" />
      <circle cx="8" cy="22" r="0.5" opacity="0.5" />
      <circle cx="92" cy="24" r="0.5" opacity="0.5" />
      <circle cx="18" cy="32" r="0.4" opacity="0.45" />
      <circle cx="82" cy="34" r="0.4" opacity="0.45" />
    </g>
  </>
)

// number → コンポーネント。1〜10 のみ。
const WANDS_BY_NUMBER: Record<number, React.FC> = {
  1: AceOfWands,
  2: TwoOfWands,
  3: ThreeOfWands,
  4: FourOfWands,
  5: FiveOfWands,
  6: SixOfWands,
  7: SevenOfWands,
  8: EightOfWands,
  9: NineOfWands,
  10: TenOfWands,
}

/** 杖の数札（1〜10）。viewBox 0 0 100 100 のフル領域に描画する。
 * コートカード（11〜14）は対象外で null を返すので、呼び出し側がフォールバック。 */
export function WandsNumberCard({ number }: { number: number }): React.ReactElement | null {
  const C = WANDS_BY_NUMBER[number]
  if (!C) return null
  return <C />
}

export {
  AceOfWands,
  TwoOfWands,
  ThreeOfWands,
  FourOfWands,
  FiveOfWands,
  SixOfWands,
  SevenOfWands,
  EightOfWands,
  NineOfWands,
  TenOfWands,
}

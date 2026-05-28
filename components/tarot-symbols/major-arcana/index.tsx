import React from 'react'

// 大アルカナ22枚の和的再解釈シンボル。
// viewBox 0 0 100 100 内で完結。stroke は親 SVG の [&_*]:stroke-current で currentColor になる。
// 朱印的アクセントは className="text-primary" で色を切り替え。
// 塗りつぶしたい要素のみ fill="currentColor"、それ以外は SVG ルートの fill="none" を継承。

// 0 愚者：シルエット脱却版（縦構図、崖の上の人物 + 下に谷のかすみ）
// 物語：旅立ちの朝、崖の縁に立ち、見えぬ道へ一歩を踏み出す瞬間。
// 構図（縦 100 の3分割）：
//   上部 (y= 0〜25) 朝日ゾーン：背後の朝日 + 流れ雲（控えめ）
//   中央 (y=25〜70) 人物ゾーン：縦長の旅人シルエット + 肩の風呂敷 + 足元の犬
//   下部 (y=70〜95) 谷ゾーン：崖の縁から落ちる輪郭 + 谷のかすみ 3層（空白感）
// 円形にしない。太陽の「横帯」とも世界の「曼荼羅」とも違う「縦長 + 谷」の形に。
const TheFool: React.FC = () => (
  <>
    {/* === 上部 朝日ゾーン === */}
    {/* 朝日（背後、右上から控えめに昇る）。色味は和の薄朱（後光 + 薄い外円 + 中心朱印） */}
    <circle cx="80" cy="14" r="7" opacity="0.18" fill="currentColor" stroke="none" />
    <circle cx="80" cy="14" r="5" strokeWidth="0.5" opacity="0.45" />
    <circle className="text-primary fool-sunrise" fill="currentColor" cx="80" cy="14" r="1.6" />
    {/* 朝日の短い光線（右側のみ、控えめ） */}
    <line x1="86" y1="14" x2="90" y2="14" strokeWidth="0.5" opacity="0.45" />
    <line x1="80" y1="6"  x2="80" y2="9"  strokeWidth="0.5" opacity="0.45" />
    <line x1="84" y1="8"  x2="86" y2="10" strokeWidth="0.4" opacity="0.40" />

    {/* 一筋の流れ雲（左上）。横に流れる */}
    <path className="fool-cloud"
          d="M 6 12 Q 14 9 22 12 Q 30 9 38 12"
          opacity="0.45" strokeWidth="0.9" />

    {/* === 中央 人物ゾーン：縦長シルエットの旅人 === */}
    {/* 菅笠（旅人の象徴） */}
    <path d="M 40 32 L 50 20 L 60 32" strokeWidth="1" />
    <line x1="36" y1="32" x2="64" y2="32" strokeWidth="0.9" />
    <line x1="42" y1="34" x2="58" y2="34" opacity="0.45" strokeWidth="0.6" />
    {/* 笠の頂点に朱印（脈動） */}
    <circle className="text-primary fool-hat-seal" fill="currentColor" cx="50" cy="21" r="1.3" />

    {/* 笠下から覗く顔の暗示（目元の影） */}
    <line x1="46" y1="36" x2="46" y2="38" opacity="0.5" strokeWidth="0.7" />
    <line x1="54" y1="36" x2="54" y2="38" opacity="0.5" strokeWidth="0.7" />

    {/* 旅人の僧服（縦に細長く、画面中央軸に沿う） */}
    <line x1="50" y1="34" x2="50" y2="44" strokeWidth="0.7" />
    {/* 袈裟の襟元 */}
    <path d="M 50 44 L 44 52" strokeWidth="0.9" />
    <path d="M 50 44 L 56 52" strokeWidth="0.9" />
    {/* 袖（縦長を保つために控えめに） */}
    <path d="M 44 52 L 42 62" strokeWidth="0.7" />
    <path d="M 56 52 L 58 62" strokeWidth="0.7" />
    {/* 胴体の縦線 */}
    <line x1="44" y1="52" x2="44" y2="64" strokeWidth="0.7" opacity="0.65" />
    <line x1="56" y1="52" x2="56" y2="64" strokeWidth="0.7" opacity="0.65" />
    {/* 腰帯（細い） */}
    <line x1="43" y1="58" x2="57" y2="58" strokeWidth="1.1" />

    {/* 足（縦長を強調、崖の縁まで） */}
    <line x1="46" y1="64" x2="44" y2="70" strokeWidth="0.9" />
    <line x1="54" y1="64" x2="56" y2="70" strokeWidth="0.9" />

    {/* 杖（右肩から斜め上、肩に風呂敷を背負う形に） */}
    <line x1="56" y1="48" x2="74" y2="28" strokeWidth="1.5" />

    {/* 風呂敷包み：杖の先 (74, 28) に吊るす。fool-bag で振り子 */}
    <g className="fool-bag">
      {/* 結び目 */}
      <path d="M 71 28 L 74 25 L 77 28" strokeWidth="0.7" />
      {/* 包み本体（柔らかい長方形のシルエット） */}
      <path d="M 70 30 L 78 30 L 80 38 L 75 41 L 69 39 Z" strokeWidth="0.8" />
      <line x1="74" y1="28" x2="74" y2="34" opacity="0.6" strokeWidth="0.5" />
    </g>

    {/* 連れの白犬（足元のすぐ右、小さく寄り添う） */}
    <g>
      <ellipse cx="62" cy="73" rx="4.5" ry="2.2" strokeWidth="0.8" />
      <circle cx="57" cy="71.5" r="1.7" strokeWidth="0.7" />
      <path d="M 58 70 L 57 67.5" strokeWidth="0.7" /> {/* 耳 */}
      <line x1="59" y1="75" x2="58.5" y2="78" strokeWidth="0.7" />
      <line x1="64" y1="75" x2="64.5" y2="78" strokeWidth="0.7" />
      {/* 尻尾：ふりふり */}
      <path className="fool-dog-tail" d="M 66.5 71 Q 68 69 67 66" opacity="0.65" strokeWidth="0.8" />
    </g>

    {/* === 下部 谷ゾーン (y=70-95)：崖の縁 + かすみ === */}
    {/* 崖の縁（人物の足元、地面エッジ） */}
    <line x1="14" y1="70" x2="86" y2="70" opacity="0.60" strokeWidth="0.9" />
    {/* 崖の輪郭（左右に急角度で落ちる、断崖の絶壁） */}
    <path d="M 14 70 L 8 80 L 5 92" fill="none" opacity="0.50" strokeWidth="0.7" />
    <path d="M 86 70 L 92 80 L 95 92" fill="none" opacity="0.50" strokeWidth="0.7" />
    {/* 崖の岩肌（短い線数本） */}
    <line x1="12" y1="74" x2="14" y2="76" opacity="0.40" strokeWidth="0.4" />
    <line x1="10" y1="80" x2="12" y2="82" opacity="0.40" strokeWidth="0.4" />
    <line x1="88" y1="74" x2="86" y2="76" opacity="0.40" strokeWidth="0.4" />
    <line x1="90" y1="80" x2="88" y2="82" opacity="0.40" strokeWidth="0.4" />

    {/* 谷の遠景（薄いかすみの水平線、3層、空白感を出す） */}
    <line x1="20" y1="80" x2="80" y2="80" opacity="0.22" strokeWidth="0.4" strokeDasharray="2 3" />
    <line x1="24" y1="86" x2="76" y2="86" opacity="0.16" strokeWidth="0.4" strokeDasharray="2 3" />
    <line x1="28" y1="92" x2="72" y2="92" opacity="0.10" strokeWidth="0.4" strokeDasharray="2 3" />

    {/* 舞い散る花弁（朱、人物の周囲〜谷へ流れる）。fool-petal-1..5 既存クラス温存 */}
    <g className="fool-petal fool-petal-1">
      <circle className="text-primary" fill="currentColor" cx="22" cy="40" r="1.2" />
    </g>
    <g className="fool-petal fool-petal-2">
      <circle className="text-primary" fill="currentColor" cx="78" cy="46" r="1.1" />
    </g>
    <g className="fool-petal fool-petal-3">
      <circle className="text-primary" fill="currentColor" cx="26" cy="58" r="0.9" />
    </g>
    <g className="fool-petal fool-petal-4">
      <circle className="text-primary" fill="currentColor" cx="72" cy="38" r="0.9" />
    </g>
    <g className="fool-petal fool-petal-5">
      <circle className="text-primary" fill="currentColor" cx="34" cy="44" r="0.8" />
    </g>
  </>
)

const TheMagician: React.FC = () => (
  <>
    {/* 陰陽（外円）：magician-ring でゆっくり回転 */}
    <g className="magician-ring">
      <circle cx="50" cy="50" r="32" />
      {/* 陰陽の S 字境界（外円と共回り） */}
      <path d="M 50 18 A 16 16 0 0 1 50 50 A 16 16 0 0 0 50 82" />
    </g>
    {/* 陽の眼（朱）：magician-eye-yang で脈動 */}
    <circle className="text-primary magician-eye-yang" fill="currentColor" cx="50" cy="34" r="2.5" />
    {/* 陰の眼：magician-eye-yin で逆位相脈動 */}
    <circle className="magician-eye-yin" fill="currentColor" cx="50" cy="66" r="2.5" />
  </>
)

const HighPriestess: React.FC = () => (
  <>
    {/* 御簾 上端 */}
    <line x1="22" y1="22" x2="78" y2="22" />
    {/* 縦の竹簾（6本）：priestess-bamboo で時差揺れ */}
    <line className="priestess-bamboo priestess-bamboo-1" x1="30" y1="22" x2="30" y2="76" />
    <line className="priestess-bamboo priestess-bamboo-2" x1="38" y1="22" x2="38" y2="76" />
    <line className="priestess-bamboo priestess-bamboo-3" x1="46" y1="22" x2="46" y2="76" />
    <line className="priestess-bamboo priestess-bamboo-4" x1="54" y1="22" x2="54" y2="76" />
    <line className="priestess-bamboo priestess-bamboo-5" x1="62" y1="22" x2="62" y2="76" />
    <line className="priestess-bamboo priestess-bamboo-6" x1="70" y1="22" x2="70" y2="76" />
    {/* 下端 */}
    <line x1="22" y1="76" x2="78" y2="76" />
    {/* 房（朱）：priestess-tassel で振り子 */}
    <circle className="text-primary priestess-tassel" fill="currentColor" cx="50" cy="84" r="2" />
  </>
)

const TheEmpress: React.FC = () => (
  <>
    {/* 牡丹 5弁：empress-petals で開閉呼吸（中心を軸に scale） */}
    <g className="empress-petals">
      <ellipse cx="50" cy="28" rx="8" ry="12" />
      <ellipse cx="71" cy="43" rx="8" ry="12" transform="rotate(72 71 43)" />
      <ellipse cx="63" cy="68" rx="8" ry="12" transform="rotate(144 63 68)" />
      <ellipse cx="37" cy="68" rx="8" ry="12" transform="rotate(216 37 68)" />
      <ellipse cx="29" cy="43" rx="8" ry="12" transform="rotate(288 29 43)" />
    </g>
    {/* 花心（朱）：empress-core で強脈動 */}
    <circle className="text-primary empress-core" fill="currentColor" cx="50" cy="50" r="4" />
  </>
)

const TheEmperor: React.FC = () => (
  <>
    {/* v2：天守閣のシルエットへ刷新。重厚な石垣＋多層屋根＋中央の高座で「権威・統治」を表す。 */}
    {/* 石垣（基礎、台形） */}
    <path d="M 10 88 L 18 70 L 82 70 L 90 88 Z" />
    {/* 石垣の積み線 */}
    <line x1="14" y1="80" x2="86" y2="80" strokeWidth="0.5" opacity="0.7" />
    <line x1="22" y1="78" x2="30" y2="78" strokeWidth="0.4" opacity="0.6" />
    <line x1="38" y1="78" x2="46" y2="78" strokeWidth="0.4" opacity="0.6" />
    <line x1="54" y1="78" x2="62" y2="78" strokeWidth="0.4" opacity="0.6" />
    <line x1="70" y1="78" x2="78" y2="78" strokeWidth="0.4" opacity="0.6" />

    {/* 1階（最大） */}
    <rect x="20" y="56" width="60" height="14" />
    {/* 屋根1 */}
    <path d="M 16 56 L 50 48 L 84 56 Z" />

    {/* 2階 */}
    <rect x="26" y="36" width="48" height="12" />
    {/* 屋根2 */}
    <path d="M 22 36 L 50 30 L 78 36 Z" />

    {/* 3階（最上層） */}
    <rect x="32" y="20" width="36" height="10" />
    {/* 屋根3（反り付き） */}
    <path d="M 28 20 Q 50 6 72 20" />

    {/* 鯱（しゃちほこ・両端） */}
    <path d="M 28 20 Q 26 14 30 12" strokeWidth="0.7" />
    <path d="M 72 20 Q 74 14 70 12" strokeWidth="0.7" />

    {/* 中央の高座（御殿・象徴） */}
    <line x1="42" y1="62" x2="58" y2="62" strokeWidth="0.7" />
    <line x1="44" y1="62" x2="44" y2="70" strokeWidth="0.5" />
    <line x1="56" y1="62" x2="56" y2="70" strokeWidth="0.5" />
    {/* 高座の朱の御紋（権威の徴）：emperor-crest で威厳脈動 */}
    <circle className="text-primary emperor-crest" fill="currentColor" cx="50" cy="66" r="2" />

    {/* 窓（各層に2つずつ）：emperor-window で順次明滅（夜の城の灯） */}
    <rect className="emperor-window emperor-window-1" x="36" y="60" width="3" height="5" strokeWidth="0.5" />
    <rect className="emperor-window emperor-window-2" x="61" y="60" width="3" height="5" strokeWidth="0.5" />
    <rect className="emperor-window emperor-window-3" x="40" y="40" width="3" height="4" strokeWidth="0.5" />
    <rect className="emperor-window emperor-window-4" x="57" y="40" width="3" height="4" strokeWidth="0.5" />
    <rect className="emperor-window emperor-window-5" x="44" y="24" width="2.5" height="3" strokeWidth="0.5" />
    <rect className="emperor-window emperor-window-6" x="53.5" y="24" width="2.5" height="3" strokeWidth="0.5" />
  </>
)

const TheHierophant: React.FC = () => (
  <>
    {/* v2：五重塔はそのままに、下に三人の修行者を追加し「心の師・伝統」を強化。 */}
    {/* 五重塔の屋根 5 層（上から） */}
    <path d="M 38 18 L 50 10 L 62 18" />
    <line x1="34" y1="18" x2="66" y2="18" />
    <line x1="32" y1="28" x2="68" y2="28" />
    <line x1="30" y1="38" x2="70" y2="38" />
    <line x1="28" y1="50" x2="72" y2="50" />
    <line x1="26" y1="62" x2="74" y2="62" />
    {/* 各層の軒の反り */}
    <path d="M 34 18 Q 32 16 30 18" strokeWidth="0.5" />
    <path d="M 66 18 Q 68 16 70 18" strokeWidth="0.5" />
    <path d="M 32 28 Q 30 26 28 28" strokeWidth="0.5" />
    <path d="M 68 28 Q 70 26 72 28" strokeWidth="0.5" />
    {/* 軸 */}
    <line x1="50" y1="10" x2="50" y2="72" />
    {/* 基壇 */}
    <line x1="22" y1="72" x2="78" y2="72" strokeWidth="1.2" />
    {/* 相輪（朱）：hierophant-finial で脈動 */}
    <circle className="text-primary hierophant-finial" fill="currentColor" cx="50" cy="8" r="1.5" />

    {/* 三人の修行者（下部、塔を見上げる）：時差で頭を上下（合掌の呼吸） */}
    {[34, 50, 66].map((x, i) => (
      <g key={i} className={`hierophant-monk hierophant-monk-${i + 1}`}>
        {/* 頭（小さく） */}
        <circle cx={x} cy="80" r="2.2" strokeWidth="0.7" />
        {/* 体（座禅・三角） */}
        <path d={`M ${x - 4} 92 L ${x} 82 L ${x + 4} 92 Z`} strokeWidth="0.7" />
        {/* 合掌の手（中央線） */}
        <line x1={x} y1="84" x2={x} y2="88" strokeWidth="0.4" opacity="0.6" />
      </g>
    ))}

    {/* 地面 */}
    <line x1="20" y1="94" x2="80" y2="94" strokeWidth="0.5" />
  </>
)

const TheLovers: React.FC = () => (
  <>
    {/* v2：二人の選択を明確化。左上に太陽、右上に月、中央に小さな桜の花。 */}
    {/* 左上の太陽：lovers-sun-disk と lovers-sun-rays（光線が回転）に分割 */}
    <g>
      <circle className="lovers-sun-disk" cx="20" cy="16" r="6" />
      {/* 光線（8方向）：回転 */}
      <g className="lovers-sun-rays">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180
          const x1 = 20 + Math.cos(rad) * 8
          const y1 = 16 + Math.sin(rad) * 8
          const x2 = 20 + Math.cos(rad) * 11
          const y2 = 16 + Math.sin(rad) * 11
          return <line key={deg} x1={x1.toFixed(2)} y1={y1.toFixed(2)} x2={x2.toFixed(2)} y2={y2.toFixed(2)} strokeWidth="0.7" />
        })}
      </g>
      {/* 中央朱：脈動 */}
      <circle className="text-primary lovers-sun-core" fill="currentColor" cx="20" cy="16" r="2" stroke="none" />
    </g>

    {/* 右上の月（三日月）：lovers-moon で脈動 */}
    <g className="lovers-moon">
      <circle cx="80" cy="16" r="6" />
      <circle cx="83" cy="14" r="5" fill="currentColor" opacity="0.85" />
      <circle cx="78" cy="14" r="0.8" fill="currentColor" stroke="none" opacity="0.5" />
      <circle cx="82" cy="20" r="0.6" fill="currentColor" stroke="none" opacity="0.4" />
    </g>

    {/* 左の鶴：体・首・嘴 */}
    <path d="M 18 70 Q 26 56 38 56" />
    <path d="M 38 56 L 42 40 L 47 40" />
    {/* 右の鶴 */}
    <path d="M 82 70 Q 74 56 62 56" />
    <path d="M 62 56 L 58 40 L 53 40" />
    {/* 鶴の嘴（朱） */}
    <circle className="text-primary" fill="currentColor" cx="47" cy="40" r="1.2" stroke="none" />
    <circle className="text-primary" fill="currentColor" cx="53" cy="40" r="1.2" stroke="none" />

    {/* 中央の小さな桜の花（五弁）：lovers-sakura で呼吸 */}
    <g className="text-primary lovers-sakura" fill="currentColor" stroke="none">
      {[0, 72, 144, 216, 288].map((deg) => {
        const rad = (deg * Math.PI) / 180
        const px = 50 + Math.cos(rad) * 2.2
        const py = 48 + Math.sin(rad) * 2.2
        return <circle key={deg} cx={px.toFixed(2)} cy={py.toFixed(2)} r="1.2" />
      })}
      <circle cx="50" cy="48" r="0.7" opacity="0.7" />
    </g>
    {/* 花から散る花弁（朱）：lovers-petal-fall で落下ループ */}
    <g className="text-primary" fill="currentColor" stroke="none" opacity="0.7">
      <circle className="lovers-petal lovers-petal-1" cx="44" cy="58" r="0.6" />
      <circle className="lovers-petal lovers-petal-2" cx="56" cy="60" r="0.5" />
      <circle className="lovers-petal lovers-petal-3" cx="50" cy="64" r="0.4" />
    </g>

    {/* 水面 */}
    <line x1="20" y1="82" x2="80" y2="82" />
    <line x1="14" y1="86" x2="86" y2="86" strokeWidth="0.5" opacity="0.6" />
  </>
)

const TheChariot: React.FC = () => (
  <>
    {/* 屋形 */}
    <rect x="24" y="30" width="52" height="30" />
    {/* 屋根 */}
    <path d="M 18 30 L 50 18 L 82 30" />
    {/* 左車輪：chariot-wheel-l で回転 */}
    <g className="chariot-wheel-l">
      <circle cx="32" cy="72" r="8" />
      <line x1="32" y1="64" x2="32" y2="80" />
      <line x1="24" y1="72" x2="40" y2="72" />
      {/* 斜めスポーク（回転がよく見えるよう追加） */}
      <line x1="26.3" y1="66.3" x2="37.7" y2="77.7" strokeWidth="0.5" opacity="0.6" />
      <line x1="26.3" y1="77.7" x2="37.7" y2="66.3" strokeWidth="0.5" opacity="0.6" />
    </g>
    {/* 右車輪：chariot-wheel-r で回転 */}
    <g className="chariot-wheel-r">
      <circle cx="68" cy="72" r="8" />
      <line x1="68" y1="64" x2="68" y2="80" />
      <line x1="60" y1="72" x2="76" y2="72" />
      <line x1="62.3" y1="66.3" x2="73.7" y2="77.7" strokeWidth="0.5" opacity="0.6" />
      <line x1="62.3" y1="77.7" x2="73.7" y2="66.3" strokeWidth="0.5" opacity="0.6" />
    </g>
    {/* 御紋（朱）：chariot-crest で威厳脈動 */}
    <circle className="text-primary chariot-crest" fill="currentColor" cx="50" cy="45" r="2.5" />
  </>
)

const Strength: React.FC = () => (
  <>
    {/* 狛犬の顔（楕円）：strength-face で呼吸 */}
    <ellipse className="strength-face" cx="50" cy="54" rx="20" ry="18" />
    {/* たてがみ 放射状：strength-mane で同期呼吸（伸縮） */}
    <g className="strength-mane">
      <line x1="50" y1="36" x2="50" y2="26" />
      <line x1="36" y1="42" x2="28" y2="34" />
      <line x1="64" y1="42" x2="72" y2="34" />
      <line x1="30" y1="54" x2="22" y2="54" />
      <line x1="70" y1="54" x2="78" y2="54" />
      <line x1="36" y1="66" x2="30" y2="74" />
      <line x1="64" y1="66" x2="70" y2="74" />
    </g>
    {/* 眼：strength-eye で交互に脈動（呼吸とともに見開く） */}
    <circle className="strength-eye strength-eye-l" fill="currentColor" cx="43" cy="50" r="1.5" />
    <circle className="strength-eye strength-eye-r" fill="currentColor" cx="57" cy="50" r="1.5" />
    {/* 鼻先（朱）：strength-nose で強脈動 */}
    <circle className="text-primary strength-nose" fill="currentColor" cx="50" cy="60" r="1.8" />
  </>
)

const TheHermit: React.FC = () => (
  <>
    {/* 紐（静止） */}
    <line x1="50" y1="20" x2="50" y2="28" />
    {/* 提灯本体：hermit-lantern で振り子（紐の付け根 y=20 を軸に揺れる） */}
    <g className="hermit-lantern">
      <path d="M 40 28 L 60 28 L 66 40 L 66 60 L 60 72 L 40 72 L 34 60 L 34 40 Z" />
      <line x1="44" y1="32" x2="44" y2="68" />
      <line x1="50" y1="28" x2="50" y2="72" />
      <line x1="56" y1="32" x2="56" y2="68" />
      {/* 提灯の灯（朱）：hermit-flame で脈動 */}
      <circle className="text-primary hermit-flame" fill="currentColor" cx="50" cy="50" r="2.5" />
    </g>
    {/* 杖（静止、地に着く） */}
    <line x1="50" y1="72" x2="50" y2="88" />
  </>
)

// 10 運命の輪：車輪シルエット（世界の「曼荼羅」とは明確に違う「車輪」骨格）
// 物語：天が回す巨大な車輪。命の節目で輪は回り、向こうへ運ぶ。
// 構図：
//   中心：太極図（陰陽 r=10）= 静かな源
//   輻：八輻のスポーク（中心 r=10 → リム r=34、太く長い放射）
//   リム：二重円 (r=34 太線 + r=31 薄線) = 車輪のタイヤ
//   外周：十二支リング (r=40 円周に 12 点) = 命運の刻
//   最外：輪廻の細道 (r=44 点線) = 永遠の循環
// 世界との差別化：
//   - 世界 = 多層同心円（曼荼羅、petals が中心向き）
//   - 運命の輪 = HUB+SPOKES+RIM の機械的な「車輪」（spokes が放射、回転感が強い）
const WheelOfFortune: React.FC = () => (
  <>
    {/* === 最外：輪廻の細道（点線、静止） === */}
    <circle cx="50" cy="50" r="44" opacity="0.22" strokeWidth="0.4" strokeDasharray="1 2" />

    {/* === 外周：十二支リング（命運の刻、wheel-outer で逆回転） === */}
    <g className="wheel-outer">
      <circle cx="50" cy="50" r="40" opacity="0.30" strokeWidth="0.5" />
      {Array.from({ length: 12 }).map((_, i) => {
        const rad = ((i * 30 - 90) * Math.PI) / 180
        const x = 50 + Math.cos(rad) * 40
        const y = 50 + Math.sin(rad) * 40
        const cls = i === 0 ? 'text-primary' : undefined
        const fill = i === 0 ? 'currentColor' : undefined
        return (
          <circle
            key={i}
            className={cls}
            fill={fill}
            cx={x.toFixed(2)}
            cy={y.toFixed(2)}
            r={i === 0 ? 2 : 1.1}
            strokeWidth="0.5"
          />
        )
      })}
      {/* 十二支の方位ティック（小さな放射線、12 個）：「目盛り」感 */}
      {Array.from({ length: 12 }).map((_, i) => {
        const rad = ((i * 30 - 90) * Math.PI) / 180
        const x1 = 50 + Math.cos(rad) * 36.5
        const y1 = 50 + Math.sin(rad) * 36.5
        const x2 = 50 + Math.cos(rad) * 38.5
        const y2 = 50 + Math.sin(rad) * 38.5
        return (
          <line
            key={`tick-${i}`}
            x1={x1.toFixed(2)} y1={y1.toFixed(2)}
            x2={x2.toFixed(2)} y2={y2.toFixed(2)}
            opacity="0.55"
            strokeWidth="0.4"
          />
        )
      })}
    </g>

    {/* === 車輪のリム（タイヤ感、二重円、静止＝spokes と独立した「枠」） === */}
    <circle cx="50" cy="50" r="34" strokeWidth="1.8" />
    <circle cx="50" cy="50" r="31" strokeWidth="0.6" opacity="0.55" />

    {/* === 八輻のスポーク（中心 r=10 → リム r=34、太く長い）：wheel-spokes で順回転 === */}
    <g className="wheel-spokes">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180
        const x1 = 50 + Math.cos(rad) * 10
        const y1 = 50 + Math.sin(rad) * 10
        const x2 = 50 + Math.cos(rad) * 33.5
        const y2 = 50 + Math.sin(rad) * 33.5
        const main = deg % 90 === 0
        return (
          <line
            key={deg}
            x1={x1.toFixed(2)} y1={y1.toFixed(2)}
            x2={x2.toFixed(2)} y2={y2.toFixed(2)}
            strokeWidth={main ? 1.3 : 1}
            opacity={main ? 1 : 0.7}
          />
        )
      })}
    </g>

    {/* === 中心：太極図（陰陽、静止＝回り続ける車輪の中の不動の源） === */}
    {/* 太極の外輪（r=10） */}
    <circle cx="50" cy="50" r="10" strokeWidth="1.3" />
    {/* S字の境界（陰陽を分ける曲線） */}
    <path d="M 50 40 A 5 5 0 0 1 50 50 A 5 5 0 0 0 50 60" strokeWidth="0.9" />
    {/* 陽の眼（上半分、朱、wheel-yin-yang-yang で脈動） */}
    <circle className="text-primary wheel-yang-eye" fill="currentColor" cx="50" cy="45" r="1.4" />
    {/* 陰の眼（下半分、墨、wheel-yin-yang-yin で逆位相脈動） */}
    <circle className="wheel-yin-eye" fill="currentColor" cx="50" cy="55" r="1.4" />

    {/* === 軸の中心朱（wheel-hub で脈動）：太極の真芯 === */}
    <circle className="text-primary wheel-hub" fill="currentColor" cx="50" cy="50" r="0.9" />
  </>
)

const Justice: React.FC = () => (
  <>
    {/* 支柱（静止） */}
    <line x1="50" y1="22" x2="50" y2="86" />
    {/* 基底（静止） */}
    <line x1="42" y1="86" x2="58" y2="86" />

    {/* 天秤（横棒＋両皿）：justice-balance で左右にゆっくり揺れる */}
    <g className="justice-balance">
      {/* 横棒 */}
      <line x1="18" y1="32" x2="82" y2="32" />
      {/* 左の皿 */}
      <line x1="22" y1="32" x2="22" y2="52" />
      <path d="M 12 52 Q 22 62 32 52" />
      {/* 右の皿 */}
      <line x1="78" y1="32" x2="78" y2="52" />
      <path d="M 68 52 Q 78 62 88 52" />
    </g>

    {/* 中央（朱）：justice-pivot で脈動（支柱の頂点を示す） */}
    <circle className="text-primary justice-pivot" fill="currentColor" cx="50" cy="32" r="2" />
  </>
)

const TheHangedMan: React.FC = () => (
  <>
    {/* 横木（吊り棒、静止） */}
    <line x1="18" y1="22" x2="82" y2="22" />
    {/* 縄＋人物：hanged-sway で縄の付け根 (50, 22) を軸に微妙に揺れる */}
    <g className="hanged-sway">
      {/* 縦の縄 */}
      <line x1="50" y1="22" x2="50" y2="46" />
      {/* 逆三角の人 */}
      <path d="M 30 46 L 50 80 L 70 46 Z" />
    </g>
    {/* 滴る雫（朱）：hanged-drop で落下ループ */}
    <circle className="text-primary hanged-drop" fill="currentColor" cx="50" cy="88" r="1.5" />
  </>
)

// 13 死神：クオリティアップ版（斜め鎌構図維持、主役を画面の50%以上に拡大、密度UP）
// 物語：終焉と再生の境界に立つ死神。大きな鎌が画面を斜めに切り裂き、骸骨が静かに佇み、桜が散り、再生の川が流れる。
const Death: React.FC = () => (
  <>
    {/* === 再生の川（最下層、3層の波で奥行き） === */}
    <path className="death-river"
          d="M 4 78 Q 18 75 32 78 Q 46 81 60 78 Q 74 75 88 78"
          opacity="0.45" strokeWidth="1.1" fill="none" />
    <path d="M 4 84 Q 16 81 28 84 Q 42 87 56 84 Q 70 81 84 84 Q 94 87 96 87"
          opacity="0.30" strokeWidth="0.8" fill="none" />
    <path d="M 4 90 Q 14 88 26 90 Q 38 93 52 90 Q 66 87 80 90"
          opacity="0.20" strokeWidth="0.6" fill="none" />

    {/* === 大きな鎌（主役、画面の対角線を支配、塗り＋輪郭） === */}
    <g className="death-blade">
      {/* 刃の内部塗り（薄墨、刃の実体感） */}
      <path d="M 12 30 Q 56 18 86 52 L 82 56 Q 56 28 18 36 Z"
            fill="currentColor" opacity="0.12" stroke="none" />
      {/* 刃の外輪（太線、主役の輪郭） */}
      <path d="M 12 30 Q 56 18 86 52" strokeWidth="2.2" fill="none" />
      {/* 刃の内側ライン（中景線、刃の厚み） */}
      <path d="M 18 36 Q 56 26 82 52" strokeWidth="1.3" fill="none" opacity="0.85" />
      {/* 刃のハイライト（反射、破線） */}
      <path d="M 24 32 Q 54 22 76 48" strokeWidth="0.5" fill="none" opacity="0.50" strokeDasharray="3 2" />
      {/* 刃の鋭利感（小さなノッチ） */}
      <line x1="22" y1="30" x2="20" y2="26" strokeWidth="0.6" opacity="0.65" />
      <line x1="38" y1="26" x2="36" y2="22" strokeWidth="0.6" opacity="0.65" />
      <line x1="54" y1="24" x2="53" y2="20" strokeWidth="0.6" opacity="0.65" />
      <line x1="68" y1="28" x2="67" y2="24" strokeWidth="0.6" opacity="0.65" />
    </g>

    {/* 柄（太く、長く、画面右側を縦に貫く） */}
    <line x1="86" y1="52" x2="84" y2="86" strokeWidth="2.2" />
    {/* 柄の握り（巻き付け） */}
    <line x1="83" y1="58" x2="87" y2="58" strokeWidth="0.5" opacity="0.65" />
    <line x1="83" y1="62" x2="87" y2="62" strokeWidth="0.5" opacity="0.65" />
    <line x1="83" y1="66" x2="87" y2="66" strokeWidth="0.5" opacity="0.65" />
    <line x1="83" y1="70" x2="87" y2="70" strokeWidth="0.5" opacity="0.65" />
    {/* 柄頭（脈動、心臓の鼓動） */}
    <circle className="death-handle" cx="84" cy="86" r="3.2" strokeWidth="1.5" fill="currentColor" opacity="0.18" stroke="currentColor" />
    <circle cx="84" cy="86" r="3.2" strokeWidth="1.5" fill="none" />
    <circle className="text-primary" fill="currentColor" cx="84" cy="86" r="1.6" stroke="none" />

    {/* === 骸骨（鎌の下、左下に佇む。主役の実体） === */}
    <g className="death-skull">
      {/* 頭蓋骨の塗り（薄墨で陰影） */}
      <ellipse cx="32" cy="58" rx="12" ry="13" fill="currentColor" opacity="0.10" stroke="none" />
      {/* 頭蓋骨の輪郭（太線、主役） */}
      <ellipse cx="32" cy="58" rx="12" ry="13" strokeWidth="1.7" fill="none" />
      {/* 頭頂部の縫合線 */}
      <path d="M 26 50 Q 32 48 38 50" strokeWidth="0.5" opacity="0.55" fill="none" />
      {/* 眼窩（深い影） */}
      <ellipse className="death-skull-eye" cx="26" cy="56" rx="2.8" ry="3.3" fill="currentColor" stroke="none" />
      <ellipse className="death-skull-eye" cx="38" cy="56" rx="2.8" ry="3.3" fill="currentColor" stroke="none" />
      {/* 眼窩の朱の光（不穏な眼光） */}
      <circle className="text-primary death-skull-glow" fill="currentColor" cx="26" cy="56" r="0.9" stroke="none" />
      <circle className="text-primary death-skull-glow" fill="currentColor" cx="38" cy="56" r="0.9" stroke="none" />
      {/* 頬骨の影 */}
      <path d="M 22 60 Q 24 64 22 66" strokeWidth="0.5" opacity="0.5" fill="none" />
      <path d="M 42 60 Q 40 64 42 66" strokeWidth="0.5" opacity="0.5" fill="none" />
      {/* 鼻穴（三角の暗部） */}
      <path d="M 30 62 L 32 68 L 34 62 Z" fill="currentColor" stroke="none" opacity="0.85" />
      {/* 顎下の線 */}
      <path d="M 22 68 Q 32 73 42 68" strokeWidth="1" fill="none" opacity="0.75" />
      {/* 歯の縦線（5本） */}
      <line x1="26" y1="68" x2="26" y2="71" strokeWidth="0.5" opacity="0.75" />
      <line x1="29" y1="68" x2="29" y2="71" strokeWidth="0.5" opacity="0.75" />
      <line x1="32" y1="68" x2="32" y2="71" strokeWidth="0.5" opacity="0.75" />
      <line x1="35" y1="68" x2="35" y2="71" strokeWidth="0.5" opacity="0.75" />
      <line x1="38" y1="68" x2="38" y2="71" strokeWidth="0.5" opacity="0.75" />
    </g>
    {/* 死装束（骸骨の肩〜胸、布のシルエット） */}
    <path d="M 18 72 Q 22 76 24 80 L 40 80 Q 42 76 46 72" strokeWidth="1.1" fill="currentColor" opacity="0.12" stroke="currentColor" />
    <line x1="32" y1="72" x2="32" y2="80" strokeWidth="0.5" opacity="0.55" />
    {/* 死装束の朱の結び（喉元） */}
    <circle className="text-primary" fill="currentColor" cx="32" cy="74" r="0.9" stroke="none" />

    {/* === 散る桜（量を増やす：12枚、画面全体に分散、サイズ階層） === */}
    {/* 既存の6個（位置を再配置） */}
    <g className="death-petal death-petal-1">
      <circle className="text-primary" fill="currentColor" cx="56" cy="12" r="1.6" />
    </g>
    <g className="death-petal death-petal-2">
      <circle className="text-primary" fill="currentColor" cx="14" cy="18" r="1.3" />
    </g>
    <g className="death-petal death-petal-3">
      <circle className="text-primary" fill="currentColor" cx="72" cy="14" r="1.4" />
    </g>
    <g className="death-petal death-petal-4">
      <circle className="text-primary" fill="currentColor" cx="92" cy="30" r="1" />
    </g>
    <g className="death-petal death-petal-5">
      <circle className="text-primary" fill="currentColor" cx="8" cy="44" r="1.1" />
    </g>
    <g className="death-petal death-petal-6">
      <circle className="text-primary" fill="currentColor" cx="48" cy="42" r="0.9" />
    </g>
    {/* 追加6個（class 再利用、視覚的密度UP） */}
    <g className="death-petal death-petal-1">
      <circle className="text-primary" fill="currentColor" cx="66" cy="40" r="0.8" />
    </g>
    <g className="death-petal death-petal-2">
      <circle className="text-primary" fill="currentColor" cx="86" cy="20" r="0.9" />
    </g>
    <g className="death-petal death-petal-3">
      <circle className="text-primary" fill="currentColor" cx="30" cy="14" r="0.7" />
    </g>
    <g className="death-petal death-petal-4">
      <circle className="text-primary" fill="currentColor" cx="58" cy="50" r="0.7" />
    </g>
    <g className="death-petal death-petal-5">
      <circle className="text-primary" fill="currentColor" cx="74" cy="38" r="0.6" />
    </g>
    <g className="death-petal death-petal-6">
      <circle className="text-primary" fill="currentColor" cx="18" cy="50" r="0.8" />
    </g>
  </>
)

const Temperance: React.FC = () => (
  <>
    {/* 上の盃：temperance-cup-top で僅かに揺れる（注ぐ動作） */}
    <g className="temperance-cup-top">
      <path d="M 22 28 L 40 28 L 36 48 L 26 48 Z" />
      <line x1="20" y1="28" x2="42" y2="28" />
    </g>
    {/* 下の盃（静止、受ける器） */}
    <path d="M 60 56 L 78 56 L 74 76 L 64 76 Z" />
    <line x1="58" y1="56" x2="80" y2="56" />
    {/* 水の流れ：temperance-stream で opacity flow（流れる感） */}
    <path className="temperance-stream" d="M 32 48 Q 50 50 68 56" />
    {/* 雫（朱）：temperance-drop で流れに沿って移動 */}
    <circle className="text-primary temperance-drop" fill="currentColor" cx="50" cy="52" r="1.5" />
  </>
)

const TheDevil: React.FC = () => (
  <>
    {/* v2：可愛さを排除し、厳しい鬼面へ刷新。鋭い角・牙・背景の火点で「本能・束縛」を強化。 */}
    {/* 背景の火の点（怒り・地獄の燃え）：devil-ember で時差明滅 */}
    <g className="text-primary" fill="currentColor" stroke="none" opacity="0.7">
      <circle className="devil-ember devil-ember-1" cx="10" cy="20" r="0.7" />
      <circle className="devil-ember devil-ember-2" cx="90" cy="22" r="0.7" />
      <circle className="devil-ember devil-ember-3" cx="6" cy="40" r="0.5" />
      <circle className="devil-ember devil-ember-4" cx="94" cy="44" r="0.5" />
      <circle className="devil-ember devil-ember-5" cx="14" cy="70" r="0.6" />
      <circle className="devil-ember devil-ember-6" cx="86" cy="74" r="0.6" />
      <circle className="devil-ember devil-ember-7" cx="20" cy="88" r="0.5" opacity="0.7" />
      <circle className="devil-ember devil-ember-8" cx="80" cy="88" r="0.5" opacity="0.7" />
    </g>

    {/* 鬼面の輪郭（より角張った・凶悪） */}
    <path d="M 22 44 L 24 70 L 32 82 Q 50 92 68 82 L 76 70 L 78 44 L 72 30 Q 60 22 50 22 Q 40 22 28 30 Z" strokeWidth="1.2" />

    {/* 鋭い角（長く・尖って・複数） */}
    <path d="M 32 30 L 18 8" strokeWidth="1.4" />
    <path d="M 22 18 L 30 22" strokeWidth="0.8" />
    <path d="M 68 30 L 82 8" strokeWidth="1.4" />
    <path d="M 78 18 L 70 22" strokeWidth="0.8" />

    {/* 眉（鋭い、怒り） */}
    <path d="M 32 40 L 44 46" strokeWidth="1.5" />
    <path d="M 68 40 L 56 46" strokeWidth="1.5" />

    {/* 眼（鋭い・三白眼風） */}
    <g fill="currentColor">
      <path d="M 36 50 L 46 50 L 44 54 L 38 54 Z" strokeWidth="0.7" />
      <path d="M 56 50 L 64 50 L 62 54 L 56 54 Z" strokeWidth="0.7" />
    </g>
    {/* 瞳の朱（凶悪な光）：devil-eye-l/r で交互に強脈動 */}
    <circle className="text-primary devil-eye-l" fill="currentColor" cx="40" cy="52" r="1.1" stroke="none" />
    <circle className="text-primary devil-eye-r" fill="currentColor" cx="60" cy="52" r="1.1" stroke="none" />

    {/* 鼻（鬼の鋭い鼻筋） */}
    <path d="M 50 56 L 47 64 L 53 64 Z" strokeWidth="0.7" />

    {/* 口（鋭く・牙剥き出し、朱の輪郭） */}
    <path d="M 38 70 L 50 76 L 62 70" strokeWidth="1.2" className="text-primary" stroke="currentColor" fill="none" />
    {/* 鋭い牙（4本） */}
    <path d="M 42 70 L 40 78 L 43 75 Z" strokeWidth="0.6" />
    <path d="M 48 72 L 46 80 L 49 77 Z" strokeWidth="0.6" />
    <path d="M 52 72 L 54 80 L 51 77 Z" strokeWidth="0.6" />
    <path d="M 58 70 L 60 78 L 57 75 Z" strokeWidth="0.6" />
  </>
)

// 16 塔：クオリティアップ版（垂直シルエット維持、石積みの実体感＋稲妻主役級＋人影＋炎）
// 物語：嵐の夜に雷が古き塔を打ち砕く。瓦が散り、人影が落ち、炎が燃え上がる。
const TheTower: React.FC = () => (
  <>
    {/* === 嵐雲（上部、塗り+輪郭で重く） === */}
    {/* 嵐雲の塗り（重い黒雲） */}
    <path d="M 2 0 L 98 0 L 98 16 Q 88 14 80 16 Q 70 14 60 16 Q 50 14 40 16 Q 30 14 20 16 Q 10 14 2 16 Z"
          fill="currentColor" opacity="0.15" stroke="none" />
    {/* 嵐雲の輪郭線（流れる、複層） */}
    <g className="tower-cloud-l">
      <path d="M 4 10 Q 14 7 24 10 Q 34 8 44 10" opacity="0.60" strokeWidth="1" fill="none" />
      <path d="M 6 14 Q 18 12 30 14 Q 42 12 48 14" opacity="0.40" strokeWidth="0.7" fill="none" />
    </g>
    <g className="tower-cloud-r">
      <path d="M 56 10 Q 68 7 80 10 Q 90 8 98 10" opacity="0.60" strokeWidth="1" fill="none" />
      <path d="M 52 14 Q 64 12 76 14 Q 88 12 94 14" opacity="0.40" strokeWidth="0.7" fill="none" />
    </g>

    {/* 雲間に覗く月（薄い、嵐の中の静けさ、塗りで実体感） */}
    <circle cx="84" cy="22" r="4" fill="currentColor" opacity="0.25" stroke="none" />
    <circle cx="84" cy="22" r="4" opacity="0.55" strokeWidth="0.7" fill="none" />

    {/* === 主役級の稲妻（朱の発光、後光＋枝分かれ＋複数本） === */}
    {/* 稲妻の後光（広いグロー、薄い朱） */}
    <g className="tower-lightning-glow">
      <path className="text-primary"
            d="M 18 4 L 28 22 L 22 26 L 34 42 L 28 46 L 44 64"
            fill="none" stroke="currentColor" strokeWidth="7" opacity="0.20" strokeLinecap="round" />
    </g>
    {/* 主稲妻（太線、朱、枝分かれ付き、間欠フラッシュ） */}
    <g className="tower-lightning">
      {/* 主流 */}
      <path className="text-primary"
            d="M 18 4 L 28 22 L 22 26 L 34 42 L 28 46 L 44 64"
            strokeWidth="2.8" fill="none" strokeLinecap="round" />
      {/* 枝分かれ 1（中段右へ分岐） */}
      <path className="text-primary"
            d="M 28 22 L 38 28 L 35 30"
            strokeWidth="1.5" fill="none" opacity="0.85" strokeLinecap="round" />
      {/* 枝分かれ 2（中段左へ分岐） */}
      <path className="text-primary"
            d="M 34 42 L 24 48 L 28 50"
            strokeWidth="1.3" fill="none" opacity="0.80" strokeLinecap="round" />
      {/* 枝分かれ 3（先端から塔頂へ突き刺さる） */}
      <path className="text-primary"
            d="M 44 64 L 50 24"
            strokeWidth="1.6" fill="none" opacity="0.85" strokeLinecap="round" />
    </g>
    {/* 第二の稲妻（右上から、副稲妻、独立フラッシュ） */}
    <g className="tower-lightning-2">
      <path className="text-primary"
            d="M 80 6 L 72 22 L 76 26 L 66 40 L 70 44 L 58 56"
            strokeWidth="1.8" fill="none" opacity="0.75" strokeLinecap="round" />
      {/* 枝分かれ */}
      <path className="text-primary"
            d="M 66 40 L 62 46"
            strokeWidth="1" fill="none" opacity="0.60" />
    </g>

    {/* === 五重塔（主役、画面中央を縦に貫く、石積みの実体感） === */}
    <g className="tower-shake">
      {/* 相輪（塔の最上、九輪） */}
      <line x1="50" y1="14" x2="50" y2="24" strokeWidth="1.4" />
      <circle cx="50" cy="12" r="2" fill="currentColor" opacity="0.22" stroke="currentColor" strokeWidth="0.7" />
      {/* 朱の宝珠（相輪頂点） */}
      <circle className="text-primary tower-finial" fill="currentColor" cx="50" cy="9" r="1.2" stroke="none" />

      {/* 5 層目（最上、塗り＋輪郭＋窓） */}
      <rect x="42" y="24" width="16" height="6" fill="currentColor" opacity="0.14" stroke="none" />
      <path d="M 38 24 L 50 18 L 62 24" strokeWidth="1.6" fill="currentColor" fillOpacity="0.10" />
      <rect x="42" y="24" width="16" height="6" strokeWidth="1.1" fill="none" />
      {/* 5層の窓（暗い穴） */}
      <rect x="47" y="25.5" width="6" height="3.5" fill="currentColor" opacity="0.70" stroke="none" />

      {/* 4 層 */}
      <rect x="38" y="30" width="24" height="7" fill="currentColor" opacity="0.14" stroke="none" />
      <path d="M 34 30 L 50 24 L 66 30" strokeWidth="1.7" fill="currentColor" fillOpacity="0.10" />
      <rect x="38" y="30" width="24" height="7" strokeWidth="1.2" fill="none" />
      {/* 4層の石積みの段 */}
      <line x1="38" y1="33.5" x2="62" y2="33.5" strokeWidth="0.4" opacity="0.55" />
      {/* 4層の窓 */}
      <rect x="46" y="31" width="8" height="5" fill="currentColor" opacity="0.65" stroke="none" />

      {/* 3 層 */}
      <rect x="34" y="37" width="32" height="9" fill="currentColor" opacity="0.14" stroke="none" />
      <path d="M 30 37 L 50 31 L 70 37" strokeWidth="1.8" fill="currentColor" fillOpacity="0.10" />
      <rect x="34" y="37" width="32" height="9" strokeWidth="1.3" fill="none" />
      {/* 3層の石積みの段 */}
      <line x1="34" y1="41" x2="66" y2="41" strokeWidth="0.4" opacity="0.55" />
      {/* 3層の窓 */}
      <rect x="44" y="38.5" width="12" height="6" fill="currentColor" opacity="0.65" stroke="none" />

      {/* 2 層 */}
      <rect x="30" y="46" width="40" height="11" fill="currentColor" opacity="0.14" stroke="none" />
      <path d="M 26 46 L 50 40 L 74 46" strokeWidth="1.9" fill="currentColor" fillOpacity="0.10" />
      <rect x="30" y="46" width="40" height="11" strokeWidth="1.4" fill="none" />
      {/* 2層の石積みの段（複数） */}
      <line x1="30" y1="50" x2="70" y2="50" strokeWidth="0.4" opacity="0.55" />
      <line x1="30" y1="54" x2="70" y2="54" strokeWidth="0.4" opacity="0.45" />
      {/* 2層の窓（崩落の亀裂入り） */}
      <rect x="42" y="47.5" width="16" height="7" fill="currentColor" opacity="0.70" stroke="none" />
      <path d="M 48 47.5 L 50 54 L 53 51" strokeWidth="0.5" opacity="0.65" stroke="none" fill="currentColor" />

      {/* 1 層（最大、崩落しかけ） */}
      <rect x="26" y="57" width="48" height="22" fill="currentColor" opacity="0.14" stroke="none" />
      <path d="M 22 57 L 50 49 L 78 57" strokeWidth="2.1" fill="currentColor" fillOpacity="0.10" />
      <rect x="26" y="57" width="48" height="22" strokeWidth="1.5" fill="none" />
      {/* 1階の石積みの段（多層、崩れかけ） */}
      <line x1="26" y1="62" x2="74" y2="62" strokeWidth="0.5" opacity="0.55" />
      <line x1="26" y1="68" x2="74" y2="68" strokeWidth="0.5" opacity="0.50" />
      <line x1="26" y1="74" x2="74" y2="74" strokeWidth="0.5" opacity="0.45" />
      {/* 1階の柱（左右） */}
      <line x1="34" y1="57" x2="34" y2="79" strokeWidth="0.9" opacity="0.70" />
      <line x1="66" y1="57" x2="66" y2="79" strokeWidth="0.9" opacity="0.70" />
      {/* 入口（開いた門、内部の闇） */}
      <path d="M 44 79 L 44 70 Q 44 67 47 67 L 53 67 Q 56 67 56 70 L 56 79 Z"
            fill="currentColor" opacity="0.75" stroke="currentColor" strokeWidth="1" />
      {/* 崩落の亀裂（稲妻に焼かれた跡、複数） */}
      <path d="M 38 59 L 40 65 L 38 72 L 41 76" strokeWidth="0.9" opacity="0.70" fill="none" />
      <path d="M 62 59 L 60 64 L 62 71 L 59 77" strokeWidth="0.9" opacity="0.70" fill="none" />
      <path d="M 32 48 L 34 55" strokeWidth="0.6" opacity="0.55" fill="none" />
      <path d="M 68 47 L 66 54" strokeWidth="0.6" opacity="0.55" fill="none" />
    </g>

    {/* === 塔から落ちる人影 2 人（破壊・崩壊の物語） === */}
    {/* 人影 1（左へ落下、塔から飛び出す） */}
    <g className="tower-figure tower-figure-1">
      {/* 頭 */}
      <circle cx="20" cy="52" r="1.8" fill="currentColor" opacity="0.80" stroke="none" />
      {/* 胴体 */}
      <path d="M 18 53 L 16 60 L 22 60 L 22 53 Z" fill="currentColor" opacity="0.75" stroke="none" />
      {/* 腕（必死に伸ばす） */}
      <line x1="17" y1="54" x2="12" y2="50" strokeWidth="0.9" opacity="0.75" />
      <line x1="22" y1="54" x2="27" y2="51" strokeWidth="0.9" opacity="0.75" />
      {/* 脚 */}
      <line x1="18" y1="60" x2="16" y2="66" strokeWidth="0.9" opacity="0.75" />
      <line x1="21" y1="60" x2="23" y2="66" strokeWidth="0.9" opacity="0.75" />
    </g>
    {/* 人影 2（右へ落下） */}
    <g className="tower-figure tower-figure-2">
      <circle cx="80" cy="58" r="1.7" fill="currentColor" opacity="0.75" stroke="none" />
      <path d="M 78 59 L 76 65 L 82 65 L 82 59 Z" fill="currentColor" opacity="0.70" stroke="none" />
      <line x1="77" y1="60" x2="73" y2="56" strokeWidth="0.9" opacity="0.70" />
      <line x1="82" y1="60" x2="86" y2="56" strokeWidth="0.9" opacity="0.70" />
      <line x1="78" y1="65" x2="76" y2="71" strokeWidth="0.9" opacity="0.70" />
      <line x1="81" y1="65" x2="83" y2="71" strokeWidth="0.9" opacity="0.70" />
    </g>

    {/* === 炎が塔の側面から燃え上がる === */}
    {/* 左の炎（1階の側面） */}
    <g className="tower-flame tower-flame-l">
      {/* 外側の炎（大きい） */}
      <path d="M 26 78 Q 22 70 26 60 Q 28 68 30 60 Q 32 68 30 78 Z"
            className="text-primary" fill="currentColor" stroke="none" opacity="0.55" />
      {/* 内側の炎（明るい） */}
      <path d="M 27 78 Q 24 72 27 64 Q 29 70 30 64 Q 31 72 30 78 Z"
            className="text-primary" fill="currentColor" stroke="none" opacity="0.85" />
      {/* 火の核（朱の点） */}
      <circle className="text-primary" fill="currentColor" cx="28" cy="74" r="0.8" stroke="none" />
    </g>
    {/* 右の炎（1階の側面） */}
    <g className="tower-flame tower-flame-r">
      <path d="M 74 78 Q 78 70 74 60 Q 72 68 70 60 Q 68 68 70 78 Z"
            className="text-primary" fill="currentColor" stroke="none" opacity="0.55" />
      <path d="M 73 78 Q 76 72 73 64 Q 71 70 70 64 Q 69 72 70 78 Z"
            className="text-primary" fill="currentColor" stroke="none" opacity="0.85" />
      <circle className="text-primary" fill="currentColor" cx="72" cy="74" r="0.8" stroke="none" />
    </g>

    {/* === 飛散する瓦の破片（12個、形状多様化、塗りで実体感） === */}
    {/* 既存6個（形を三角・線・点に多様化） */}
    <g className="tower-debris tower-debris-1">
      <path d="M 10 40 L 14 42 L 12 46 Z" fill="currentColor" opacity="0.70" strokeWidth="0.5" />
    </g>
    <g className="tower-debris tower-debris-2">
      <path d="M 86 32 L 90 34 L 88 38 Z" fill="currentColor" opacity="0.70" strokeWidth="0.5" />
    </g>
    <g className="tower-debris tower-debris-3">
      <path d="M 6 58 L 10 60 L 8 64 Z" fill="currentColor" opacity="0.65" strokeWidth="0.5" />
    </g>
    <g className="tower-debris tower-debris-4">
      <path d="M 88 56 L 92 58 L 90 62 Z" fill="currentColor" opacity="0.65" strokeWidth="0.5" />
    </g>
    <g className="tower-debris tower-debris-5">
      <circle cx="14" cy="72" r="1" fill="currentColor" opacity="0.60" stroke="none" />
    </g>
    <g className="tower-debris tower-debris-6">
      <circle cx="86" cy="70" r="1" fill="currentColor" opacity="0.60" stroke="none" />
    </g>
    {/* 追加6個（密度UP、class 再利用） */}
    <g className="tower-debris tower-debris-1">
      <circle cx="18" cy="34" r="0.7" fill="currentColor" opacity="0.55" stroke="none" />
    </g>
    <g className="tower-debris tower-debris-2">
      <circle cx="78" cy="40" r="0.7" fill="currentColor" opacity="0.55" stroke="none" />
    </g>
    <g className="tower-debris tower-debris-3">
      <line x1="18" y1="48" x2="22" y2="50" strokeWidth="0.8" opacity="0.60" />
    </g>
    <g className="tower-debris tower-debris-4">
      <line x1="82" y1="48" x2="78" y2="50" strokeWidth="0.8" opacity="0.60" />
    </g>
    <g className="tower-debris tower-debris-5">
      <circle cx="22" cy="82" r="0.6" fill="currentColor" opacity="0.50" stroke="none" />
    </g>
    <g className="tower-debris tower-debris-6">
      <circle cx="78" cy="80" r="0.6" fill="currentColor" opacity="0.50" stroke="none" />
    </g>

    {/* === 基壇（崩落した瓦の段、太く、塗り＋輪郭） === */}
    <rect x="18" y="84" width="64" height="3" fill="currentColor" opacity="0.20" stroke="none" />
    <line x1="16" y1="84" x2="84" y2="84" strokeWidth="1.6" />
    <line x1="14" y1="88" x2="86" y2="88" opacity="0.60" strokeWidth="0.9" />
    <line x1="12" y1="92" x2="88" y2="92" opacity="0.40" strokeWidth="0.7" />

    {/* === 塔頂から舞い上がる火の粉（朱の小点） === */}
    <g className="tower-spark tower-spark-1">
      <circle className="text-primary" fill="currentColor" cx="46" cy="18" r="1" />
    </g>
    <g className="tower-spark tower-spark-2">
      <circle className="text-primary" fill="currentColor" cx="55" cy="14" r="0.8" />
    </g>
    <g className="tower-spark tower-spark-3">
      <circle className="text-primary" fill="currentColor" cx="50" cy="22" r="0.7" />
    </g>
  </>
)

// 17 星：上下分割に再設計（伝統的な「希望のカード」構図、上=星空 / 下=水を注ぐ女性と池）
// 死神の「斜め骨格」と被らないよう、明確に水平 2 分割。主役は中央の朱の主星と女性。
const TheStar: React.FC = () => (
  <>
    {/* === 上半分（y=0〜50）：夜空＋七星 === */}
    {/* 夜空の柔らかなグロー（上半分の大きな後景） */}
    <ellipse className="star-night-glow" cx="50" cy="26" rx="52" ry="26" opacity="0.13" fill="currentColor" stroke="none" />

    {/* 北斗七星を結ぶ線（柄杓の形を強調） */}
    <g opacity="0.55">
      <line x1="14" y1="14" x2="28" y2="10" strokeWidth="0.7" />
      <line x1="28" y1="10" x2="42" y2="14" strokeWidth="0.7" />
      <line x1="42" y1="14" x2="56" y2="22" strokeWidth="0.7" />
      <line x1="56" y1="22" x2="70" y2="22" strokeWidth="0.7" />
      <line x1="70" y1="22" x2="80" y2="30" strokeWidth="0.7" />
      <line x1="80" y1="30" x2="88" y2="38" strokeWidth="0.7" />
    </g>

    {/* 七星（大きい、塗り＋輪郭で実体感） */}
    <circle className="star-twinkle star-twinkle-1" fill="currentColor" cx="14" cy="14" r="2.8" />
    <circle className="star-twinkle star-twinkle-2" fill="currentColor" cx="28" cy="10" r="3" />
    <circle className="star-twinkle star-twinkle-3" fill="currentColor" cx="42" cy="14" r="2.8" />
    <circle className="star-twinkle star-twinkle-4" fill="currentColor" cx="56" cy="22" r="2.8" />
    <circle className="star-twinkle star-twinkle-5" fill="currentColor" cx="70" cy="22" r="2.6" />
    <circle className="star-twinkle star-twinkle-6" fill="currentColor" cx="80" cy="30" r="2.4" />
    <circle className="star-twinkle star-twinkle-7" fill="currentColor" cx="88" cy="38" r="2.2" />

    {/* 各星の十字輝き（4本の細い放射） */}
    <g opacity="0.55">
      <line x1="10" y1="14" x2="18" y2="14" strokeWidth="0.4" />
      <line x1="14" y1="10" x2="14" y2="18" strokeWidth="0.4" />
      <line x1="24" y1="10" x2="32" y2="10" strokeWidth="0.4" />
      <line x1="28" y1="6"  x2="28" y2="14" strokeWidth="0.4" />
      <line x1="38" y1="14" x2="46" y2="14" strokeWidth="0.4" />
      <line x1="42" y1="10" x2="42" y2="18" strokeWidth="0.4" />
      <line x1="52" y1="22" x2="60" y2="22" strokeWidth="0.4" />
      <line x1="56" y1="18" x2="56" y2="26" strokeWidth="0.4" />
      <line x1="66" y1="22" x2="74" y2="22" strokeWidth="0.4" />
      <line x1="70" y1="18" x2="70" y2="26" strokeWidth="0.4" />
    </g>

    {/* 中心の主星（北極星、朱、画面中央上部、大きく主役級） */}
    <g className="star-mainstar">
      {/* 主星の塗り（薄朱グロー） */}
      <circle className="text-primary" fill="currentColor" cx="50" cy="36" r="8" opacity="0.18" stroke="none" />
      {/* 主星本体（朱、太線） */}
      <circle className="text-primary" fill="currentColor" cx="50" cy="36" r="4" />
      {/* 8方向の放射 */}
      <line className="text-primary" x1="50" y1="22" x2="50" y2="30" strokeWidth="1.2" opacity="0.8" />
      <line className="text-primary" x1="50" y1="42" x2="50" y2="50" strokeWidth="1.2" opacity="0.8" />
      <line className="text-primary" x1="36" y1="36" x2="44" y2="36" strokeWidth="1.2" opacity="0.8" />
      <line className="text-primary" x1="56" y1="36" x2="64" y2="36" strokeWidth="1.2" opacity="0.8" />
      <line className="text-primary" x1="41" y1="27" x2="46" y2="32" strokeWidth="0.8" opacity="0.7" />
      <line className="text-primary" x1="59" y1="27" x2="54" y2="32" strokeWidth="0.8" opacity="0.7" />
      <line className="text-primary" x1="41" y1="45" x2="46" y2="40" strokeWidth="0.8" opacity="0.7" />
      <line className="text-primary" x1="59" y1="45" x2="54" y2="40" strokeWidth="0.8" opacity="0.7" />
    </g>

    {/* 流れ星（時折斜めに走る、上空左から） */}
    <g className="star-shooting">
      <line x1="6" y1="8" x2="18" y2="20" strokeWidth="1.6" />
    </g>

    {/* === 中央：地平線（上下を区切る薄い線） === */}
    <line x1="2" y1="52" x2="98" y2="52" opacity="0.40" strokeWidth="0.5" />

    {/* === 下半分（y=52〜95）：水を注ぐ女性 + 池 === */}
    {/* 女性のシルエット（中央、跪く姿勢、主役） */}
    <g>
      {/* 頭 */}
      <circle cx="50" cy="60" r="3.8" strokeWidth="1.2" />
      {/* 額の朱印 */}
      <circle className="text-primary star-woman-mark" fill="currentColor" cx="50" cy="59" r="0.8" stroke="none" />
      {/* 髪（流れる長髪、後ろへ） */}
      <path d="M 46 60 Q 38 64 36 78" strokeWidth="0.9" fill="none" />
      <path d="M 47 62 Q 42 66 42 74" strokeWidth="0.6" opacity="0.65" fill="none" />
      <path d="M 53 62 Q 56 65 56 70" strokeWidth="0.6" opacity="0.55" fill="none" />
      {/* 胴体（着物の襟元、塗り＋輪郭） */}
      <path d="M 46 64 Q 42 72 44 80 L 56 80 Q 58 72 54 64 Z"
            fill="currentColor" opacity="0.10" stroke="currentColor" strokeWidth="1.1" />
      {/* 帯（横線、太め） */}
      <line x1="44" y1="74" x2="56" y2="74" strokeWidth="1.3" />
      {/* 帯飾りの朱 */}
      <circle className="text-primary" fill="currentColor" cx="50" cy="74" r="0.9" stroke="none" />
      {/* 両腕（前へ伸ばして水瓶を持つ） */}
      <path d="M 47 66 Q 42 70 38 76" strokeWidth="1" fill="none" />
      <path d="M 53 66 Q 58 70 62 76" strokeWidth="1" fill="none" />
      {/* 跪く脚（袴の広がり） */}
      <path d="M 44 80 L 40 92 L 50 90 L 56 80 Z"
            fill="currentColor" opacity="0.10" stroke="currentColor" strokeWidth="0.9" />
      <path d="M 56 80 L 60 92 L 50 90"
            fill="currentColor" opacity="0.10" stroke="currentColor" strokeWidth="0.9" />
    </g>

    {/* 水瓶（女性の前、両手に抱える、塗り＋輪郭） */}
    <ellipse cx="50" cy="78" rx="8" ry="3.5" fill="currentColor" opacity="0.14" stroke="none" />
    <ellipse cx="50" cy="78" rx="8" ry="3.5" strokeWidth="1.1" fill="none" />
    <path d="M 42 78 Q 44 86 50 88 Q 56 86 58 78" strokeWidth="1" fill="currentColor" opacity="0.10" stroke="currentColor" />
    {/* 水瓶の口の線 */}
    <line x1="42" y1="78" x2="58" y2="78" strokeWidth="0.6" opacity="0.55" />
    {/* 水瓶の装飾朱 */}
    <circle className="text-primary" fill="currentColor" cx="50" cy="84" r="1" stroke="none" />

    {/* 注がれる水（水瓶から池へ、2本の波線） */}
    <g className="star-water-flow">
      <path d="M 46 88 Q 47 90 46 92 Q 47 94 46 95" strokeWidth="0.8" fill="none" opacity="0.65" />
      <path d="M 54 88 Q 53 90 54 92 Q 53 94 54 95" strokeWidth="0.7" fill="none" opacity="0.55" />
    </g>

    {/* 池（画面下端、女性の足元から広がる、塗り＋輪郭） */}
    <ellipse cx="50" cy="94" rx="48" ry="3.5" fill="currentColor" opacity="0.12" stroke="none" />
    <ellipse cx="50" cy="94" rx="48" ry="3.5" strokeWidth="0.5" opacity="0.50" fill="none" />
    {/* 池の波紋（女性に近い・遠い 2 層） */}
    <path className="star-pond-ripple star-pond-ripple-1"
          d="M 8 90 Q 28 88 50 90 Q 72 92 92 90"
          opacity="0.40" strokeWidth="0.6" fill="none" />
    <path className="star-pond-ripple star-pond-ripple-2"
          d="M 14 96 Q 30 94 50 96 Q 70 98 86 96"
          opacity="0.30" strokeWidth="0.5" fill="none" />

    {/* 池に映る星々の反射（薄い朱の点、画面下端） */}
    <circle className="text-primary" fill="currentColor" cx="22" cy="92" r="0.6" stroke="none" opacity="0.5" />
    <circle className="text-primary" fill="currentColor" cx="78" cy="92" r="0.5" stroke="none" opacity="0.45" />
    <circle className="text-primary" fill="currentColor" cx="32" cy="95" r="0.4" stroke="none" opacity="0.35" />
    <circle className="text-primary" fill="currentColor" cx="68" cy="95" r="0.4" stroke="none" opacity="0.35" />
  </>
)

// 18 月：クオリティアップ版（左縦長月を主役級に、月のうさぎ＋道＋鳥居＋池の反射で密度UP）
// 物語：神秘的な月夜、参道が手前から月へ伸び、両脇の鳥居が守る。月のうさぎが見える夜。
const TheMoon: React.FC = () => (
  <>
    {/* === 月光のグロー（左半分の後景、大きく） === */}
    <circle className="moon-glow" cx="36" cy="40" r="42" opacity="0.14" fill="currentColor" stroke="none" />

    {/* === 巨大な三日月（主役、左寄り、塗り＋輪郭で実体感） === */}
    {/* 月の塗り（薄い金色＋墨の陰影） */}
    <path className="moon-disk-fill"
          d="M 36 14 A 32 32 0 1 0 62 80 A 28 28 0 1 1 36 14 Z"
          fill="currentColor" opacity="0.14" stroke="none" />
    {/* 月の輪郭（太線、主役） */}
    <path className="moon-disk"
          d="M 36 14 A 32 32 0 1 0 62 80 A 28 28 0 1 1 36 14 Z"
          strokeWidth="2" fill="none" />

    {/* === 月のうさぎ（月面に薄く浮かぶシルエット、和の意匠） === */}
    <g opacity="0.30" fill="currentColor" stroke="none">
      {/* 体（楕円） */}
      <ellipse cx="32" cy="42" rx="6" ry="4.5" />
      {/* 頭 */}
      <ellipse cx="36" cy="36" rx="2.8" ry="2.5" />
      {/* 耳2本（細長く立つ） */}
      <ellipse cx="34" cy="30" rx="0.9" ry="3" />
      <ellipse cx="38" cy="30" rx="0.9" ry="3" />
    </g>
    {/* うさぎの輪郭線（より明瞭に） */}
    <g opacity="0.45" fill="none" strokeWidth="0.5">
      <ellipse cx="32" cy="42" rx="6" ry="4.5" />
      <ellipse cx="36" cy="36" rx="2.8" ry="2.5" />
      <path d="M 33.5 32 Q 33.5 28 34 27" />
      <path d="M 37.5 32 Q 37.5 28 38 27" />
      {/* 杵（突く餅つき棒、月のうさぎの伝統） */}
      <line x1="40" y1="36" x2="44" y2="32" strokeWidth="0.6" />
    </g>
    {/* 月のクレーター（陰影） */}
    <circle cx="44" cy="54" r="2.2" opacity="0.35" strokeWidth="0.5" fill="none" />
    <circle cx="40" cy="62" r="1.6" opacity="0.30" strokeWidth="0.5" fill="none" />
    <circle cx="48" cy="64" r="1.2" opacity="0.25" strokeWidth="0.4" fill="none" />

    {/* === 雲（豊か、奥行きを出す） === */}
    {/* 上空の通過雲（月の前を横切る、複層） */}
    <g className="moon-cloud-cross">
      <path d="M 8 28 Q 22 24 36 28 Q 50 32 64 28" opacity="0.45" strokeWidth="0.9" fill="none" />
      <path d="M 14 32 Q 28 28 42 32 Q 56 34 68 32" opacity="0.30" strokeWidth="0.6" fill="none" />
    </g>
    {/* 下層の雲 */}
    <g className="moon-cloud-1">
      <path d="M 16 56 Q 24 52 32 56 Q 40 52 48 56" opacity="0.50" strokeWidth="0.9" fill="none" />
    </g>
    <g className="moon-cloud-2">
      <path d="M 54 50 Q 64 46 74 50 Q 84 46 92 50" opacity="0.45" strokeWidth="0.8" fill="none" />
    </g>

    {/* === 両脇の鳥居（参道を守る、月の左右に配置） === */}
    {/* 左の鳥居 */}
    <g>
      {/* 笠木（反り上がる屋根） */}
      <path d="M 2 70 Q 10 66 18 70" strokeWidth="1.6" fill="none" />
      {/* 笠木上部の線 */}
      <line x1="3" y1="68" x2="17" y2="68" strokeWidth="0.6" opacity="0.6" />
      {/* 額（横棒） */}
      <line x1="4" y1="74" x2="16" y2="74" strokeWidth="1.2" />
      {/* 柱2本（太く） */}
      <line x1="6" y1="70" x2="6" y2="90" strokeWidth="1.7" />
      <line x1="14" y1="70" x2="14" y2="90" strokeWidth="1.7" />
      {/* 朱の御幣（神聖の印） */}
      <circle className="text-primary moon-torii-seal" fill="currentColor" cx="10" cy="74" r="1" stroke="none" />
    </g>
    {/* 右の鳥居 */}
    <g>
      <path d="M 82 70 Q 90 66 98 70" strokeWidth="1.6" fill="none" />
      <line x1="83" y1="68" x2="97" y2="68" strokeWidth="0.6" opacity="0.6" />
      <line x1="84" y1="74" x2="96" y2="74" strokeWidth="1.2" />
      <line x1="86" y1="70" x2="86" y2="90" strokeWidth="1.7" />
      <line x1="94" y1="70" x2="94" y2="90" strokeWidth="1.7" />
      <circle className="text-primary moon-torii-seal" fill="currentColor" cx="90" cy="74" r="1" stroke="none" />
    </g>

    {/* === 手前に伸びる参道（中央、月へ向かう） === */}
    {/* 道の塗り（台形、底辺広く、月へ向かって狭く） */}
    <path d="M 28 96 L 42 72 L 58 72 L 72 96 Z"
          fill="currentColor" opacity="0.15" stroke="none" />
    {/* 道の左右の縁（中景線） */}
    <line x1="28" y1="96" x2="42" y2="72" strokeWidth="1" opacity="0.60" />
    <line x1="72" y1="96" x2="58" y2="72" strokeWidth="1" opacity="0.60" />
    {/* 道の中央線（破線、奥へ続く視線） */}
    <line x1="50" y1="96" x2="50" y2="72" strokeWidth="0.5" opacity="0.45" strokeDasharray="2 2" />
    {/* 道の敷石（左右3対の短い横線） */}
    <line x1="33" y1="88" x2="67" y2="88" strokeWidth="0.4" opacity="0.40" />
    <line x1="36" y1="82" x2="64" y2="82" strokeWidth="0.4" opacity="0.35" />
    <line x1="39" y1="76" x2="61" y2="76" strokeWidth="0.4" opacity="0.30" />

    {/* === 池（鳥居の前、月を映す水面） === */}
    {/* 池の塗り（楕円、画面下端） */}
    <ellipse cx="50" cy="92" rx="46" ry="3.5" fill="currentColor" opacity="0.10" stroke="none" />
    {/* 池の輪郭 */}
    <ellipse cx="50" cy="92" rx="46" ry="3.5" strokeWidth="0.5" opacity="0.50" fill="none" />
    {/* 月の反射（池に映る三日月、左寄り、薄く） */}
    <path className="moon-reflection"
          d="M 18 90 A 12 12 0 1 0 26 96 A 10 10 0 1 1 18 90 Z"
          opacity="0.25" strokeWidth="0.6" fill="currentColor" stroke="currentColor" />
    {/* 池の波紋 */}
    <g className="moon-ripple moon-ripple-1">
      <path d="M 8 88 Q 28 86 50 88 Q 72 90 92 88" opacity="0.45" strokeWidth="0.7" fill="none" />
    </g>
    <g className="moon-ripple moon-ripple-2">
      <path d="M 12 94 Q 32 92 50 94 Q 68 96 88 94" opacity="0.30" strokeWidth="0.6" fill="none" />
    </g>

    {/* === 月明かりの朱（月内部に小さな印） === */}
    <circle className="text-primary moon-seal" fill="currentColor" cx="44" cy="40" r="1.7" />
  </>
)

// 19 太陽：シルエット脱却版（上下分割の風景構図）
// 物語：太陽は上空に、向日葵は手前に主役級。「金色の円が中央に居座る」シルエットを廃止。
// 構図（縦 100 の3分割）：
//   上部 (y= 0〜36) 空ゾーン：小さめの太陽（cx=50, cy=20, r=11）+ 旭光 + 同心波動
//   中央 (y=36〜62) 風景ゾーン：富士山 + 遠景山稜 + 地平線
//   下部 (y=62〜95) 前景ゾーン：3本の向日葵（中央 r=12 主役級 + 両脇 r=5.5）+ 茎・葉・草
// 雰囲気（金色・和・品格・朱印）は維持。変えたのは「骨格」のみ。
const TheSun: React.FC = () => (
  <>
    {/* === 上部 空ゾーン === */}
    {/* 太陽の遠い後光：sun-far-halo */}
    <circle className="sun-far-halo" cx="50" cy="20" r="28" opacity="0.06" fill="currentColor" stroke="none" />
    {/* 放射グロー：sun-aureole */}
    <circle className="sun-aureole" cx="50" cy="20" r="19" opacity="0.18" fill="currentColor" stroke="none" />
    {/* 同心波動 2層（縮小、外向き opacity 揺らぎ） */}
    <circle className="sun-wave sun-wave-1" cx="50" cy="20" r="15" fill="none" strokeWidth="0.5" opacity="0.35" />
    <circle className="sun-wave sun-wave-2" cx="50" cy="20" r="19" fill="none" strokeWidth="0.4" opacity="0.22" />

    {/* 主旭光（8方向、太陽中心 50,20 から外向き、長さ 6） */}
    <g className="sun-rays-a">
      <line x1="50" y1="2"  x2="50" y2="8"  strokeWidth="1.2" />
      <line x1="50" y1="32" x2="50" y2="38" strokeWidth="1.2" />
      <line x1="32" y1="20" x2="38" y2="20" strokeWidth="1.2" />
      <line x1="62" y1="20" x2="68" y2="20" strokeWidth="1.2" />
      <line x1="35" y1="5"  x2="40" y2="10" strokeWidth="1" />
      <line x1="65" y1="5"  x2="60" y2="10" strokeWidth="1" />
      <line x1="35" y1="35" x2="40" y2="30" strokeWidth="1" />
      <line x1="65" y1="35" x2="60" y2="30" strokeWidth="1" />
    </g>

    {/* 補助光（8方向、副）：放射感の厚みづけ */}
    <g className="sun-rays-b" opacity="0.55">
      <line x1="50" y1="0"  x2="50" y2="2"  strokeWidth="0.7" />
      <line x1="50" y1="38" x2="50" y2="40" strokeWidth="0.7" />
      <line x1="29" y1="20" x2="32" y2="20" strokeWidth="0.7" />
      <line x1="68" y1="20" x2="71" y2="20" strokeWidth="0.7" />
      <line x1="32" y1="3"  x2="34" y2="6"  strokeWidth="0.7" />
      <line x1="66" y1="3"  x2="68" y2="6"  strokeWidth="0.7" />
      <line x1="32" y1="37" x2="34" y2="34" strokeWidth="0.7" />
      <line x1="66" y1="37" x2="68" y2="34" strokeWidth="0.7" />
    </g>

    {/* 太陽本体（r=11、上部の控えめ要素） */}
    <circle className="sun-disk" cx="50" cy="20" r="11" strokeWidth="1.3" />
    {/* 朱の中心 */}
    <circle className="text-primary sun-hub" fill="currentColor" cx="50" cy="20" r="2.4" />

    {/* === 中央 風景ゾーン === */}
    {/* 遠景の薄い山稜（左） */}
    <path d="M 2 58 L 10 50 L 16 56 L 22 48 L 28 56" fill="none" opacity="0.30" strokeWidth="0.5" />
    {/* 遠景の薄い山稜（右） */}
    <path d="M 72 56 L 78 48 L 84 56 L 90 50 L 98 58" fill="none" opacity="0.30" strokeWidth="0.5" />

    {/* 富士山（中央、塗りシルエット） */}
    <path
      d="M 30 58 L 50 38 L 70 58 Z"
      fill="currentColor"
      opacity="0.20"
      stroke="currentColor"
      strokeWidth="0.7"
    />
    {/* 富士の雪冠 */}
    <path d="M 41 47 Q 50 44 59 47 L 55 52 L 50 49 L 45 52 Z" fill="currentColor" opacity="0.40" stroke="none" />
    {/* かすみ（破線） */}
    <line x1="26" y1="60" x2="74" y2="60" opacity="0.25" strokeWidth="0.4" strokeDasharray="2 2" />

    {/* 地平線（強調、上下を明確に分ける） */}
    <line x1="2" y1="62" x2="98" y2="62" opacity="0.65" strokeWidth="0.8" />

    {/* === 下部 前景ゾーン（主役の向日葵 3本） === */}

    {/* 茎（太く、画面下端から上へ） */}
    <line x1="50" y1="95" x2="50" y2="74" strokeWidth="1.6" opacity="0.80" />
    <line x1="16" y1="95" x2="16" y2="82" strokeWidth="1.2" opacity="0.75" />
    <line x1="84" y1="95" x2="84" y2="82" strokeWidth="1.2" opacity="0.75" />

    {/* 葉（茎から左右に伸びる） */}
    <path d="M 50 86 Q 42 84 38 88 Q 44 86 50 88" fill="none" strokeWidth="0.9" opacity="0.75" />
    <path d="M 50 86 Q 58 84 62 88 Q 56 86 50 88" fill="none" strokeWidth="0.9" opacity="0.75" />
    <path d="M 50 80 Q 44 78 42 82" fill="none" strokeWidth="0.7" opacity="0.65" />
    <path d="M 50 80 Q 56 78 58 82" fill="none" strokeWidth="0.7" opacity="0.65" />
    <path d="M 16 90 Q 10 88 8 92" fill="none" strokeWidth="0.8" opacity="0.70" />
    <path d="M 16 88 Q 22 86 24 90" fill="none" strokeWidth="0.7" opacity="0.60" />
    <path d="M 84 90 Q 90 88 92 92" fill="none" strokeWidth="0.8" opacity="0.70" />
    <path d="M 84 88 Q 78 86 76 90" fill="none" strokeWidth="0.7" opacity="0.60" />

    {/* 中央の向日葵（主役、太陽と同等の視覚的重み）。
        外周 10 枚の花弁（楕円が中心から放射状）+ 円盤 + 種の点描。 */}
    <g className="sun-sunflower sun-sunflower-2">
      {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => {
        const rad = (deg * Math.PI) / 180
        const px = 50 + Math.cos(rad) * 9
        const py = 74 + Math.sin(rad) * 9
        return (
          <ellipse
            key={deg}
            cx={px.toFixed(2)}
            cy={py.toFixed(2)}
            rx="3.6"
            ry="1.8"
            transform={`rotate(${deg.toFixed(1)} ${px.toFixed(2)} ${py.toFixed(2)})`}
            strokeWidth="0.6"
          />
        )
      })}
      {/* 花の中心円盤 */}
      <circle cx="50" cy="74" r="5" strokeWidth="1" />
      {/* 種の点描 */}
      <circle cx="48" cy="72" r="0.5" fill="currentColor" stroke="none" opacity="0.55" />
      <circle cx="52" cy="73" r="0.5" fill="currentColor" stroke="none" opacity="0.55" />
      <circle cx="49" cy="76" r="0.5" fill="currentColor" stroke="none" opacity="0.55" />
      <circle cx="51" cy="75" r="0.5" fill="currentColor" stroke="none" opacity="0.55" />
      <circle cx="50" cy="74" r="0.5" fill="currentColor" stroke="none" opacity="0.55" />
    </g>
    {/* 中央向日葵の花心朱（主役級の脈動） */}
    <circle className="text-primary sun-sunflower-core sun-sunflower-core-2" fill="currentColor" cx="50" cy="74" r="2.4" />

    {/* 左の向日葵（中型、r=4.5 + 8花弁） */}
    <g className="sun-sunflower sun-sunflower-1">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180
        const px = 16 + Math.cos(rad) * 4.5
        const py = 82 + Math.sin(rad) * 4.5
        return (
          <ellipse
            key={deg}
            cx={px.toFixed(2)}
            cy={py.toFixed(2)}
            rx="2"
            ry="1"
            transform={`rotate(${deg.toFixed(1)} ${px.toFixed(2)} ${py.toFixed(2)})`}
            strokeWidth="0.5"
          />
        )
      })}
      <circle cx="16" cy="82" r="2.4" strokeWidth="0.7" />
    </g>
    <circle className="text-primary sun-sunflower-core sun-sunflower-core-1" fill="currentColor" cx="16" cy="82" r="1.2" />

    {/* 右の向日葵（中型、左と対象） */}
    <g className="sun-sunflower sun-sunflower-3">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180
        const px = 84 + Math.cos(rad) * 4.5
        const py = 82 + Math.sin(rad) * 4.5
        return (
          <ellipse
            key={deg}
            cx={px.toFixed(2)}
            cy={py.toFixed(2)}
            rx="2"
            ry="1"
            transform={`rotate(${deg.toFixed(1)} ${px.toFixed(2)} ${py.toFixed(2)})`}
            strokeWidth="0.5"
          />
        )
      })}
      <circle cx="84" cy="82" r="2.4" strokeWidth="0.7" />
    </g>
    <circle className="text-primary sun-sunflower-core sun-sunflower-core-3" fill="currentColor" cx="84" cy="82" r="1.2" />

    {/* 地面の草（薄く、画面下端に賑わい） */}
    <g opacity="0.45" strokeWidth="0.4">
      <line x1="4"  y1="95" x2="4"  y2="92" />
      <line x1="10" y1="95" x2="10" y2="93" />
      <line x1="26" y1="95" x2="26" y2="93" />
      <line x1="34" y1="95" x2="34" y2="92" />
      <line x1="42" y1="95" x2="42" y2="93" />
      <line x1="58" y1="95" x2="58" y2="93" />
      <line x1="66" y1="95" x2="66" y2="92" />
      <line x1="74" y1="95" x2="74" y2="93" />
      <line x1="90" y1="95" x2="90" y2="93" />
      <line x1="96" y1="95" x2="96" y2="92" />
    </g>

    {/* 黄金粒子（風景ゾーンから太陽に向けて上昇、新位置に合わせて軌道更新） */}
    <g className="sun-particle sun-particle-1">
      <circle className="text-primary" fill="currentColor" cx="30" cy="55" r="0.8" />
    </g>
    <g className="sun-particle sun-particle-2">
      <circle className="text-primary" fill="currentColor" cx="68" cy="56" r="0.7" />
    </g>
    <g className="sun-particle sun-particle-3">
      <circle className="text-primary" fill="currentColor" cx="44" cy="48" r="0.6" />
    </g>
    <g className="sun-particle sun-particle-4">
      <circle className="text-primary" fill="currentColor" cx="58" cy="50" r="0.7" />
    </g>
  </>
)

const Judgement: React.FC = () => (
  <>
    {/* v2：渦の抽象を脱却。上の鳥居＋法輪（仏教的シンボル）＋下に合掌の人影＋上からの光スパークで「呼ばれ・再生」を表す。 */}
    {/* 上空からの光スパーク（再生の光）：judgement-spark で時差脈動 */}
    <g className="text-primary" stroke="currentColor" fill="currentColor" opacity="0.85">
      <line className="judgement-spark judgement-spark-1" x1="50" y1="2" x2="50" y2="10" strokeWidth="0.7" stroke="currentColor" fill="none" />
      <line className="judgement-spark judgement-spark-2" x1="36" y1="6" x2="42" y2="14" strokeWidth="0.6" stroke="currentColor" fill="none" />
      <line className="judgement-spark judgement-spark-3" x1="64" y1="6" x2="58" y2="14" strokeWidth="0.6" stroke="currentColor" fill="none" />
      <line className="judgement-spark judgement-spark-4" x1="24" y1="14" x2="34" y2="20" strokeWidth="0.5" stroke="currentColor" fill="none" />
      <line className="judgement-spark judgement-spark-5" x1="76" y1="14" x2="66" y2="20" strokeWidth="0.5" stroke="currentColor" fill="none" />
      <circle className="judgement-spark-core" cx="50" cy="8" r="1.2" stroke="none" />
    </g>

    {/* 鳥居（伝統の門） */}
    <path d="M 24 26 Q 50 22 76 26" strokeWidth="1.2" />
    <line x1="28" y1="32" x2="72" y2="32" strokeWidth="1" />
    <line x1="32" y1="26" x2="32" y2="60" strokeWidth="1" />
    <line x1="68" y1="26" x2="68" y2="60" strokeWidth="1" />

    {/* 鳥居の上の法輪（仏法の8本スポーク車輪）：判断 = ゆっくり回転 */}
    <circle cx="50" cy="44" r="9" strokeWidth="0.9" />
    <circle cx="50" cy="44" r="5" strokeWidth="0.5" opacity="0.7" />
    <g className="judgement-wheel">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180
        const x1 = 50 + Math.cos(rad) * 5
        const y1 = 44 + Math.sin(rad) * 5
        const x2 = 50 + Math.cos(rad) * 9
        const y2 = 44 + Math.sin(rad) * 9
        return <line key={deg} x1={x1.toFixed(2)} y1={y1.toFixed(2)} x2={x2.toFixed(2)} y2={y2.toFixed(2)} strokeWidth="0.6" />
      })}
    </g>
    {/* 法輪中央の朱（覚醒の光）：judgement-wheel-core で強脈動 */}
    <circle className="text-primary judgement-wheel-core" fill="currentColor" cx="50" cy="44" r="1.5" stroke="none" />

    {/* 下に合掌する3人の人影（呼ばれた魂）：時差で頭を上げる */}
    {[30, 50, 70].map((x, i) => (
      <g key={i} className={`judgement-monk judgement-monk-${i + 1}`}>
        {/* 頭（上を見上げる） */}
        <circle cx={x} cy="74" r="2.4" strokeWidth="0.7" />
        {/* 体 */}
        <path d={`M ${x - 3} 78 L ${x - 4} 92 L ${x + 4} 92 L ${x + 3} 78 Z`} strokeWidth="0.7" />
        {/* 合掌の手（頭の前） */}
        <line x1={x} y1="76" x2={x} y2="82" strokeWidth="0.5" />
        <path d={`M ${x - 2} 78 L ${x + 2} 78`} strokeWidth="0.4" />
      </g>
    ))}

    {/* 地面 */}
    <line x1="14" y1="94" x2="86" y2="94" strokeWidth="0.5" />
  </>
)

// 21 世界：シルエット再設計版（円シルエット脱却、四神主役化）
// 物語：四方を守護する曼荼羅、中央で達成を踊る舞人。完成、統合、四神の祝福。
// 構図：
//   - 中央：舞う人物（達成を踊る舞人）、上下に縦長の人形シルエット
//   - 4隅：四神（青龍/朱雀/白虎/玄武）が主役級サイズ（12-15 viewBox 単位）に拡大
//   - 中央と4隅を繋ぐ X 字の道筋（薄い破線）= 「四方を守護する」結界
//   - 外周の円は控えめに維持（境界としての役割のみ、シルエットを支配しない）
// 運命の輪との差別化：
//   - 運命の輪 = HUB+SPOKES+RIM の「機械的な車輪」（円筒対称、回転中心）
//   - 世界 = 「X字＋中央人物＋四隅の獣」（4回対称、コーナーに張り出す）
//   - 並べると一方は丸、他方は四隅張出しの曼荼羅で明確に差別化される
const TheWorld: React.FC = () => (
  <>
    {/* === 最外の薄い境界（控えめ、シルエットを支配しない） === */}
    <circle className="world-aether" cx="50" cy="50" r="48" opacity="0.06" fill="currentColor" stroke="none" />
    <circle cx="50" cy="50" r="46" opacity="0.22" strokeWidth="0.4" />

    {/* === 外環（順回転、薄め、骨格を主張しない） === */}
    <g className="world-outer">
      <circle cx="50" cy="50" r="38" opacity="0.35" strokeWidth="0.7" />
    </g>

    {/* === 中環（破線、逆位相） === */}
    <g className="world-dotted">
      <circle cx="50" cy="50" r="32" opacity="0.22" strokeWidth="0.5" strokeDasharray="2 3" />
    </g>

    {/* === 中央 ⇄ 4 隅 を繋ぐ X 字の道筋（薄い破線）：「四方守護」の結界を視覚化 === */}
    <g opacity="0.22" strokeDasharray="2 3" strokeWidth="0.5">
      <line x1="22" y1="22" x2="40" y2="40" />
      <line x1="78" y1="22" x2="60" y2="40" />
      <line x1="78" y1="78" x2="60" y2="60" />
      <line x1="22" y1="78" x2="40" y2="60" />
    </g>

    {/* === 中央：舞う人物（達成を踊る舞人。世界の中心、人間性の象徴） === */}
    <g className="world-dancer">
      {/* 頭 */}
      <circle cx="50" cy="32" r="3.5" strokeWidth="0.9" />
      {/* 髪結いの朱印 */}
      <circle className="text-primary" fill="currentColor" cx="50" cy="29.5" r="1" />
      {/* 上半身（着物の襟元、ひし形） */}
      <path d="M 47 35.5 L 45.5 41 L 47 47 L 53 47 L 54.5 41 L 53 35.5 Z" strokeWidth="0.9" />
      {/* 帯（横線） */}
      <line x1="46" y1="47" x2="54" y2="47" strokeWidth="1.2" />
      {/* 帯飾り（朱、world-center で脈動 — 舞人の魂の中心） */}
      <circle className="text-primary world-center" fill="currentColor" cx="50" cy="47" r="1.4" />
      {/* 下半身（袴のひろがり、台形） */}
      <path d="M 45 47 L 40 64 L 60 64 L 55 47 Z" strokeWidth="0.9" />
      {/* 袴の縦線（袴特有の中央襞） */}
      <line x1="50" y1="47" x2="50" y2="64" opacity="0.50" strokeWidth="0.4" />
      {/* 右袖（高く上げる、舞いの動き） */}
      <path d="M 54 41 Q 62 36 68 32" strokeWidth="1" fill="none" />
      <path d="M 54 43 Q 60 41 64 39" strokeWidth="0.6" opacity="0.65" fill="none" />
      {/* 右手の扇（朱） */}
      <path d="M 68 32 Q 73 29 75 33 Q 71 35 68 32 Z" fill="currentColor" className="text-primary" stroke="none" />
      {/* 左袖（横に流れる、対比的） */}
      <path d="M 46 41 Q 38 42 32 47" strokeWidth="1" fill="none" />
      <path d="M 46 43 Q 40 44 36 46" strokeWidth="0.6" opacity="0.65" fill="none" />
      {/* 左手の扇（朱） */}
      <path d="M 32 47 Q 27 45 25 49 Q 30 49 32 47 Z" fill="currentColor" className="text-primary" stroke="none" />
      {/* 足元（袴の下から覗く小さな足） */}
      <line x1="48" y1="64" x2="47" y2="68" strokeWidth="0.7" />
      <line x1="52" y1="64" x2="53" y2="68" strokeWidth="0.7" />
    </g>

    {/* === 4 隅の四神（主役級に拡大、各 ~12-15 viewBox 単位）=== */}

    {/* 左上 NW：青龍（東＝春の守護獣） */}
    <g className="world-corner world-corner-1">
      {/* 身体（S字曲線、画面端から内へ向かう） */}
      <path d="M 4 22 Q 10 14 18 18 Q 22 20 18 8" strokeWidth="1.1" fill="none" />
      {/* 頭 */}
      <circle cx="18" cy="8" r="2.5" strokeWidth="0.9" />
      {/* 角（2本） */}
      <line x1="17" y1="5.5" x2="16" y2="2" strokeWidth="0.6" />
      <line x1="19" y1="5.5" x2="20" y2="2" strokeWidth="0.6" />
      {/* 髭（2本） */}
      <line x1="20.5" y1="7" x2="23" y2="5" strokeWidth="0.5" opacity="0.7" />
      <line x1="20.5" y1="9" x2="23" y2="11" strokeWidth="0.5" opacity="0.7" />
      {/* 目（朱） */}
      <circle className="text-primary" fill="currentColor" cx="18" cy="7.5" r="0.7" stroke="none" />
      {/* 鱗（点線で身体の中央に沿わせる） */}
      <path d="M 8 21 Q 12 17 16 17" strokeWidth="0.4" opacity="0.5" strokeDasharray="1 1.5" fill="none" />
      {/* 尾 */}
      <path d="M 4 22 Q 2 25 4 28" strokeWidth="0.7" fill="none" />
    </g>

    {/* 右上 NE：朱雀（南＝夏の守護獣） */}
    <g className="world-corner world-corner-2">
      {/* 翼（左右の弧、大きく広げる） */}
      <path d="M 82 16 Q 73 11 75 4" strokeWidth="1.1" fill="none" />
      <path d="M 88 16 Q 97 11 95 4" strokeWidth="1.1" fill="none" />
      <path d="M 82 18 Q 77 15 76 11" strokeWidth="0.6" opacity="0.6" fill="none" />
      <path d="M 88 18 Q 93 15 94 11" strokeWidth="0.6" opacity="0.6" fill="none" />
      {/* 身体（三角） */}
      <path d="M 85 14 L 82 22 L 88 22 Z" strokeWidth="0.9" />
      {/* 頭 */}
      <circle cx="85" cy="12" r="1.7" strokeWidth="0.7" />
      {/* 嘴 */}
      <line x1="85" y1="11" x2="88" y2="9" strokeWidth="0.6" />
      {/* 目（朱） */}
      <circle className="text-primary" fill="currentColor" cx="85" cy="12" r="0.6" stroke="none" />
      {/* 尾羽（垂れる長い羽、3本） */}
      <line x1="83" y1="22" x2="80" y2="28" strokeWidth="0.6" opacity="0.65" />
      <line x1="85" y1="22" x2="85" y2="30" strokeWidth="0.7" opacity="0.75" />
      <line x1="87" y1="22" x2="90" y2="28" strokeWidth="0.6" opacity="0.65" />
    </g>

    {/* 右下 SE：白虎（西＝秋の守護獣） */}
    <g className="world-corner world-corner-3">
      {/* 顔の輪郭（楕円） */}
      <ellipse cx="85" cy="86" rx="6.5" ry="6" strokeWidth="1" />
      {/* 耳（三角、2 個） */}
      <path d="M 80 81 L 78 77 L 82 80 Z" strokeWidth="0.7" />
      <path d="M 90 81 L 92 77 L 88 80 Z" strokeWidth="0.7" />
      {/* 縞模様（左右の弧 + 細かい線） */}
      <path d="M 80 84 Q 82 86 80 88" strokeWidth="0.5" opacity="0.6" fill="none" />
      <path d="M 90 84 Q 88 86 90 88" strokeWidth="0.5" opacity="0.6" fill="none" />
      <line x1="82" y1="82.5" x2="84" y2="82.5" strokeWidth="0.5" opacity="0.6" />
      <line x1="88" y1="82.5" x2="86" y2="82.5" strokeWidth="0.5" opacity="0.6" />
      {/* 目（朱、2 個） */}
      <circle className="text-primary" fill="currentColor" cx="83" cy="85" r="0.8" stroke="none" />
      <circle className="text-primary" fill="currentColor" cx="87" cy="85" r="0.8" stroke="none" />
      {/* 鼻先（朱、三角） */}
      <path d="M 84 87.5 L 85 89 L 86 87.5 Z" fill="currentColor" className="text-primary" stroke="none" />
      {/* 口 */}
      <path d="M 83 90 Q 85 91 87 90" strokeWidth="0.5" opacity="0.7" fill="none" />
      {/* 髭 */}
      <line x1="79" y1="86" x2="75" y2="87" strokeWidth="0.4" opacity="0.55" />
      <line x1="91" y1="86" x2="95" y2="87" strokeWidth="0.4" opacity="0.55" />
    </g>

    {/* 左下 SW：玄武（北＝冬の守護獣、亀と蛇） */}
    <g className="world-corner world-corner-4">
      {/* 亀甲（六角形） */}
      <polygon points="15,79 21,82 21,89 15,92 9,89 9,82" strokeWidth="1" />
      {/* 亀甲の内側模様 */}
      <polygon points="15,82.5 18,84.5 18,87.5 15,89.5 12,87.5 12,84.5" strokeWidth="0.5" opacity="0.65" />
      {/* 中心点 */}
      <circle cx="15" cy="86" r="0.8" fill="currentColor" stroke="none" opacity="0.55" />
      {/* 頭（右側に出る） */}
      <ellipse cx="22.5" cy="85.5" rx="2.2" ry="1.6" strokeWidth="0.7" />
      {/* 目（朱） */}
      <circle className="text-primary" fill="currentColor" cx="23.5" cy="85.5" r="0.55" stroke="none" />
      {/* 尾 */}
      <path d="M 9 85 L 6 84 L 4.5 87" strokeWidth="0.6" />
      {/* 足 4本 */}
      <line x1="11" y1="89.5" x2="9" y2="93" strokeWidth="0.5" opacity="0.65" />
      <line x1="19" y1="89.5" x2="21" y2="93" strokeWidth="0.5" opacity="0.65" />
      <line x1="11" y1="80" x2="9" y2="76" strokeWidth="0.5" opacity="0.65" />
      <line x1="19" y1="80" x2="21" y2="76" strokeWidth="0.5" opacity="0.65" />
      {/* 蛇の曲線（亀に絡む、頭部が亀甲の右上に） */}
      <path d="M 21 88 Q 25 84 22 79" strokeWidth="0.6" opacity="0.7" fill="none" />
      <circle cx="22" cy="79" r="0.5" fill="currentColor" stroke="none" opacity="0.65" />
    </g>

    {/* === 4 方位の小さな印（控えめ、補助的）=== */}
    <circle cx="50" cy="6"  r="1.5" opacity="0.45" strokeWidth="0.5" />
    <circle cx="94" cy="50" r="1.5" opacity="0.45" strokeWidth="0.5" />
    <circle cx="50" cy="94" r="1.5" opacity="0.45" strokeWidth="0.5" />
    <circle cx="6"  cy="50" r="1.5" opacity="0.45" strokeWidth="0.5" />
  </>
)

const SYMBOL_MAP: Record<string, React.FC> = {
  'major-00': TheFool,
  'major-01': TheMagician,
  'major-02': HighPriestess,
  'major-03': TheEmpress,
  'major-04': TheEmperor,
  'major-05': TheHierophant,
  'major-06': TheLovers,
  'major-07': TheChariot,
  'major-08': Strength,
  'major-09': TheHermit,
  'major-10': WheelOfFortune,
  'major-11': Justice,
  'major-12': TheHangedMan,
  'major-13': Death,
  'major-14': Temperance,
  'major-15': TheDevil,
  'major-16': TheTower,
  'major-17': TheStar,
  'major-18': TheMoon,
  'major-19': TheSun,
  'major-20': Judgement,
  'major-21': TheWorld,
}

export function MajorArcanaSymbol({ id }: { id: string }) {
  const Symbol = SYMBOL_MAP[id]
  if (!Symbol) return null
  return <Symbol />
}

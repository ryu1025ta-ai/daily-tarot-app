# CLAUDE.md — 和の暦タロット

このファイルは Claude Code がセッション開始時に読み込む。
過去セッションの失敗パターンを反映した「実装してから後悔しないための地図」。

---

## A. プロジェクト概要

- **プロダクト名**: 和の暦タロット（Wa-no-Koyomi Tarot）
- **コンセプト**: 78枚の和風タロット × 24節気 × 時間帯テーマ × 日々の儀式
- **開発体制**: 非エンジニアの龍太さんが Claude Code 主体で実装。Notion に経営執行チーム/設計書あり
- **公開予定**: 現時点で**なし**。完璧モード（時間制限なし、品質を最大化）
- **スタック**: Next.js 16 (App Router, Turbopack) / React / TypeScript / Tailwind CSS / framer-motion
- **データ**: 全て localStorage（サーバー側永続化なし、1ユーザー1端末で完結）

---

## B. 絶対ルール（破ったら全て却下）

### ダークパターン全面禁止
- ❌ 未成年課金誘導 / 課金機能自体 v1 では入れない
- ❌ メンタル悪化誘導（罪悪感、悲嘆、自己否定）
- ❌ 退会困難化（アプリ削除案内を隠す等）
- ❌ ダミーUI（偽ボタン、偽カウントダウン、偽オンライン人数）
- ❌ 射倖心煽り（「次は出る」「あと1枚」等のガチャ的煽動）
- ❌ 嘘の数字（社会的証明は「数千人」レンジ表現のみ、具体数は禁止）

### 技術ガードレール
- ✅ `prefers-reduced-motion: reduce` への対応必須（全アニメ停止）
- ✅ TypeScript 型チェック通過必須（`npx tsc --noEmit` Exit 0）
- ✅ サムネ静止（パフォーマンス、図鑑の落ち着き）、アニメは詳細画面のみ
- ✅ 既存 SVG 資産は基本温存（破壊禁止、motion 用 `<g>` ラッパー追加で対応）
- ✅ 既存ユーザーの localStorage 履歴は維持（後方互換）

---

## C. データ駆動の原則

### レア度の source of truth

`lib/tarot-data.ts` の `rarity` フィールドが**唯一の真実**。

```ts
// lib/tarot-data.ts
export type Rarity = 'common' | 'rare' | 'epic' | 'legendary'
// ↑ 内部キー。漢字との対応は絶対に入れ替えない（過去の試行は却下済み）

export type TarotCard = {
  id: string
  numericId: number
  rarity: Rarity   // ← source of truth
  ...
}
```

`lib/card-rarity.ts:getCardRarity()` は `return card.rarity` だけ（ハードコード禁止）。

### 漢字対応表（絶対に変えない）

| 内部キー | 漢字 | 枚数 | 振り分け |
|---|---|---|---|
| `common`    | **常** | 40 | 小アルカナ数札 1〜10（4スート） |
| `rare`      | **稀** | 14 | 大アルカナのうち legendary を除く 14 枚 |
| `epic`      | **貴** | 16 | 小アルカナコート 11〜14（4スート） |
| `legendary` | **極** | 8  | 大アルカナの 0/10/13/16/17/18/19/21 |

`LEGENDARY_MAJOR_NUMBERS = {0, 10, 13, 16, 17, 18, 19, 21}` は `lib/card-rarity.ts` のコメントで固定。

> **過去の試行（却下済み）**: 漢字定義（`getRarityLabel` / `rarityKanji`）の `rare↔epic` を入れ替えるハック修正は禁止。バグはデータ側を直すこと。

---

## D. アニメーション仕様

### 基本原則
**カードごとに固有のアニメ。レア度はアニメの「強度」のみを規定する。**
（「同じレア度=同じアニメ」は2026-05-28 朝の設計逆転で却下済み）

### レア度別 強度ガイド

| レア度 | サイクル | 振幅 | 例 |
|---|---|---|---|
| **極(8)** | 8〜12s | 派手・大胆（光線爆発、回転 360°、scale 1↔1.06） | 太陽=光線回転+粒子放射、世界=曼荼羅3層回転 |
| **貴(16)** | 4〜6s  | しっかり動く（rotate ±6〜10°、translate 2〜4px） | 杖の王=雄壮な炎、聖杯の王=魚が泳ぐ |
| **稀(14)** | 3〜7s  | 個性的に動く（rotate ±5〜8°、scale 1↔1.35） | 隠者=提灯振り子、正義=天秤揺れ |
| **常(40)** | 控えめ | 必ず動く（**静止禁止**） | 微細演出。Phase 2d で設計 |

### 振幅の最低基準（過去の失敗を反映）

> ⚠ **Phase 2b 失敗事例**: 仕様の 1/3〜1/5（rotate ±1-2°、translate 0.6-1.4px）で実装してしまい「動いて見えない」状態になった。**最初から仕様レベルで実装すること**。

- translate: **最低 2px**、3〜6px を標準
- rotate: **最低 ±5°**、±6〜10° を標準（極のみ 360°回転や ±15° 可）
- scale: **最低 1.06**、1.10〜1.65 を標準
- opacity 振動: **最低 0.3 幅**（例 0.4→0.85）

### アーキテクチャ
```
<CardSymbol card={card} animate={true} />   ← 詳細画面のみ true
                ↓
   <svg className="rarity-symbol-{rarity} is-card-animated card-{cardId}"
        data-time={timeTheme}
        data-season={season}
        data-hidden-active={hiddenActive}
        onPointerDown={長押し検出}>
       ↓ CSS で .is-card-animated 配下のみアニメ発火
       ↓ サムネは animate=false → アニメ非発火
```

### 必須継承機能

1. **時間帯モジュレーション** — `--anim-speed-mult` で全 `animation-duration` を補正
   - dawn 0.92x / day 0.85x / dusk 1.0x / evening 1.10x / **night 1.22x**
   - 各アニメは `calc(Xs * var(--anim-speed-mult, 1))` で書く
2. **季節モジュレーション** — `[data-season="xxx"]` で SVG 全体に filter
   - spring 中性 / summer 暖色弱 / autumn 暖色 / winter 寒色
3. **長押し隠し演出** — 600ms 押下で `data-hidden-active="true"` 2.4秒間
   - 各カードで違う動き。多くは `animation-duration` を短縮して加速表現
   - 完全な別アニメは「カードの意味を強める時のみ」（例: 鳥が羽ばたく、刀振り下ろし）
4. **prefers-reduced-motion** — `.is-card-animated, .is-card-animated *` を `animation: none !important`

---

## E. 確率設計（カード抽選）

### 重みづけ

`lib/card-draw.ts:RARITY_WEIGHTS` で定義。**0.5% / 1.0% / 1.43% / 1.5% per card**:

| レア度 | per card | 合計 | 期待頻度 |
|---|---|---|---|
| 極 (legendary) | 0.5%  | **4.0%**  | 約25日に1回 |
| 貴 (epic)      | 1.0%  | **16.0%** | 約6日に1回 |
| 稀 (rare)      | 1.43% | **20.0%** | 約5日に1回 |
| 常 (common)    | 1.5%  | **60.0%** | 約1.7日に1回 |

検証: `npx tsx scripts/simulate-draw.ts`（n=10,000 で全レア度 ±2% 以内収束を確認済み）

### 排除ロジック

- ✅ **昨日のカードを除外**（`historyRef.current[getYesterdayString()]` を `excludeIds` に渡す）
- ❌ 直近7日除外（中毒誘発のため不採用）
- ❌ 既収録優先（コンプ煽動のため不採用）

### リセマラ防御（既存実装、維持）

3層: `historyRef`（同期 ref）+ `localStorage`（永続化）+ JST 日付固定（`Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo' })`）

DEV モード: `getContinuousDrawMode()` で同日 2 回引きを許容（`NEXT_PUBLIC_DEBUG_MODE=false` で本番無効化）

---

## F. ファイル構造の重要パターン

```
lib/
├── tarot-data.ts         78枚のカードデータ（source of truth、rarity含む）
├── card-rarity.ts        Rarity 型 + 漢字/色定義（get/Label/Kanji）
├── card-draw.ts          重み付き抽選 + 昨日除外
├── tarot-context.tsx     drawCard / 履歴管理 / streak 計算
├── collection.ts         図鑑データ層（localStorage）
├── streak.ts             連続日数（current / longest / total）
├── titles.ts             称号システム（ストリーク・収録・節気）
├── time-theme.ts         5段階時間帯（dawn/day/dusk/evening/night、JST）
├── sekki.ts              24節気テーブル + 季節判定（spring/summer/autumn/winter）
├── social-proof.ts       社会的証明（レンジ表現のみ、嘘の数字禁止）
├── haptic.ts             バイブレーション（navigator.vibrate ラッパ）
├── dev-tools.ts          DEV 強制カード抽選 / 連続抽選 / 全カード表示
└── ui-prefs.ts           UI 設定の永続化

components/
├── screens/              各画面（home/calendar/collection/settings）
├── tarot-symbols/        78枚の SVG 実装
│   ├── index.tsx         CardSymbol（共通ラッパ、animate prop / 長押し / data 属性）
│   ├── major-arcana/     大アルカナ22枚
│   └── minor-arcana/     小アルカナ56枚（数札40 + コート16）
├── tarot-card.tsx        ⚠ 未使用レガシー（削除候補だが現状温存）
├── seasonal-background.tsx  季節パーティクル
└── ui/                   shadcn/ui ラッパ

app/
├── page.tsx              ルート画面
├── layout.tsx            レイアウト（TarotProvider 等の wrap）
└── globals.css           ⚠ **2900+行**。テーマ変数 + 全アニメーション

scripts/
└── simulate-draw.ts      抽選確率シミュレーション（npx tsx で実行）
```

### globals.css の構造
- 上部: テーマ変数（light/dark、5時間帯）
- 中盤: レア度別ベーススタイル（背景、枠、シンボル色）
- 中盤: 各カード固有アニメ（大アルカナ22 + コート16 = 38枚分の per-card keyframe）
- 下部: Pre-Ritual / Ritual / 新発見 / 季節背景

### CSS命名規約
- `.rarity-{common|rare|epic|legendary}` — カード wrapper
- `.rarity-symbol-{rarity}` — SVG 色付け
- `.rarity-deco-{asanoha|seigaiha|tomoe|kikko-bg|gold-leaf}` — レア度別装飾
- `.is-card-animated` — アニメ発火スコープ（詳細画面のみ）
- `.card-{cardId}` — カード固有スコープ（例: `card-major-19`、`card-wands-14`）
- `.motion-{name}` / `.{card}-{element}` — 個別 motion 要素

---

## G. 完成定義（チェックリスト）

実装が「完了」と言える条件:

1. ✅ `npx tsc --noEmit` 通過
2. ✅ ESLint 通過（現状プロジェクトに設定なし、本番ビルド前に追加予定）
3. ✅ **grep で SVG 全クラスに CSS animation ルールが存在することを自己検証**
4. ✅ **目視で動きが分かる**まで（クラス付与だけでは未完成）
5. ✅ サムネ静止 / 詳細でアニメ確認
6. ✅ prefers-reduced-motion ON で全停止確認

> ⚠ **過去の失敗**: 「CSS クラスを SVG に付与した」だけで完了報告した結果、CSS rule が抜けていた／振幅が過小で動いて見えなかった。**実装後に grep + 目視まで踏むこと**。

### 自己検証コマンド例

```bash
# SVG クラスを抽出 → 各クラスに .is-card-animated ルールがあるか grep
SVG_CLASSES=$(grep -hoE 'className="[^"]*"' components/tarot-symbols/.../file.tsx \
  | grep -oE 'pattern' | sort -u)
while IFS= read -r cls; do
  count=$(grep -cE "\.is-card-animated[^{]*\.${cls}([^a-z0-9-]|$)" app/globals.css)
  [ "$count" -eq 0 ] && echo "MISSING: $cls"
done <<< "$SVG_CLASSES"
```

---

## H. Claude Code への期待

1. **自己検証必須** — 実装後に grep / 型チェック / 目視レベル確認まで踏む
2. **完了報告には「自分で判断した箇所」を明示** — 仕様外の独自判断は理由とともに必ず開示
3. **倫理的に疑問があれば実装前に確認** — ガードレール抵触は止まる
4. **「ハック修正」ではなく「根本修正」を選ぶ** — 症状を隠さず原因を直す（漢字入替ハック試行を却下された教訓）
5. **既存資産は破壊せず温存** — SVG markup や localStorage キーは保持、追加で対応
6. **テンプレート文字列 className に注意** — grep で見落とすので、`` className={`a b-${i}`} `` パターンも検証時に意識
7. **CSS 振幅は最初から仕様レベル** — 「あとで強くすればいい」は失敗の元

---

## I. 過去の失敗事例（再発防止メモ）

### ① 漢字定義入れ替えハック試行（card-rarity.ts、却下）
コートカードが「稀」と表示されていたバグに対し、漢字定義（`rare → 稀`, `epic → 貴`）を `rare → 貴`, `epic → 稀` に入れ替える修正を提案 → 却下。
**正解**: データ側（`tarot-data.ts` の `rarity` フィールド）を直し、`getCardRarity()` をデータ駆動化。漢字定義は不変。

### ② getCardRarity() ハードコード問題
`getCardRarity()` が `suit` と `number` から動的計算していた（`card.rarity` フィールドを無視）。
**修正済み**: `return card.rarity` の1行に簡略化、データを source of truth に統一。

### ③ Phase 2b 振幅不足（仕様の1/3〜1/5）
コート16枚のアニメ実装で、translateY 0.6-1.4px / rotate ±1-2° と過小で「動いていない」と知覚された。
**修正済み**: 全 keyframe を仕様レベル（2-6px / ±5-10°）に増幅。
**再発防止**: Phase 2c 以降は最初から仕様レベルで実装、完了報告に振幅数値を含める。

### ④ クラス付与=完成と勘違い
SVG に className を付けただけで「実装完了」と報告 → CSS 定義が抜けていた／振幅が小さすぎた。
**再発防止**: 完了条件「目視で動きが分かるまで」を明文化、自己検証 grep を必須化。

### ⑤ 「コートカードが貴14/14」表示問題
原因はレア度判定の混乱。**収録枚数 = 期待値の証拠**になるため、図鑑タブの集計を必ず実機で確認。

### ⑥ テンプレート画一化問題（極8枚）
Phase 2a で極8枚すべてに共通の「亀甲フレーム + 中央象徴 + 周囲オーブ」テンプレを適用 → 「色違いの同じ絵」に見え、最高レアが中堅レアに見劣り。**アニメは固有でも、構図が共通だとカードの個性が消える**。
**修正済み（2026-05-28）**: 8枚すべて `LEGENDARY_CUSTOM_FRAME` 経由で共通テンプレをスキップし、各カード固有の構図に脱却完了。太陽=横帯3層 / 世界=X字＋四隅張出 / 愚者=縦長＋谷 / 運命の輪=車輪（HUB+SPOKES+RIM）/ 死神=斜め鎌 / 塔=垂直崩落 / 星=上下分割（七星＋池）/ 月=垂直（道が手前へ）。
**再発防止**: 「アニメの固有性」と「絵柄の固有性」は別問題。**新カード追加時は構図の骨格（中央/周囲/フレーム）が他カードと被らないかチェック**する。共有テンプレを使うなら、装飾要素で十分に差別化されている前提が必要。

**学び（実装で確立した原則）**:
- **絵柄の固有性は「要素の追加」ではなく「シルエット骨格の差別化」で達成される**。同じテンプレに装飾を増やしても「色違いの同じ絵」のままで、サムネサイズでは特に区別がつかない。基本形状（円/縦/横/斜め/車輪）そのものを変える必要がある。
- **8枚並べたときに同じ基本形状は最大1枚まで**。Phase 2a の8枚全部"円"、修正初期も世界と運命の輪が"円×2"で被ったため、サムネで区別不能になった。正円シルエットは1枚に絞り、他は縦/横/斜め/X字など散らす。
- **雰囲気（色味・トーン・和の意匠・金色の品格）は維持し、骨格だけ変える**のが低リスク。色や和の意匠を同時に変えると「別カードに見える」事故が起きる。「シルエットだけ変える」を独立した作業として切り分けると安全。
- **作業順序**: ①骨格選定（縦/横/斜め/X字/車輪 を意図的に散らす）→ ②シルエットを成立させる主役要素を主役級サイズに（脇役の倍以上）→ ③雰囲気要素（朱印・線の濃淡・余白）を引き継ぐ。装飾追加は最後。

### ⑦ 金貨(地)の常 10枚は意図的に静止（バグではなく設計判断）
Phase 2d で「火=揺らめき / 水=波打ち / 地=重い呼吸 / 風=横ドリフト」の4スート×4質感を実装したが、金貨だけ「動いて見えない」報告が3回続いた。振幅・周期を3回調整しても改善せず、診断の結果**朱印 (`.text-primary`) のサイズが構造的に極小**であることが原因と判明:
- Koban テンプレ内の朱印: `r = min(holeW, holeH) × 0.25 = 0.25〜0.8` （他スートは r=0.7〜1.4）
- FiveOfPentacles / NineOfPentacles の Koban 朱印は **r=0.245**（サブピクセル）
- サブピクセル要素の opacity 16〜30% swing は人間の視覚で**検出不可能**

**経営判断**: 動かさない（正式に静止採用）。
**理由**: 地のモチーフ（小判・実り）は「どっしり動かない」のが世界観に最も忠実。火=揺れ / 水=波 / 風=流れ **に対し 地=静**で4スートの対比がむしろ明確になる。完成した墨絵を壊してまで極小の動きを足す価値はない。

**実装**:
- `common-earth-breathe` keyframe を `app/globals.css` から削除
- `.is-card-animated.common-pentacles .text-primary` ルールを削除
- `CardSymbol` の `common-pentacles common-num-N` クラス付与は**残置**（CSS 無効なので発火しないが、将来再採用時のための拡張余地）

**再発防止 / 教訓**:
- **「動かない」を最初から世界観の一部として設計に組み込める場合がある**。バグだと決めつけずに、なぜ動いて見えないかの構造的原因を診断し、世界観と整合するなら静止を正式採用するという選択肢を常に持つ。
- 振幅調整のループに陥ったら**「振幅の問題」ではなく「対象の物理的サイズの問題」を疑う**。診断モード（要素サイズ計測・他スートとの比較）で構造的差異を確認する。
- 4要素システム（火/水/風/地 など）で1要素だけ性質が違う場合、無理に揃えずに「対比」として位置付ける方が美しい場合がある。

---

## J. 進捗ステータス（2026-05-28 時点）

- ✅ Phase 1: コートカードレア度バグ修正（データ駆動リファクタ）
- ✅ Phase 2a: 極8枚 個性化アニメ（per-card 固有動）
- ✅ Phase 2b: 貴16枚 個性化アニメ（コートカード、振幅増強済み）
- ✅ Phase 2c: 稀14枚 個性化アニメ（大アルカナ非極）
- ✅ 確率実装（重み付き抽選 + 昨日除外 + 極 pre-ritual 7s 延長）
- ✅ **極SVGテンプレ脱却 完了**（8枚全部シルエット分離達成: 太陽=横帯 / 世界=X字四隅 / 愚者=縦長 / 運命の輪=車輪 / 死神=斜め / 塔=垂直 / 星=上下分割 / 月=垂直）
- ✅ **極のクオリティアップ完了**（死神=骸骨追加 / 月=月のうさぎ＋鳥居＋参道 / 星=上下分割で水を注ぐ女性 / 塔=石積み実体感＋稲妻3層強化＋人影＋炎）
- ✅ **Phase 2d: 常40枚 個性化アニメ 完了**（スート別質感×数別強度の2軸設計、朱印のみが動く最小演出。火=揺らめき / 水=波打ち / **地=正式に静止** / 風=横ドリフト、A〜10で振幅0.55〜1.35・周期1.80〜0.74倍）
- 🎉 **78枚すべてのアニメ実装 完了**（極8 + 貴16 + 稀14 + 常40。ただし**金貨(地)の常10枚は意図的に静止**、世界観上の判断であってバグではない。詳細は §I-7）
- ✅ **季節パーティクル「一瞬表示」バグ修正**（`.seasonal-background` の z-index を 1 → 30 に変更。`.washi-texture > *` から自動付与される z-index: 1 と衝突して画面コンテンツの裏に隠れていた問題を解決。タブ切替時のみ見えていた粒子が常時流れるように。pointer-events: none で操作は阻害しない）
- ✅ **設定タブ検証完了、明確なバグなし**（12項目すべて localStorage 保存＋CustomEvent dispatch のパターンで正しく動作。3つの磨き込み候補は意図的に保留: ①手動テーマ選択時のアニメ速度連動／②アニメ速度の手動スライダー UI 追加／③60秒間隔の時間帯/季節自動更新。いずれも不具合ではなく、複雑さに見合う恩恵がないと判断）
- 未着手: 行動経済学パッケージ完璧版（損失回避通知、進捗可視化、称号UI 等）
- 未着手: AI画像生成によるカード絵の差し替え検討

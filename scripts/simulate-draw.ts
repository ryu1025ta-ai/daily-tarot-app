/**
 * カード抽選確率の検証シミュレーション。
 * 実装の drawWeightedCard を使い、昨日のカード除外ルールも適用して
 * 1000 回引いた時のレア度分布を実測する。
 *
 * 実行：npx tsx scripts/simulate-draw.ts
 */

import { TAROT_CARDS } from '../lib/tarot-data'
import { drawWeightedCard, RARITY_WEIGHTS } from '../lib/card-draw'
import { getCardRarity } from '../lib/card-rarity'
import type { Rarity } from '../lib/tarot-data'

// n=1000 ではレア度 16% の二項分布 σ ≈ 1.16% で 95%信頼区間が ±2.32% となり
// 「±2% 以内」を毎回満たすには n を上げる必要がある。本番は 10000 で収束確認 +
// 1000 を 5 回回してばらつきを実測。
const TRIALS_MAIN = 10000
const TRIALS_SMALL = 1000
const SMALL_BATCHES = 5

// 理論値（重み合計から算出）
const TOTAL_WEIGHT = TAROT_CARDS.reduce((s, c) => s + RARITY_WEIGHTS[c.rarity], 0)
const expected: Record<Rarity, number> = { common: 0, rare: 0, epic: 0, legendary: 0 }
for (const card of TAROT_CARDS) {
  expected[card.rarity] += RARITY_WEIGHTS[card.rarity] / TOTAL_WEIGHT
}

type RarityCounts = Record<Rarity, number>

function runBatch(trials: number): { counts: RarityCounts; duplicates: number } {
  const counts: RarityCounts = { common: 0, rare: 0, epic: 0, legendary: 0 }
  let previousCardId: string | null = null
  let duplicates = 0
  for (let i = 0; i < trials; i++) {
    const excludeIds = previousCardId ? [previousCardId] : []
    const card = drawWeightedCard(TAROT_CARDS, excludeIds)
    counts[getCardRarity(card)]++
    if (card.id === previousCardId) duplicates++
    previousCardId = card.id
  }
  return { counts, duplicates }
}

const fmt = (n: number) => (n * 100).toFixed(2) + '%'
const rarities: Rarity[] = ['legendary', 'epic', 'rare', 'common']
const label = (r: Rarity) =>
  r === 'legendary' ? '極 (legendary)' :
  r === 'epic'      ? '貴 (epic)     ' :
  r === 'rare'      ? '稀 (rare)     ' :
                      '常 (common)   '

// メイン: 10000 回試行で長期収束を確認
const main = runBatch(TRIALS_MAIN)
console.log(`\n=== メイン（${TRIALS_MAIN.toLocaleString()} 回試行、昨日除外あり）===\n`)
console.log('レア度         |  実測       |  期待値      |  差分')
console.log('---------------|-------------|--------------|--------')
let mainFailures = 0
for (const r of rarities) {
  const actual = main.counts[r] / TRIALS_MAIN
  const exp = expected[r]
  const diff = actual - exp
  const sign = diff >= 0 ? '+' : ''
  console.log(`${label(r)} |  ${fmt(actual).padStart(8)}  |  ${fmt(exp).padStart(8)}   |  ${sign}${(diff * 100).toFixed(2)}%`)
  if (Math.abs(diff) > 0.02) mainFailures++
}
console.log(`\n連続重複（昨日除外バグ検知）: ${main.duplicates} 回（0であるべき）`)

// 1000 回 ×5 バッチ：n=1000 でのばらつき実測（教科書通り σ≈1.2%）
console.log(`\n=== バッチ検証（${TRIALS_SMALL} 回 × ${SMALL_BATCHES} 回）===\n`)
console.log('Batch  |  極       |  貴       |  稀       |  常       |  期待からの最大乖離')
console.log('-------|-----------|-----------|-----------|-----------|---------------------')
const batchResults: RarityCounts[] = []
for (let b = 0; b < SMALL_BATCHES; b++) {
  const { counts } = runBatch(TRIALS_SMALL)
  batchResults.push(counts)
  let maxDev = 0
  const cells = rarities.map((r) => {
    const actual = counts[r] / TRIALS_SMALL
    const dev = Math.abs(actual - expected[r])
    if (dev > maxDev) maxDev = dev
    return fmt(actual).padStart(8)
  })
  console.log(`  ${b + 1}    |  ${cells.join('  |  ')}  |  ±${(maxDev * 100).toFixed(2)}%`)
}

const tolerance = 0.02
console.log(`\n=== 判定 ===`)
if (mainFailures === 0) {
  console.log(`✓ メイン（n=${TRIALS_MAIN}）で全レア度が期待値 ±${tolerance * 100}% 以内\n`)
} else {
  console.log(`✗ メインで ${mainFailures} 件の逸脱（実装バグの可能性）\n`)
  process.exit(1)
}

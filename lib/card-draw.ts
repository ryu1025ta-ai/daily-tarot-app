import type { TarotCard, Rarity } from './tarot-data'

/**
 * レア度別の重み（per card、% に対応）。
 * 設計値：
 *   legendary (8 cards × 0.5%)  =  4.00%  → 約25日に1回
 *   epic      (16 cards × 1.0%) = 16.00%  → 約6日に1回
 *   rare      (14 cards × 1.43%) = 20.02% → 約5日に1回
 *   common    (40 cards × 1.5%) = 60.00%  → 約1.7日に1回
 *   total ≈ 100.02%（正規化は totalWeight に対する比率で自動的に行われる）
 *
 * 「重みづけは品格設計であって射倖心煽りではない」の方針で、極を明確に希少化。
 */
export const RARITY_WEIGHTS: Record<Rarity, number> = {
  legendary: 0.5,
  epic: 1.0,
  rare: 1.43,
  common: 1.5,
}

/**
 * 重み付き抽選。excludeIds に含まれるカードは候補から完全に除外して抽選する。
 *
 * - 候補が空（excludeIds が全カードを覆ってしまった場合）は cards 全体から均等抽選にフォールバック。
 *   実運用では除外が 1〜数枚なので通常発生しない。
 * - 浮動小数点の累積誤差で「ループが終わっても引かれない」状況の保険として最後尾を返す。
 *
 * 純粋関数。テスト/シミュレーション容易性のため Math.random をパラメータ化していないが、
 * シミュレーション側で globalThis.Math.random をスタブする想定。
 */
export function drawWeightedCard(
  cards: readonly TarotCard[],
  excludeIds: readonly string[] = [],
): TarotCard {
  const excludeSet = new Set(excludeIds)
  const pool = cards.filter((c) => !excludeSet.has(c.id))

  if (pool.length === 0) {
    return cards[Math.floor(Math.random() * cards.length)]
  }

  const totalWeight = pool.reduce((sum, c) => sum + RARITY_WEIGHTS[c.rarity], 0)
  let r = Math.random() * totalWeight
  for (const card of pool) {
    r -= RARITY_WEIGHTS[card.rarity]
    if (r <= 0) return card
  }
  // 浮動小数点の保険
  return pool[pool.length - 1]
}

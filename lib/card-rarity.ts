import type { TarotCard, Rarity } from './tarot-data'

// 引く儀式の演出を切り替えるためのレア度分類。
// source of truth は tarot-data.ts の TarotCard.rarity フィールド。
// 振り分けルール：
//   common    : 小アルカナ数札 1〜10（4 スート × 10 = 40 枚） → 常
//   epic      : 小アルカナコート 11〜14（4 スート × 4 = 16 枚） → 貴
//   rare      : 大アルカナのうち legendary を除く 14 枚 → 稀
//   legendary : 大アルカナ 0/10/13/16/17/18/19/21 の 8 枚 → 極
//   合計：78 枚

export type CardRarity = Rarity

/**
 * カードの rarity フィールドをそのまま返す。
 * （tarot-data.ts のデータが source of truth）
 */
export function getCardRarity(card: TarotCard): CardRarity {
  return card.rarity
}

/** 一文字の漢字でレア度を表す。「常・稀・貴・極」 */
export function getRarityLabel(rarity: CardRarity): string {
  switch (rarity) {
    case 'common': return '常'
    case 'rare': return '稀'
    case 'epic': return '貴'
    case 'legendary': return '極'
  }
}

/**
 * レア度別のキーカラー（light テーマの基準値）。
 * 墨 / 藍 / 朱 / 金 の 4 色体系。実際の描画は globals.css の CSS 変数
 * --rarity-{rarity}-color 経由で light/dark 両対応する。
 */
export const rarityColors = {
  common:    { symbol: '#1a1a1a', name: '#1a1a1a', border: '#1a1a1a' }, // 墨
  rare:      { symbol: '#1e3a8a', name: '#1e3a8a', border: '#1e3a8a' }, // 藍
  epic:      { symbol: '#b91c1c', name: '#b91c1c', border: '#b91c1c' }, // 朱
  legendary: { symbol: '#d4a017', name: '#d4a017', border: '#d4a017' }, // 金
} as const

/**
 * レア度を「漢字 + ふりがな + 色」で表す。カード下に大きく表示する用途。
 * legendary 「極」のみ金色グローを追加（CSS 側で `.rarity-legendary .chosen-rarity-kanji-char`）。
 */
export const rarityKanji: Record<CardRarity, { kanji: string; reading: string; color: string }> = {
  common:    { kanji: '常', reading: 'じょう', color: '#1a1a1a' },
  rare:      { kanji: '稀', reading: 'き',     color: '#1e3a8a' },
  epic:      { kanji: '貴', reading: 'き',     color: '#b91c1c' },
  legendary: { kanji: '極', reading: 'ごく',   color: '#d4a017' },
}

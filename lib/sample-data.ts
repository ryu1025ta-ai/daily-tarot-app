// =============================================================================
// SAMPLE DATA - TODO: 実装側で動的データに差し替え
// このファイル内のすべてのデータはダミーです。
// 後で削除しやすいように1ヶ所にまとめています。
// =============================================================================

// タロットカードのサンプルデータ
export const SAMPLE_TAROT_CARDS = [
  {
    id: 0,
    name: '愚者',
    nameEn: 'The Fool',
    message: '新しい旅立ちの時。恐れずに一歩を踏み出しましょう。',
  },
  {
    id: 1,
    name: '魔術師',
    nameEn: 'The Magician',
    message: 'あなたの中に眠る力を信じて。すべては手の中にあります。',
  },
  {
    id: 2,
    name: '女教皇',
    nameEn: 'The High Priestess',
    message: '静かに内なる声に耳を傾けて。答えはすでにあなたの中に。',
  },
  {
    id: 3,
    name: '女帝',
    nameEn: 'The Empress',
    message: '豊かさと創造性に満ちた日。愛を惜しみなく注いで。',
  },
  {
    id: 4,
    name: '皇帝',
    nameEn: 'The Emperor',
    message: '揺るぎない意志で進む時。秩序と安定をもたらしましょう。',
  },
  {
    id: 5,
    name: '教皇',
    nameEn: 'The Hierophant',
    message: '伝統の中に智慧があります。導きを受け入れる心を。',
  },
  {
    id: 6,
    name: '恋人',
    nameEn: 'The Lovers',
    message: '心と心が響き合う時。大切な選択を前に、直感を信じて。',
  },
  {
    id: 7,
    name: '戦車',
    nameEn: 'The Chariot',
    message: '困難を乗り越える力があなたに。意志の力で前進を。',
  },
  {
    id: 8,
    name: '力',
    nameEn: 'Strength',
    message: '真の強さは優しさの中に。静かな勇気で向き合いましょう。',
  },
  {
    id: 9,
    name: '隠者',
    nameEn: 'The Hermit',
    message: '内省の時。孤独の中で見つかる光があります。',
  },
  {
    id: 10,
    name: '運命の輪',
    nameEn: 'Wheel of Fortune',
    message: '巡りゆく運命の中で。変化を受け入れ、流れに身を任せて。',
  },
  {
    id: 11,
    name: '正義',
    nameEn: 'Justice',
    message: '公正な判断が求められる時。真実と誠実さを大切に。',
  },
  {
    id: 12,
    name: '吊るされた男',
    nameEn: 'The Hanged Man',
    message: '視点を変える時。手放すことで得られるものがあります。',
  },
  {
    id: 13,
    name: '死神',
    nameEn: 'Death',
    message: '終わりは始まり。古いものを手放し、新しい自分へ。',
  },
  {
    id: 14,
    name: '節制',
    nameEn: 'Temperance',
    message: '調和とバランスの日。穏やかに、中庸を保ちましょう。',
  },
  {
    id: 15,
    name: '悪魔',
    nameEn: 'The Devil',
    message: '束縛に気づく時。自由への鍵は、あなた自身の手の中に。',
  },
  {
    id: 16,
    name: '塔',
    nameEn: 'The Tower',
    message: '崩壊の先に再生があります。恐れずに解放を受け入れて。',
  },
  {
    id: 17,
    name: '星',
    nameEn: 'The Star',
    message: '希望の光が射す日。夢を信じ、静かに願いを込めて。',
  },
  {
    id: 18,
    name: '月',
    nameEn: 'The Moon',
    message: '不安や迷いの中にも道はあります。直感を信じて進んで。',
  },
  {
    id: 19,
    name: '太陽',
    nameEn: 'The Sun',
    message: '喜びと活力に満ちた日。輝く自分を表現しましょう。',
  },
  {
    id: 20,
    name: '審判',
    nameEn: 'Judgement',
    message: '目覚めの時。過去を受け入れ、新たな使命へ。',
  },
  {
    id: 21,
    name: '世界',
    nameEn: 'The World',
    message: '完成と達成の日。一つの旅が終わり、新たな旅が始まります。',
  },
] as const

export type TarotCard = (typeof SAMPLE_TAROT_CARDS)[number]

// サンプルの引いたカード履歴
// TODO: 実装側でlocalStorageまたはDBから取得するように変更
export const SAMPLE_DRAWN_HISTORY: Record<string, number> = {
  // 形式: 'YYYY-MM-DD': cardId
  '2026-05-10': 17,
  '2026-05-11': 3,
  '2026-05-12': 8,
  '2026-05-14': 19,
  '2026-05-15': 2,
  '2026-05-16': 21,
  '2026-05-17': 6,
  '2026-05-18': 14,
  '2026-05-19': 0,
  '2026-05-20': 10,
  '2026-05-21': 5,
  '2026-05-22': 12,
  '2026-05-23': 18,
  '2026-05-24': 7,
  '2026-05-25': 1,
}

// 二十四節気のサンプルデータ
export const SAMPLE_SEKKI: Record<string, { name: string; kou: string }> = {
  // 簡略化したサンプル - 実際は日付計算が必要
  '05': { name: '小満', kou: '紅花栄' },
  '06': { name: '芒種', kou: '蟷螂生' },
}

// 連続日数のサンプル
export const SAMPLE_DUMMY_STREAK = 16

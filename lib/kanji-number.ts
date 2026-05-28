// 大字（だいじ・金額表記用の正式な漢数字）変換。札型バッジで使用。
// 仕様確定版（2026-05-27、最終）：
//   0=零 / 1=壱 / 2=弐 / 3=参 / 4=肆 / 5=伍 / 6=陸 / 7=漆 / 8=捌 / 9=玖
//   10=拾 / 11=拾壱 ... 19=拾玖 / 20=弐拾 / 21=弐拾壱 ... 99=玖拾玖
//   100=百 / 101=百壱 / 110=百拾 / ...
//
// 注意：旧字体（壹・貳）ではなく、新大字（壱・弐）を使う。
//       「7」は柒ではなく「漆」、「100」は佰ではなく「百」。

const DAIJI: readonly string[] = ['零', '壱', '弐', '参', '肆', '伍', '陸', '漆', '捌', '玖']
const TEN = '拾'
const HUNDRED = '百'

export function toKanjiNumber(n: number): string {
  if (!Number.isFinite(n) || n < 0) return String(n)
  if (n === 0) return DAIJI[0]
  if (n < 10) return DAIJI[n]
  if (n < 20) return n === 10 ? TEN : TEN + DAIJI[n - 10]
  if (n < 100) {
    const tens = Math.floor(n / 10)
    const ones = n % 10
    return DAIJI[tens] + TEN + (ones > 0 ? DAIJI[ones] : '')
  }
  if (n < 1000) {
    const hundreds = Math.floor(n / 100)
    const rest = n % 100
    return DAIJI[hundreds] + HUNDRED + (rest > 0 ? toKanjiNumber(rest) : '')
  }
  // 1000+ は実用範囲外、フォールバック
  return String(n)
}

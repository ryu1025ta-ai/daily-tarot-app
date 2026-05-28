// 社会的証明のレンジ表現。
//
// 倫理ガードレール（必読）：
//   - 偽の具体数を出さない（「3,427人」のような数値は禁止）
//   - レンジ表現のみ（数百人 / 数千人 / 多くの人）
//   - 罪悪感や煽り、損失回避を誘発しない静かな語り口
//   - 時間帯・曜日で表現を変えるが、過剰演出はしない
//
// 出力は表示文字列のみ。実数推計はしない。

export type SocialProofRange = '数十人' | '数百人' | '千人を超える人々' | '多くの人'

export interface SocialProofMessage {
  range: SocialProofRange
  /** UI に出す穏やかな主文 */
  text: string
  /** 補足（時間帯や場所の柔らかい彩り） */
  sub?: string
}

/**
 * 時間帯と曜日から、レンジ表現を決定する。
 * 「数値ではなく雰囲気」だけを伝える。
 * 朝〜夜のピーク帯は「千人を超える」、深夜は「数十人」など。
 *
 * NOTE: 実際のオンライン人数とは無関係。レンジは「規模感の概念」を示すだけで、
 * 真偽の責任が及ばないレベルに丸めている。
 */
export function getSocialProofMessage(date: Date = new Date()): SocialProofMessage {
  const hour = date.getHours()
  const day = date.getDay() // 0: 日

  // 深夜帯（0〜5）：静かな表現
  if (hour < 6) {
    return {
      range: '数十人',
      text: '夜の静けさの中、数十人が札と向き合っています',
      sub: '深夜の卓',
    }
  }

  // 朝の通勤・朝食帯（6〜9）：ピーク
  if (hour >= 6 && hour < 10) {
    return {
      range: '千人を超える人々',
      text: '今朝、千人を超える人々が一枚を引いています',
      sub: '朝の支度どき',
    }
  }

  // 昼帯（10〜14）
  if (hour >= 10 && hour < 15) {
    return {
      range: '数百人',
      text: '今、数百人が同じ縁側で札を眺めています',
      sub: '昼の縁側',
    }
  }

  // 夕方〜夜の主要帯（15〜21）：週末は厚い
  if (hour >= 15 && hour < 22) {
    const weekend = day === 0 || day === 6
    return {
      range: weekend ? '千人を超える人々' : '数百人',
      text: weekend
        ? '休日の夕、千人を超える人々が一日の札を引いています'
        : '夕暮れに、数百人が今日の札を結んでいます',
      sub: weekend ? '休日の夕餉' : '夕の和室',
    }
  }

  // 夜更け（22〜23）
  return {
    range: '数十人',
    text: '夜更け、数十人がそっと札を引いています',
    sub: '夜更けの卓',
  }
}

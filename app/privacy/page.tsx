import { BackButton } from '@/components/back-button'

export const metadata = {
  title: 'プライバシーポリシー｜和の暦',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col shoji-light washi-texture">
      {/* Top spacing for safe area */}
      <div className="h-12" />

      {/* Back link：router.back() で来た画面に戻る（タブ状態は sessionStorage 経由で復元） */}
      <div className="px-6 pt-4">
        <BackButton />
      </div>

      {/* Title */}
      <div className="px-6 pt-8 pb-6">
        <h1 className="font-serif text-xl tracking-[0.25em] text-foreground text-center">
          プライバシーポリシー
        </h1>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="w-1 h-1 rounded-full bg-gold/40" />
          <div className="w-8 h-px gold-line" />
          <div className="w-1 h-1 rounded-full bg-gold/40" />
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-6 max-w-md mx-auto w-full">
        <div className="space-y-5 sumi-text text-foreground/80 text-sm">
          <p>
            和の暦タロット（以下「本アプリ」）は、ユーザーのプライバシーを尊重します。
          </p>
          <p>
            本アプリはユーザーのカード履歴を端末内 LocalStorage にのみ保存し、外部サーバーには一切送信しません。
          </p>
          <p>
            本アプリは個人を識別する情報を収集しません。
          </p>
        </div>

        <p className="mt-12 pb-12 text-xs text-muted-foreground/60 tracking-[0.2em] text-center">
          最終更新日：2026年5月26日
        </p>
      </div>
    </div>
  )
}

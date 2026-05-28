'use client'

import { useRouter } from 'next/navigation'

// /privacy /terms 等の独立ページから「戻る」操作で / に戻すための小型 client component。
// router.back() を使うことで、設定タブから来た場合 / 直接アクセス時の両方で
// ブラウザ履歴に沿った自然な戻り動作になる。
// （/ 側の AppContent が sessionStorage から activeTab を復元する）
export function BackButton({ label = '戻る' }: { label?: string }) {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label={label}
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer touch-manipulation"
    >
      <svg
        className="pointer-events-none"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
      <span className="pointer-events-none tracking-[0.15em]">{label}</span>
    </button>
  )
}

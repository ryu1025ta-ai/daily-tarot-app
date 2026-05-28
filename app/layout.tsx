import type { Metadata, Viewport } from 'next'
import { Noto_Sans_JP, Noto_Serif_JP, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-noto-sans',
  display: 'swap',
})

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-noto-serif',
  display: 'swap',
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-cormorant',
  display: 'swap',
})

// 案 B 採用：神社でおみくじ体験 + 24節気 + 和タロットを 43 字に統合。
// SNS シェア（X）でも全文表示される長さ、SEO 上の体感も明確。
const APP_DESCRIPTION =
  '神社でおみくじを引くような静謐な体験。24節気の暦に寄り添い、一日一枚の和タロットを綴る。'

// metadataBase: 絶対 URL 生成（og:image 等）の基準。
const SITE_URL = 'https://daily-tarot-app-gamma.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: '和の暦タロット — Wa-no-Koyomi Tarot',
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  // favicon と各種ホーム画面アイコン。実在する public/ のファイルのみを参照する。
  // 過去：manifest.json が /icon-192.png / /icon-512.png を参照していたが実ファイルが無く 404 だった。
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/icon.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '和の暦タロット',
  },
  // Open Graph（Facebook / LinkedIn / LINE 等のリッチプレビュー）
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: SITE_URL,
    siteName: '和の暦タロット',
    title: '和の暦タロット — Wa-no-Koyomi Tarot',
    description: APP_DESCRIPTION,
    images: [
      {
        // ⚠ 画像は Canva で別途作成し /public/og-image.png に配置する。
        // 未配置のうちはサムネがブランクになるが、メタデータ自体は健全。
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '和の暦タロット — 24節気と共に、一日一枚',
      },
    ],
  },
  // Twitter Card（X のリッチプレビュー、summary_large_image で大きく表示）
  twitter: {
    card: 'summary_large_image',
    title: '和の暦タロット — Wa-no-Koyomi Tarot',
    description: APP_DESCRIPTION,
    images: ['/og-image.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#F5F0E8',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="ja" 
      className={`${notoSansJP.variable} ${notoSerifJP.variable} ${cormorantGaramond.variable} bg-background`}
    >
      <body className="font-sans antialiased min-h-screen">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

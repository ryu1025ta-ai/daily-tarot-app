/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // 開発時の左下インジケータ（Next.js ロゴ＋N）を非表示
  devIndicators: false,
}

export default nextConfig

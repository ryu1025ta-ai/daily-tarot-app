#!/usr/bin/env bash
# Build OGP image (1200x630 PNG) from scripts/og-image.html using headless Chrome.
# 太陽カード(major-19)の実SVGをそのまま使った OGP 画像を生成。

set -euo pipefail

# プロジェクトルート（このスクリプトが scripts/ にある前提）
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

HTML_PATH="${SCRIPT_DIR}/og-image.html"
OUTPUT_PATH="${ROOT_DIR}/public/og-image.png"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

if [ ! -x "${CHROME}" ]; then
  echo "ERROR: Google Chrome not found at ${CHROME}" >&2
  exit 1
fi

if [ ! -f "${HTML_PATH}" ]; then
  echo "ERROR: HTML source not found: ${HTML_PATH}" >&2
  exit 1
fi

mkdir -p "$(dirname "${OUTPUT_PATH}")"

echo "Generating OGP image..."
echo "  Source: ${HTML_PATH}"
echo "  Output: ${OUTPUT_PATH}"

"${CHROME}" \
  --headless=new \
  --disable-gpu \
  --no-sandbox \
  --hide-scrollbars \
  --force-device-scale-factor=1 \
  --window-size=1200,630 \
  --virtual-time-budget=10000 \
  --run-all-compositor-stages-before-draw \
  --default-background-color=00000000 \
  --screenshot="${OUTPUT_PATH}" \
  "file://${HTML_PATH}" \
  >/dev/null 2>&1

if [ ! -f "${OUTPUT_PATH}" ]; then
  echo "ERROR: Screenshot did not produce ${OUTPUT_PATH}" >&2
  exit 1
fi

echo ""
echo "Done. Verifying output:"
file "${OUTPUT_PATH}"
ls -lh "${OUTPUT_PATH}" | awk '{print "  Size: "$5}'

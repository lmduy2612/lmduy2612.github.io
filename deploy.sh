#!/usr/bin/env bash
# ==============================================================================
# 🚀 Personal Portfolio Landing Page Deploy & Serve Script
# Managed by `agent-profile` in `04-Profile-Branding`
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_REPO="lmduy2612/lmduy2612.github.io"
PORT="${PORT:-3000}"

ACTION="${1:-serve}"

case "$ACTION" in
  "preview"|"check")
    echo "======================================================================"
    echo "🔍 KIỂM TRA TÍNH TOÀN VẸN CỦA PERSONAL PORTFOLIO LANDING PAGE"
    echo "======================================================================"
    echo "📂 Thư mục mã nguồn: $SCRIPT_DIR"
    echo "   • index.html : $([ -f "$SCRIPT_DIR/index.html" ] && wc -c < "$SCRIPT_DIR/index.html" || echo 0) bytes"
    echo "   • styles.css : $([ -f "$SCRIPT_DIR/styles.css" ] && wc -c < "$SCRIPT_DIR/styles.css" || echo 0) bytes"
    echo "   • app.js     : $([ -f "$SCRIPT_DIR/app.js" ] && wc -c < "$SCRIPT_DIR/app.js" || echo 0) bytes"
    echo "----------------------------------------------------------------------"
    echo "💡 Để chạy máy chủ trải nghiệm trực tiếp trên trình duyệt, hãy chạy:"
    echo "   ./scripts/trigger.sh landing serve"
    ;;

  "serve"|"start")
    echo "======================================================================"
    echo "⚡ Khởi chạy máy chủ thử nghiệm cục bộ cho Personal Portfolio Landing"
    echo "======================================================================"
    echo "📂 Thư mục: $SCRIPT_DIR"
    echo "🌐 Truy cập trực tiếp tại: http://localhost:$PORT"
    echo "💡 Nhấn Ctrl+C để dừng máy chủ."
    echo "----------------------------------------------------------------------"
    exec python3 -m http.server "$PORT" --directory "$SCRIPT_DIR"
    ;;

  "deploy"|"publish")
    echo "======================================================================"
    echo "🚀 Chuẩn bị xuất bản Personal Portfolio Landing Page lên GitHub Pages"
    echo "======================================================================"
    echo "🎯 Đích đến: https://lmduy2612.github.io ($TARGET_REPO)"
    echo ""
    
    # Kiểm tra repository lmduy2612/lmduy2612.github.io đã có trên GitHub chưa
    if ! gh repo view "$TARGET_REPO" >/dev/null 2>&1; then
      echo "📦 Repository $TARGET_REPO chưa tồn tại."
      echo "   Để tạo mới repo và xuất bản, hãy chạy lệnh:"
      echo "   gh repo create $TARGET_REPO --public --description 'Personal Portfolio Landing Page for Duy Luong (lmduy2612)'"
    fi

    TARGET_LOCAL="/home/duylm/Documents/tools/lmduy2612.github.io"
    if [ -d "$TARGET_LOCAL/.git" ]; then
      echo "🔄 Đồng bộ tệp sang kho lưu trữ cục bộ: $TARGET_LOCAL"
      cp -r "$SCRIPT_DIR"/* "$TARGET_LOCAL"/
      touch "$TARGET_LOCAL/.nojekyll"
      git -C "$TARGET_LOCAL" add .
      if git -C "$TARGET_LOCAL" diff --cached --quiet; then
        echo "✅ Không có thay đổi nào mới cần đẩy."
      else
        git -C "$TARGET_LOCAL" commit -m "feat(portfolio): sync and update portfolio landing page"
        git -C "$TARGET_LOCAL" push origin main
        echo "🎉 Đã xuất bản thành công lên GitHub Pages!"
      fi
    else
      TMP_DIR="/tmp/deploy_portfolio_$(date +%s)"
      mkdir -p "$TMP_DIR"
      cp -r "$SCRIPT_DIR"/* "$TMP_DIR"/
      touch "$TMP_DIR/.nojekyll"
      git -C "$TMP_DIR" init -b main
      git -C "$TMP_DIR" add .
      git -C "$TMP_DIR" commit -m "feat: deploy personal portfolio landing page"
      git -C "$TMP_DIR" remote add origin "git@github.com:$TARGET_REPO.git"
      git -C "$TMP_DIR" push -u origin main --force
      rm -rf "$TMP_DIR"
      echo "🎉 Đã xuất bản thành công lên GitHub Pages!"
    fi
    echo ""
    echo "Hoặc xem trước trực tiếp trên máy bằng: ./scripts/trigger.sh landing serve"
    ;;

  *)
    echo "❌ Lệnh không hỗ trợ: $ACTION"
    echo "Cú pháp: ./deploy.sh [serve | preview | deploy]"
    exit 1
    ;;
esac

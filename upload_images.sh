#!/bin/bash

# 图床仓库配置
REPO_URL="https://github.com/SallyKAN/images.git"
REPO_DIR="/tmp/images-repo"
IMG_DIR="blog-img"

echo "=== 博客图片上传到 GitHub 图床 ==="

# 1. 克隆图床仓库
echo "📦 克隆图床仓库..."
rm -rf $REPO_DIR
git clone $REPO_URL $REPO_DIR

# 2. 创建博客图片目录
mkdir -p $REPO_DIR/$IMG_DIR

# 3. 复制图片
echo "📷 复制图片..."
cp -r /home/snape/blog/SallyKAN.github.io/public/img/* $REPO_DIR/$IMG_DIR/

# 4. 提交并推送
echo "🚀 提交并推送..."
cd $REPO_DIR
git add .
git commit -m "Add blog images"
git push

echo "✅ 图片上传完成！"
echo ""
echo "图片 CDN 地址格式："
echo "https://cdn.jsdelivr.net/gh/SallyKAN/images@main/$IMG_DIR/图片名.png"
echo ""
echo "接下来运行以下命令更新博客中的图片链接："
echo "cd /home/snape/blog/SallyKAN.github.io"
echo "sed -i 's|/img/|https://cdn.jsdelivr.net/gh/SallyKAN/images@main/blog-img/|g' src/content/blog/*.md"


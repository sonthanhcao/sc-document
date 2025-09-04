#!/bin/bash

# Simple MkDocs deployment script for document.devopsgalaxy.com
set -e

echo "🚀 Deploying documentation to document.devopsgalaxy.com..."

# Build the site
echo "📦 Building site..."
mkdocs build --clean

# Deploy to S3
echo "📤 Uploading to S3..."
aws s3 sync site/ s3://document.devopsgalaxy.com --delete

# Invalidate CloudFront cache
echo "🔄 Invalidating CloudFront cache..."
if aws cloudfront create-invalidation --distribution-id E2SZHLI1ZN2MJB --paths "/*" 2>/dev/null; then
    echo "✅ CloudFront cache invalidated successfully"
else
    echo "⚠️  CloudFront invalidation failed (access denied or distribution not found)"
    echo "   The site will update automatically within 24 hours, or you can manually invalidate"
fi

echo "✅ Deployment complete! Visit https://document.devopsgalaxy.com" 
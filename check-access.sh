#!/bin/bash

# Troubleshooting script for document.devopsgalaxy.com access issues

echo "🔍 Checking S3 bucket and CloudFront configuration..."

# Check S3 bucket website configuration
echo ""
echo "📋 S3 Bucket Website Configuration:"
if aws s3api get-bucket-website --bucket document.devopsgalaxy.com 2>/dev/null; then
    echo "✅ S3 bucket is configured for website hosting"
else
    echo "❌ S3 bucket is NOT configured for website hosting"
    echo "   Run: aws s3 website s3://document.devopsgalaxy.com --index-document index.html --error-document 404.html"
fi

# Check S3 bucket policy
echo ""
echo "📋 S3 Bucket Policy:"
if aws s3api get-bucket-policy --bucket document.devopsgalaxy.com 2>/dev/null; then
    echo "✅ S3 bucket has a policy configured"
    aws s3api get-bucket-policy --bucket document.devopsgalaxy.com --query 'Policy' --output text | jq .
else
    echo "❌ S3 bucket has NO policy configured"
    echo "   You may need to add a bucket policy for public read access"
fi

# Check CloudFront distribution
echo ""
echo "📋 CloudFront Distribution Status:"
if aws cloudfront get-distribution --id E2SZHLI1ZN2MJB --query 'Distribution.Status' --output text 2>/dev/null; then
    echo "✅ CloudFront distribution exists"
    echo "   Status: $(aws cloudfront get-distribution --id E2SZHLI1ZN2MJB --query 'Distribution.Status' --output text)"
    echo "   Domain: $(aws cloudfront get-distribution --id E2SZHLI1ZN2MJB --query 'Distribution.DomainName' --output text)"
else
    echo "❌ CloudFront distribution not found or access denied"
fi

# Check if files exist in S3
echo ""
echo "📋 S3 Bucket Contents:"
if aws s3 ls s3://document.devopsgalaxy.com/ --recursive --human-readable --summarize 2>/dev/null; then
    echo "✅ Files found in S3 bucket"
else
    echo "❌ No files found in S3 bucket or access denied"
fi

echo ""
echo "💡 Common solutions:"
echo "   1. If S3 bucket is not configured for website hosting, run:"
echo "      aws s3 website s3://document.devopsgalaxy.com --index-document index.html --error-document 404.html"
echo ""
echo "   2. If bucket policy is missing, add a policy for public read access"
echo ""
echo "   3. If CloudFront is not configured, check the origin settings point to the S3 bucket"
echo ""
echo "   4. Try accessing the S3 website directly:"
echo "      http://document.devopsgalaxy.com.s3-website-[region].amazonaws.com" 
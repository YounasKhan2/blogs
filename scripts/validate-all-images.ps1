# Comprehensive Image Validation Script
# Checks for any potential empty or invalid image sources

Write-Host "=== Validating All Image References ===" -ForegroundColor Green

# Check for any empty image fields in markdown frontmatter
Write-Host "`n1. Checking markdown files for empty image fields..." -ForegroundColor Yellow
$emptyImageInMd = Get-Content -Path "content\posts\*.md" | Select-String -Pattern "^image:\s*$" 
if ($emptyImageInMd) {
    Write-Host "Found empty image fields:" -ForegroundColor Red
    $emptyImageInMd
} else {
    Write-Host "✓ No empty image fields found in markdown" -ForegroundColor Green
}

# Check for any image fields with just quotes
Write-Host "`n2. Checking for image fields with empty quotes..." -ForegroundColor Yellow
$emptyQuotesInMd = Get-Content -Path "content\posts\*.md" | Select-String -Pattern 'image:\s*[""'']?\s*[""'']?\s*$'
if ($emptyQuotesInMd) {
    Write-Host "Found image fields with empty quotes:" -ForegroundColor Red
    $emptyQuotesInMd
} else {
    Write-Host "✓ No image fields with empty quotes found" -ForegroundColor Green
}

# Check for any src="" in TSX/JSX files
Write-Host "`n3. Checking for empty src attributes in React files..." -ForegroundColor Yellow
$emptySrcInTsx = Get-ChildItem -Path "." -Include "*.tsx", "*.ts", "*.js", "*.jsx" -Recurse | 
    Select-String -Pattern 'src\s*=\s*[""'']?\s*[""'']?' | 
    Where-Object { $_.Line -notmatch "placeholder|fallback|default" }
    
if ($emptySrcInTsx) {
    Write-Host "Found potential empty src attributes:" -ForegroundColor Red
    $emptySrcInTsx
} else {
    Write-Host "✓ No empty src attributes found" -ForegroundColor Green
}

# Check for any Image components not using OptimizedImage
Write-Host "`n4. Checking for direct Next.js Image usage..." -ForegroundColor Yellow
$directImageUsage = Get-ChildItem -Path "app", "components" -Include "*.tsx", "*.ts" -Recurse | 
    Select-String -Pattern "import.*Image.*from.*next/image" |
    Where-Object { $_.Filename -ne "OptimizedImage.tsx" }

if ($directImageUsage) {
    Write-Host "Found direct Next.js Image imports (review for fallback handling):" -ForegroundColor Yellow
    $directImageUsage | ForEach-Object { Write-Host "  $($_.Filename): $($_.LineNumber)" }
} else {
    Write-Host "✓ All Image usage goes through OptimizedImage component" -ForegroundColor Green
}

# Check OptimizedImage component for proper fallback handling
Write-Host "`n5. Checking OptimizedImage component..." -ForegroundColor Yellow
$optimizedImageContent = Get-Content -Path "components\OptimizedImage.tsx" -Raw
if ($optimizedImageContent -match "validSrc" -and 
    $optimizedImageContent -match "getFallbackSrc" -and 
    $optimizedImageContent -match "ImageUtils\.fallbackImages\.article") {
    Write-Host "✓ OptimizedImage has proper fallback handling" -ForegroundColor Green
} else {
    Write-Host "⚠ OptimizedImage may need fallback improvements" -ForegroundColor Yellow
}

# Check ImageUtils for valid fallback URLs
Write-Host "`n6. Checking ImageUtils fallback URLs..." -ForegroundColor Yellow
$imageUtilsContent = Get-Content -Path "lib\image-utils.ts" -Raw
if ($imageUtilsContent -match "https://images\.unsplash\.com" -and 
    $imageUtilsContent -match "fallbackImages") {
    Write-Host "✓ ImageUtils has valid fallback URLs" -ForegroundColor Green
} else {
    Write-Host "⚠ ImageUtils may need valid fallback URLs" -ForegroundColor Yellow
}

Write-Host "`n=== Validation Complete ===" -ForegroundColor Green
Write-Host "`nIf any issues were found above, they should be addressed to prevent empty src errors." -ForegroundColor Cyan

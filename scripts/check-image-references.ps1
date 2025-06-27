# PowerShell script to check image references in markdown posts
Write-Host "Checking image references in blog posts..." -ForegroundColor Green

# Get all markdown files in content/posts
$markdownFiles = Get-ChildItem -Path "d:\blogs\content\posts\*.md" -File

# Get all image files in public/images/posts
$imageFiles = Get-ChildItem -Path "d:\blogs\public\images\posts\*" -File | ForEach-Object { $_.Name }

Write-Host "`nAvailable images in public/images/posts/:" -ForegroundColor Yellow
$imageFiles | Sort-Object | ForEach-Object { Write-Host "  - $_" }

Write-Host "`n--- Checking References ---" -ForegroundColor Green

$missingImages = @()
$externalImages = @()
$foundImages = @()

foreach ($file in $markdownFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # Extract image reference from frontmatter
    if ($content -match 'image:\s*["`'']?([^"`''\r\n]+)["`'']?') {
        $imageRef = $matches[1].Trim()
        $fileName = $file.Name
        
        if ($imageRef.StartsWith("http")) {
            $externalImages += [PSCustomObject]@{
                File = $fileName
                ImageRef = $imageRef
                Status = "External URL"
            }
        } elseif ($imageRef.StartsWith("/images/posts/")) {
            $imageName = Split-Path $imageRef -Leaf
            if ($imageFiles -contains $imageName) {
                $foundImages += [PSCustomObject]@{
                    File = $fileName
                    ImageRef = $imageRef
                    Status = "Found"
                }
            } else {
                $missingImages += [PSCustomObject]@{
                    File = $fileName
                    ImageRef = $imageRef
                    Status = "Missing"
                }
            }
        }
    }
}

Write-Host "`n=== RESULTS ===" -ForegroundColor Cyan

Write-Host "`nMissing Images (local references not found):" -ForegroundColor Red
if ($missingImages.Count -eq 0) {
    Write-Host "  None! All local image references are valid." -ForegroundColor Green
} else {
    $missingImages | ForEach-Object {
        Write-Host "  - $($_.File): $($_.ImageRef)" -ForegroundColor Red
    }
}

Write-Host "`nExternal Images (using URLs):" -ForegroundColor Yellow
$externalImages | ForEach-Object {
    Write-Host "  - $($_.File): External URL" -ForegroundColor Yellow
}

Write-Host "`nValid Local Images:" -ForegroundColor Green
$foundImages | ForEach-Object {
    Write-Host "  - $($_.File): $($_.ImageRef)" -ForegroundColor Green
}

Write-Host "`nSummary:" -ForegroundColor Cyan
Write-Host "  Total posts checked: $($markdownFiles.Count)"
Write-Host "  Valid local images: $($foundImages.Count)" -ForegroundColor Green
Write-Host "  External images: $($externalImages.Count)" -ForegroundColor Yellow
Write-Host "  Missing images: $($missingImages.Count)" -ForegroundColor Red

if ($missingImages.Count -eq 0) {
    Write-Host "`n✅ All image references are valid!" -ForegroundColor Green
} else {
    Write-Host "`n❌ Some image references need attention." -ForegroundColor Red
}

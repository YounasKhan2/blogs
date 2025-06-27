# PowerShell script to download blog post images from Lorem Picsum
# Run this script from the blog root directory

Write-Host "=== TechBlog Pro Image Downloader (Lorem Picsum) ===" -ForegroundColor Green
Write-Host "This script will download placeholder images for your blog posts" -ForegroundColor Yellow

# Create images directory if it doesn't exist
$imagesDir = "public/images/posts"
if (!(Test-Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir -Force
    Write-Host "Created directory: $imagesDir" -ForegroundColor Green
}

# Define image download list with Lorem Picsum URLs (more reliable)
$images = @(
    @{ filename = "iphone-15-pro-max.jpg"; url = "https://picsum.photos/1200/800?random=1" },
    @{ filename = "google-pixel-8-pro-vs-iphone-15-pro.jpg"; url = "https://picsum.photos/1200/800?random=2" },
    @{ filename = "iphone-16-pro-max-vs-galaxy-s25-ultra.jpg"; url = "https://picsum.photos/1200/800?random=3" },
    @{ filename = "best-budget-smartphones-under-400-2025.jpg"; url = "https://picsum.photos/1200/800?random=4" },
    @{ filename = "oneplus-12-review.jpg"; url = "https://picsum.photos/1200/800?random=5" },
    @{ filename = "samsung-galaxy-s24-ultra-review.jpg"; url = "https://picsum.photos/1200/800?random=6" },
    @{ filename = "galaxy-s24-ultra.jpg"; url = "https://picsum.photos/1200/800?random=7" },
    @{ filename = "macbook-pro-m3-vs-dell-xps-15.jpg"; url = "https://picsum.photos/1200/800?random=8" },
    @{ filename = "macbook-pro-14-m4-2025-review.jpg"; url = "https://picsum.photos/1200/800?random=9" },
    @{ filename = "asus-rog-zephyrus-g16-review.jpg"; url = "https://picsum.photos/1200/800?random=10" },
    @{ filename = "framework-laptop-16-modular-review.jpg"; url = "https://picsum.photos/1200/800?random=11" },
    @{ filename = "lenovo-thinkpad-x1-carbon-gen-12.jpg"; url = "https://picsum.photos/1200/800?random=12" },
    @{ filename = "best-gaming-laptops-under-1500-2025.jpg"; url = "https://picsum.photos/1200/800?random=13" },
    @{ filename = "chatgpt-vs-claude.jpg"; url = "https://picsum.photos/1200/800?random=14" },
    @{ filename = "claude-sonnet-vs-gpt4o-coding.jpg"; url = "https://picsum.photos/1200/800?random=15" },
    @{ filename = "gemini-2-vs-chatgpt-5-comparison.jpg"; url = "https://picsum.photos/1200/800?random=16" },
    @{ filename = "microsoft-copilot-vs-google-bard.jpg"; url = "https://picsum.photos/1200/800?random=17" },
    @{ filename = "gpt-5-vs-claude-4-2025-comparison.jpg"; url = "https://picsum.photos/1200/800?random=18" },
    @{ filename = "best-ai-video-generators-2025.jpg"; url = "https://picsum.photos/1200/800?random=19" },
    @{ filename = "ai-image-generation-tools-comparison.jpg"; url = "https://picsum.photos/1200/800?random=20" },
    @{ filename = "adobe-photoshop-2025-review.jpg"; url = "https://picsum.photos/1200/800?random=21" },
    @{ filename = "notion-vs-obsidian-2025-comparison.jpg"; url = "https://picsum.photos/1200/800?random=22" },
    @{ filename = "davinci-resolve-vs-premiere-pro-2025.jpg"; url = "https://picsum.photos/1200/800?random=23" },
    @{ filename = "best-gaming-headsets-2025.jpg"; url = "https://picsum.photos/1200/800?random=24" },
    @{ filename = "best-wireless-mice-2025.jpg"; url = "https://picsum.photos/1200/800?random=25" },
    @{ filename = "best-wireless-earbuds-2025.jpg"; url = "https://picsum.photos/1200/800?random=26" },
    @{ filename = "best-smart-home-devices-2025.jpg"; url = "https://picsum.photos/1200/800?random=27" },
    @{ filename = "speed-up-computer-guide.jpg"; url = "https://picsum.photos/1200/800?random=28" },
    @{ filename = "how-to-build-gaming-pc-budget-2025.jpg"; url = "https://picsum.photos/1200/800?random=29" },
    @{ filename = "home-office-setup-guide-2025.jpg"; url = "https://picsum.photos/1200/800?random=30" },
    @{ filename = "digital-security-guide-2025.jpg"; url = "https://picsum.photos/1200/800?random=31" }
)

Write-Host "`nStarting image download..." -ForegroundColor Yellow
Write-Host "Total images to download: $($images.Count)" -ForegroundColor Cyan

$downloaded = 0
$failed = 0

foreach ($image in $images) {
    $filepath = Join-Path $imagesDir $image.filename
    
    try {
        Write-Host "Downloading: $($image.filename)..." -ForegroundColor White -NoNewline
        
        # Download the image
        Invoke-WebRequest -Uri $image.url -OutFile $filepath -UseBasicParsing
        
        # Check if file was created and has content
        if ((Test-Path $filepath) -and (Get-Item $filepath).Length -gt 0) {
            Write-Host " Success" -ForegroundColor Green
            $downloaded++
        } else {
            Write-Host " Failed (empty file)" -ForegroundColor Red
            $failed++
        }
    }
    catch {
        Write-Host " Failed ($($_.Exception.Message))" -ForegroundColor Red
        $failed++
    }
    
    # Small delay to be respectful to the API
    Start-Sleep -Milliseconds 300
}

Write-Host "`n=== Download Summary ===" -ForegroundColor Green
Write-Host "Successfully downloaded: $downloaded images" -ForegroundColor Green
Write-Host "Failed downloads: $failed images" -ForegroundColor Red

if ($failed -gt 0) {
    Write-Host "`nFor failed downloads, you can:" -ForegroundColor Yellow
    Write-Host "1. Visit https://unsplash.com and search manually" -ForegroundColor White
    Write-Host "2. Use alternative sites like Pexels.com or Pixabay.com" -ForegroundColor White
    Write-Host "3. Generate AI images using DALL-E or Midjourney" -ForegroundColor White
}

Write-Host "`nImages saved to: $imagesDir" -ForegroundColor Cyan
Write-Host "You can now refresh your blog to see the images!" -ForegroundColor Green
Write-Host "`nNote: These are placeholder images. You should replace them with relevant tech images." -ForegroundColor Yellow

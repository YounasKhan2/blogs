# PowerShell script to download blog post images
# Run this script from the blog root directory

Write-Host "=== TechBlog Pro Image Downloader ===" -ForegroundColor Green
Write-Host "This script will download images for your blog posts from Unsplash" -ForegroundColor Yellow

# Create images directory if it doesn't exist
$imagesDir = "public/images/posts"
if (!(Test-Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir -Force
    Write-Host "Created directory: $imagesDir" -ForegroundColor Green
}

# Define image download list with Unsplash source URLs
$images = @(
    @{ filename = "iphone-15-pro-max.jpg"; url = "https://source.unsplash.com/1200x800/?iphone,smartphone,apple,mobile" },
    @{ filename = "google-pixel-8-pro-vs-iphone-15-pro.jpg"; url = "https://source.unsplash.com/1200x800/?smartphone,mobile,comparison,phones" },
    @{ filename = "iphone-16-pro-max-vs-galaxy-s25-ultra.jpg"; url = "https://source.unsplash.com/1200x800/?smartphones,mobile,technology,comparison" },
    @{ filename = "best-budget-smartphones-under-400-2025.jpg"; url = "https://source.unsplash.com/1200x800/?smartphone,mobile,budget,phones" },
    @{ filename = "oneplus-12-review.jpg"; url = "https://source.unsplash.com/1200x800/?smartphone,android,mobile" },
    @{ filename = "samsung-galaxy-s24-ultra-review.jpg"; url = "https://source.unsplash.com/1200x800/?samsung,smartphone,galaxy,android" },
    @{ filename = "galaxy-s24-ultra.jpg"; url = "https://source.unsplash.com/1200x800/?samsung,smartphone,galaxy" },
    
    @{ filename = "macbook-pro-m3-vs-dell-xps-15.jpg"; url = "https://source.unsplash.com/1200x800/?laptop,macbook,computer,technology" },
    @{ filename = "macbook-pro-14-m4-2025-review.jpg"; url = "https://source.unsplash.com/1200x800/?macbook,apple,laptop,computer" },
    @{ filename = "asus-rog-zephyrus-g16-review.jpg"; url = "https://source.unsplash.com/1200x800/?gaming,laptop,computer" },
    @{ filename = "framework-laptop-16-modular-review.jpg"; url = "https://source.unsplash.com/1200x800/?laptop,modular,computer,technology" },
    @{ filename = "lenovo-thinkpad-x1-carbon-gen-12.jpg"; url = "https://source.unsplash.com/1200x800/?laptop,business,computer" },
    @{ filename = "best-gaming-laptops-under-1500-2025.jpg"; url = "https://source.unsplash.com/1200x800/?gaming,laptop,computer,rgb" },
    
    @{ filename = "chatgpt-vs-claude.jpg"; url = "https://source.unsplash.com/1200x800/?artificial-intelligence,ai,robot,technology" },
    @{ filename = "claude-sonnet-vs-gpt4o-coding.jpg"; url = "https://source.unsplash.com/1200x800/?coding,programming,ai,computer,screen" },
    @{ filename = "gemini-2-vs-chatgpt-5-comparison.jpg"; url = "https://source.unsplash.com/1200x800/?ai,artificial-intelligence,technology" },
    @{ filename = "microsoft-copilot-vs-google-bard.jpg"; url = "https://source.unsplash.com/1200x800/?ai,productivity,office,computer,technology" },
    @{ filename = "gpt-5-vs-claude-4-2025-comparison.jpg"; url = "https://source.unsplash.com/1200x800/?ai,language,technology,robot" },
    @{ filename = "best-ai-video-generators-2025.jpg"; url = "https://source.unsplash.com/1200x800/?video,ai,creation,content,digital" },
    @{ filename = "ai-image-generation-tools-comparison.jpg"; url = "https://source.unsplash.com/1200x800/?ai,image,art,digital" },
    
    @{ filename = "adobe-photoshop-2025-review.jpg"; url = "https://source.unsplash.com/1200x800/?photoshop,editing,design,creative,computer" },
    @{ filename = "notion-vs-obsidian-2025-comparison.jpg"; url = "https://source.unsplash.com/1200x800/?notes,productivity,app,writing,computer" },
    @{ filename = "davinci-resolve-vs-premiere-pro-2025.jpg"; url = "https://source.unsplash.com/1200x800/?video,editing,creative,computer" },
    
    @{ filename = "best-gaming-headsets-2025.jpg"; url = "https://source.unsplash.com/1200x800/?headset,gaming,audio,microphone" },
    @{ filename = "best-wireless-mice-2025.jpg"; url = "https://source.unsplash.com/1200x800/?mouse,wireless,computer,peripheral" },
    @{ filename = "best-wireless-earbuds-2025.jpg"; url = "https://source.unsplash.com/1200x800/?earbuds,wireless,audio,bluetooth" },
    @{ filename = "best-smart-home-devices-2025.jpg"; url = "https://source.unsplash.com/1200x800/?smart,home,iot,automation,technology" },
    
    @{ filename = "speed-up-computer-guide.jpg"; url = "https://source.unsplash.com/1200x800/?computer,performance,speed,optimization" },
    @{ filename = "how-to-build-gaming-pc-budget-2025.jpg"; url = "https://source.unsplash.com/1200x800/?pc,building,computer,components,gaming" },
    @{ filename = "home-office-setup-guide-2025.jpg"; url = "https://source.unsplash.com/1200x800/?home,office,desk,setup,workspace" },
    @{ filename = "digital-security-guide-2025.jpg"; url = "https://source.unsplash.com/1200x800/?security,cybersecurity,lock,protection,digital" }
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
            Write-Host " ✓ Success" -ForegroundColor Green
            $downloaded++
        } else {
            Write-Host " ✗ Failed (empty file)" -ForegroundColor Red
            $failed++
        }
    }
    catch {
        Write-Host " ✗ Failed ($($_.Exception.Message))" -ForegroundColor Red
        $failed++
    }
    
    # Small delay to be respectful to the API
    Start-Sleep -Milliseconds 500
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

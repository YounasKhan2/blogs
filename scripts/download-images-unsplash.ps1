# PowerShell script to download tech images for blog posts
# Run this script from your blog root directory

# Create images directory if it doesn't exist
if (!(Test-Path "public/images/posts")) {
    New-Item -ItemType Directory -Force -Path "public/images/posts"
    Write-Host "Created public/images/posts directory" -ForegroundColor Green
}

# Image URLs for different categories
$images = @{
    # Wireless Earbuds
    "best-wireless-earbuds-2025.jpg" = "https://images.unsplash.com/photo-1606400082777-ef05f3b5cde9?w=1200&h=630&fit=crop&q=80&auto=format"
    
    # Smart Home Devices
    "best-smart-home-devices-2025.jpg" = "https://images.unsplash.com/photo-1558618047-f0a936238c43?w=1200&h=630&fit=crop&q=80&auto=format"
    
    # Gaming PC Build
    "how-to-build-gaming-pc-budget-2025.jpg" = "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1200&h=630&fit=crop&q=80&auto=format"
    
    # Cybersecurity
    "digital-security-guide-2025.jpg" = "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=630&fit=crop&q=80&auto=format"
    
    # Gaming Headsets
    "best-gaming-headsets-2025.jpg" = "https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?w=1200&h=630&fit=crop&q=80&auto=format"
    
    # Wireless Mice
    "best-wireless-mice-2025.jpg" = "https://images.unsplash.com/photo-1527814050087-3793815479db?w=1200&h=630&fit=crop&q=80&auto=format"
    
    # Mobile Phones
    "iphone-16-pro-max-vs-samsung-galaxy-s25-ultra-2025.jpg" = "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&h=630&fit=crop&q=80&auto=format"
    "best-budget-smartphones-under-400-2025.jpg" = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&h=630&fit=crop&q=80&auto=format"
    
    # Laptops
    "macbook-pro-m3-vs-dell-xps-15.jpg" = "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&h=630&fit=crop&q=80&auto=format"
    "best-gaming-laptops-under-1500-2025.jpg" = "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1200&h=630&fit=crop&q=80&auto=format"
    "asus-rog-zephyrus-g16-2025-review.jpg" = "https://images.unsplash.com/photo-1588058365548-9efe5acb5d80?w=1200&h=630&fit=crop&q=80&auto=format"
    "framework-laptop-16-review-2025-modular-laptop.jpg" = "https://images.unsplash.com/photo-1611532736558-02b5d7e4ba19?w=1200&h=630&fit=crop&q=80&auto=format"
    
    # AI Technology
    "best-ai-video-generators-2025.jpg" = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&q=80&auto=format"
    "gpt-5-vs-claude-4-2025-comparison.jpg" = "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=630&fit=crop&q=80&auto=format"
    "claude-3-5-sonnet-vs-gpt-4o-coding-comparison-2025.jpg" = "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=630&fit=crop&q=80&auto=format"
    
    # Software Reviews
    "notion-vs-obsidian-2025-comparison.jpg" = "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=630&fit=crop&q=80&auto=format"
    "davinci-resolve-vs-premiere-pro-2025.jpg" = "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&h=630&fit=crop&q=80&auto=format"
    "adobe-photoshop-2025-comprehensive-review.jpg" = "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=1200&h=630&fit=crop&q=80&auto=format"
    
    # How-to Guides
    "how-to-speed-up-computer.jpg" = "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=1200&h=630&fit=crop&q=80&auto=format"
    "how-to-set-up-home-office-productivity-2025.jpg" = "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&h=630&fit=crop&q=80&auto=format"
}

# Function to download images
function Download-Image {
    param(
        [string]$Url,
        [string]$FileName,
        [string]$Destination
    )
    
    try {
        $FilePath = Join-Path $Destination $FileName
        if (Test-Path $FilePath) {
            Write-Host "Image already exists: $FileName" -ForegroundColor Yellow
            return
        }
        
        Write-Host "Downloading: $FileName" -ForegroundColor Cyan
        Invoke-WebRequest -Uri $Url -OutFile $FilePath -UseBasicParsing
        Write-Host "✓ Downloaded: $FileName" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ Failed to download: $FileName - $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Download all images
Write-Host "Starting image downloads..." -ForegroundColor Magenta
$destination = "public/images/posts"

foreach ($image in $images.GetEnumerator()) {
    Download-Image -Url $image.Value -FileName $image.Key -Destination $destination
    Start-Sleep -Milliseconds 500  # Rate limiting
}

Write-Host "`nImage download complete!" -ForegroundColor Green
Write-Host "Images saved to: $destination" -ForegroundColor Blue

# Verify downloaded images
$downloadedFiles = Get-ChildItem -Path $destination -Filter "*.jpg" | Measure-Object
Write-Host "Total images downloaded: $($downloadedFiles.Count)" -ForegroundColor Blue

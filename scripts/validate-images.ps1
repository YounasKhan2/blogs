# PowerShell script to validate image loading
Write-Host "🔍 Image Loading Validation Script" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

$localHost = "http://localhost:3001"

# Function to test if URL is reachable
function Test-ImageUrl {
    param(
        [string]$url,
        [string]$description = ""
    )
    
    try {
        if ($url.StartsWith("http")) {
            $response = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 10 -ErrorAction Stop
            if ($response.StatusCode -eq 200) {
                Write-Host "✅ $description - $url" -ForegroundColor Green
                return $true
            } else {
                Write-Host "❌ $description - $url (Status: $($response.StatusCode))" -ForegroundColor Red
                return $false
            }
        } else {
            # Local file - check if it exists
            $localPath = "d:\blogs\public$url"
            if (Test-Path $localPath) {
                Write-Host "✅ $description - $url (Local file exists)" -ForegroundColor Green
                return $true
            } else {
                Write-Host "❌ $description - $url (Local file missing)" -ForegroundColor Red
                return $false
            }
        }
    } catch {
        Write-Host "❌ $description - $url (Error: $($_.Exception.Message))" -ForegroundColor Red
        return $false
    }
}

Write-Host "`n1. Testing local image files..." -ForegroundColor Yellow

# Get all markdown files and extract image references
$markdownFiles = Get-ChildItem -Path "d:\blogs\content\posts\*.md" -File
$successCount = 0
$failureCount = 0
$externalCount = 0

foreach ($file in $markdownFiles) {
    $content = Get-Content $file.FullName -Raw
    
    if ($content -match 'image:\s*["`'']?([^"`''\r\n]+)["`'']?') {
        $imageRef = $matches[1].Trim()
        $fileName = $file.BaseName
        
        if (Test-ImageUrl -url $imageRef -description $fileName) {
            if ($imageRef.StartsWith("http")) {
                $externalCount++
            } else {
                $successCount++
            }
        } else {
            $failureCount++
        }
    }
}

Write-Host "`n2. Testing critical fallback images..." -ForegroundColor Yellow

# Test some key fallback images from ImageUtils
$fallbackImages = @(
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop&auto=format&q=80"
)

$fallbackSuccess = 0
foreach ($fallback in $fallbackImages) {
    if (Test-ImageUrl -url $fallback -description "Fallback") {
        $fallbackSuccess++
    }
}

Write-Host "`n3. Testing Next.js server status..." -ForegroundColor Yellow

try {
    $serverResponse = Invoke-WebRequest -Uri $localHost -TimeoutSec 5 -ErrorAction Stop
    if ($serverResponse.StatusCode -eq 200) {
        Write-Host "✅ Next.js server is running at $localHost" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Next.js server not accessible at $localHost" -ForegroundColor Red
    Write-Host "   Make sure 'npm run dev' is running" -ForegroundColor Yellow
}

Write-Host "`n📊 SUMMARY" -ForegroundColor Cyan
Write-Host "==========" -ForegroundColor Cyan
Write-Host "Local images valid: $successCount" -ForegroundColor Green
Write-Host "External images valid: $externalCount" -ForegroundColor Yellow  
Write-Host "Failed images: $failureCount" -ForegroundColor Red
Write-Host "Fallback images valid: $fallbackSuccess/$($fallbackImages.Count)" -ForegroundColor Blue

if ($failureCount -eq 0) {
    Write-Host "`n🎉 ALL IMAGES ARE LOADING CORRECTLY!" -ForegroundColor Green
} else {
    Write-Host "`n⚠️  Some images need attention." -ForegroundColor Yellow
}

Write-Host "`n🌐 Open your browser to $localHost to test the site manually." -ForegroundColor Blue

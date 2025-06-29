$categories = @(
    "laptop-reviews",
    "software-reviews", 
    "ai",
    "accessories-gadgets",
    "how-to"
)

foreach ($category in $categories) {
    $filePath = "d:\blogs\app\categories\$category\page.tsx"
    Write-Host "Processing $filePath"
    
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        $content = $content -replace "import OptimizedImage from '../../../components/OptimizedImage';", "import Image from 'next/image';"
        $content = $content -replace '<OptimizedImage([^>]*?)category="[^"]*"([^>]*?)\/>', '<Image$1$2placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=" />'
        $content = $content -replace '<OptimizedImage', '<Image'
        $content = $content -replace 'category="[^"]*"', 'placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=""'
        Set-Content $filePath $content -NoNewline
        Write-Host "✓ Fixed $category"
    } else {
        Write-Host "✗ File not found: $filePath"
    }
}

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

async function checkImageUrl(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    const request = protocol.get(url, (response) => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        resolve({ url, status: 'ok', statusCode: response.statusCode });
      } else {
        resolve({ url, status: 'error', statusCode: response.statusCode });
      }
      response.destroy();
    });

    request.on('error', (error) => {
      resolve({ url, status: 'error', error: error.message });
    });

    request.setTimeout(10000, () => {
      request.destroy();
      resolve({ url, status: 'timeout' });
    });
  });
}

async function verifyImages() {
  console.log('🔍 Verifying all images in markdown files...\n');

  const contentDir = path.join(process.cwd(), 'content', 'posts');
  const markdownFiles = fs.readdirSync(contentDir)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(contentDir, file));

  const allImages = [];
  const stats = {
    totalImages: 0,
    externalImages: 0,
    localImages: 0,
    workingImages: 0,
    brokenImages: 0,
  };

  // Collect all image URLs
  for (const filePath of markdownFiles) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);

    // Extract frontmatter images
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      const imageMatch = frontmatter.match(/image:\s*["']?([^"'\n]+)["']?/);
      
      if (imageMatch) {
        const imageUrl = imageMatch[1].trim();
        allImages.push({ file: fileName, url: imageUrl, type: 'frontmatter' });
      }
    }

    // Extract inline images
    const inlineImageMatches = content.matchAll(/!\[.*?\]\(([^)]+)\)/g);
    for (const match of inlineImageMatches) {
      const imageUrl = match[1].trim();
      allImages.push({ file: fileName, url: imageUrl, type: 'inline' });
    }
  }

  stats.totalImages = allImages.length;

  // Categorize images
  for (const image of allImages) {
    if (image.url.startsWith('/images/')) {
      stats.localImages++;
    } else {
      stats.externalImages++;
    }
  }

  console.log(`📊 Image Statistics:`);
  console.log(`   Total images: ${stats.totalImages}`);
  console.log(`   Local images: ${stats.localImages}`);
  console.log(`   External images: ${stats.externalImages}\n`);

  console.log('🔍 Checking image availability...\n');

  const brokenImages = [];
  let checkCount = 0;

  for (const image of allImages) {
    checkCount++;
    process.stdout.write(`\rChecking ${checkCount}/${allImages.length}...`);

    let fullUrl = image.url;
    
    // Convert local URLs to full URLs for testing
    if (image.url.startsWith('/')) {
      fullUrl = `http://localhost:3000${image.url}`;
    }

    try {
      const result = await checkImageUrl(fullUrl);
      
      if (result.status === 'ok') {
        stats.workingImages++;
      } else {
        stats.brokenImages++;
        brokenImages.push({
          file: image.file,
          url: image.url,
          fullUrl,
          type: image.type,
          issue: result.error || `HTTP ${result.statusCode}` || result.status,
        });
      }
    } catch (error) {
      stats.brokenImages++;
      brokenImages.push({
        file: image.file,
        url: image.url,
        fullUrl,
        type: image.type,
        issue: error.message,
      });
    }

    // Small delay to avoid overwhelming servers
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n');

  // Report results
  console.log(`✅ Working images: ${stats.workingImages}`);
  console.log(`❌ Broken images: ${stats.brokenImages}\n`);

  if (brokenImages.length > 0) {
    console.log('🚨 Broken Images Found:');
    for (const broken of brokenImages) {
      console.log(`   ${broken.file}: ${broken.url}`);
      console.log(`      Issue: ${broken.issue}`);
      console.log(`      Type: ${broken.type}\n`);
    }

    // Save broken images report
    const reportPath = path.join(process.cwd(), 'broken-images-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      stats,
      brokenImages,
    }, null, 2));

    console.log(`📄 Detailed report saved to: ${reportPath}`);
  } else {
    console.log('🎉 All images are working correctly!');
  }

  // Success rate
  const successRate = ((stats.workingImages / stats.totalImages) * 100).toFixed(1);
  console.log(`📈 Success Rate: ${successRate}%`);
}

verifyImages().catch(console.error);

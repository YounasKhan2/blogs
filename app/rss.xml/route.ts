export async function GET() {
  const baseUrl = 'https://techblogpro.com'
  const currentDate = new Date().toISOString()
  
  // Sample recent posts - in production, this would be dynamic
  const recentPosts = [
    {
      title: 'iPhone 15 Pro Max Review: The Ultimate Smartphone Experience',
      description: "Apple's latest flagship delivers incredible performance, stunning cameras, and titanium design that sets new standards for premium smartphones.",
      slug: 'iphone-15-pro-max-review',
      date: '2025-06-25T00:00:00.000Z',
      author: 'Muhammad Younas',
      category: 'Mobile Reviews'
    },
    {
      title: 'Samsung Galaxy S24 Ultra Review 2025: The Ultimate Android Flagship with AI Power',
      description: 'Complete Samsung Galaxy S24 Ultra review 2025 covering AI features, S Pen performance, 200MP camera system, battery life, and upgrade recommendations.',
      slug: 'samsung-galaxy-s24-ultra-review-2025',
      date: '2025-01-15T00:00:00.000Z',
      author: 'Muhammad Younas',
      category: 'Mobile Reviews'
    },
    {
      title: 'Apple MacBook Pro 14 M4 2025 Review: Creative Powerhouse Redefined',
      description: 'Complete Apple MacBook Pro 14 M4 2025 review covering performance, creative workflows, battery life, display quality, and value for professionals.',
      slug: 'apple-macbook-pro-14-m4-2025-review',
      date: '2025-01-19T00:00:00.000Z',
      author: 'Muhammad Younas',
      category: 'Laptop Reviews'
    },
    {
      title: 'ChatGPT vs Claude AI: Complete Comparison 2025',
      description: 'A comprehensive comparison of the latest AI language models and their capabilities in real-world scenarios, helping you choose the right AI assistant.',
      slug: 'chatgpt-vs-claude-ai-comparison',
      date: '2025-06-22T00:00:00.000Z',
      author: 'Muhammad Younas',
      category: 'AI Technology'
    }
  ]

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>TechBlog Pro - Expert Technology Reviews</title>
    <description>Expert tech reviews &amp; buying guides for 2025. iPhone 15, Samsung Galaxy S24, MacBook Pro M4, AI tools, gaming laptops &amp; more. Stay ahead with latest technology trends.</description>
    <link>${baseUrl}</link>
    <language>en-US</language>
    <category>Technology</category>
    <copyright>Copyright 2025 TechBlog Pro. All rights reserved.</copyright>
    <managingEditor>contact@techblogpro.com (TechBlog Pro Editorial Team)</managingEditor>
    <webMaster>webmaster@techblogpro.com (TechBlog Pro Web Team)</webMaster>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <generator>TechBlog Pro RSS Generator</generator>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <cloud domain="rpc.sys.com" port="80" path="/RPC2" registerProcedure="pingMe" protocol="soap"/>
    <ttl>60</ttl>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>TechBlog Pro</title>
      <link>${baseUrl}</link>
      <description>Expert Technology Reviews and News</description>
      <width>200</width>
      <height>60</height>
    </image>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${recentPosts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${baseUrl}/posts/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/posts/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>contact@techblogpro.com (${post.author})</author>
      <category domain="${baseUrl}/categories/${post.category.toLowerCase().replace(' ', '-')}">${post.category}</category>
      <dc:creator>${post.author}</dc:creator>
      <content:encoded><![CDATA[${post.description}]]></content:encoded>
      <media:content url="${baseUrl}/images/posts/${post.slug}.jpg" type="image/jpeg" medium="image">
        <media:title>${post.title}</media:title>
        <media:description>${post.description}</media:description>
      </media:content>
    </item>`).join('')}
  </channel>
</rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}

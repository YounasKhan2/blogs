import { MetadataRoute } from 'next'

// Remove dynamic export for Netlify compatibility
// export const dynamic = 'force-static'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/private/'],
    },
    sitemap: 'https://techblogpro.com/sitemap.xml',
  }
}

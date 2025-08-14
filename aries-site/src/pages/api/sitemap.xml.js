import { structure } from '../../data';

const DOMAIN = process.env.DOMAIN || 'https://design-system.hpe.design';

// Convert page name to URL slug
const nameToSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

// Get all pages from structure
const getAllPages = () => {
  const pages = ['/'];  // Home page
  
  structure.forEach(item => {
    if (item.name && item.name !== 'Home') {
      // Main page
      const slug = nameToSlug(item.name);
      pages.push(`/${slug}`);
      
      // Sub-pages
      if (item.pages) {
        item.pages.forEach(subPage => {
          const subSlug = nameToSlug(subPage);
          pages.push(`/${slug}/${subSlug}`);
        });
      }
    }
  });
  
  // Add known static pages
  const staticPages = [
    '/feedback',
    '/whats-new',
    '/showmore',
  ];
  
  return [...new Set([...pages, ...staticPages])].sort();
};

// Generate XML sitemap
const generateSitemapXML = (urls) => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urlEntries = urls.map(url => {
    // Determine priority and change frequency
    let priority = '0.5';
    let changefreq = 'weekly';
    
    if (url === '/') {
      priority = '1.0';
      changefreq = 'daily';
    } else if (url.split('/').length === 2) {
      priority = '0.8';
      changefreq = 'weekly';
    } else if (url.split('/').length === 3) {
      priority = '0.6';
      changefreq = 'monthly';
    }
    
    return `  <url>
    <loc>${DOMAIN}${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};

export default function handler(req, res) {
  try {
    const pages = getAllPages();
    const sitemap = generateSitemapXML(pages);
    
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader(
      'Cache-Control', 
      'public, s-maxage=86400, stale-while-revalidate',
    );
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
}

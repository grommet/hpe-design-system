import { readdir, writeFile } from 'fs/promises';
import { resolve } from 'path';

const DOMAIN = process.env.DOMAIN || 'https://design-system.hpe.design';
const OUTPUT_PATH = './public/sitemap.xml';

const getCurrentDate = () => new Date().toISOString().split('T')[0];

// Convert file path to URL path
const filePathToUrl = (filePath, pagesDir) => {
  const relativePath = filePath.replace(pagesDir, '').replace(/\\/g, '/');
  
  // Remove file extensions and convert to clean URLs
  const url = relativePath
    .replace(/\.(js|jsx|ts|tsx|mdx)$/, '')
    .replace(/\/index$/, '');
  
  // Handle special cases
  if (url === '' || url === '/') return '/';
  if (url.startsWith('/api/')) return null; // Skip API routes
  if (url.includes('/_')) return null; // Skip Next.js special files
  
  return url;
};

// Get all pages from file system
const getFileSystemPages = async () => {
  const pagesDir = resolve('./src/pages');
  const files = [];
  
  const getFiles = async (dir) => {
    const entries = await readdir(dir, { withFileTypes: true });
    
    const promises = entries.map(async (entry) => {
      const fullPath = resolve(dir, entry.name);
      
      if (entry.isDirectory()) {
        return getFiles(fullPath);
      }
      if (entry.isFile() && /\.(js|jsx|ts|tsx|mdx)$/.test(entry.name)) {
        files.push(fullPath);
      }
      return Promise.resolve();
    });
    
    await Promise.all(promises);
  };
  
  await getFiles(pagesDir);
  
  return files
    .map(file => filePathToUrl(file, pagesDir))
    .filter(url => url !== null)
    .sort();
};

// Generate XML sitemap
const generateSitemapXML = (urls) => {
  const currentDate = getCurrentDate();
  
  const urlEntries = urls.map(url => {
    // Determine priority and change frequency based on URL
    let priority = '0.5';
    let changefreq = 'weekly';
    
    if (url === '/') {
      priority = '1.0';
      changefreq = 'daily';
    } else if (url.includes('#')) {
      priority = '0.3';
      changefreq = 'monthly';
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

// Main function
const generateSitemap = async () => {
  try {
    console.log('🚀 Generating sitemap...');
    
    const fileSystemPages = await getFileSystemPages();

    console.log(`📄 Found ${fileSystemPages.length} pages in file system`);
    console.log('📄 Pages from file system:', fileSystemPages);

    // Generate sitemap XML
    const sitemapXML = generateSitemapXML(fileSystemPages);

    // Write to file
    await writeFile(OUTPUT_PATH, sitemapXML, 'utf8');
    
    console.log('✅ Sitemap generated successfully!');
    console.log(`📍 Saved to: ${OUTPUT_PATH}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
}

export { generateSitemap };

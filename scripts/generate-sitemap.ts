#!/usr/bin/env node

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const baseUrl = 'https://subset28.github.io/Armaan-Tech-Tips';
const currentDate = new Date().toISOString().split('T')[0];

const urls: SitemapUrl[] = [
  // Main pages
  { loc: `${baseUrl}/`, lastmod: currentDate, changefreq: 'weekly', priority: 1.0 },
  { loc: `${baseUrl}/#/games`, lastmod: currentDate, changefreq: 'weekly', priority: 0.9 },
  { loc: `${baseUrl}/#/utilities`, lastmod: currentDate, changefreq: 'monthly', priority: 0.8 },
  { loc: `${baseUrl}/#/optimizations`, lastmod: currentDate, changefreq: 'monthly', priority: 0.8 },
  { loc: `${baseUrl}/#/education`, lastmod: currentDate, changefreq: 'monthly', priority: 0.7 },
  { loc: `${baseUrl}/#/links`, lastmod: currentDate, changefreq: 'monthly', priority: 0.6 },
  { loc: `${baseUrl}/#/updates`, lastmod: currentDate, changefreq: 'monthly', priority: 0.5 },
  { loc: `${baseUrl}/#/settings`, lastmod: currentDate, changefreq: 'monthly', priority: 0.4 },
  { loc: `${baseUrl}/#/privacy`, lastmod: currentDate, changefreq: 'yearly', priority: 0.3 },

  // Growth pages
  { loc: `${baseUrl}/#/collections`, lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
  { loc: `${baseUrl}/#/trending`, lastmod: currentDate, changefreq: 'daily', priority: 0.6 },
  { loc: `${baseUrl}/#/flashcards`, lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}

</urlset>`;

const sitemapPath = join(__dirname, '../public/sitemap.xml');
writeFileSync(sitemapPath, sitemap);

console.log(`✅ Sitemap generated with ${urls.length} URLs at ${sitemapPath}`);

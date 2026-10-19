import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const webRoot = path.join(projectRoot, 'src', 'main', 'resources', 'web');
const siteUrl = process.argv[2] || process.env.SITE_URL;
const outputDir = path.resolve(process.argv[3] || path.join(projectRoot, '_site'));

if (!siteUrl) throw new Error('Pass the public HTTPS site URL as the first argument.');
const baseUrl = new URL(siteUrl);
if (baseUrl.protocol !== 'https:') throw new Error('SITE_URL must use HTTPS.');
if (!baseUrl.pathname.endsWith('/')) baseUrl.pathname += '/';

const script = await readFile(path.join(webRoot, 'script.js'), 'utf8');
const countryBlocks = [...script.matchAll(/\{country:'([^']+)',region:'[^']+',cities:\[([\s\S]*?)\n \]\}/g)];
const guidePages = countryBlocks.flatMap(([, country, cityBlock]) =>
  [...cityBlock.matchAll(/\{name:'([^']+)',sights:\[/g)].map(([, city]) => ({ country, city })));
if (!guidePages.length) throw new Error('No curated guide pages were found in script.js.');

await mkdir(outputDir, { recursive: true });
await cp(webRoot, outputDir, { recursive: true });

const pageUrls = [baseUrl.href, ...guidePages.map(({ country, city }) => {
  const url = new URL(baseUrl.href);
  url.searchParams.set('country', country);
  url.searchParams.set('city', city);
  return url.href;
})];
const xmlEscape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`+
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`+
  pageUrls.map(url => `  <url><loc>${xmlEscape(url)}</loc></url>`).join('\n') +
  `\n</urlset>\n`;
await writeFile(path.join(outputDir, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(path.join(outputDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${baseUrl.href}sitemap.xml\n`, 'utf8');

const indexPath = path.join(outputDir, 'index.html');
let html = await readFile(indexPath, 'utf8');
if (!html.includes('rel="canonical"')) {
  html = html.replace('</head>', `  <link rel="canonical" href="${xmlEscape(baseUrl.href)}">\n</head>`);
}
await writeFile(indexPath, html, 'utf8');
console.log(`Built ${pageUrls.length} crawlable URLs in ${outputDir}`);

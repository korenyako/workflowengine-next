const { execSync } = require('child_process');
const fs = require('fs');

/**
 * Get the last git commit date (author date, ISO format) for a file.
 * Returns null if the file has no git history.
 */
function getGitDate(filePath) {
  try {
    const date = execSync(`git log -1 --format="%aI" -- "${filePath}"`, {
      encoding: 'utf-8',
    }).trim();
    return date || null;
  } catch {
    return null;
  }
}

/**
 * Extra data files whose changes affect page content.
 * key = URL path prefix, value = data file paths to track.
 */
const extraDataFiles = {
  '': ['src/data/main.json'],
};

/**
 * Data files for dynamic [slug] routes.
 * key = first URL segment, value = data file paths to track.
 */
const dynamicDataFiles = {};

/**
 * Resolve URL path to source files and compute lastmod from git history.
 */
function getLastModified(urlPath) {
  const clean = urlPath.replace(/^\/|\/$/g, '');
  const files = [];

  // 1. Find the page.tsx source file
  if (!clean) {
    files.push('src/app/page.tsx');
  } else {
    const exactPage = `src/app/${clean}/page.tsx`;
    if (fs.existsSync(exactPage)) {
      files.push(exactPage);
    } else {
      // Try dynamic [slug] route in parent directory
      const segments = clean.split('/');
      const dynamicPath = [...segments.slice(0, -1), '[slug]'].join('/');
      const dynamicPage = `src/app/${dynamicPath}/page.tsx`;
      if (fs.existsSync(dynamicPage)) {
        files.push(dynamicPage);
      }
    }
  }

  // 2. Add extra data files for known content-driven pages
  if (extraDataFiles[clean]) {
    files.push(...extraDataFiles[clean]);
  }

  // 3. Add data files for dynamic routes
  const firstSegment = clean.split('/')[0];
  if (clean.includes('/') && dynamicDataFiles[firstSegment]) {
    files.push(...dynamicDataFiles[firstSegment]);
  }

  // 4. Get the latest git date across all source files
  let latest = null;
  for (const file of files) {
    const date = getGitDate(file);
    if (date) {
      const d = new Date(date);
      if (!latest || d > latest) {
        latest = d;
      }
    }
  }

  return latest ? latest.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://workflowengine.io',
  generateRobotsTxt: true,
  outDir: './out',
  trailingSlash: true,
  autoLastmod: false,
  generateIndexSitemap: false,
  exclude: ['/404', '/llms', '/demos', '/draft', '/drafts', '/preview'],
  transform: async (config, path) => ({
    loc: path,
    lastmod: getLastModified(path),
  }),
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/llms',
          '/demos',
          '/404',
          '/draft',
          '/drafts',
          '/preview',
          '/*?*utm_',
          '/*?*ref=',
          '/*?*fbclid=',
          '/*?*gclid=',
        ],
      },
    ],
  },
}

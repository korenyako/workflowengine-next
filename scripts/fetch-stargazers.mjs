#!/usr/bin/env node
/**
 * Fetch public stargazers for optimajet/formengine and write to public/stargazers.json
 * - Uses process.env.GITHUB_TOKEN if present (recommended to avoid rate limits)
 * - Paginates per_page=100 up to 600 total (6 pages)
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
const REPO_SLUG = process.env.TARGET_REPO || process.env.GITHUB_REPOSITORY;
if (!REPO_SLUG || !REPO_SLUG.includes('/')) {
  console.error('✖ TARGET_REPO не задан. Пример: optimajet/formengine');
  process.exit(1);
}
const [OWNER, REPO] = REPO_SLUG.split('/');
const LIMIT = Number(process.env.LIMIT || 600);
const token = process.env.GITHUB_TOKEN || process.env.STARGAZERS_PAT;

// If no token and dev mode, skip fetch and use existing file
const isDev = process.env.NODE_ENV === 'development' || process.env.npm_lifecycle_event === 'fetch:stars';
if (!token && isDev) {
  console.log(`→ No token found. Skipping stargazers fetch in dev mode. Using existing file if available.`);
  process.exit(0);
}

if (!token) {
  console.error('✖ Не найден токен: STARGAZERS_PAT или GITHUB_TOKEN');
  process.exit(1);
}

console.log(`→ Fetching stargazers from ${OWNER}/${REPO} (limit ${LIMIT})`);

const headers = {
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'FormEngine-stargazers-fetcher',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

const PER_PAGE = 100;
const MAX_PAGES = Math.ceil(LIMIT / PER_PAGE);
const OUT_PATH = path.resolve(process.cwd(), 'public', 'stargazers.json');

async function fetchPage(page) {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/stargazers?per_page=${PER_PAGE}&page=${page}`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

function pickUser(u) {
  return {
    login: u.login,
    avatar_url: u.avatar_url,
    html_url: u.html_url,
  };
}

async function fetchLatestRelease() {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/releases/latest`;
  try {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      console.warn(`⚠ Could not fetch latest release: ${res.status}`);
      return null;
    }
    const data = await res.json();
    return data.tag_name || null;
  } catch (err) {
    console.warn(`⚠ Error fetching release: ${err.message}`);
    return null;
  }
}

async function main() {
  if (!token) {
    console.error('✖ Не найден токен: STARGAZERS_PAT или GITHUB_TOKEN');
    process.exit(1);
  }
  const items = [];
  let page = 1;
  while (page <= MAX_PAGES) {
    const data = await fetchPage(page);
    if (!data.length) break;
    items.push(...data.map(pickUser));
    if (data.length < PER_PAGE) break; // last page
    page += 1;
  }

  // Fetch latest release version
  const latestVersion = await fetchLatestRelease();
  console.log(`→ Latest release: ${latestVersion || 'unknown'}`);

  const result = {
    owner: OWNER,
    repo: REPO,
    count: items.length,
    latestVersion: latestVersion,
    updatedAt: new Date().toISOString(),
    // Write newest-first so consumers get the latest stargazers first
    items: [...items].reverse(),
  };

  // Ensure public dir exists
  const dir = path.dirname(OUT_PATH);
  await fs.mkdir(dir, { recursive: true });

  // Write JSON (pretty for easy diffs)
  await fs.writeFile(OUT_PATH, JSON.stringify(result, null, 2) + '\n', 'utf8');
  console.log(`✓ ${OWNER}/${REPO}: saved ${result.count} stargazers to public/stargazers.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

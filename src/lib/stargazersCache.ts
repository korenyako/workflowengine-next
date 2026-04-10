// Simple in-memory cache for stargazers.json to avoid duplicate fetches
// Used by both HeroWithCodeBlock (for version) and StarsWall (for avatars)

// Build-time import: data is bundled into JS so first render has correct values
// (no flash of fallback version / missing stars)
import buildTimeStargazers from '../../public/stargazers.json';

export interface Stargazer {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface StargazersData {
  owner: string;
  repo: string;
  items: Stargazer[];
  count: number;
  latestVersion?: string;
  updatedAt?: string;
}

let cachedPromise: Promise<StargazersData | null> | null = null;
let cachedData: StargazersData | null = (buildTimeStargazers as unknown as StargazersData);

export function fetchStargazers(url: string = '/stargazers.json'): Promise<StargazersData | null> {
  // Return cached data immediately if available
  if (cachedData) {
    return Promise.resolve(cachedData);
  }

  // Return existing promise if fetch is in progress (deduplication)
  if (cachedPromise) {
    return cachedPromise;
  }

  // Start new fetch
  cachedPromise = fetch(url)
    .then(res => res.ok ? res.json() : null)
    .then((data: StargazersData | null) => {
      if (data?.items) {
        cachedData = data;
      }
      return cachedData;
    })
    .catch(() => {
      cachedPromise = null; // Allow retry on error
      return null;
    });

  return cachedPromise;
}

// Get cached data synchronously (returns null if not yet loaded)
export function getCachedStargazers(): StargazersData | null {
  return cachedData;
}

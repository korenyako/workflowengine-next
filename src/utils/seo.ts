/**
 * SEO utility functions for WorkflowEngine website
 */

export const SITE_ORIGIN = "https://workflowengine.io";
export const SITE_NAME = "WorkflowEngine";

/**
 * Default OG image object with dimensions (reuse in openGraph.images)
 */
export const DEFAULT_OG_IMAGE = {
  url: '/images/og-image.png',
  width: 1200,
  height: 630,
  alt: 'WorkflowEngine',
};

/**
 * Generates a canonical URL for the current page.
 * Adds trailing slash to match next.config trailingSlash: true.
 */
export function getCanonicalUrl(pathname: string): string {
  let clean = pathname || "/";
  if (clean !== "/" && !clean.endsWith("/")) {
    clean = clean + "/";
  }
  return SITE_ORIGIN + clean;
}

/**
 * Generates a canonical URL using the current window location
 */
export function getCurrentCanonicalUrl(): string {
  if (typeof window === 'undefined') {
    return 'https://workflowengine.io/';
  }
  return getCanonicalUrl(window.location.pathname);
}

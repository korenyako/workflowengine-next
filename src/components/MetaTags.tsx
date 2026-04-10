import React, { useEffect } from "react";
import { getCurrentCanonicalUrl } from "@/utils/seo";

interface OpenGraphProps {
  title: string;
  siteName: string;
  url: string;
  description: string;
  type: string;
  image: string;
  keywords?: string;
  robots?: string;
  canonical?: string;
}

function upsertMetaBy(attr: "property" | "name", key: string, content?: string): void {
  if (typeof document === "undefined" || !content) return;
  const head = document.head || document.getElementsByTagName("head")[0];
  let meta = head.querySelector<HTMLMetaElement>(`meta[${attr}='${key}']`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attr, key);
    head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

function upsertLink(rel: string, href?: string): void {
  if (typeof document === "undefined" || !href) return;
  const head = document.head || document.getElementsByTagName("head")[0];
  let link = head.querySelector<HTMLLinkElement>(`link[rel='${rel}']`);
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    head.appendChild(link);
  }
  link.setAttribute("href", href);
}

const MetaTags: React.FC<OpenGraphProps> = ({ title, siteName, url, description, type, image, keywords, robots = "index, follow", canonical }) => {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Standard meta tags
    upsertMetaBy("name", "description", description);
    upsertMetaBy("name", "keywords", keywords);
    upsertMetaBy("name", "robots", robots);
    
    // Canonical URL - ensure only one exists
    const canonicalUrl = canonical || getCurrentCanonicalUrl();
    upsertLink("canonical", canonicalUrl);

    // Open Graph
    upsertMetaBy("property", "og:title", title);
    upsertMetaBy("property", "og:site_name", siteName);
    upsertMetaBy("property", "og:url", url);
    upsertMetaBy("property", "og:description", description);
    upsertMetaBy("property", "og:type", type);
    upsertMetaBy("property", "og:image", image);

    // Twitter Card
    upsertMetaBy("name", "twitter:card", "summary_large_image");
    upsertMetaBy("name", "twitter:title", title);
    upsertMetaBy("name", "twitter:description", description);
    upsertMetaBy("name", "twitter:image", image);
  }, [title, siteName, url, description, type, image, keywords, robots, canonical]);

  return null;
};

export default MetaTags;



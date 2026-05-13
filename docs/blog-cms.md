# Blog CMS (Decap)

Editing surface for the blog at `/admin/`. Non-technical authors create, edit, and delete posts through a UI; the CMS writes directly to the repo as `.mdx` files with YAML frontmatter.

The CMS itself is **client-side only** (single-page React app loaded from a CDN). There is no backend deployed with the site — the UI talks to git via one of:
- a **local file-system proxy** during development (`npx decap-server`), or
- a **git-gateway / OAuth flow** in production (see [Production auth](#production-auth) below — not yet enabled).

## Files

| Path | Role |
|------|------|
| [public/admin/index.html](../public/admin/index.html) | Loads Decap CMS from `unpkg.com/decap-cms@^3.8.0`. Served at `/admin/` on the deployed site. |
| [public/admin/config.yml](../public/admin/config.yml) | Collection definition, field schema, backend config. **Single source of truth for the CMS UI.** |
| [src/content/blog/](../src/content/blog/) | Where posts live. CMS reads/writes here. |
| [public/images/blog/](../public/images/blog/) | Where uploaded cover/inline images land — per-slug subfolders. |
| [src/lib/blog-manifest.ts](../src/lib/blog-manifest.ts) | Build-time scanner that turns the `.mdx` files into the blog-post list. Run automatically by `next build`. |

## Running locally

The CMS needs two processes side-by-side: Next.js to serve `/admin/` (and `/blog/` for preview), and `decap-server` to proxy file-system writes.

```powershell
# Terminal 1 — Next.js
npm run dev          # binds http://localhost:3000

# Terminal 2 — Decap local backend
npx decap-server     # binds http://localhost:8081

# Browser — IMPORTANT: include /index.html in dev mode (see note below)
# Open http://localhost:3000/admin/index.html
```

### Dev-mode URL quirk

`next dev` does **not** auto-resolve `/admin/` to `/admin/index.html` for files served from `public/`. In dev:

| URL | Result |
|-----|--------|
| `http://localhost:3000/admin/index.html` | ✅ 200 — loads the CMS |
| `http://localhost:3000/admin/` | ❌ 404 |
| `http://localhost:3000/admin` | 308 → `/admin/` → 404 |

In **production** (Netlify), `/admin/` works because the static-file server resolves index.html automatically. The quirk is dev-only. Bookmark `/admin/index.html` for local work, or run a prod-like preview with `npx serve out` after `npm run build`.

### Logging in (local backend)

With `local_backend: true`, the CMS shows a generic **"Login"** button (the UI is the same regardless of backend), but clicking it logs you in **immediately — no password or account needed**. It works because:

1. The page is loaded from `localhost` (NOT `127.0.0.1` — Decap's local-backend detection only fires for the `localhost` hostname).
2. `npx decap-server` is running and listening on port 8081.
3. The browser can reach `http://localhost:8081/api/v1`.

**If clicking Login asks for real Netlify Identity / GitHub credentials**, local backend isn't connected. Debug checklist:

- Is `decap-server` actually running? Test with: `curl -X POST -H "Content-Type: application/json" -d '{\"action\":\"info\"}' http://localhost:8081/api/v1` — should return `{"repo":"workflowengine",...}`.
- Are you on `localhost` (not `127.0.0.1`)?
- Open DevTools → Network. After clicking Login, you should see a POST to `localhost:8081/api/v1`. If you don't, the CMS isn't trying the local backend at all — re-check `local_backend: true` in [config.yml](../public/admin/config.yml) and force-refresh (`Ctrl+Shift+R`) to bust the cached config.
- Console errors about CORS? `decap-server` enables CORS by default, but a firewall or extension could be blocking it.

### What you can do after login

Once in, the CMS reads/writes `src/content/blog/` directly through the proxy. Changes saved in the CMS appear immediately on `/blog/` and `/blog/<slug>/` in the dev server (the manifest re-scans on every request in dev). Commit them with normal `git` afterwards — the CMS doesn't push anything.

## Creating a post

1. Open `/admin/`, click **New Post**.
2. Fill in the fields (described in detail below). All required fields are marked.
3. **Save**. The CMS writes a new `<slug>.mdx` file under `src/content/blog/` with YAML frontmatter at the top and your body content below.
4. (Optional) Drag-drop a cover image into the **Cover image** field — it uploads to `public/images/blog/<slug>/`.
5. `git add src/content/blog/<slug>.mdx public/images/blog/<slug>/ && git commit && git push`.

## Editing a post

1. Open `/admin/`, click the post in the list.
2. Edit, **Save**. The CMS rewrites the file in place — frontmatter regenerated from your field values, body replaced with the editor content.
3. Commit and push.

## Deleting a post

1. Open the post in `/admin/`, click **Delete entry** in the top-right.
2. The `.mdx` file is removed. The per-slug image folder is NOT — clean it up manually if you don't need the images.
3. Commit and push.

## Frontmatter schema (for direct file editing)

When editing `.mdx` files outside the CMS, this is the schema enforced by [config.yml](../public/admin/config.yml) and consumed by [blog-manifest.ts](../src/lib/blog-manifest.ts):

```yaml
---
slug: my-post-slug              # required, lowercase-hyphens, matches filename
title: My Post Title             # required
description: Subtitle text.      # required; multi-paragraph: use folded scalar
                                 # `>-` with blank line for paragraph break
category: Engineering            # required; one of Product, Engineering,
                                 # Case Study, Open Source
tags: []                         # required (can be empty array)
readingTime: 5 minutes           # required, free-form string
order: 32                        # required, integer. Smaller = earlier on /blog/.
                                 # Current max is 31 (legacy). New posts: 32+.
cover: /images/blog/my-post-slug/cover.webp   # optional
date: 2026-05-12                 # optional, ISO-8601 (YYYY-MM-DD)
dateLabel: Published             # optional, "Published" | "Updated"
keywords: workflow, dotnet       # optional, comma-separated for <meta name=keywords>
author:                          # optional; legacy posts use "Optimajet Team"
  name: Optimajet Team
  title: Lead Engineer           # optional within author
---

(MDX body here. Markdown + JSX. Do NOT start with `# Title` — the title
field above renders as <h1>, so a leading heading would duplicate it.)
```

## How images work

- **Cover image** uploaded via the CMS lands in `public/images/blog/<slug>/<filename>` and is referenced in frontmatter as `/images/blog/<slug>/<filename>` (per-slug folder is configured under `media_folder` in [config.yml](../public/admin/config.yml)).
- **Cover** renders as the thumbnail on `/blog/` index and as `og:image` / `twitter:image` on the post. It does **not** render at the top of the post body — that prevents duplication when authors also include a lead image as the first line of the body.
- **Inline images** (`![alt](/images/blog/<slug>/foo.png)` inside the MDX body) are just markdown images; the CMS doesn't manage them through fields. To upload an inline image: click the image-upload button in the markdown editor toolbar, or drop the file into `public/images/blog/<slug>/` manually and reference it.

## Known limitations

- **MDX preview is disabled** in the CMS editor (`editor: preview: false` in [config.yml](../public/admin/config.yml)). Decap's preview renderer doesn't match the production `next-mdx-remote/rsc` pipeline (no `rehype-highlight`, no per-post styling, can't resolve relative image paths the same way). Disabled to avoid showing authors a preview that diverges from the real site. Authors should check the dev server (`localhost:3000/blog/<slug>/`) for an accurate preview.
- **Empty per-slug image folders linger after delete.** Deleting a post through the CMS removes the `.mdx` file but not its `public/images/blog/<slug>/` directory. Clean manually.
- **No production auth wired yet.** `local_backend: true` is the only working auth path right now. See below.
- **Order field is manual.** Authors have to pick the next free `order` number. Current max for legacy posts is `31`. There's no auto-increment.
- **Multi-paragraph descriptions are fragile.** YAML round-trip via `gray-matter` preserves them, but the CMS UI's **Description** field shows a single text area. Paragraphs are separated by a blank line in the field; the CMS will serialize them as a folded YAML block.

## Production auth (Phase 2 — not yet implemented)

`local_backend: true` only works for `localhost`. For deployed `/admin/` to work, one of the following must be enabled. **Do this before the site goes live**, otherwise `/admin/` will load but the editor will fail to authenticate.

Two viable paths:

### Option A — Netlify Identity + git-gateway (recommended on Netlify)

If the site is hosted on Netlify (the current plan), this is the lowest-friction option.

1. In Netlify dashboard for the site: **Site settings → Identity → Enable Identity**.
2. **Identity → Registration preferences → Invite only** (otherwise anyone can sign up).
3. **Identity → Services → Git Gateway → Enable** — wires the CMS up to push commits to the repo via a Netlify-managed token.
4. **Identity → Invite users** — invite each blog author by email.
5. Add to `public/admin/index.html` (inside `<head>`):
   ```html
   <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
   ```
   and a second `<script>` at the end of `<body>` that calls `netlifyIdentity.init()` then redirects on login (see [Decap docs — Netlify Identity](https://decapcms.org/docs/netlify-identity/) for the boilerplate).
6. The existing `backend: { name: git-gateway, branch: main }` in [config.yml](../public/admin/config.yml) is already the correct production config — no `config.yml` changes needed.
7. Optionally remove or comment out `local_backend: true` if you want to enforce auth even on `localhost`.

### Option B — GitHub OAuth (works on any host)

Useful if the site moves off Netlify or you want auth tied to GitHub accounts directly.

1. Register a GitHub OAuth app: **GitHub → Settings → Developer settings → OAuth Apps → New**. Callback URL = `https://<your-oauth-broker>/callback`.
2. Deploy an OAuth broker — easiest is the [decaporg/decap-proxy](https://github.com/decaporg/decap-proxy) (Vercel/Netlify Function). It exchanges the OAuth code for a GitHub token.
3. Replace the `backend:` block in [config.yml](../public/admin/config.yml):
   ```yaml
   backend:
     name: github
     repo: korenyako/workflowengine-next
     branch: main
     base_url: https://<your-oauth-broker>     # the deployed broker URL
     auth_endpoint: api/auth                   # path on the broker
   ```
4. Authors sign in with their GitHub account; the CMS commits as them.

### Which to pick

- On Netlify, **Identity is faster** (no OAuth app, no broker to maintain) and the author list is managed in the Netlify dashboard.
- GitHub OAuth is **portable** (works wherever the site is hosted) but requires running and maintaining a broker.

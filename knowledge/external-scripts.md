---
title: External scripts
---

# External scripts

Rules for embedding third-party JS (analytics, CRM widgets, chat, etc.) **in static-export mode**.

## Golden rule

**Do not use `next/script` for anything that must reliably run.**

Under `output: 'export'`, `next/script` (with any `strategy`) does **not** inject a plain `<script>` tag into the emitted HTML. It serializes into the RSC payload instead, and execution depends on React hydration. If hydration is slow/broken, the script never runs — and any widget it loads (Calendly, Clarity, Bitrix24, etc.) stays dead.

## Approved patterns

**1. Inline `<script dangerouslySetInnerHTML>` in `<head>`** — for scripts that must run during HTML parse.
Example: GTM in [components/GTMScript.tsx](../src/components/GTMScript.tsx), mounted from [app/layout.tsx](../src/app/layout.tsx).
```tsx
<script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){ /* GTM snippet */ })(...)` }} />
```

**2. Dynamic injection from `useEffect`** — for widgets that require specific attributes on the script tag (Bitrix24 reads `data-b24-form` off the loader script itself).
Example pattern used historically in [app/contacts/page.tsx](../src/app/contacts/page.tsx) for the Bitrix24 CRM widget:
```tsx
useEffect(() => {
  const s = document.createElement('script');
  s.async = true;
  s.src = '.../b24/loader.js';
  s.setAttribute('data-b24-form', '...');
  document.body.appendChild(s);
}, []);
```

## Current state

- **GTM**: live, container ID `GTM-PPS66XRX` in `app/layout.tsx`.
- **JSON-LD Organization schema**: inlined in `<head>` in `app/layout.tsx`. Uses `https://github.com/optimajet/workflowengine` and `https://www.nuget.org/packages/OptimaJet.WorkflowEngine.Core` as `sameAs`.
- **Bitrix24 contact widget**: **not wired up yet** in the WorkflowEngine fork — `ContactForm.tsx` renders a placeholder. Restoring it means following pattern #2 above with the correct form ID.

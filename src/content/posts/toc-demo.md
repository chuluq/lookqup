---
title: Panduan Lengkap SvelteKit untuk Pemula
date: 2026-05-03
description: Panduan komprehensif membangun aplikasi web modern dengan SvelteKit, mulai dari instalasi hingga deployment.
tags:
  - sveltekit
  - svelte
  - tutorial
draft: false
---

SvelteKit adalah framework full-stack untuk membangun aplikasi web dengan Svelte. Post ini mencakup semua yang perlu kamu tahu untuk mulai membangun aplikasi produksi — scroll ke bawah dan perhatikan TOC di kanan yang mengikuti posisimu.

## Instalasi dan Setup

Cara termudah memulai project SvelteKit baru adalah dengan `create-svelte`:

```bash
pnpm create svelte@latest my-app
cd my-app
pnpm install
pnpm dev
```

Kamu akan diminta memilih template (Skeleton, SvelteKit Demo, Library), TypeScript, dan beberapa opsi lain. Untuk project baru, pilih **Skeleton** dengan TypeScript.

### Struktur Direktori

Setelah setup, struktur project akan terlihat seperti ini:

```
my-app/
├── src/
│   ├── routes/          ← semua halaman ada di sini
│   │   └── +page.svelte ← halaman utama (/)
│   ├── lib/             ← komponen dan utilitas
│   └── app.html         ← HTML template
├── static/              ← file statis (favicon, dll)
├── svelte.config.js
└── vite.config.ts
```

### Menjalankan Dev Server

```bash
pnpm dev          # http://localhost:5173
pnpm dev --open   # langsung buka browser
```

## Routing

SvelteKit menggunakan file-system routing. Setiap file `+page.svelte` di dalam `src/routes/` menjadi sebuah halaman.

### Route Dasar

| File | URL |
|---|---|
| `src/routes/+page.svelte` | `/` |
| `src/routes/about/+page.svelte` | `/about` |
| `src/routes/blog/+page.svelte` | `/blog` |

### Dynamic Routes

Untuk halaman dinamis seperti `/blog/my-post`, gunakan folder dengan nama dalam kurung siku:

```
src/routes/blog/[slug]/+page.svelte
```

Parameter `slug` kemudian tersedia lewat `$page.params.slug` atau dari fungsi `load`.

### Layout

File `+layout.svelte` berlaku untuk semua halaman di direktori yang sama dan di bawahnya. Gunakan ini untuk header, footer, dan navigation yang konsisten:

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  let { children } = $props();
</script>

<header><!-- nav --></header>
<main>{@render children()}</main>
<footer><!-- footer --></footer>
```

## Loading Data

SvelteKit memisahkan logika data dari komponen UI melalui file `+page.ts` (atau `+page.server.ts` untuk server-only).

### Client + Server Load

```typescript
// src/routes/blog/[slug]/+page.ts
export async function load({ params, fetch }) {
  const post = await fetch(`/api/posts/${params.slug}`);
  return { post: await post.json() };
}
```

Data yang di-return langsung tersedia di komponen sebagai `data.post`:

```svelte
<script>
  let { data } = $props();
</script>

<h1>{data.post.title}</h1>
```

### Server-Only Load

Gunakan `+page.server.ts` untuk akses database, secrets, atau logika yang tidak boleh ke client:

```typescript
// src/routes/dashboard/+page.server.ts
import { db } from '$lib/db';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
  if (!locals.user) redirect(303, '/login');
  return { stats: await db.getStats(locals.user.id) };
}
```

## Deployment

SvelteKit mendukung berbagai target deployment lewat **adapters**.

### Adapter Static

Untuk blog atau situs statis (seperti yang kamu baca sekarang), gunakan `@sveltejs/adapter-static`:

```bash
pnpm add -D @sveltejs/adapter-static
```

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-static';

export default {
  kit: { adapter: adapter() }
};
```

Output-nya adalah HTML/CSS/JS statis yang bisa di-host di mana saja — Netlify, Vercel, GitHub Pages, Cloudflare Pages.

### Adapter Node

Untuk aplikasi server-side dengan database atau API:

```bash
pnpm add -D @sveltejs/adapter-node
```

Generate Node.js server yang siap jalan di VPS atau container.

### Adapter Vercel / Netlify

Kalau deploy ke platform tertentu, ada adapter khusus yang otomatis mengonfigurasi serverless functions, edge functions, dan image optimization:

```bash
pnpm add -D @sveltejs/adapter-vercel
# atau
pnpm add -D @sveltejs/adapter-netlify
```

## Optimasi Performa

### Preloading

SvelteKit otomatis mem-prefetch halaman saat link di-hover. Kamu bisa mengontrolnya dengan atribut `data-sveltekit-preload-data`:

```svelte
<!-- preload agresif saat link masuk viewport -->
<a href="/blog" data-sveltekit-preload-data="viewport">Blog</a>
```

### Image Optimization

Gunakan elemen `<enhanced:img>` (via `@sveltejs/enhanced-img`) untuk otomatis resize, convert ke WebP/AVIF, dan lazy-load:

```svelte
<script>
  import cover from './cover.jpg?enhanced';
</script>

<enhanced:img src={cover} alt="Cover" />
```

## Penutup

SvelteKit adalah salah satu framework web paling ergonomis yang ada saat ini. Dengan file-system routing, load functions yang terpisah bersih dari UI, dan adapter system yang fleksibel, kamu bisa bangun dari blog statis sampai aplikasi full-stack kompleks dengan codebase yang tetap rapi.

Coba mulai dengan project kecil — clone repo ini misalnya — dan rasakan sendiri perbedaannya.

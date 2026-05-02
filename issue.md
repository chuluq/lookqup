# Issue: Inisialisasi Proyek Lookqup

## Tujuan
Menyiapkan proyek baru di folder ini (`/home/chuluq/Developments/lookqup`) sebagai web statis menggunakan SvelteKit. Hasil akhirnya adalah proyek yang siap dikembangkan dan siap di-build menjadi static site.

## Stack Teknologi
- **Package Manager:** pnpm
- **Framework:** SvelteKit dengan `adapter-static` (output static site)
- **Styling:** Tailwind CSS v4
- **Bahasa:** TypeScript

## Catatan Konteks
- Folder sudah merupakan git repository (sudah ada commit awal).
- Sudah ada `README.md` minimal — boleh ditimpa atau diperluas, jangan dihapus.
- Inisialisasi proyek dilakukan **di dalam folder ini**, bukan di subfolder baru.

## Tahapan High-Level

### 1. Inisialisasi SvelteKit
- Gunakan starter resmi SvelteKit (Skeleton project) dengan opsi TypeScript aktif.
- Pastikan inisialisasi dilakukan di working directory saat ini, bukan membuat folder baru.
- Pilih konfigurasi minimal — tanpa contoh demo, tanpa Playwright/Vitest kecuali memang diperlukan.

### 2. Install Dependencies dengan pnpm
- Pastikan `pnpm-lock.yaml` ter-generate.
- Jangan menggunakan `npm` atau `yarn` selama proses ini.

### 3. Konfigurasi `adapter-static`
- Ganti adapter default menjadi `@sveltejs/adapter-static`.
- Update `svelte.config.js` agar build menghasilkan output static site (siap deploy ke static host seperti Vercel/Netlify/Cloudflare Pages/GitHub Pages).
- Tambahkan fallback page jika diperlukan (mis. untuk SPA-style routing).
- Pastikan `prerender = true` di-enable di level root (`+layout.ts` atau `+layout.server.ts`) agar semua route ter-prerender.

### 4. Setup Tailwind CSS v4
- Install Tailwind v4 sesuai cara instalasi resmi terbaru (gunakan plugin Vite `@tailwindcss/vite`, **bukan** PostCSS pipeline lama).
- Buat file CSS global yang meng-import Tailwind v4 (`@import "tailwindcss";`).
- Import file CSS global tersebut di root layout (`+layout.svelte`).
- Verifikasi utility class Tailwind berfungsi di halaman utama.

### 5. Verifikasi
- Jalankan `pnpm dev` — pastikan dev server berjalan tanpa error.
- Jalankan `pnpm build` — pastikan output static dihasilkan di folder `build/`.
- Jalankan `pnpm preview` — pastikan hasil build bisa di-preview.
- Buat halaman utama sederhana (`+page.svelte`) yang menampilkan teks "Lookqup" dengan styling Tailwind sebagai bukti semuanya bekerja.

### 6. Housekeeping
- Pastikan `.gitignore` sudah benar (mengabaikan `node_modules`, `.svelte-kit`, `build`, dll. — biasanya sudah otomatis dari starter).
- Tidak perlu commit — biarkan user yang melakukan commit terakhir.

## Acceptance Criteria
- [ ] `pnpm dev` berjalan tanpa error.
- [ ] `pnpm build` menghasilkan output static di folder `build/`.
- [ ] Tailwind v4 utility class bekerja pada halaman.
- [ ] TypeScript aktif (file `.ts` dan `<script lang="ts">` bekerja tanpa error).
- [ ] Proyek menggunakan `adapter-static`, bukan adapter default.
- [ ] Tidak ada file lock dari `npm`/`yarn` (`package-lock.json`, `yarn.lock`).

## Referensi
- SvelteKit: https://kit.svelte.dev/docs
- adapter-static: https://kit.svelte.dev/docs/adapter-static
- Tailwind v4: https://tailwindcss.com/docs/installation/using-vite

## Catatan untuk Implementor
- Jika ada konflik versi atau API berubah, **ikuti dokumentasi resmi terbaru**, jangan paksa cara lama.
- Jangan menambahkan dependency atau fitur di luar daftar di atas (no ESLint config tambahan, no testing framework, no UI library) kecuali memang dependency wajib dari starter.
- Fokus: proyek bisa di-`dev`, di-`build` jadi static, dan Tailwind bekerja. Itu saja.

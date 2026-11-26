# Kulon Progo Race Weekend

Panduan perjalanan peserta, keluarga, dan pendamping Kulon Progo Half Marathon (KPHM) 2026.
"Run the Race. Explore the Place." Melengkapi, bukan menggantikan, situs resmi https://kphm.myendura.id/

Website statis (HTML, CSS, JavaScript) tanpa backend dan tanpa API berbayar. Cocok untuk GitHub Pages.

## Isi halaman
Hero + hitung mundur · Jadwal & rute 4 kategori · **Course Detail + profil elevasi** · Race pack · Start pen · **Peraturan lomba** · Beyond the Run + **4 makna KPHM** · Itinerary Sabtu/Minggu · Jelajah destinasi · Medali & Jersey · Peta (tautan Google Maps) · Rencanaku (tempat, anggaran, checklist; tersimpan di browser).

## Struktur
```text
index.html
css/styles.css
js/        app.js  destinations.js  itinerary.js  maps.js  course.js  extras.js
data/      config.js  destinations.js  course-profiles.js
assets/
  logo/      kphm-logo.webp (logo baru), favicon.png
  mantra/    logo 4 makna KPHM
  kphm/      materi visual resmi KPHM 2026
  scenery/   potongan foto latar dari materi Scenery & Destination
```

## Cara mengubah data
- **Jadwal/jarak/race pack:** teks ada langsung di `index.html`; jadwal juga di `js/itinerary.js`.
- **Course Detail:** `js/course.js` (objek `COURSES`).
- **Profil elevasi:** `data/course-profiles.js`. Saat ini hanya 5K (dari file GPX). Untuk kategori lain, tambahkan kunci `"hm"`, `"10k"`, atau `"jd"` dengan bentuk `{gpxKm, min, max, points:[[km, elevasi], ...]}`; grafik muncul otomatis. Sumbu Y grafik diatur di `js/course.js` (`yMin`, `yMax`); sesuaikan bila rentang elevasi berbeda.
- **Hitung mundur:** `data/config.js` (`flagOff`, `lastCutOff`).
- **Destinasi:** `data/destinations.js`. Isi `address`, `hours`, dll. hanya bila ada sumber resmi; selain itu biarkan "Belum tersedia".

## Aturan data
- Jangan mengarang nama tempat, harga, jarak, waktu, menu, atau jam buka.
- Jangan menaruh QR Race Pack, nomor BIB, nama, email, atau data peserta apa pun di repository ini.
- Harga pendaftaran tidak ditampilkan.

## Deploy ke GitHub Pages
1. Buat repository baru di GitHub.
2. Upload **isi** folder proyek (bukan folder pembungkusnya) ke branch `main`.
3. Settings → Pages → Deploy from a branch → `main` / `(root)` → Save.
4. Tunggu beberapa menit, lalu buka URL yang diberikan. Semua path relatif.

## Uji lokal
Buka `index.html` di browser, atau jalankan `python -m http.server 8000` lalu buka http://localhost:8000.

## Status data (26 November 2026)
- Jadwal, jarak, race pack, dan Course Detail mengikuti kphm.myendura.id.
- Gambar rute lama memakai angka 21,1 / 10,5 / 5,2 / 0,74 km dan elevasi yang berbeda dari situs; yang dipakai adalah angka situs.
- Data destinasi belum diverifikasi.
- Info parkir, penutupan jalan, antar-jemput, dan kontak medis/darurat belum dipublikasikan penyelenggara.

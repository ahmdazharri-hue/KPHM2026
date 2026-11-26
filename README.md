# Kulon Progo Race Weekend Planner

Website statis untuk merencanakan perjalanan race weekend dengan konsep **Run the Race, Explore the Place**.

## Fitur versi pertama
- Landing page editorial dan responsive.
- Template itinerary Saturday dan Sunday.
- Destination search + category filter.
- Destination detail modal dengan tab Overview, Information, dan Route.
- Add/remove destinasi ke itinerary.
- Budget planner dengan kalkulasi total.
- Runner's checklist dengan progress.
- Google Maps search link (demo mode).
- Penyimpanan itinerary, checklist, dan pengeluaran di `localStorage`.

## Struktur folder
```text
kulon-progo-race-weekend/
├── index.html
├── README.md
├── css/styles.css
├── js/
│   ├── app.js
│   ├── destinations.js
│   ├── itinerary.js
│   ├── gallery.js
│   └── maps.js
├── data/
│   ├── config.js
│   └── destinations.js
└── assets/
    ├── images/
    ├── posters/
    ├── gallery/
    └── icons/
```

## Cara menjalankan
1. Ekstrak ZIP.
2. Buka `index.html` di browser. Fitur dasar berjalan tanpa backend.
3. Untuk pengalaman lokal yang lebih konsisten, jalankan server statis sederhana, misalnya ekstensi **Live Server** di VS Code.

## Konfigurasi event
Edit `data/config.js`:
- `eventDate`: isi `YYYY-MM-DD` setelah tanggal resmi dikonfirmasi.
- `raceCategory`: kategori yang diikuti.
- `startFinish`: lokasi resmi start/finish.
- `organizerUrl`: tautan penyelenggara resmi.

Countdown sengaja belum ditampilkan karena tanggal event belum dikonfirmasi.

## Google Maps API
Saat ini pencarian peta memakai tautan Google Maps publik sehingga demo tetap dapat dipakai tanpa API key.

Untuk mengaktifkan Google Maps JavaScript API dan Places:
1. Buat project di Google Cloud Console.
2. Aktifkan billing sesuai ketentuan Google Cloud.
3. Aktifkan **Maps JavaScript API** dan **Places API (New)**.
4. Buat API key khusus website.
5. Batasi key dengan **HTTP referrers** (mis. `https://USERNAME.github.io/*` dan domain custom Anda).
6. Batasi API key hanya untuk API yang diperlukan.
7. Jangan pernah menggunakan service-account key atau secret server-side di frontend.

Catatan: GitHub Pages adalah static hosting. Key browser yang digunakan di frontend tetap terlihat oleh pengguna; proteksinya adalah HTTP-referrer restriction dan API restriction, bukan menyembunyikan key. Jangan commit key yang tidak dibatasi. Integrasi Places Autocomplete/Place Details dan Routes API belum diaktifkan dalam versi ini; perlu implementasi lanjutan setelah project dan key tersedia.

## Mengganti poster resmi
Simpan poster di `assets/posters/`, lalu tambahkan elemen gambar/link pada section `Official Event Kit` di `index.html`. Pastikan materi berasal dari kanal resmi penyelenggara.

## Menambah destinasi
Edit `data/destinations.js`. Setiap destinasi memakai properti:
`id`, `name`, `category`, `categoryLabel`, `code`, `art`, `description`, `address`, `hours`, `price`, `facilities`, `maps`.
Kategori yang didukung: `nature`, `viewpoint`, `culture`, `culinary`.
Gunakan `Information unavailable` atau `Please verify with venue` bila data belum tersedia.

## Mengubah itinerary
Edit `window.ITINERARY_TEMPLATES` pada `js/itinerary.js`. Jangan menetapkan jam race sebelum race schedule resmi tersedia.

## Mengganti foto
Visual versi pertama menggunakan ilustrasi CSS dan satu foto hero eksternal dari Unsplash. Ganti URL hero pada `.hero-image` di `css/styles.css` dengan foto yang Anda miliki atau aset berlisensi. Foto galeri dapat disimpan di `assets/gallery/`; ubah tile galeri di `index.html` untuk memakai file tersebut.

## Deploy ke GitHub Pages
1. Buat repository GitHub baru.
2. Upload seluruh isi folder proyek (bukan folder ZIP-nya).
3. Buka **Settings → Pages**.
4. Pada Build and deployment pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/ (root)`, lalu Save.
6. Tunggu proses deployment dan buka URL Pages yang diberikan GitHub.

Semua path menggunakan relative path sehingga cocok untuk project site GitHub Pages.

## Batasan dan status data
- Tanggal, kategori, venue, race schedule, poster, handbook, dan route resmi belum diberikan; jangan anggap placeholder sebagai informasi event resmi.
- Data destinasi adalah daftar awal dan belum diverifikasi secara real-time.
- Jam buka, tiket, menu, harga, rating, nomor telepon, dan fasilitas tidak dikarang.
- Peta konseptual bukan peta navigasi dan tidak menampilkan jarak/waktu tempuh.
- Google Maps link membuka layanan Google Maps; pencarian Places Autocomplete dan Place Details belum terintegrasi.
- Data `localStorage` tersimpan pada browser/perangkat yang sama, tidak tersinkron lintas perangkat.
- Gallery masih placeholder dan belum menyediakan upload atau lightbox.
- PDF viewer, drag-and-drop itinerary, cuaca, kontak darurat lokal, dan perhitungan rute otomatis belum tersedia pada versi pertama.

## QA yang dilakukan
Pemeriksaan statis pada file dan referensi path dilakukan saat paket dibuat. Interaksi dirancang untuk browser modern. Belum dilakukan pengujian lintas perangkat fisik, validasi API Google, atau verifikasi operasional destinasi secara langsung.


## Integrasi aset resmi KPHM 2026
- Seluruh 81 aset gambar dari arsip `KPHM2026.zip` ditempatkan di `assets/kphm/`.
- Gambar dikonversi ke WebP (quality 84) untuk mengurangi ukuran unduhan; arsip asli tetap menjadi sumber.
- `assets/kphm/manifest.json` memuat kategori, nama file sumber, dan dimensi gambar.
- Galeri, identitas logo, hero, serta Official Event Kit menggunakan aset lokal.
- Foto promosi dipertahankan; jangan menganggap teks poster sebagai pengganti verifikasi informasi terbaru.

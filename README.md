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
- Tautan pencarian dan arah Google Maps.
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
│   ├── extras.js
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


## Peta dan navigasi
Website memakai tautan Google Maps (search dan directions). Tidak memerlukan API key atau biaya.

## Mengganti poster resmi
Simpan poster di `assets/posters/`, lalu tambahkan elemen gambar/link pada section `Official Event Kit` di `index.html`. Pastikan materi berasal dari kanal resmi penyelenggara.

## Menambah destinasi
Edit `data/destinations.js`. Setiap destinasi memakai properti:
`id`, `name`, `category`, `categoryLabel`, `code`, `art`, `description`, `address`, `hours`, `price`, `facilities`, `maps`.
Kategori yang didukung: `nature`, `viewpoint`, `culture`, `culinary`.
Gunakan `Information unavailable` atau `Please verify with venue` bila data belum tersedia.

## Mengubah itinerary
Edit `window.ITINERARY_TEMPLATES` pada `js/itinerary.js`. Jangan menetapkan jam race sebelum race schedule resmi tersedia.

## Foto
Materi asli ada di `assets/kphm/`. Latar foto yang dipotong dari materi Scenery & Destination ada di `assets/scenery/`. Foto destinasi diatur lewat properti `photo` dan `source` di `data/destinations.js`.

## Deploy ke GitHub Pages
1. Buat repository GitHub baru.
2. Upload seluruh isi folder proyek (bukan folder ZIP-nya).
3. Buka **Settings → Pages**.
4. Pada Build and deployment pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/ (root)`, lalu Save.
6. Tunggu proses deployment dan buka URL Pages yang diberikan GitHub.

Semua path menggunakan relative path sehingga cocok untuk project site GitHub Pages.

## Batasan dan status data
- Jadwal, rute, dan race pack mengikuti materi KPHM 2026; cek perubahan dari penyelenggara.
- Data destinasi belum diverifikasi. Jam buka, tiket, dan fasilitas tidak dikarang.
- Data planner tersimpan di browser perangkat yang sama.
- Itinerary rinci menunggu Excel Master Database.

## Versi race week (26 November 2026)
- `js/extras.js`: hitung mundur ke 29 November 2026 04.30 WIB dan tampilan gambar diperbesar.
- Jarak, syarat race pack, mantra, dan cerita Beyond the Run mengikuti kphm.myendura.id dan email penyelenggara.
- Jangan pernah mengunggah pass RPC, QR, atau data peserta ke repository.

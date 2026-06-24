# ROBOSOCCER Pad (PWA)

Kawalan BLE twin-stick untuk robot soccer ESP32. Boleh dipasang ke telefon
Android sebagai app dan jalan offline.

## Kandungan
- `index.html` — app utama
- `manifest.json` — info app (nama, ikon, mod skrin)
- `sw.js` — service worker (install + offline)
- `icons/` — ikon app

## Cara hos di GitHub Pages
1. Buat repo baharu di GitHub (cth: `robosoccer-pad`).
2. Upload SEMUA fail ni (kekalkan folder `icons/`).
3. Repo > **Settings** > **Pages**.
4. Bahagian *Build and deployment* > Source: **Deploy from a branch**.
5. Branch: **main**, folder: **/ (root)** > **Save**.
6. Tunggu ~1 minit. Link akan jadi:
   `https://NAMA-ANDA.github.io/robosoccer-pad/`

## Pasang ke Android
1. Buka link di atas guna **Chrome** (Android).
2. Tekan butang **PASANG** dalam app, ATAU menu Chrome (⋮) > *Add to Home screen*.
3. Buka app dari home screen > **SAMBUNG** > pilih `ROBOSOCCER`.

## Nota
- Web Bluetooth WAJIB HTTPS — GitHub Pages dah sediakan secara automatik.
- iPhone: Safari tak sokong Web Bluetooth. Guna app browser **Bluefy**.
- Robot mesti dah upload firmware `ROBOSOCCER_ESP32.ino` dan hidup.

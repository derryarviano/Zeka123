# Zeka123

Implementasi utama Zeka123 sekarang menggunakan Flutter dan berada di folder `flutter_app`.

## Menjalankan aplikasi

```powershell
cd flutter_app
C:\Users\asus\flutter\bin\flutter.bat run -d chrome
```

## Pemeriksaan kualitas

```powershell
cd flutter_app
C:\Users\asus\flutter\bin\flutter.bat analyze
C:\Users\asus\flutter\bin\flutter.bat test
C:\Users\asus\flutter\bin\flutter.bat build web --release --output ..\dist
```

Target yang disiapkan: Android, iOS, dan web. Folder React lama dipertahankan hanya sebagai arsip migrasi; build aktif dan konfigurasi hosting menggunakan hasil Flutter di `dist`.

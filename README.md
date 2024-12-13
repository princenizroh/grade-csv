# csv-read-file

To install dependencies:



```bash
bun install
```
Proyek Konversi Data CSV dan JSON
Proyek ini membantu Anda untuk:

1. Mengonversi file CSV menjadi JSON.
2. Memberikan penilaian kepada mahasiswa berdasarkan kelompok (input nilai masih manual tetapi menggunakan file json)
3. Mengonversi file JSON yang telah diperbarui menjadi file CSV dengan format yang sesuai.

Persiapan masukkan csv ke folder Alpro

Tata Cara Penggunaan
1. Konversi CSV ke JSON (index.ts)
Skrip ini membaca semua file CSV dalam folder Alpro dan mengonversinya menjadi JSON. 
File hasil konversi disimpan di folder file-json/.

```bash
bun run index.ts
```
2. Memberikan Penilaian Berdasarkan Kelompok (evaluate.ts)
Skrip ini memilih kelompok mahasiswa berdasarkan NIM yang terdapat di code (nanti edit sendiri), 
melihat anggotanya, dan memberikan nilai. 
Nilai yang dimasukkan akan diperbarui di file JSON.

sebelum itu pastikan ubah nama file json di code evaluat.ts yang ada di folder file-json
``` bash
const dataPath = path.resolve(__dirname, './file-json/<nama file>.json');
```
lalu ubah nimnya berdasarkan kelompok

```bash
bun run evaluate.ts
```
3. Konversi JSON ke CSV (jsonToCsv.ts)
Skrip ini membaca file JSON dari folder file-json/ dan menyimpannya dalam folder fix-csv/ sebagai file CSV.

```bash
bun run jsonToCsv.ts
```

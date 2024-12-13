import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';

type Data = {
    "${Tanda pengenal": string;
    "Nama lengkap": string;
    "Alamat surel": string;
    Status: string;
    Nilai: string | null;
    "Nilai maksimum": string;
    "Nilai bisa diubah": string;
    "Terakhir diubah (ajuan)": string | null;
    "Terakhir diubah (nilai)": string | null;
    "Komentar umpan balik.": string | null;
};

const inputDir = path.resolve(__dirname, './file-csv/');
const outputDir = path.resolve(__dirname, './file-json/');

// Membaca semua file CSV dari folder input
const fileList = fs.readdirSync(inputDir).filter(file => file.endsWith('.csv'));

const processCSV = async () => {
    for (const file of fileList) {
        const filePath = path.join(inputDir, file);
        let fileContent = fs.readFileSync(filePath, 'utf-8');

        // Hapus karakter BOM jika ada
        if (fileContent.charCodeAt(0) === 0xFEFF) {
            fileContent = fileContent.slice(1);
        }

        parse(
            fileContent,
            {
                columns: true,
                skip_empty_lines: true,
                trim: true,
                delimiter: ',', // Pastikan delimiter sesuai dengan format CSV
                quote: '"',     // Menangani tanda kutip di dalam CSV
            },
            (err, records: Data[]) => {
                if (err) {
                    console.error(`Error reading file ${file}:`, err);
                    return;
                }

                console.log(`File ${file} berhasil diproses.`);

                // Simpan hasil parsing ke dalam file JSON
                const outputPath = path.join(outputDir, file.replace('.csv', '.json'));
                fs.writeFileSync(outputPath, JSON.stringify(records, null, 2));
                console.log(`File JSON disimpan di: ${outputPath}`);
            }
        );
    }
};

processCSV();

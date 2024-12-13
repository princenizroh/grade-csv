import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';

type Data = {
    "Tanda pengenal": string;
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

const inputDirectoryPath = path.resolve(__dirname, './file-csv');
const outputDirectoryPath = path.resolve(__dirname, './file-json');

// Pastikan folder output ada, jika tidak, buat foldernya
if (!fs.existsSync(outputDirectoryPath)) {
    fs.mkdirSync(outputDirectoryPath);
}

const processCSVFiles = async () => {
    // Baca semua file di folder "Alpro H"
    const files = fs.readdirSync(inputDirectoryPath).filter((file) => file.endsWith('.csv'));

    for (const file of files) {
        const filePath = path.resolve(inputDirectoryPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        // Periksa apakah ada byte order mark (BOM) di awal file
        const contentWithoutBOM = fileContent.charCodeAt(0) === 0xFEFF ? fileContent.slice(1) : fileContent;

        parse(
            contentWithoutBOM,
            {
                columns: true,
                skip_empty_lines: true,
                trim: true,
            },
            (err, records: Data[]) => {
                if (err) {
                    console.error(`Error reading CSV file (${file}):`, err);
                    return;
                }

                console.log(`Processing file: ${file}`);
                console.log(`Parsed records from ${file}:`, JSON.stringify(records, null, 2));

                // Buat nama file JSON berdasarkan file CSV
                const outputFileName = file.replace('.csv', '.json');
                const outputFilePath = path.resolve(outputDirectoryPath, outputFileName);

                // Simpan data sebagai JSON
                fs.writeFileSync(outputFilePath, JSON.stringify(records, null, 2));
                console.log(`File JSON disimpan: ${outputFilePath}`);
            }
        );
    }
};

processCSVFiles().catch((err) => {
    console.error('Error processing CSV files:', err);
});

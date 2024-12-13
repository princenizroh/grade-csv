import * as fs from 'fs';
import * as path from 'path';

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long', 
    year: 'numeric',    
    month: 'long',
    day: '2-digit',  
    hour: '2-digit', 
    minute: '2-digit' 
  };
  return date.toLocaleString('en-US', options); 
};

const jsonDirectoryPath = path.resolve(__dirname, './file-json');
const csvDirectoryPath = path.resolve(__dirname, './fix-csv');

const fileList = fs.readdirSync(jsonDirectoryPath).filter(file => file.endsWith('.json'));

const convertJsonToCsv = (jsonData: any) => {
  const header = [
    '"Tanda pengenal"', '"Nama lengkap"', 'Alamat surel', 'Status', 'Nilai', '"Nilai maksimum"',
    '"Nilai bisa diubah"', '"Terakhir diubah (ajuan)"', '"Terakhir diubah (nilai)"', '"Komentar umpan balik."'
  ];

  const rows = jsonData.map((item: any) => {
    const currentDateTime = formatDate(new Date());  
    let status = item["Status"];

    if (status.includes("Terkirim dan siap dinilai") && item["Nilai"] !== "") {
      status = "Terkirim dan siap dinilai - Telah dinilai";
    }

    return [
      item["Tanda pengenal"],
      `"${item["Nama lengkap"]}"`,
      item["Alamat surel"],  
      `"${status}"`,
      item["Nilai"] ? `"${item["Nilai"]}"` : '',
      `"${item["Nilai maksimum"]}"`,
      `"${item["Nilai bisa diubah"]}"`,
      `"${item["Terakhir diubah (ajuan)"]}"`,
      item["Nilai"] ? `"${currentDateTime}"` : `"${item["Terakhir diubah (nilai)"]}"`, 
      `"${item["Komentar umpan balik."]}"`
    ].join(',');
  });

  return [header.join(','), ...rows].join('\n');
};

const convertFiles = () => {
  fileList.forEach((file) => {
    const jsonDataPath = path.resolve(jsonDirectoryPath, file);
    const jsonData = JSON.parse(fs.readFileSync(jsonDataPath, 'utf-8'));

    const csvData = convertJsonToCsv(jsonData);

    const csvFileName = file.replace('.json', '.csv');
    const csvFilePath = path.resolve(csvDirectoryPath, csvFileName);

    fs.writeFileSync(csvFilePath, csvData);
    console.log(`File CSV untuk ${file} telah disimpan di ${csvFilePath}`);
  });
};

convertFiles();

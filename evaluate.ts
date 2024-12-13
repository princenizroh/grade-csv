import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const dataPath = path.resolve(
  __dirname, 
  './file-json/example.json'
);

const kelompokData: any = {
    1: ["10241031", "11241002", "16241006", "16241030", "20241064", "20241082"],
    2: ["10241013", "16241024", "17241001", "17241043", "20241040", "20241058"],
    3: ["11241014", "11241050", "11241074", "11241080", "11241092", "20241004"],
    4: ["10241019", "10241055", "11241008", "16241036", "16241042", "16241048"],
    5: ["10241001", "11241056", "11241068", "16241012", "16241018", "17241025"],
    6: ["10241007", "10241037", "10241061", "10241067", "10241073", "11241086"],
    7: ["10241025", "10241043", "20241010", "20241016", "20241022", "20241088"],
    8: ["11241026", "11241038", "17241007", "17241013", "20241028", "20241076"],
    9: ["10241049", "17241019", "17241037", "20241034", "20241046", "20241070"],
    10: ["11241020", "11241032", "11241044", "11241062", "17241031", "20241052"],
    11: ["11161099", "11161098"]
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const assignGrades = async () => {
  const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  Object.keys(kelompokData).forEach((kelompok) => {
    console.log(`Kelompok ${kelompok}:`);
  })

  rl.question("Pilih kelompok: ", (kelompok) => {
    if (!kelompokData[kelompok]) {
      console.error('Kelompok tidak ditemukan');
      rl.close();
      return;
    }

    const anggota = kelompokData[kelompok];
    console.log(`Anggota kelompok ${kelompok}:`, anggota);

    anggota.forEach((id: any) => {
      const mahasiswa = jsonData.find((item: any) => 
        item["Alamat surel"].includes(`${id}@student.itk.ac.id`));

      if (mahasiswa) {
        console.log(`- ${mahasiswa["Nama lengkap"]} (${mahasiswa["Alamat surel"]})`);
      }
    });

    rl.question(`Masukkan nilai untuk kelompok ${kelompok}: `, (nilai) => {
      anggota.forEach((id: any) => {
        const mahasiswa = jsonData.find((item: any) => item["Alamat surel"].includes(`${id}@student.itk.ac.id`));

        if (mahasiswa) {
          console.log(`Mengubah nilai ${mahasiswa["Nama lengkap"]} (${mahasiswa["Alamat surel"]}) menjadi ${nilai}`);
          mahasiswa["Nilai"] = nilai;
        } else {
          console.log(`Mahasiswa dengan ID ${id} tidak ditemukan`);
        }
      });
      fs.writeFileSync(dataPath, JSON.stringify(jsonData, null, 2));
      console.log(`Nilai untuk kelompok ${kelompok} telah disimpan`);

      rl.close();
    })
  })
}

assignGrades();

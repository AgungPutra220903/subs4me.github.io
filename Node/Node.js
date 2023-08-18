const simpleGit = require('simple-git');
const path = require('path');

// Path ke direktori repositori lokal Anda
const repoPath = path.join(__dirname, '/');

// Inisialisasi repositori dengan path ke direktori repositori lokal Anda
const git = simpleGit(repoPath);

// Buat perubahan di repositori Anda

// Lakukan commit
git.add('.')
   .commit("Pesan commit Anda", (commitError, commitResult) => {
       if (commitError) {
           console.error("Terjadi kesalahan saat melakukan commit:", commitError);
       } else {
           console.log("Commit berhasil:", commitResult);

           // Lakukan push ke repositori jarak jauh (GitHub)
           git.push('origin', 'nama-branch-anda', (pushError, pushResult) => {
               if (pushError) {
                   console.error("Terjadi kesalahan saat melakukan push:", pushError);
               } else {
                   console.log("Push berhasil:", pushResult);
               }
           });
       }
   });

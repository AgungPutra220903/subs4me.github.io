var jsonData={"judul":"QVBLIFNHTVggQVVUTyBIRUFEU0hPVCAxMDAlIFdPUks=","tanggal":"MjAyMy0wOC0yMA==","subs1":"aHR0cHM6Ly95b3V0dWJlLmNvbS9AYWd1bmdvZmZpY2lhbHBiMjUwOQ==","dwn1":"aHR0cHM6Ly9tZWRpYWZvbGRlci5teS5pZC8/ZHduPXNlbWFuZ2thJTIwdmlyYWwubXA0","m":"1"}; function getQueryParameter(name) {
  return jsonData[name] ? jsonData[name] : null;
}

function decodeURLParam(param) {
  return param ? atob(param) : null;
}

function addButton(parentDiv, className, text, link, isDisabled = true) {
  const button = document.createElement('button');
  button.className = className;
  button.textContent = text;
  button.setAttribute('data-link', link);
  button.disabled = isDisabled;
  parentDiv.appendChild(button);
}

document.addEventListener('DOMContentLoaded', function() {
  const encodedPassword = getQueryParameter('password1');
  const password = decodeURLParam(encodedPassword);
  let topButtonActivated = false;

  const container = document.getElementById('container');
  const expMessage = document.getElementById('exp');

  if (password) {
    document.getElementById('passwordModal').style.display = 'block';

    document.getElementById('submitPassword').addEventListener('click', function() {
      const userPassword = document.getElementById('userPasswordInput').value;
      if (userPassword === password) {
        document.getElementById('passwordModal').style.display = 'none';
        topButtonActivated = true;

        // Aktifkan hanya tombol yang berada di paling atas
        const buttons = document.querySelectorAll('.wc-stu-btn');
        buttons.forEach((button, index) => {
          button.disabled = !topButtonActivated || index > 0;
        });
      } else {
        alert('Invalid Password! Please try again.');
      }
    });
  }

  const encodedJudul = getQueryParameter('judul');
  const judul = decodeURLParam(encodedJudul);
  const judulContainer = document.getElementById('judulContainer');
  judulContainer.textContent = judul;

  const encodedFoto = getQueryParameter('foto');
  const foto = decodeURLParam(encodedFoto);
  if (foto) {
    const fotoElement = document.createElement('img');
    fotoElement.src = foto;
    fotoElement.className = "img-fluid";
    judulContainer.appendChild(fotoElement);
  }

  const encodedTanggal = getQueryParameter('tanggal');
  const tanggal = decodeURLParam(encodedTanggal);
  if (tanggal) {
    const currentDate = new Date();
    const expirationDate = new Date(tanggal);
    if (currentDate >= expirationDate) {
      container.style.display = 'none';
      expMessage.style.display = 'block';
      expMessage.textContent = 'Link Expired';
    }
  }
});

// ... Kode lainnya untuk menambahkan tombol-tombol dan lainnya

const subsContainer = document.getElementById('container').appendChild(document.createElement('div'));
subsContainer.className = 'wc-bxdw-wrap shadow-sm mt-2';
const subsParamPrefix = 'subs';
let subsParamIndex = 1;
let encodedSubsParam = getQueryParameter(subsParamPrefix + subsParamIndex);

while (encodedSubsParam) {
  const subsParam = atob(encodedSubsParam);
  addButton(subsContainer, 'wc-stu-btn yt text-blue', 'Subscribe Channel', subsParam, subsParamIndex !== 1);
  subsParamIndex++;
  encodedSubsParam = getQueryParameter(subsParamPrefix + subsParamIndex);
}

const otherButtons = [
  { paramPrefix: 'ig', className: 'wc-stu-btn ig', text: 'Follow Instagram' },
  { paramPrefix: 'fb', className: 'wc-stu-btn fb', text: 'Follow Facebook' },
  { paramPrefix: 'like', className: 'wc-stu-btn like', text: 'Like My Video' },
  { paramPrefix: 'tiktok', className: 'wc-stu-btn tk', text: 'Follow Tiktok' },
  { paramPrefix: 'lon', className: 'wc-stu-btn lon', text: 'Subscribe & Bell' },
  { paramPrefix: 'dwn', className: 'wc-stu-btn lock', text: 'Get Link' }
];

for (const buttonInfo of otherButtons) {
  let paramIndex = 1;
  let encodedParam = getQueryParameter(buttonInfo.paramPrefix + paramIndex);
  while (encodedParam) {
    const decodedParam = atob(encodedParam);
    addButton(subsContainer, buttonInfo.className, buttonInfo.text, decodedParam);
    paramIndex++;
    encodedParam = getQueryParameter(buttonInfo.paramPrefix + paramIndex);
  }
}

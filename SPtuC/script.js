var jsonData={"judul":"QWd1bmcgRWth", "tanggal":"MjAyMy0wOC0xNw==", "like1":"aHR0cHM6Ly9hZ3VuZ2Rldi5pZA==", "subs1":"aHR0cHM6Ly9hZ3VuZ2Rldi5pZA==", "lon1":"aHR0cHM6Ly9hZ3VuZ2Rldi5pZA==", "ig1":"aHR0cHM6Ly9hZ3VuZ2Rldi5pZA==", "fb1":"aHR0cHM6Ly9hZ3VuZ2Rldi5pZA==", "tiktok1":"aHR0cHM6Ly9hZ3VuZ2Rldi5pZA==", "dwn1":"aHR0cHM6Ly9hZ3VuZ2Rldi5pZA==", "password1":"d2FuZGE=", "m":"1"};
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

    document.addEventListener('DOMContentLoaded', function () {
      const password = decodeURLParam(jsonData.password1);
      let topButtonActivated = false;

      const container = document.getElementById('container');
      const expMessage = document.getElementById('exp');

      if (password) {
        document.getElementById('passwordModal').style.display = 'block';

        document.getElementById('submitPassword').addEventListener('click', function () {
          const userPassword = document.getElementById('userPasswordInput').value;
          if (userPassword === password) {
            document.getElementById('passwordModal').style.display = 'none';
            topButtonActivated = true;

            const buttons = document.querySelectorAll('.wc-stu-btn');
            buttons.forEach((button, index) => {
              button.disabled = !topButtonActivated || index > 0;
            });
          } else {
            alert('Invalid Password! Please try again.');
          }
        });
      }

      const judul = decodeURLParam(jsonData.judul);
      const judulContainer = document.getElementById('judulContainer');
      judulContainer.textContent = judul;

      const subsContainer = document.getElementById('subsContainer');
      const subsParamPrefix = 'subs';
      let subsParamIndex = 1;
      let encodedSubsParam = jsonData[subsParamPrefix + subsParamIndex];

      while (encodedSubsParam) {
        const subsParam = atob(encodedSubsParam);
        addButton(subsContainer, 'wc-stu-btn yt text-blue', 'Subscribe Channel', subsParam, subsParamIndex !== 1);
        subsParamIndex++;
        encodedSubsParam = jsonData[subsParamPrefix + subsParamIndex];
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
        let encodedParam = jsonData[buttonInfo.paramPrefix + paramIndex];
        while (encodedParam) {
          const decodedParam = atob(encodedParam);
          addButton(subsContainer, buttonInfo.className, buttonInfo.text, decodedParam);
          paramIndex++;
          encodedParam = jsonData[buttonInfo.paramPrefix + paramIndex];
        }
      }
    });
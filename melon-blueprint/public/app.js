const apiKey = '7bd879ea392a70206c883c7d76e987c4';
const apiUrl = `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${apiKey}&format=json`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const tracks = data.tracks.track.sort((a, b) => b.playcount - a.playcount);
        const tableData = tracks.map((track) => {
            return {
              name: `${track.name} - ${track.artist.name}`,
              playcount: parseInt(track.playcount),
            };
          });
          
          const tableBody = document.querySelector('tbody');
          tableData.forEach((track, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${index + 1}</td>
              <td>${track.name}</td>
              <td style="display: none;">${track.playcount}</td>
            `;
            tableBody.appendChild(row);
          });
          
        
    });

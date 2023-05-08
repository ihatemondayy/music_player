const apiKey = '7bd879ea392a70206c883c7d76e987c4';
const apiUrl = `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=7bd879ea392a70206c883c7d76e987c4&format=json`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const tracks = data.tracks.track;
        const trackNames = tracks.map(track => track.name);
        const playCounts = tracks.map(track => track.playcount);
        const chartData = {
            labels: trackNames,
            datasets: [{
                label: 'Play Count',
                data: playCounts,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        };

        const chartOptions = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        };

        const chart = new Chart(document.getElementById('chart'), {
            type: 'bar',
            data: chartData,
            options: chartOptions
        });
    });
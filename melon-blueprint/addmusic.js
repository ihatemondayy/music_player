let youtubePlayer;

function onYouTubeIframeAPIReady() {
    youtubePlayer = new YT.Player('player', {
        height: '360',
        width: '640',
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    event.target.setVolume(100);
}

function getYoutubeIdFromUrl(url) {
    const regex = /^.*(?:(?:youtu.be\/)|(?:v\/)|(?:\/u\/\w\/)|(?:embed\/)|(?:watch\?))\??v?=?([^#\&\?]*).*/;
    const matches = url.match(regex);
    return (matches && matches[1].length == 11) ? matches[1] : false;
}

function addAndLoadVideo() {
    const urlInput = document.getElementById("videoUrl");
    const url = urlInput.value;
    const isYoutubeLink = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;

    if (isYoutubeLink.test(url)) {
        playlist.push(url);
        const videoId = getYoutubeIdFromUrl(url);
        youtubePlayer.loadVideoById(videoId);

        urlInput.value = '';
        urlInput.placeholder = '';
        showPlaylist(); // 화면 업데이트
    } else {
        urlInput.value = '';
        urlInput.placeholder = 'ERROR! WRONG LINK';
    }
}

document.getElementById("addAndLoadVideoButton").addEventListener("click", addAndLoadVideo);

const playlist = [];

function showPlaylist() {
    const playlistElement = document.createElement('div');
    playlistElement.className = 'playlist';

    for (let i = 0; i < playlist.length; i++) {
        const linkElement = document.createElement('p');
        linkElement.textContent = (i + 1) + '. ' + playlist[i];
        playlistElement.appendChild(linkElement);
    }

    const playlistContainer = document.getElementById('playlist-container');
    playlistContainer.innerHTML = '';
    playlistContainer.appendChild(playlistElement);
}

function playMusic() {
    if (playlist.length > 0) {
        const videoId = getYoutubeIdFromUrl(playlist[0]);
        youtubePlayer.loadVideoById(videoId);
    } else {
        alert('ADD MUSIC FIRST!');
    }
}

function pauseMusic() {
    youtubePlayer.pauseVideo();
}

document.getElementById('play').addEventListener('click', playMusic);
document.getElementById('pause').addEventListener('click', pauseMusic);

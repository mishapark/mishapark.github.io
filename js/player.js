var video = document.getElementById('video'),
    controls = document.getElementsByClassName('controls')[0],
    playPause = document.getElementsByClassName('playpause')[0],
    progress = document.getElementsByClassName('progress')[0],
    volume = document.getElementsByClassName('volume-input')[0],
    icon = document.getElementsByClassName('video__icon')[0],
    volumeIcon = document.getElementsByClassName('volume__icon')[0],
    updateProgress;

playPause.addEventListener('click', function() {
  if (playPause.className == 'playpause pause') {
    playPause.className = 'playpause play';
    icon.style.display = 'none';
    video.play();
  } else {
    playPause.className = 'playpause pause';
    video.pause();
    icon.style.display = 'block';
  }
});

icon.addEventListener('click', function() {
      playPause.className = 'playpause play';
      icon.style.display = 'none';
      video.play();
  });

video.addEventListener('click', function() {
if (playPause.className == 'playpause pause') {
    playPause.className = 'playpause play';
    icon.style.display = 'none';
    video.play();
} else {
    playPause.className = 'playpause pause';
    video.pause();
    icon.style.display = 'block';
}
});

video.addEventListener('play', function() {
  progress.max = Math.round(video.duration*10);
  updateProgress = setInterval(function() {
    progress.value = video.currentTime*10;
  }, 100);
});

volume.addEventListener('input', function() {
  video.volume = volume.value/100;
});

volumeIcon.addEventListener('click', function() {
    if (video.volume == 0) {
        video.volume = 1;
    } else {
        video.volume = 0;
    }
})

progress.addEventListener('input', function() {
  updateProgress = null;
  video.currentTime = progress.value/10
});
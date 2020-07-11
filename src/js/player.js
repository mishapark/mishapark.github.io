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

progress.addEventListener('input', function() {
  updateProgress = null;
  video.currentTime = progress.value/10
});


// заводим переменную "текущего значения громкости"
var currentVolume;
// начинаем обрабатывать клики по кнопке громкости
volumeIcon.addEventListener('click', function() {
    // если в момент клика громкость выключена
    if (video.volume === 0) {
      // выставляем громкость в "текущее значение громкости"
      video.volume = currentVolume/100;
      // обновляем ползунок
      volume.value = currentVolume;
      // применяем стили к кнопке на которую нажали
      this.style.fill = 'white';
    // иначе, если громкость в момент клика включена
    } else {
      // записываем в "текущее значение громкости" текущую громкость с ползунка
      currentVolume =  volume.value;
      // громкость видео выставляем в ноль
      video.volume = 0;
      // ползунок выставляем в ноль
      volume.value =  0;
      // применяем стили к кнопке на которую нажали
      this.style.fill = 'red';
    }
})
const video = $(".player__video");
const playerContainer = $(".player");
const playButton = $("#play-pause");

function togglePlayPause () {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
};
playButton.on("click", e => {
    togglePlayPause();
})



////////////////////////////////////



// interval = setInterval(() => {
//     const completedSec = player.getCurrentTime();
//     const completedPercent = (completedSec / durationSec) * 100;
  
//     $(".playback__bar--past").css({
//       width: `${completedPercent}%`
//     });
   

//   $(".playback__bar").click(e => {
//     const bar = $(e.currentTarget);
//     const clickedPosition = e.originalEvent.layerX;
    
//     const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
//     const newPlaybackPositionSec =
//       (player.getDuration() / 100) * newButtonPositionPercent;
    
//     $(".playback__bar--past").css({
//         width: `${newButtonPositionPercent}%` 
//     });
    
//     player.seekTo(newPlaybackPositionSec);
//    });
// });
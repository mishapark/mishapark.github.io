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
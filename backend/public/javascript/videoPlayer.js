const extractVideoId = (url) => {
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  }
};
let videoId = extractVideoId(localStorage.getItem("url"));

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  console.log("hello");
  player = new YT.Player("player", {
    height: "390",
    width: "640",
    videoId: videoId,
    playerVars: {
      playsinline: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}
// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
const videoEle = document.getElementById("video");
function onPlayerStateChange(event) {
  const eventValue = event.data;
  if (eventValue === 2 || eventValue == 3) {
    console.log(eventValue);
    let changeEvent = new CustomEvent("play-pause", {
      detail: {
        value: eventValue,
      },
    });
    videoEle.dispatchEvent(changeEvent);
  }
}
videoEle.addEventListener("play-pause-video", (e) => {
  const eventValue = e.detail.value;
  if (eventValue === 2) {
    console.log("video paused");
    player.pauseVideo();
  } else if (eventValue === 3) {
    player.playVideo();
    console.log("video played");
  }
  
});
function stopVideo() {
  player.stopVideo();
}
// videoPlayer functionalities

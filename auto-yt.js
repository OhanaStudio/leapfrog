<script>

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube-player', {
    videoId: 'awBrc84zZus', 
    playerVars: {
      'autoplay': 0,
      'controls': 1, 
      'mute': 1,     
      'showinfo': 0,
      'rel': 0,
      'modestbranding': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  player.setPlaybackQuality('hd1080'); 

  const videoWrap = document.querySelector('.video_player_wrap');
  const poster = videoWrap.querySelector('.video-poster-image');
  const playButtonWrap = videoWrap.querySelector('.player_button');
  const playIcon = playButtonWrap.querySelector('.btn_play_play');
  const pauseIcon = playButtonWrap.querySelector('.btn_play_pause');

  function updateIcons(isPlaying) {
    if (isPlaying) {
      gsap.to(playIcon, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
      gsap.to(pauseIcon, { opacity: 1, duration: 0.3, pointerEvents: 'auto' });
    } else {
      gsap.to(playIcon, { opacity: 1, duration: 0.3, pointerEvents: 'auto' });
      gsap.to(pauseIcon, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
    }
  }

  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    trigger: videoWrap,
    start: "top center",
    onEnter: () => {
      if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
        player.mute();
        player.playVideo();
        gsap.to(playButtonWrap, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
        gsap.to(poster, { opacity: 0, duration: 0.3 });
      }
    },
    onLeaveBack: () => {
      player.pauseVideo();
      gsap.to(playButtonWrap, { opacity: 1, duration: 0.3, pointerEvents: 'auto' });
      gsap.to(poster, { opacity: 1, duration: 0.3 });
    }
  });

  player.addEventListener('onStateChange', (event) => {
    updateIcons(event.data === YT.PlayerState.PLAYING);
  });


  player.addEventListener('onPlaybackQualityChange', (event) => {
    if (event.data !== 'hd1080') {
      player.setPlaybackQuality('hd1080');
    }
  });
}

function onPlayerStateChange(event) {
  const isPlaying = event.data === YT.PlayerState.PLAYING;
  updateIcons(isPlaying);
}

</script>

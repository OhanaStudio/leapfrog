<script>
pageFunctions.addFunction('videoPlayer', function() {
  // Ensure the script runs after the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    // Select all video player wrappers on the page
    const videoWrappers = document.querySelectorAll('.video_player_wrap');

    videoWrappers.forEach((videoWrap) => {
      const video = videoWrap.querySelector('.video-element');
      const poster = videoWrap.querySelector('.video-poster-image');
      const playButtonWrap = videoWrap.querySelector('.player_button');
      const playButton = playButtonWrap.querySelector('.g_clickable_btn');
      const playIcon = playButtonWrap.querySelector('.btn_play_play');
      const pauseIcon = playButtonWrap.querySelector('.btn_play_pause');

      // Function to update icons based on video state
      function updateIcons() {
        if (video.paused) {
          gsap.to(playIcon, { opacity: 1, duration: 0.3, pointerEvents: 'auto' });
          gsap.to(pauseIcon, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
        } else {
          gsap.to(playIcon, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
          gsap.to(pauseIcon, { opacity: 1, duration: 0.3, pointerEvents: 'auto' });
        }
      }

      // Function to play/pause the video
      function togglePlay() {
        if (video.paused) {
          video.play();
          gsap.to(playButtonWrap, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
          gsap.to(poster, { opacity: 0, duration: 0.3 });
        } else {
          video.pause();
          gsap.to(playButtonWrap, { opacity: 1, duration: 0.3, pointerEvents: 'auto' });
          gsap.to(poster, { opacity: 1, duration: 0.3 });
        }
        updateIcons(); // Update the icons after toggling play/pause
      }

      // Ensure play button toggles play/pause
      playButton.addEventListener('click', (e) => {
        e.preventDefault();
        togglePlay();
      });

      // Show play button on hover
      videoWrap.addEventListener('mouseenter', () => {
        if (!video.paused) {
          gsap.to(playButtonWrap, { opacity: 1, duration: 0.3, pointerEvents: 'auto' });
        }
      });

      // Hide play button when not hovering and video is playing
      videoWrap.addEventListener('mouseleave', () => {
        if (!video.paused) {
          gsap.to(playButtonWrap, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
        }
      });

      // Ensure poster reappears and play icon shows when video ends
      video.addEventListener('ended', () => {
        gsap.to(playButtonWrap, { opacity: 1, duration: 0.3, pointerEvents: 'auto' });
        gsap.to(poster, { opacity: 1, duration: 0.3 });
        updateIcons(); // Show play icon when the video ends
      });

      // Initialize correct icon state
      updateIcons();
    });
  });
});

</script>

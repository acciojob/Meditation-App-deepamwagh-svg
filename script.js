//your JS code here. If required.
	const audio = document.getElementById("audio");
    const video = document.getElementById("video");
    const playBtn = document.getElementById("play");
    const timeDisplay = document.getElementById("time-display");
    const timeButtons = document.querySelectorAll(".time-select button");
    const soundButtons = document.querySelectorAll(".sound-picker button");
    const circle = document.querySelector(".circle-progress");

    let duration = 600;
    let isPlaying = false;

    const circumference = 820;
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;

    function formatTime(sec) {
      let m = Math.floor(sec / 60);
      let s = sec % 60;
      return `${m}:${s < 10 ? "0" + s : s}`;
    }

    playBtn.addEventListener("click", () => {
      if (!isPlaying) {
        audio.play();
        video.play();
        isPlaying = true;
      } else {
        audio.pause();
        video.pause();
        isPlaying = false;
      }
    });

    timeButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        duration = parseInt(btn.dataset.time);
        audio.currentTime = 0;
        timeDisplay.textContent = formatTime(duration);
        circle.style.strokeDashoffset = circumference;
      });
    });

    soundButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        audio.src = btn.dataset.sound;
        video.src = btn.dataset.video;
        if (isPlaying) {
          audio.play();
          video.play();
        }
      });
    });

    audio.addEventListener("timeupdate", () => {
      let current = audio.currentTime;
      let remaining = duration - current;

      if (remaining <= 0) {
        audio.pause();
        video.pause();
        isPlaying = false;
        audio.currentTime = 0;
      }

      timeDisplay.textContent = formatTime(Math.floor(remaining));
      circle.style.strokeDashoffset = circumference - (current / duration) * circumference;
    });

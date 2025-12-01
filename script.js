let selectedTime = 0;
let countdown;
const display = document.getElementById("timer-display");
const ring = document.querySelector(".ring-progress");
const totalLength = 565;

// TIME BUTTONS
document.querySelectorAll(".time-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        selectedTime = btn.dataset.time;
        display.innerHTML = formatTime(selectedTime);
    });
});

// FORMAT MM:SS
function formatTime(sec) {
    let m = Math.floor(sec / 60);
    let s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// START BUTTON
document.getElementById("start-btn").addEventListener("click", () => {
    if (!selectedTime) return;

    let remaining = selectedTime;
    clearInterval(countdown);

    countdown = setInterval(() => {
        remaining--;
        display.innerHTML = formatTime(remaining);

        let progress = totalLength - (remaining / selectedTime) * totalLength;
        ring.style.strokeDashoffset = progress;

        if (remaining <= 0) {
            clearInterval(countdown);
        }
    }, 1000);
});

// WEATHER BUTTONS — using ONLINE video & audio
const video = document.getElementById("relax-video");
const audio = document.getElementById("relax-audio");

document.getElementById("beach-btn").addEventListener("click", () => {
    video.src = "https://cdn.coverr.co/videos/coverr-tropical-beach-9070/1080p.mp4";
    audio.src = "https://www.fesliyanstudios.com/play-mp3/387";
    audio.play();
});

document.getElementById("rain-btn").addEventListener("click", () => {
    video.src = "https://cdn.coverr.co/videos/coverr-rain-on-window-2385/1080p.mp4";
    audio.src = "https://www.fesliyanstudios.com/play-mp3/4382";
    audio.play();
});

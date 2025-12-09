// List your videos here
const videos = [
  "videos/video1.mp4",
  "videos/video2.mp4",
  "videos/video3.mp4"
];

let index = 0;
const player = document.getElementById("player");
const playlistEl = document.getElementById("playlist");

// Display playlist
videos.forEach((video, i) => {
  const li = document.createElement("li");
  li.textContent = video.replace("videos/", "");
  li.addEventListener("click", () => {
    index = i;
    playVideo();
  });
  playlistEl.appendChild(li);
});

function updateActive() {
  Array.from(playlistEl.children).forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });
}

function playVideo() {
  player.src = videos[index];
  player.play();
  updateActive();
}

function next() {
  index = (index + 1) % videos.length;
  playVideo();
}

function prev() {
  index = (index - 1 + videos.length) % videos.length;
  playVideo();
}

function shuffle() {
  index = Math.floor(Math.random() * videos.length);
  playVideo();
}

// Autoplay next video
player.addEventListener("ended", next);

// Start the first video
playVideo();

let videos = [];
let index = 0;
const player = document.getElementById("player");
const playlistEl = document.getElementById("playlist");

document.getElementById("filePicker").addEventListener("change", (e) => {
  videos = Array.from(e.target.files)
    .filter(file => file.type.startsWith("video"))
    .sort((a, b) => a.name.localeCompare(b.name)); // sort alphabetically

  playlistEl.innerHTML = "";
  videos.forEach((file, i) => {
    const li = document.createElement("li");
    li.textContent = file.name;
    li.addEventListener("click", () => {
      index = i;
      playVideo();
    });
    playlistEl.appendChild(li);
  });

  playVideo();
});

function updateActive() {
  Array.from(playlistEl.children).forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });
}

function playVideo() {
  if (videos.length === 0) return;
  const file = videos[index];
  const url = URL.createObjectURL(file);
  player.src = url;
  player.play();
  updateActive();
}

function next() {
  if (videos.length === 0) return;
  index = (index + 1) % videos.length;
  playVideo();
}

function prev() {
  if (videos.length === 0) return;
  index = (index - 1 + videos.length) % videos.length;
  playVideo();
}

function shuffle() {
  if (videos.length === 0) return;
  index = Math.floor(Math.random() * videos.length);
  playVideo();
}

player.addEventListener("ended", next);

const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const currTime = document.querySelector("#currTime");
const durTime = document.querySelector("durTime");

/*----------Song Title---------- */
const songs = [
  "Juice WRLD Ft Benny Blanco - Real Shit",
  "Lil Baby, Lil Durk ft Roadwave - Rich Off Pain",
  "Polo G - I know",
  "Spyro - Who is Your guy?",
];

/* -----------------Keep Track Of Songs-----------*/
let songIndex = 2;

/*------------------Initially load Song details into DOM----------*/

loadSong(songs[songIndex]);

/* ------------------Play Song--------------*/

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

/*----------------Update Song Details--------------*/

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

/*------pause song----- */
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

/*-------Previous Song-------*/

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

/*---------------Next Song-----------*/

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

/*---------Update progress Bar---------*/

function updateProgress(e) {
  const { duration, currTime } = e.srcElement;
  const progressPercent = (currTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

/* ----- Set progress bar ------*/

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currTime = (clickX / width) * duration;
}

/**------Event Listeners------- */

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

/**---------Change Song -------- */

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

/* -------Time/Song Update------- */

audio.addEventListener("timeupdate", updateProgress);

/* ------Click On Progress bar -------- */

progressContainer.addEventListener("click", setProgress);

/* -------Sound Ends ------- */

audio.addEventListener("ended", nextSong);

/* --------Time Of Song---------- */

audio.addEventListener("timeupdate", durTime);

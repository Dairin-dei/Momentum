let currentTrekNumber;
let isPlay = false;
let currentSoundLevel;

export function audioFunctions(playList) {
  const audio = new Audio();

  organizePlayer();

  createPlayList(playList);

  createEventListeners(playList, audio);
}

function organizePlayer() {
  let timeline = document.querySelector(".timeline");
  let soundlevel = document.querySelector(".soundlevel");
  let spanTimeNow = document.querySelector(".time-trek");

  timeline.value = 0;

  spanTimeNow.textContent = "0:00 / 0:00";

  soundlevel.value = 50;
  currentSoundLevel = 0.5;
  setInputColor(timeline, timeline.value);
  setInputColor(soundlevel, soundlevel.value);
}

function setInputColor(elem, value) {
  elem.style.background = `linear-gradient(
        to right,
        var(--silver) ${String(value)}%,
        var(--silver) ${String(value)}%,
        #fff ${value}%,
        #fff 100%)`;
}

function createPlayList(playList) {
  let ulPlaylist = document.querySelector(".play-list");
  playList.forEach((elem) => {
    let liAudio = document.createElement("li");
    liAudio.textContent = elem.title;
    liAudio.classList.add("play-item");
    ulPlaylist.append(liAudio);
  });
}

function createEventListeners(playList, audio) {
  let buttonSoundPlay = document.querySelector(".play");
  let buttonSoundNext = document.querySelector(".play-next");
  let buttonSoundPrev = document.querySelector(".play-prev");
  let buttonSoundOnOff = document.querySelector(".btn-sound");
  let trekList = document.querySelectorAll("li");
  let trekName = document.querySelector(".trek-name");
  let timeline = document.querySelector(".timeline");
  let soundlevel = document.querySelector(".soundlevel");
  let spanTimeNow = document.querySelector(".time-trek");

  let currentTime = 0;

  trekName.textContent = playList[0].title;

  currentTrekNumber = 0;

  buttonSoundPlay.addEventListener("click", playStopTrek);
  buttonSoundPrev.addEventListener("click", () => changeAndPlayTrek("prev"));
  buttonSoundNext.addEventListener("click", () => changeAndPlayTrek("next"));
  buttonSoundOnOff.addEventListener("click", SoundOnOff);
  audio.addEventListener("ended", () => changeAndPlayTrek("next"));

  audio.addEventListener("timeupdate", () => {
    followTimeline();
    changeTimeText();
  });

  timeline.addEventListener("input", changeTimeline);
  soundlevel.addEventListener("input", changeSoundlevel);

  trekList.forEach((elemLi, index) => {
    elemLi.addEventListener("click", (e) => playTrekByOne(e, index));
  });

  addClass("play-trek", 5, false);

  function playStopTrek() {
    audio.src = playList[currentTrekNumber].src;
    addClass("item-active", currentTrekNumber, true);
    removeClass("item-active", currentTrekNumber, false);
    addClass("play-trek", currentTrekNumber, true);
    removeClass("pause-trek", currentTrekNumber, false);

    if (isPlay) {
      audio.pause();
      addClass("play-trek", 5, false);
      removeClass("pause-trek", 5, false);
    } else {
      audio.currentTime = currentTime;
      audio.play();
      trekName.textContent = playList[currentTrekNumber].title;

      addClass("pause-trek", currentTrekNumber, true);
      removeClass("pause-trek", currentTrekNumber, false);
      removeClass("play-trek", currentTrekNumber, true);
      addClass("play-trek", currentTrekNumber, false);
    }

    changeAudioLook();
    changeIsPlay();
  }

  function playTrekByOne(e, index) {
    console.log(e);
    if (e.offsetX <= 11) {
      if (currentTrekNumber != index) {
        currentTrekNumber = index;
        audio.src = playList[currentTrekNumber].src;
        addClass("pause-trek", currentTrekNumber, true);
        removeClass("pause-trek", currentTrekNumber, false);
        removeClass("play-trek", currentTrekNumber, true);
        addClass("play-trek", currentTrekNumber, false);

        addClass("item-active", currentTrekNumber, true);
        removeClass("item-active", currentTrekNumber, false);

        audio.currentTime = 0;
        audio.play();
        trekName.textContent = playList[currentTrekNumber].title;
        if (!isPlay) {
          changeIsPlay();
          changeAudioLook();
        }
      } else {
        if (isPlay) {
          audio.pause();
          addClass("play-trek", 5, false);
          removeClass("pause-trek", 5, false);
          changeAudioLook();
          changeIsPlay();
        } else {
          currentTrekNumber = index;
          audio.src = playList[currentTrekNumber].src;

          addClass("pause-trek", currentTrekNumber, true);
          removeClass("pause-trek", currentTrekNumber, false);
          removeClass("play-trek", currentTrekNumber, true);
          addClass("play-trek", currentTrekNumber, false);

          addClass("item-active", currentTrekNumber, true);
          removeClass("item-active", currentTrekNumber, false);

          audio.currentTime = 0;
          audio.play();
          trekName.textContent = playList[currentTrekNumber].title;
          if (!isPlay) {
            changeIsPlay();
            changeAudioLook();
          }
        }
      }
    }
  }

  function changeIsPlay() {
    isPlay = !isPlay ? (isPlay = true) : (isPlay = false);
  }

  function changeAudioLook() {
    buttonSoundPlay.classList.toggle("pause");
    buttonSoundPlay.classList.toggle("player-icon");
  }

  function changeAndPlayTrek(direction) {
    if (direction == "next") {
      currentTrekNumber =
        currentTrekNumber == 3
          ? (currentTrekNumber = 0)
          : (currentTrekNumber += 1);
    } else {
      currentTrekNumber =
        currentTrekNumber == 0
          ? (currentTrekNumber = 3)
          : (currentTrekNumber += -1);
    }
    currentTime = 0;
    addClass("item-active", currentTrekNumber, true);
    removeClass("item-active", currentTrekNumber, false);
    addClass("play-trek", currentTrekNumber, true);
    removeClass("pause-trek", currentTrekNumber, false);
    if (isPlay) {
      changeIsPlay();
      changeAudioLook();
    }

    playStopTrek();
  }

  function changeTimeline() {
    if (!isNaN(audio.duration)) {
      audio.currentTime = Math.round((timeline.value * audio.duration) / 100);

      setInputColor(timeline, timeline.value);
    }
  }

  function followTimeline() {
    if (!isNaN(audio.duration)) {
      timeline.value = Math.round((audio.currentTime / audio.duration) * 100);
      setInputColor(timeline, timeline.value);
      currentTime = audio.currentTime;
    }
  }

  function changeTimeText() {
    spanTimeNow.textContent = `${getVisualTime(
      audio.currentTime == 0 ? currentTime : audio.currentTime
    )} / ${playList[currentTrekNumber].duration}`;
  }

  function changeSoundlevel() {
    if (audio.muted) {
      audio.volume = soundlevel.value / 100;
    }
    setInputColor(soundlevel, soundlevel.value);
    currentSoundLevel = soundlevel.value / 100;
  }

  function SoundOnOff() {
    buttonSoundOnOff.classList.toggle("mute");
    buttonSoundOnOff.classList.toggle("sound");

    if (audio.muted) {
      audio.volume = currentSoundLevel;
      audio.muted = false;
    } else {
      audio.volume = 0;
      audio.muted = true;
    }

    setInputColor(soundlevel, soundlevel.value);
  }

  function getVisualTime(value) {
    return `${String(Math.floor(value / 60)).padStart(1, "0")}:${String(
      Math.round(value % 60)
    ).padStart(2, "0")}`;
  }
  function addClass(classAdd, currentNumber, thisItem) {
    if (thisItem) {
      trekList[currentNumber].classList.add(classAdd);
    } else {
      for (let i = 0; i < trekList.length; i++) {
        if (i != currentNumber) {
          trekList[i].classList.add(classAdd);
        }
      }
    }
  }

  function removeClass(classRemove, currentNumber, thisItem) {
    if (thisItem) {
      trekList[currentNumber].classList.remove(classRemove);
    } else {
      for (let i = 0; i < trekList.length; i++) {
        if (i != currentNumber) {
          trekList[i].classList.remove(classRemove);
        }
      }
    }
  }
}

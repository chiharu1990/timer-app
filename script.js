let remainingTime = 0;
let lastSelectRemainingTime = 0;
let timerIntervalId = null;
const repetition = document.querySelector(".repetition");
const timerSelect = document.querySelector(".timer-select");
const isVisibleClass = "is-visible";
const isHiddenClass = "is-hidden";

// タイマーをセットする関数
const timer = () => {
  if (timerIntervalId !== null) return;
  timerIntervalId = setInterval(countdown, 1000);
  timerSelect.classList.add(isHiddenClass);
}

// タイマーの形式でカウントダウンする関数
const countdown = () => {
  if (remainingTime > 0){
    remainingTime -= 1;
    timeSeparate(remainingTime);
  } else {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
    console.log("タイマー終了");
    repetition.classList.add(isVisibleClass);
    timerSelect.classList.add(isHiddenClass);
  }
}

// タイマーの存在を確認して動いていたら止める関数
const clearTimer = () => {
  if (timerIntervalId !== null) {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
  };
}

// タイマーの秒数を分と秒に分割する関数
const timeSeparate = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  document.getElementById("timer-display").textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// 引数を受け取って引数分のタイマーをスタートさせる関数
const startTimer = (seconds) => {
  clearTimer();
  remainingTime = seconds;
  lastSelectRemainingTime = seconds;
  timeSeparate(seconds);
  timer();
  repetition.classList.remove(isVisibleClass);
}

// イベント登録
document.getElementById("timer-fiveMinutes").addEventListener("click", () => {
  startTimer(5);
});

document.getElementById("timer-tenMinutes").addEventListener("click", () => {
  startTimer(10);
});

document.getElementById("timer-repetition").addEventListener("click", () => {
  startTimer(lastSelectRemainingTime);
});

document.getElementById("repetition-fiveMinutes").addEventListener("click", () => {
  startTimer(5);
});

document.getElementById("repetition-tenMinutes").addEventListener("click", () => {
  startTimer(10);
});
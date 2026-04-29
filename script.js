let remainingTime = 0;
let lastSelectRemainingTime = 0;
let timerIntervalId = null;
let totalSetCount = 0;
let totalTime = 0;
const repetition = document.querySelector(".repetition");
const timerDisplay = document.getElementById("timer-display");
const timerSelect = document.querySelector(".timer-select");
const end =  document.querySelector(".end-display");
const setCountDisplay = document.getElementById("setCount-display");
const totalTimeDisplay = document.getElementById("totalTime-display");
const isVisibleClass = "is-visible";
const isHiddenClass = "is-hidden";

// タイマーの形式でカウントダウンする関数
const countdown = () => {
  if (remainingTime > 0){
    remainingTime -= 1;
    timeSeparate(remainingTime);
  } else {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
    totalSetCount += 1;
    totalTime += lastSelectRemainingTime;
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
  timerIntervalId = setInterval(countdown, 1000);
  timerSelect.classList.add(isHiddenClass);
  repetition.classList.remove(isVisibleClass);
}

// イベント登録
document.getElementById("timer-fiveMinutes").addEventListener("click", () => {
  startTimer(300);
});

document.getElementById("timer-tenMinutes").addEventListener("click", () => {
  startTimer(600);
});

document.getElementById("timer-repetition").addEventListener("click", () => {
  startTimer(lastSelectRemainingTime);
});

document.getElementById("repetition-fiveMinutes").addEventListener("click", () => {
  startTimer(300);
});

document.getElementById("repetition-tenMinutes").addEventListener("click", () => {
  startTimer(600);
});

document.getElementById("timer-end").addEventListener("click", () => {
  const minutes = Math.floor(totalTime / 60);
  repetition.classList.remove(isVisibleClass);
  end.classList.add(isVisibleClass);
  timerDisplay.classList.add(isHiddenClass);
  setCountDisplay.textContent = `${totalSetCount}セット完了`;
  totalTimeDisplay.textContent = `今日は${minutes}分集中しました！`;
});

document.getElementById("start-beginning").addEventListener("click", () => {
  timerDisplay.classList.remove(isHiddenClass);
  timerSelect.classList.remove(isHiddenClass);
  end.classList.remove(isVisibleClass);
  totalSetCount = 0;
  totalTime = 0;
});
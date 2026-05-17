let remainingTime = 0;
let lastSelectRemainingTime = 0;
let timerIntervalId = null;
let setCount = 0;
let timeCount = 0;
let totalSetCount = 0;
let totalTime = 0;
let isPaused =false;
const firstView = document.querySelector(".first-view");
const timerView = document.querySelector(".timer-view");
const timerViewTimeCount = document.getElementById("timer-view-timeCount");
const timerViewSetCount = document.getElementById("timer-view-setCount");
const progressCircle = document.querySelector(".timer-view__progress-circle");
const repetitionView= document.querySelector(".repetition-view");
const endView =  document.querySelector(".end-view");
const totalSetCountDisplay = document.getElementById("totalSetCount-display");
const totalTimeDisplay = document.getElementById("totalTime-display");
const isVisibleClass = "is-visible";
const isHiddenClass = "is-hidden";

const DEV_MODE = true; // テスト時はtrue、本番はfalse
const FIVE_MIN = DEV_MODE ? 5 : 300;
const TEN_MIN = DEV_MODE ? 10 : 600;

// タイマーの形式でカウントダウンする関数
const countdown = () => {
  if (remainingTime > 0){
    remainingTime -= 1;
    timeSeparate(remainingTime);
    const circumference = 2 * Math.PI * 95;
    const offset = circumference * (1 - (remainingTime / lastSelectRemainingTime));
    progressCircle.style.strokeDashoffset = offset;
  } else {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
    totalSetCount += 1;
    totalTime += lastSelectRemainingTime;
    console.log("タイマー終了");
    timerView.classList.remove(isVisibleClass);
    repetitionView.classList.add(isVisibleClass);
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
  setCount += 1;
  timerViewTimeCount.textContent = seconds / 60;
  timerViewSetCount.textContent = setCount;
  progressCircle.style.strokeDashoffset = 0;
  firstView.classList.add(isHiddenClass);
  timerView.classList.add(isVisibleClass);
  repetitionView.classList.remove(isVisibleClass);
}

// イベント登録
document.getElementById("timer-fiveMinutes").addEventListener("click", () => {
  startTimer(FIVE_MIN);
});

document.getElementById("timer-tenMinutes").addEventListener("click", () => {
  startTimer(TEN_MIN);
});

document.getElementById("timer-repetition").addEventListener("click", () => {
  startTimer(lastSelectRemainingTime);
});

document.getElementById("repetition-fiveMinutes").addEventListener("click", () => {
  startTimer(FIVE_MIN);
});

document.getElementById("repetition-tenMinutes").addEventListener("click", () => {
  startTimer(TEN_MIN);
});

document.getElementById("timer-end").addEventListener("click", () => {
  const minutes = Math.floor(totalTime / 60);
  repetitionView.classList.remove(isVisibleClass);
  endView.classList.add(isVisibleClass);
  totalSetCountDisplay.textContent = totalSetCount;
  totalTimeDisplay.textContent = `${minutes}分`;
});

document.getElementById("start-beginning").addEventListener("click", () => {
  firstView.classList.remove(isHiddenClass);
  endView.classList.remove(isVisibleClass);
  totalSetCount = 0;
  totalTime = 0;
  setCount = 0;
  timeCount = 0;
});

document.getElementById("timer-pause").addEventListener("click", () => {
  isPaused = !isPaused;

  if(isPaused){
    // 一時停止を押した時の処理
    document.getElementsByClassName("pause-btn__txt")[0].textContent = "再開";
    document.getElementsByClassName("toggle-icon")[0].setAttribute("href", "/img/icons.svg#play");
    clearInterval(timerIntervalId);

  } else {
    // 再開の処理
    document.getElementsByClassName("pause-btn__txt")[0].textContent = "一時停止";
    document.getElementsByClassName("toggle-icon")[0].setAttribute("href", "/img/icons.svg#pause");
    timerIntervalId = setInterval(countdown, 1000);
  }
});
let remainingTime = 0;
let timerIntervalId = null;

// タイマーの関数
const timer = () => {
  if (timerIntervalId !== null) return;
  timerIntervalId = setInterval(countdown, 1000);
}

// タイマーの形式でカウントダウンする関数
const countdown = () => {
  if (remainingTime > 0){
    remainingTime -= 1;
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    document.getElementById("timer-display").textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  } else {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
    console.log("タイマー終了");
  }
}

// タイマーの存在を確認して動いていたら止める関数
const clearTimer = () => {
  if (timerIntervalId !== null) {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
  };
}

// イベント登録
document.getElementById("timer-fiveMinutes").addEventListener("click", () => {
  clearTimer();
  remainingTime = 300;
  timer();
});

document.getElementById("timer-tenMinutes").addEventListener("click", () => {
  clearTimer();
  remainingTime = 600;
  timer();
});
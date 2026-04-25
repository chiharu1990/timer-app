let remainingTime = 300;
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
    console.log("タイマー終了");
  }
}

// イベント登録
document.getElementById("start-btn").addEventListener("click", timer);

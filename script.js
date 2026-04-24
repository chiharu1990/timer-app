let remainingTime = 300;

document.getElementById("start-btn").addEventListener("click", () => {
  console.log("スタート！")
  if (remainingTime > 0){
    remainingTime -= 1;
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    document.getElementById("timer-display").textContent = `${minutes}:${String(seconds).padStart(2, "0")}`;
  }
})
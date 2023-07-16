const clock = {
  format(time) {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60);
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    return minutes + ':' + seconds;
  },
};

const displayedTime = document.getElementById('countdown');
const countdownForm = document.getElementById('countdown-form');
const secondsInput = document.getElementById('seconds');
let count = 0;
let running = false;
let timer = null;

function update() {
  displayedTime.textContent = clock.format(count);
}

function handleStart() {
  timer = setInterval(() => {
    const newCount = count - 1;
    count = newCount >= 0 ? newCount : 0;
    update();
  }, 1000);
}

function handleStop() {
  if (timer) {
    clearInterval(timer);
    running = false;
  }
}

function handleReset() {
  count = 0;
  update();
}

function handleCountdown(seconds) {
  count = seconds;
  running = true;
  handleStart();
}

countdownForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const strSeconds = secondsInput.value;
  if (strSeconds.match(/^\d+$/)) {
    secondsInput.value = '';
    handleCountdown(parseInt(strSeconds, 10));
  }
});

const stopBtn = document.getElementById('stopBtn');
stopBtn.addEventListener('click', () => {
  handleStop();
});

const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', () => {
  handleReset();
});

update();
const display  = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn  = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn   = document.getElementById('lapBtn');
const lapList  = document.getElementById('lapList');

let startTime = 0;
let elapsed   = 0;
let timerId   = null;
let lapCount  = 0;

function format(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return [h, m, s].map(v => String(v).padStart(2, '0')).join(':');
}

function tick() {
  display.textContent = format(elapsed + (Date.now() - startTime));
}

startBtn.addEventListener('click', () => {
  startTime = Date.now();
  timerId = setInterval(tick, 100);
  startBtn.disabled = true;
  stopBtn.disabled  = false;
  lapBtn.disabled   = false;
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  elapsed += Date.now() - startTime;
  timerId = null;
  startBtn.disabled = false;
  stopBtn.disabled  = true;
  lapBtn.disabled   = true;
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerId);
  timerId  = null;
  elapsed  = 0;
  lapCount = 0;
  display.textContent = '00:00:00';
  lapList.innerHTML   = '';
  startBtn.disabled = false;
  stopBtn.disabled  = true;
  lapBtn.disabled   = true;
});

lapBtn.addEventListener('click', () => {
  lapCount++;
  const current = elapsed + (Date.now() - startTime);
  const li = document.createElement('li');
  li.innerHTML = `<span class="lap-num">Lap ${lapCount}</span><span>${format(current)}</span>`;
  lapList.prepend(li);
});

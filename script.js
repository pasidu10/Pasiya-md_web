let botCount = 100000;
const maxCount = 150000;
const increment = 100;
const interval = 2500; // 2.5 seconds

const botCountDisplay = document.getElementById('botCount');
const stopMessage = document.getElementById('stopMessage');

function updateCount() {
  if (botCount >= maxCount) {
    stopMessage.style.display = 'block';
    return;
  }

  botCount += increment;
  botCountDisplay.textContent = botCount.toLocaleString();
}

setInterval(updateCount, interval);

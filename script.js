let count = 799900;
const counter = document.getElementById('counter');

setInterval(() => {
  count++;
  counter.textContent = count.toLocaleString();
}, 2000); // Every 1 seconds increase

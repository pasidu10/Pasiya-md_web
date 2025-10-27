let count = 799000;
const counter = document.getElementById('counter');

setInterval(() => {
  count++;
  counter.textContent = count.toLocaleString();
}, 2000); // Every 2 seconds increase

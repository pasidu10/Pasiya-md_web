const statusText = document.getElementById('statusText');
const messages = [
  "Deploying bot...",
  "Connecting to PASIYA-MD Server...",
  "Setting up instance...",
  "Finalizing deployment...",
  "Bot deployed successfully!",
  "Waiting for next instance..."
];
let index = 0;

setInterval(() => {
  statusText.textContent = messages[index];
  index = (index + 1) % messages.length;
}, 2000);

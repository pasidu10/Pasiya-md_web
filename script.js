const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function appendMessage(text, className) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add(className);
  msgDiv.textContent = text;
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

sendBtn.addEventListener('click', () => {
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage(text, 'user-message');
  userInput.value = '';

  // Simulate bot typing and reply
  setTimeout(() => {
    appendMessage('ඔය ප්‍රශ්නය ගැන හොඳ පිළිතුර නැද්ද බලන්නම්...', 'bot-message');
  }, 800);
});

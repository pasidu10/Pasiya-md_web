const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

function appendMessage(text, className) {
  const div = document.createElement('div');
  div.className = 'chat-message ' + className;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(message) {
  // Demo simple replies — ඔයාට මේක වෙනස් කරන්න පුළුවන්
  const lower = message.toLowerCase();
  if(lower.includes('hello') || lower.includes('hi')) {
    return "ආයුබෝවන්! මට මොනව හෝ ඇහන්න පුළුවන්.";
  }
  if(lower.includes('how are you')) {
    return "මම හොඳයි, ඔබට කොහොමද?";
  }
  if(lower.includes('pasiya-md')) {
    return "PASIYA-MD BOT ගැන වැඩි විස්තර හොයන්න ඔයාට මට කියන්න.";
  }
  return "මට කණගාටුයි, ඒ ගැන මම තවම ඉගෙන ගන්නවා...";
}

chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const userText = userInput.value.trim();
  if(userText === '') return;

  appendMessage(userText, 'user-msg');
  userInput.value = '';

  // Bot response delay simulation
  setTimeout(() => {
    const botReply = getBotResponse(userText);
    appendMessage(botReply, 'bot-msg');
  }, 1000);
});

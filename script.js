const chatBox = document.getElementById('chat');
const chatForm = document.getElementById('chat-form');
const msgInput = document.getElementById('msg');

function botReply(message) {
  // Simple fixed replies for demo
  const msgLower = message.toLowerCase();

  if (msgLower.includes('hi') || msgLower.includes('hello')) {
    return "Hello! How can I assist you today?";
  } else if (msgLower.includes('help')) {
    return "Sure! Ask me anything about PASIYA AI Chatbot.";
  } else if (msgLower.includes('bot')) {
    return "I am PASIYA AI Chatbot, your virtual assistant.";
  } else {
    return "Sorry, I didn't get that. Please ask something else.";
  }
}

function appendMessage(text, className) {
  const li = document.createElement('li');
  li.className = className;
  li.textContent = text;
  chatBox.appendChild(li);
  chatBox.scrollTop = chatBox.scrollHeight;
}

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userMsg = msgInput.value.trim();
  if (!userMsg) return;

  appendMessage(userMsg, 'user');
  msgInput.value = '';

  // Simulate bot typing delay
  setTimeout(() => {
    const reply = botReply(userMsg);
    appendMessage(reply, 'bot');
  }, 800);
});

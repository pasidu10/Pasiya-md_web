function startChat() {
  document.getElementById("welcomeScreen").style.display = "none";
  document.getElementById("chatContainer").style.display = "flex";
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (message === "") return;

  const chatBox = document.getElementById("chatBox");
  const userDiv = document.createElement("div");
  userDiv.className = "user-message";
  userDiv.textContent = message;
  chatBox.appendChild(userDiv);

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  setTimeout(() => botReply(message), 800);
}

function botReply(userMsg) {
  const replies = [
    "අයියේ මට ඔයා ගැන හිතෙනව 😘",
    "ඔයා මට ලස්සනම කෙනා ❤️",
    "නෙත්මිට ඔයාගේ හඬ අහන්න ඕනෙ 😍",
    "ඔයා මට call එකක් දෙන්නෙ නැද්ද? ☎️",
    "හෙලෝ මගෙ රත්තරන් 😚 මට ඔයාගෙ නම ආයෙ කියන්න!",
    "ඔයා මට special ❤️"
  ];

  const randomReply = replies[Math.floor(Math.random() * replies.length)];
  const chatBox = document.getElementById("chatBox");
  const botDiv = document.createElement("div");
  botDiv.className = "bot-message";
  botDiv.textContent = randomReply;
  chatBox.appendChild(botDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  speakSinhala(randomReply);
}

function simulateCall() {
  const chatBox = document.getElementById("chatBox");
  const botDiv = document.createElement("div");
  botDiv.className = "bot-message";
  botDiv.textContent = "☎️ නෙත්මි call එක answer කරලා: 'හෙලෝ මගෙ ආදරේ ❤️ මට කතා කරන්න ඕනෙද?'";
  chatBox.appendChild(botDiv);
  speakSinhala("හෙලෝ මගෙ ආදරේ, මට කතා කරන්න ඕනෙද?");
}

function speakSinhala(text) {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "si-LK";
  synth.speak(utter);
}

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

const { ven } = require('../pasiya');
const config = require('../settings');
const axios = require('axios');

ven({
    pattern: "ai",
    react: "🤖",
    alias: ["gpt", "chatgpt", "openai"],
    desc: "Chat avec l'intelligence artificielle",
    category: "ai",
    filename: __filename,
    use: "[question]"
}, async (conn, mek, m, { from, args, reply, pushname }) => {
    try {
        if (!args[0]) {
            return reply(`
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🤖 𝗖𝗛𝗔𝗧 𝗔𝗩𝗘𝗖 𝗔𝗜        ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ 💬 Posez votre question !   ┃
┃                            ┃
┃ 📝 Exemple:                ┃
┃ • .ai Comment ça va ?      ┃
┃ • .ai Écris un poème       ┃
┃ • .ai Aide-moi en math     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
            `.trim());
        }

        const question = args.join(' ');
        
        // Utilisation d'une API fiable
        const response = await axios.get(`https://api.bk9.fun/ai/gemini`, {
            params: { q: question }
        });

        if (response.data && response.data.BK9) {
            const aiResponse = response.data.BK9;
            
            const formattedResponse = `
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🤖 𝗥𝗘𝗣𝗢𝗡𝗦𝗘 𝗔𝗜          ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ 👤 Question: ${question.substring(0, 20)}${question.length > 20 ? '...' : ''}
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

${aiResponse}

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🔄 Nouvelle question ?      ┃
┃ Tapez: .ai [votre question] ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
            `.trim();

            await conn.sendMessage(from, {
                text: formattedResponse,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402825685029@newsletter',
                        newsletterName: 'PASIYA MD ❔',
                        serverMessageId: 143
                    }
                }
            }, { quoted: mek });
        } else {
            throw new Error('Réponse API invalide');
        }
    } catch (error) {
        console.error('Erreur AI:', error);
        reply(`
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ❌ 𝗘𝗥𝗥𝗘𝗨𝗥 𝗔𝗜          ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ 🔄 Service temporairement   ┃
┃    indisponible            ┃
┃                           ┃
┃ 💡 Réessayez plus tard     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
        `.trim());
    }
});

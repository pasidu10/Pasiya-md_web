const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

let botCount = 0;

function simulateBotDeployment() {
  botCount += 8; // Every 7.5 seconds 8 bots deployed
  io.emit('botCountUpdate', botCount);
}

setInterval(simulateBotDeployment, 7500);

app.get('/', (req, res) => {
  res.send('Bot count server running...');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

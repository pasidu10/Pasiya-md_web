// File: server/server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { connectDB } = require('./db');
const adminRoutes = require('./routes/admin.routes');

const app = express();
app.use(bodyParser.json({ limit: '5mb' }));
app.use(morgan('dev'));
app.use('/api/admin', adminRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

(async () => {
  await connectDB();
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`🌐 PASIYA-MD server running on port ${PORT}`));
})();

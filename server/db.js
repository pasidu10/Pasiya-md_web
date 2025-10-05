// File: server/db.js
const { MongoClient } = require('mongodb');
let client;
let db;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'pasiya_md';

async function connectDB() {
  if (db) return db;
  client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  db = client.db(DB_NAME);
  console.log(`[DB] Connected to MongoDB: ${DB_NAME}`);
  return db;
}

function getCollection(name) {
  if (!db) throw new Error('Database not initialized. Call connectDB() first.');
  return db.collection(name);
}

async function closeDB() {
  if (client) await client.close();
  console.log('[DB] Connection closed');
}

module.exports = { connectDB, getCollection, closeDB };

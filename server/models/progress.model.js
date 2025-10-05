// File: server/models/progress.model.js
const { getCollection } = require('../db');

async function insertProgressRecords(records = []) {
  if (!records.length) return { insertedCount: 0 };
  const col = getCollection('progress');
  const result = await col.insertMany(records, { ordered: false });
  return { insertedCount: result.insertedCount };
}

async function getUserProgress(userId) {
  const col = getCollection('progress');
  return await col.find({ userId }).sort({ deviceTimestamp: -1 }).toArray();
}

module.exports = { insertProgressRecords, getUserProgress };

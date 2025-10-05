// File: server/models/user.model.js
const { getCollection } = require('../db');
const bcrypt = require('bcryptjs');

async function createUser({ name, email, password, role = 'student' }) {
  const col = getCollection('users');
  const existing = await col.findOne({ email });
  if (existing) throw new Error('User already exists');
  const hash = await bcrypt.hash(password, 10);
  const user = { name, email, password: hash, role, createdAt: new Date() };
  const result = await col.insertOne(user);
  return result.insertedId;
}

async function getUserByEmail(email) {
  const col = getCollection('users');
  return await col.findOne({ email });
}

async function getAllUsers() {
  const col = getCollection('users');
  return await col.find({}).project({ password: 0 }).toArray();
}

module.exports = { createUser, getUserByEmail, getAllUsers };

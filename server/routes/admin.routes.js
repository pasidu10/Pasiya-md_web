// File: server/routes/admin.routes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getAllUsers } = require('../models/user.model');
const { getCollection } = require('../db');

function authAdmin(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Missing token');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'pasiya_secret');
    if (decoded.role !== 'admin') throw new Error('Not authorized');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }
}

router.get('/users', authAdmin, async (req, res) => {
  const users = await getAllUsers();
  res.json({ success: true, users });
});

router.get('/stats', authAdmin, async (req, res) => {
  const progressCol = getCollection('progress');
  const userCol = getCollection('users');
  const [userCount, progressCount] = await Promise.all([
    userCol.countDocuments(),
    progressCol.countDocuments(),
  ]);
  res.json({ success: true, stats: { users: userCount, progress_records: progressCount } });
});

module.exports = router;

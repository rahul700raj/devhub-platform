const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Repository = require('../models/Repository');

// Search users and repositories
router.get('/', async (req, res) => {
  try {
    const { q, type } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'Search query required' });
    }

    let results = {};

    if (!type || type === 'users') {
      const users = await User.find({
        $or: [
          { username: { $regex: q, $options: 'i' } },
          { name: { $regex: q, $options: 'i' } }
        ]
      }).select('-password').limit(10);
      results.users = users;
    }

    if (!type || type === 'repositories') {
      const repositories = await Repository.find({
        $or: [
          { name: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } },
          { topics: { $in: [new RegExp(q, 'i')] } }
        ],
        isPrivate: false
      }).populate('owner', 'username name avatar').limit(10);
      results.repositories = repositories;
    }

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
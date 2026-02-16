const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Repository = require('../models/Repository');
const auth = require('../middleware/auth');

// Get user profile
router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select('-password')
      .populate('repositories')
      .populate('followers', 'username name avatar')
      .populate('following', 'username name avatar');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const stats = {
      totalRepos: user.repositories.length,
      totalStars: await Repository.countDocuments({ stars: user._id }),
      followers: user.followers.length,
      following: user.following.length
    };

    res.json({ user, stats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, bio, skills, location, website, company, avatar } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, bio, skills, location, website, company, avatar },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Follow user
router.post('/:username/follow', auth, async (req, res) => {
  try {
    const userToFollow = await User.findOne({ username: req.params.username });
    const currentUser = await User.findById(req.userId);

    if (!userToFollow) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (userToFollow.id === currentUser.id) {
      return res.status(400).json({ message: 'Cannot follow yourself' });
    }

    if (currentUser.following.includes(userToFollow.id)) {
      return res.status(400).json({ message: 'Already following' });
    }

    currentUser.following.push(userToFollow.id);
    userToFollow.followers.push(currentUser.id);

    await currentUser.save();
    await userToFollow.save();

    res.json({ message: 'Followed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Unfollow user
router.delete('/:username/follow', auth, async (req, res) => {
  try {
    const userToUnfollow = await User.findOne({ username: req.params.username });
    const currentUser = await User.findById(req.userId);

    if (!userToUnfollow) {
      return res.status(404).json({ message: 'User not found' });
    }

    currentUser.following = currentUser.following.filter(id => id.toString() !== userToUnfollow.id);
    userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== currentUser.id);

    await currentUser.save();
    await userToUnfollow.save();

    res.json({ message: 'Unfollowed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Repository = require('../models/Repository');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Create repository
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, isPrivate, readme, language, topics } = req.body;

    const repository = new Repository({
      name,
      description,
      owner: req.userId,
      isPrivate,
      readme,
      language,
      topics
    });

    await repository.save();

    await User.findByIdAndUpdate(req.userId, {
      $push: { repositories: repository._id }
    });

    res.json(repository);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get repository
router.get('/:username/:reponame', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const repository = await Repository.findOne({
      name: req.params.reponame,
      owner: user._id
    }).populate('owner', 'username name avatar');

    if (!repository) {
      return res.status(404).json({ message: 'Repository not found' });
    }

    res.json(repository);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Star repository
router.post('/:id/star', auth, async (req, res) => {
  try {
    const repository = await Repository.findById(req.params.id);
    const user = await User.findById(req.userId);

    if (!repository) {
      return res.status(404).json({ message: 'Repository not found' });
    }

    if (repository.stars.includes(req.userId)) {
      return res.status(400).json({ message: 'Already starred' });
    }

    repository.stars.push(req.userId);
    user.starredRepos.push(repository._id);

    await repository.save();
    await user.save();

    res.json({ message: 'Starred successfully', stars: repository.stars.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Unstar repository
router.delete('/:id/star', auth, async (req, res) => {
  try {
    const repository = await Repository.findById(req.params.id);
    const user = await User.findById(req.userId);

    if (!repository) {
      return res.status(404).json({ message: 'Repository not found' });
    }

    repository.stars = repository.stars.filter(id => id.toString() !== req.userId);
    user.starredRepos = user.starredRepos.filter(id => id.toString() !== repository.id);

    await repository.save();
    await user.save();

    res.json({ message: 'Unstarred successfully', stars: repository.stars.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fork repository
router.post('/:id/fork', auth, async (req, res) => {
  try {
    const originalRepo = await Repository.findById(req.params.id);
    
    if (!originalRepo) {
      return res.status(404).json({ message: 'Repository not found' });
    }

    const forkedRepo = new Repository({
      name: originalRepo.name,
      description: originalRepo.description,
      owner: req.userId,
      isPrivate: false,
      readme: originalRepo.readme,
      files: originalRepo.files,
      language: originalRepo.language,
      topics: originalRepo.topics,
      forkedFrom: originalRepo._id
    });

    await forkedRepo.save();

    originalRepo.forks.push(forkedRepo._id);
    await originalRepo.save();

    await User.findByIdAndUpdate(req.userId, {
      $push: { repositories: forkedRepo._id }
    });

    res.json(forkedRepo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload files to repository
router.post('/:id/files', auth, async (req, res) => {
  try {
    const { files } = req.body;
    const repository = await Repository.findById(req.params.id);

    if (!repository) {
      return res.status(404).json({ message: 'Repository not found' });
    }

    if (repository.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    repository.files.push(...files);
    repository.updatedAt = Date.now();
    await repository.save();

    res.json(repository);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
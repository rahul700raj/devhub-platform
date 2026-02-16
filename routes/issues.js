const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');
const Repository = require('../models/Repository');
const auth = require('../middleware/auth');

// Create issue
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, repository, labels } = req.body;

    const issue = new Issue({
      title,
      description,
      repository,
      author: req.userId,
      labels
    });

    await issue.save();

    await Repository.findByIdAndUpdate(repository, {
      $push: { issues: issue._id }
    });

    res.json(issue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get repository issues
router.get('/repository/:repoId', async (req, res) => {
  try {
    const issues = await Issue.find({ repository: req.params.repoId })
      .populate('author', 'username name avatar')
      .sort({ createdAt: -1 });

    res.json(issues);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add comment to issue
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    issue.comments.push({
      author: req.userId,
      content
    });

    await issue.save();
    res.json(issue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Close issue
router.patch('/:id/close', auth, async (req, res) => {
  try {
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status: 'closed', updatedAt: Date.now() },
      { new: true }
    );

    res.json(issue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
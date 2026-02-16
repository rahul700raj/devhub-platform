const mongoose = require('mongoose');

const RepositorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  readme: {
    type: String,
    default: ''
  },
  files: [{
    name: String,
    path: String,
    content: String,
    language: String,
    size: Number
  }],
  stars: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  forks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Repository'
  }],
  watchers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  language: String,
  topics: [String],
  issues: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Issue'
  }],
  forkedFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Repository'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Repository', RepositorySchema);
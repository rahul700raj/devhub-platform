const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  skills: [{
    type: String
  }],
  location: String,
  website: String,
  company: String,
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  repositories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Repository'
  }],
  starredRepos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Repository'
  }],
  contributions: [{
    date: Date,
    count: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
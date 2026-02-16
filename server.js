const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

// CORS Configuration - Update with your Vercel URL
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://devhub-platform.vercel.app',
    'https://devhub-platform-git-main-rahul700raj.vercel.app',
    /\.vercel\.app$/
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/repositories', require('./routes/repositories'));
app.use('/api/issues', require('./routes/issues'));
app.use('/api/search', require('./routes/search'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/devhub', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'DevHub API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'DevHub API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      repositories: '/api/repositories',
      issues: '/api/issues',
      search: '/api/search'
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
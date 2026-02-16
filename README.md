# 🚀 DevHub - Modern GitHub Clone Platform

A full-stack developer platform built with the MERN stack, featuring authentication, repository management, social features, and a beautiful dark-themed UI.

![DevHub](https://img.shields.io/badge/DevHub-Platform-green)
![React](https://img.shields.io/badge/React-18.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🌟 Live Demo

**🔗 Repository**: [https://github.com/rahul700raj/devhub-platform](https://github.com/rahul700raj/devhub-platform)

**📚 Documentation**:
- [Quick Start Guide](QUICK_START.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Features List](FEATURES.md)
- [Contributing Guidelines](CONTRIBUTING.md)

## ✨ Features

### 🔐 Core Functionality
- ✅ **User Authentication** - Secure signup, login, and logout with JWT
- ✅ **User Profiles** - Customizable profiles with bio, skills, followers, and repositories
- ✅ **Repository Management** - Create, upload, and manage code repositories
- ✅ **File Upload** - Support for multiple code files with syntax highlighting
- ✅ **README Preview** - Markdown rendering for README files
- ✅ **Social Features** - Star, fork, and watch repositories
- ✅ **Follow System** - Follow/unfollow other developers
- ✅ **Issue Tracking** - Create and manage issues for repositories
- ✅ **Search** - Search for users and repositories
- ✅ **Dashboard Analytics** - View stats on repositories, stars, followers, and contributions
- ✅ **Dark/Light Theme** - Toggle between dark and light modes
- ✅ **Responsive Design** - Mobile and desktop optimized

### 🎨 UI Highlights
- Clean, developer-friendly interface
- Dark theme by default (black, gray, green accents)
- Minimal and professional design
- Smooth animations and transitions
- Custom scrollbar styling
- Toast notifications

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Markdown** - Markdown rendering
- **Lucide Icons** - Beautiful icon library
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Helmet** - Security headers
- **Morgan** - HTTP request logger
- **Compression** - Response compression

## 📦 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/rahul700raj/devhub-platform.git
cd devhub-platform

# Install backend dependencies
npm install

# Create .env file
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/devhub
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
EOF

# Start backend server
npm run dev

# In a new terminal, setup frontend
cd client
npm install
npm start
```

**Backend**: http://localhost:5000  
**Frontend**: http://localhost:3000

For detailed instructions, see [QUICK_START.md](QUICK_START.md)

## 🌐 Deployment

### Deploy to Production

This project is ready to deploy to:
- **Backend**: Railway, Heroku, or any Node.js hosting
- **Frontend**: Vercel, Netlify, or any static hosting
- **Database**: MongoDB Atlas (recommended)

**Step-by-step deployment guide**: [DEPLOYMENT.md](DEPLOYMENT.md)

### Quick Deploy

#### Backend (Railway)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Frontend (Vercel)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd client
vercel --prod
```

## 📱 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/:username` - Get user profile
- `PUT /api/users/profile` - Update profile (protected)
- `POST /api/users/:username/follow` - Follow user (protected)
- `DELETE /api/users/:username/follow` - Unfollow user (protected)

### Repositories
- `POST /api/repositories` - Create repository (protected)
- `GET /api/repositories/:username/:reponame` - Get repository
- `POST /api/repositories/:id/star` - Star repository (protected)
- `DELETE /api/repositories/:id/star` - Unstar repository (protected)
- `POST /api/repositories/:id/fork` - Fork repository (protected)
- `POST /api/repositories/:id/files` - Upload files (protected)

### Issues
- `POST /api/issues` - Create issue (protected)
- `GET /api/issues/repository/:repoId` - Get repository issues
- `POST /api/issues/:id/comments` - Add comment (protected)
- `PATCH /api/issues/:id/close` - Close issue (protected)

### Search
- `GET /api/search?q=query&type=users|repositories` - Search

## 📊 Project Structure

```
devhub-platform/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   └── Navbar.js
│   │   ├── pages/         # Page components
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Profile.js
│   │   │   ├── Repository.js
│   │   │   ├── CreateRepo.js
│   │   │   └── Search.js
│   │   ├── App.js         # Main app component
│   │   ├── index.js       # Entry point
│   │   ├── index.css      # Global styles
│   │   └── config.js      # API configuration
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── models/                # MongoDB models
│   ├── User.js
│   ├── Repository.js
│   └── Issue.js
├── routes/                # API routes
│   ├── auth.js
│   ├── users.js
│   ├── repositories.js
│   ├── issues.js
│   └── search.js
├── middleware/            # Custom middleware
│   └── auth.js
├── server.js              # Express server
├── package.json
├── .env.example
├── .gitignore
├── README.md
├── QUICK_START.md
├── DEPLOYMENT.md
├── FEATURES.md
├── CONTRIBUTING.md
└── LICENSE
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt (10 salt rounds)
- Protected routes with middleware
- Input validation with express-validator
- Helmet.js for security headers
- CORS configuration
- Environment-based configuration

## 🚀 Performance & Scalability

- Modular architecture
- RESTful API design
- MongoDB for flexible data storage
- Optimized queries with Mongoose
- Compression middleware
- Production-ready error handling
- Efficient database indexing

## 🎯 Future Enhancements

- [ ] Pull requests functionality
- [ ] Code review system
- [ ] Real-time notifications
- [ ] Activity feed
- [ ] Advanced search filters
- [ ] Repository insights/analytics
- [ ] Contribution graph heatmap
- [ ] OAuth integration (GitHub, Google)
- [ ] Email notifications
- [ ] Cloud file storage (Cloudinary)
- [ ] CI/CD integration
- [ ] API rate limiting

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rahul Mishra**
- GitHub: [@rahul700raj](https://github.com/rahul700raj)

## ⭐ Show your support

Give a ⭐️ if you like this project!

## 📝 Notes

- This is a learning project demonstrating full-stack development with MERN
- Perfect for understanding authentication, REST APIs, and modern React
- Production-ready with proper security and error handling
- Fully documented and easy to customize

## 🙏 Acknowledgments

- Inspired by GitHub's design and functionality
- Built with modern web technologies
- Community-driven development

---

**Made with ❤️ for developers**

**Repository**: https://github.com/rahul700raj/devhub-platform

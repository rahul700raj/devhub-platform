# 🚀 DevHub - Modern GitHub Clone Platform

A full-stack developer platform built with the MERN stack, featuring authentication, repository management, social features, and a beautiful dark-themed UI.

![DevHub](https://img.shields.io/badge/DevHub-Platform-green)
![React](https://img.shields.io/badge/React-18.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)

## ✨ Features

### Core Functionality
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

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/rahul700raj/devhub-platform.git
cd devhub-platform
```

2. **Install backend dependencies**
```bash
npm install
```

3. **Create `.env` file**
```env
MONGODB_URI=mongodb://localhost:27017/devhub
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
```

4. **Start the backend server**
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory**
```bash
cd client
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🌐 Deployment

### Backend Deployment (Railway)

1. **Push code to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Railway**
   - Go to [Railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Add environment variables:
     - `MONGODB_URI` - Your MongoDB connection string
     - `JWT_SECRET` - Your JWT secret key
     - `PORT` - 5000
   - Deploy!

3. **Get your backend URL**
   - Railway will provide a URL like: `https://your-app.railway.app`

### Frontend Deployment (Vercel)

1. **Update API URL in frontend**
   - Update all `http://localhost:5000` to your Railway backend URL in:
     - `client/src/pages/Login.js`
     - `client/src/pages/Register.js`
     - `client/src/pages/Dashboard.js`
     - `client/src/pages/Profile.js`
     - `client/src/pages/Repository.js`
     - `client/src/pages/CreateRepo.js`
     - `client/src/pages/Search.js`

2. **Deploy to Vercel**
   - Go to [Vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set root directory to `client`
   - Click "Deploy"

3. **Get your live URL**
   - Vercel will provide a URL like: `https://your-app.vercel.app`

## 📱 API Endpoints

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

## 🎨 UI Features

- **Clean, developer-friendly interface**
- **Dark theme by default** (black, gray, green accents)
- **Minimal and professional design**
- **Fully responsive** (mobile + desktop)
- **Smooth animations and transitions**
- **Custom scrollbar styling**

## 📊 Dashboard Analytics

- Total repositories count
- Stars received across all repos
- Followers count
- Following count
- Repository list with stats

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt (10 salt rounds)
- Protected routes with middleware
- Input validation with express-validator
- Helmet.js for security headers
- CORS enabled

## 🚀 Scalability Features

- Modular architecture
- RESTful API design
- MongoDB for flexible data storage
- Optimized queries with Mongoose
- Compression middleware for responses
- Production-ready error handling
- Environment-based configuration

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
- [ ] File upload to cloud storage (Cloudinary)

## 📄 License

MIT License - feel free to use this project for learning or building your own platform!

## 👨‍💻 Author

Built with ❤️ for developers

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if you like this project!

---

**Live Demo:** Coming soon!

**Repository:** https://github.com/rahul700raj/devhub-platform

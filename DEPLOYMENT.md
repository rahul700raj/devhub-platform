# 🚀 Deployment Guide for DevHub Platform

This guide will help you deploy the DevHub platform to production using Railway (backend) and Vercel (frontend).

## Prerequisites

- GitHub account
- Railway account (https://railway.app)
- Vercel account (https://vercel.com)
- MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)

## Step 1: Setup MongoDB Atlas

1. **Create a MongoDB Atlas account** at https://www.mongodb.com/cloud/atlas
2. **Create a new cluster** (free tier is fine)
3. **Create a database user**:
   - Go to Database Access
   - Add New Database User
   - Choose password authentication
   - Save username and password
4. **Whitelist IP addresses**:
   - Go to Network Access
   - Add IP Address
   - Allow access from anywhere (0.0.0.0/0) for development
5. **Get connection string**:
   - Go to Clusters → Connect
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/devhub?retryWrites=true&w=majority`

## Step 2: Deploy Backend to Railway

### Option A: Using Railway Dashboard

1. **Go to Railway** (https://railway.app)
2. **Click "New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Authorize GitHub** and select `rahul700raj/devhub-platform`
5. **Configure the deployment**:
   - Root directory: `/` (leave as default)
   - Build command: `npm install`
   - Start command: `npm start`
6. **Add environment variables**:
   - Click on your service → Variables
   - Add the following:
     ```
     MONGODB_URI=your_mongodb_atlas_connection_string
     JWT_SECRET=your_super_secret_random_string_here
     PORT=5000
     ```
7. **Generate a domain**:
   - Go to Settings → Networking
   - Click "Generate Domain"
   - Copy your backend URL (e.g., `https://devhub-backend-production.up.railway.app`)

### Option B: Using Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Link to your GitHub repo
railway link

# Add environment variables
railway variables set MONGODB_URI="your_mongodb_connection_string"
railway variables set JWT_SECRET="your_secret_key"
railway variables set PORT=5000

# Deploy
railway up
```

## Step 3: Update Frontend API URLs

Before deploying the frontend, update all API URLs to point to your Railway backend:

1. **Create a config file** `client/src/config.js`:
```javascript
export const API_URL = process.env.REACT_APP_API_URL || 'https://your-railway-backend-url.railway.app';
```

2. **Update all API calls** in these files to use the config:
   - `client/src/pages/Login.js`
   - `client/src/pages/Register.js`
   - `client/src/pages/Dashboard.js`
   - `client/src/pages/Profile.js`
   - `client/src/pages/Repository.js`
   - `client/src/pages/CreateRepo.js`
   - `client/src/pages/Search.js`

Replace `http://localhost:5000` with:
```javascript
import { API_URL } from '../config';
// Then use API_URL in axios calls
axios.get(`${API_URL}/api/users/${username}`)
```

3. **Commit the changes**:
```bash
git add .
git commit -m "Update API URLs for production"
git push origin main
```

## Step 4: Deploy Frontend to Vercel

### Option A: Using Vercel Dashboard

1. **Go to Vercel** (https://vercel.com)
2. **Click "New Project"**
3. **Import your GitHub repository** `rahul700raj/devhub-platform`
4. **Configure the project**:
   - Framework Preset: Create React App
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `build`
5. **Add environment variables**:
   - Click "Environment Variables"
   - Add: `REACT_APP_API_URL` = `https://your-railway-backend-url.railway.app`
6. **Click "Deploy"**
7. **Get your live URL** (e.g., `https://devhub-platform.vercel.app`)

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to client directory
cd client

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? devhub-platform
# - Directory? ./
# - Override settings? No

# Add environment variable
vercel env add REACT_APP_API_URL production

# Deploy to production
vercel --prod
```

## Step 5: Configure CORS

Update your backend `server.js` to allow requests from your Vercel frontend:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-vercel-app.vercel.app'
  ],
  credentials: true
}));
```

Commit and push:
```bash
git add .
git commit -m "Configure CORS for production"
git push origin main
```

Railway will automatically redeploy.

## Step 6: Test Your Deployment

1. **Visit your Vercel URL** (e.g., `https://devhub-platform.vercel.app`)
2. **Test the following**:
   - Sign up for a new account
   - Login
   - Create a repository
   - View your profile
   - Search for users/repos
   - Star a repository
   - Fork a repository

## Troubleshooting

### Backend Issues

**Problem**: Server not starting
- Check Railway logs: `railway logs`
- Verify environment variables are set correctly
- Ensure MongoDB connection string is correct

**Problem**: Database connection failed
- Check MongoDB Atlas network access (whitelist 0.0.0.0/0)
- Verify database user credentials
- Check connection string format

### Frontend Issues

**Problem**: API calls failing
- Check browser console for CORS errors
- Verify API_URL is set correctly
- Check Railway backend is running

**Problem**: Build failing on Vercel
- Check build logs in Vercel dashboard
- Verify all dependencies are in package.json
- Ensure root directory is set to `client`

## Environment Variables Summary

### Backend (Railway)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/devhub
JWT_SECRET=your_random_secret_key_minimum_32_characters
PORT=5000
```

### Frontend (Vercel)
```
REACT_APP_API_URL=https://your-railway-backend.railway.app
```

## Quick Deploy Commands

```bash
# Backend (Railway)
railway login
railway link
railway up

# Frontend (Vercel)
cd client
vercel --prod
```

## Post-Deployment Checklist

- [ ] Backend is running on Railway
- [ ] Frontend is deployed on Vercel
- [ ] MongoDB Atlas is connected
- [ ] Environment variables are set
- [ ] CORS is configured
- [ ] User registration works
- [ ] Login works
- [ ] Repository creation works
- [ ] Search functionality works
- [ ] All pages load correctly

## Support

If you encounter any issues:
1. Check the logs (Railway logs, Vercel logs, browser console)
2. Verify all environment variables
3. Test API endpoints directly using Postman
4. Check MongoDB Atlas connection

---

**Congratulations!** 🎉 Your DevHub platform is now live!

**Backend URL**: https://your-app.railway.app
**Frontend URL**: https://your-app.vercel.app

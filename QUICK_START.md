# ⚡ Quick Start Guide

Get DevHub running locally in 5 minutes!

## 1. Clone the Repository

```bash
git clone https://github.com/rahul700raj/devhub-platform.git
cd devhub-platform
```

## 2. Setup Backend

```bash
# Install dependencies
npm install

# Create .env file
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/devhub
JWT_SECRET=your_secret_key_here_make_it_long_and_random
PORT=5000
EOF

# Start MongoDB (if using local MongoDB)
# mongod

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

## 3. Setup Frontend

Open a new terminal:

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start frontend
npm start
```

Frontend will run on `http://localhost:3000`

## 4. Test the Application

1. Open `http://localhost:3000` in your browser
2. Click "Sign up" to create an account
3. Fill in the registration form
4. Login with your credentials
5. Create your first repository!

## Default Test Account (Optional)

You can create a test account with these details:
- Username: `testuser`
- Email: `test@devhub.com`
- Password: `test123`
- Name: `Test User`

## Common Issues

### MongoDB Connection Error
- Make sure MongoDB is running: `mongod`
- Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

### Port Already in Use
- Backend: Change PORT in `.env`
- Frontend: It will prompt you to use a different port

### Dependencies Installation Failed
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Next Steps

- Read [README.md](README.md) for full documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Explore the codebase and customize it!

## Project Structure

```
devhub-platform/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json
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
└── README.md
```

Happy coding! 🚀

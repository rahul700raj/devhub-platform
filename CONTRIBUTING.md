# Contributing to DevHub Platform

First off, thank you for considering contributing to DevHub! It's people like you that make DevHub such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and explain which behavior you expected to see instead**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the JavaScript/React styleguide
* Include screenshots and animated GIFs in your pull request whenever possible
* End all files with a newline
* Avoid platform-dependent code

## Development Process

1. **Fork the repo** and create your branch from `main`
2. **Install dependencies**: `npm install` (backend) and `cd client && npm install` (frontend)
3. **Make your changes**
4. **Test your changes** thoroughly
5. **Commit your changes** using clear commit messages
6. **Push to your fork** and submit a pull request

### Setup Development Environment

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/devhub-platform.git
cd devhub-platform

# Add upstream remote
git remote add upstream https://github.com/rahul700raj/devhub-platform.git

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..

# Create .env file
cp .env.example .env
# Edit .env with your configuration

# Start backend
npm run dev

# In another terminal, start frontend
cd client
npm start
```

### Coding Standards

#### JavaScript/React
* Use ES6+ features
* Use functional components with hooks
* Follow React best practices
* Use meaningful variable and function names
* Add comments for complex logic
* Keep functions small and focused

#### CSS/Tailwind
* Use Tailwind utility classes
* Follow mobile-first approach
* Maintain consistent spacing
* Use theme colors from config

#### Git Commit Messages
* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

Examples:
```
Add user profile editing feature
Fix repository star count bug
Update README with deployment instructions
Refactor authentication middleware
```

### Testing

* Write tests for new features
* Ensure all tests pass before submitting PR
* Test on multiple browsers
* Test responsive design on different screen sizes

### Documentation

* Update README.md if needed
* Add JSDoc comments for functions
* Update API documentation for new endpoints
* Include examples in documentation

## Project Structure

```
devhub-platform/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── models/                # MongoDB models
├── routes/                # API routes
├── middleware/            # Custom middleware
├── server.js              # Express server
└── package.json
```

## Feature Requests

We love feature requests! Before submitting:

1. Check if the feature has already been requested
2. Provide a clear use case
3. Explain why it would be useful to most users
4. Consider if it fits the project scope

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

## Recognition

Contributors will be recognized in our README.md file.

Thank you for contributing to DevHub! 🚀

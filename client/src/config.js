// API Configuration
// For development, uses localhost
// For production, uses environment variable or default Railway URL

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default API_URL;
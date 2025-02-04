const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  // Get token from request header
  const token = req.headers['authorization']?.split(' ')[1];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded token data to req.user

    next(); // Move to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
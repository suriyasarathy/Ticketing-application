const jwt = require('jsonwebtoken');
const JWT_SECRET  = 'your_secret_key'; // Ensure it's loaded from your environment

const verifyToken = (req, res, next) => {
  // Get token from headers
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the user info (payload) to the request object
    req.user = decoded;
    next(); // Call next middleware or controller
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = verifyToken;

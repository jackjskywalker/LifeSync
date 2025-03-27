const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    console.error('No token provided'); // Debugging log
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); // Debugging log
    req.user = decoded; // Attach user info (e.g., ID) to the request
    next();
  } catch (err) {
    console.error('Authentication Error:', err);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

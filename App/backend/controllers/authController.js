const pool = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
      // Check if user exists
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (result.rows.length === 0) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      const user = result.rows[0];
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const payload = { id: user.id, name: user.name, email: user.email };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ token, name: user.name });
    } catch (err) {
      console.error('Login Error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  };

  exports.updateProfile = async (req, res) => {
    const { name, email, password } = req.body;
    const userId = req.user.id;
  
    try {
      // Validate input
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      // Prepare fields to update
      const updates = [];
      const values = [];
      let queryIndex = 1;
  
      // Input validation and sanitization
      if (name) {
        // Optional: Add name validation (e.g., min/max length)
        updates.push(`name = $${queryIndex++}`);
        values.push(name.trim());
      }
  
      if (email) {
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({ error: 'Invalid email format' });
        }
        updates.push(`email = $${queryIndex++}`);
        values.push(email.toLowerCase().trim());
      }
  
      if (password) {
        // Password strength validation
        if (password.length < 8) {
          return res.status(400).json({ error: 'Password must be at least 8 characters long' });
        }
  
        const hashedPassword = await bcrypt.hash(password, 10);
        updates.push(`password = $${queryIndex++}`);
        values.push(hashedPassword);
      }
  
      // Check if there are any fields to update
      if (updates.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
      }
  
      // Prepare and execute the update query
      values.push(userId);
      const query = `UPDATE users SET ${updates.join(', ')} WHERE id = $${queryIndex}`;
      
      const result = await pool.query(query, values);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ message: 'Profile updated successfully' });
    } catch (err) {
      console.error('Profile Update Error:', err);
      
      // More specific error handling
      if (err.code === '23505') {
        return res.status(409).json({ error: 'Email already exists' });
      }
  
      res.status(500).json({ error: 'Server error' });
    }
  };
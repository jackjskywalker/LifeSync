// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const pool = require('../models/db');

// GET user details endpoint (already exists)
router.get('/user', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query('SELECT name, email FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const user = result.rows[0];
    res.json(user);
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// userRoutes.js

router.get('/user-preference', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      'SELECT level, type, goal FROM user_preference WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      // No preference set yet
      return res.status(404).json({ error: 'No preference found' });
    }

    // Return the user's existing preference
    const { level, type, goal } = result.rows[0];
    res.json({ level, type, goal });
  } catch (err) {
    console.error('Error fetching user preference:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/user-preference', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // The user ID from the JWT
    const { level, type, goal } = req.body;

    // Validation checks (optional, but recommended):
    const validLevels = ['beginner', 'intermediate', 'advanced'];
    const validTypes = ['home', 'gym'];
    const validGoals = ['muscle gain', 'lose weight'];

    if (!validLevels.includes(level)) {
      return res.status(400).json({ error: 'Invalid level' });
    }
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid type' });
    }
    if (!validGoals.includes(goal)) {
      return res.status(400).json({ error: 'Invalid goal' });
    }

    // Check if a record for this user already exists
    const checkResult = await pool.query(
      'SELECT id FROM user_preference WHERE user_id = $1',
      [userId]
    );

    if (checkResult.rows.length > 0) {
      // If a row already exists for this user, update it
      await pool.query(
        `UPDATE user_preference
         SET level = $1, type = $2, goal = $3
         WHERE user_id = $4`,
        [level, type, goal, userId]
      );
      return res.json({ message: 'Preferences updated successfully' });
    } else {
      // Otherwise, insert a new row
      await pool.query(
        `INSERT INTO user_preference (user_id, level, type, goal)
         VALUES ($1, $2, $3, $4)`,
        [userId, level, type, goal]
      );
      return res.json({ message: 'Preferences created successfully' });
    }
  } catch (err) {
    console.error('Error creating/updating user preference:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// NEW ROUTE: get recommended workout program based on user preference
router.get('/recommended-program', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // 1) Fetch user preference
    const prefResult = await pool.query(
      'SELECT level, type, goal FROM user_preference WHERE user_id = $1',
      [userId]
    );

    if (prefResult.rows.length === 0) {
      return res.status(404).json({ error: 'User preference not found' });
    }

    const { level, type, goal } = prefResult.rows[0];

    // 2) Match with workout_program
    const programResult = await pool.query(
      `SELECT *
       FROM workout_program
       WHERE difficulty = $1
         AND type = $2
         AND goal = $3
       LIMIT 1`,
      [level, type, goal]
    );

    if (programResult.rows.length === 0) {
      return res.status(404).json({
        error: 'No workout program found for your preferences'
      });
    }

    const recommendedProgram = programResult.rows[0];
    res.json({ program: recommendedProgram });
  } catch (err) {
    console.error('Error fetching recommended program:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

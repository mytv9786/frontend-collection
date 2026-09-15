import jwt from 'jsonwebtoken';
import pool from '../database/DbConnection.js';

// 1. Verify if user is logged in
export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // --- NEW: Database Validation ---
    const [rows] = await pool.execute(
      'SELECT user_id, is_active FROM users WHERE user_id = ?',
      [decoded.id],
    );

    // If user was deleted (0 rows) or deactivated (is_active = 0)
    if (rows.length === 0 || rows[0].is_active === 0) {
      return res
        .status(403)
        .json({ error: 'User account no longer exists or is inactive.' });
    }
    req.user = decoded; // Contains id, user_name, and ROLE
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// 2. Check if user has required permissions
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user.role comes from the decoded JWT token
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Access Denied: ${req.user.role} role does not have permission.`,
      });
    }
    next();
  };
};

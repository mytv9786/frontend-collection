import pool from '../database/DbConnection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
// 1. REGISTER NEW USER (Updated for role_id)
export const registerUser = async (req, res) => {
  try {
    const {
      employee_id,
      username,
      password,
      first_name,
      last_name,
      email,
      mobile,
      role_id, // 👈 Changed from role_name
    } = req.body;
    console.log(role_id);
    // Hash the password before saving (10 salt rounds)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 👈 Updated SQL to use role_id column
    const sql = `INSERT INTO users 
      (employee_id, username, password, first_name, last_name, mobile, email, role_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const [result] = await pool.execute(sql, [
      employee_id,
      username,
      hashedPassword,
      first_name,
      last_name,
      mobile,
      email,
      role_id, // 👈 Passing the ID
    ]);

    res.status(201).json({
      message: 'User created successfully!',
      userId: result.insertId,
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res
        .status(400)
        .json({ error: 'Username, Email, or Employee ID already exists.' });
    }
    // Handles cases where a role_id is sent that doesn't exist in the roles table
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ error: 'Invalid Role ID provided.' });
    }
    res.status(500).json({ error: error.message });
  }
};

// 2. LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: 'Username and password are required' });
    }

    // UPDATED: JOIN with roles table to get role_name
    const [rows] = await pool.execute(
      `SELECT u.*, r.role_name 
       FROM users u 
       JOIN roles r ON u.role_id = r.id 
       WHERE u.username = ? AND u.is_active = 1`,
      [username],
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: 'User not found or account disabled.' });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    const token = jwt.sign(
      { id: user.user_id, name: user.username, role: user.role_name }, // role_name now comes from the JOIN
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
    );

    res.json({
      message: 'Login successful!',
      token: token,
      user: {
        id: user.user_id,
        employeeId: user.employee_id,
        userName: user.username,
        fullName: `${user.first_name} ${user.last_name}`,
        email: user.email,
        mobile: user.mobile,
        role_name: user.role_name, // String name for the frontend
        isActive: user.is_active,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3 GET ALL USERS

export const getUsers = async (req, res) => {
  try {
    const { id, role } = req.user;

    // UPDATED: Added JOIN to get role_name from the roles table
    let query = `
      SELECT u.user_id, u.employee_id, u.username, u.first_name, u.last_name, 
             u.mobile, u.email, r.role_name, u.created_at 
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.is_active = 1
    `;
    const params = [];

    if (role === 'superadmin') {
      // Superadmin sees everyone
    } else if (role === 'admin') {
      // Admin sees everyone except superadmins
      query += ` AND r.role_name IN ('admin', 'user')`;
    } else {
      // Regular User only sees themselves
      query += ` AND u.user_id = ?`;
      params.push(id);
    }

    const [rows] = await pool.execute(query, params);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No accessible users found' });
    }

    const responseData =
      role === 'superadmin' || role === 'admin' ? rows : rows[0];
    return res.status(200).json(responseData);
  } catch (error) {
    console.error('getUsers Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// 4. UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, mobile, role_id, password } =
      req.body; // Changed role to role_id

    // UPDATED: SET role_id=? instead of role=?
    let sql = `UPDATE users SET first_name=?, last_name=?, email=?, mobile=?, role_id=?`;
    let params = [first_name, last_name, email, mobile, role_id];

    // If password is provided, hash it and add to update
    if (password && password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(password, 10);
      sql += `, password=?`;
      params.push(hashedPassword);
    }

    sql += ` WHERE user_id = ?`;
    params.push(id);

    const [result] = await pool.execute(sql, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated successfully!' });
  } catch (error) {
    // Handle case where role_id doesn't exist in roles table
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ error: 'Invalid Role ID provided.' });
    }
    res.status(500).json({ error: error.message });
  }
};

// 5. DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute('DELETE FROM users WHERE user_id = ?', [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully!' });
  } catch (error) {
    // Check if user is linked to payments (Foreign Key constraint)
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(400).json({
        error: 'Cannot delete user: They have linked payments or customers.',
      });
    }
    res.status(500).json({ error: error.message });
  }
};

// 5. DISABLE USER (Soft Delete)
export const disableUser = async (req, res) => {
  try {
    const { id } = req.params;

    // We UPDATE is_active to 0 instead of DELETING the row
    const [result] = await pool.execute(
      'UPDATE users SET is_active = 0 WHERE user_id = ?',
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User account has been disabled.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 6. RE-ENABLE USER
export const restoreUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Set is_active back to 1
    const [result] = await pool.execute(
      'UPDATE users SET is_active = 1 WHERE user_id = ?',
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'User account has been restored and can log in again.',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRoles = async (req, res) => {
  try {
    // Basic query to get all available roles
    const query = `SELECT id, role_name FROM roles ORDER BY id ASC`;

    const [rows] = await pool.execute(query);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No roles found' });
    }

    // Return the list of roles
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching roles:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // We join the 'roles' table to get the human-readable 'role_name'
    const [rows] = await pool.execute(
      `SELECT 
        u.user_id, 
        u.employee_id, 
        u.username, 
        u.first_name, 
        u.last_name, 
        u.email, 
        u.mobile, 
        u.role_id,
        r.role_name 
      FROM users u
      INNER JOIN roles r ON u.role_id = r.id
      WHERE u.user_id = ?`,
      [userId],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Returning rows[0] ensures the frontend receives a clean object
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

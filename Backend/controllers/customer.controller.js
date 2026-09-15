import pool from '../database/DbConnection.js';

// 1. ADD NEW CUSTOMER
export const addCustomer = async (req, res) => {
  try {
    const {
      cbp_no,
      cbp_name,
      contact_name,
      contact_number,
      email,
      address,
      account_manager_id, // 👈 Expecting ID from dropdown
    } = req.body;

    const sql = `INSERT INTO customers 
      (cbp_no, cbp_name, contact_name, contact_number, email, address, account_manager_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const [result] = await pool.execute(sql, [
      cbp_no,
      cbp_name,
      contact_name,
      contact_number,
      email,
      address,
      account_manager_id,
    ]);

    res.status(201).json({
      message: 'Customer added successfully!',
      customerId: result.insertId,
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res
        .status(400)
        .json({ error: 'CBP No or CBP Name already exists.' });
    }
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res
        .status(400)
        .json({ error: 'Invalid Account Manager selected.' });
    }
    res.status(500).json({ error: error.message });
  }
};

// 2. GET ALL CUSTOMERS (With Manager Name)
export const getCustomers = async (req, res) => {
  try {
    // JOIN with users to get the actual name of the manager
    const [rows] = await pool.execute(`
      SELECT 
        c.*, 
        CONCAT(u.first_name, ' ', u.last_name) AS account_manager_name,
        u.username
      FROM customers c
      LEFT JOIN users u ON c.account_manager_id = u.user_id
      ORDER BY c.customer_id DESC 
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. UPDATE CUSTOMER
export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      cbp_no,
      cbp_name,
      contact_name,
      contact_number,
      email,
      address,
      account_manager_id, // 👈 Using ID
    } = req.body;

    const sql = `UPDATE customers SET 
      cbp_no=?, cbp_name=?, contact_name=?, contact_number=?, email=?, address=?, account_manager_id=? 
      WHERE customer_id = ?`;

    const [result] = await pool.execute(sql, [
      cbp_no,
      cbp_name,
      contact_name,
      contact_number,
      email,
      address,
      account_manager_id,
      id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Customer not found' });
    res.json({ message: 'Customer updated successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. DELETE CUSTOMER (Hard Delete)
export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute(
      'DELETE FROM customers WHERE customer_id = ?',
      [id],
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Customer not found' });
    res.json({ message: 'Customer removed successfully!' });
  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(400).json({
        error: 'Cannot delete: This customer has existing payment records.',
      });
    }
    res.status(500).json({ error: error.message });
  }
};

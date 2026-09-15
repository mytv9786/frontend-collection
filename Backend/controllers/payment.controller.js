import pool from '../database/DbConnection.js';

// 1. ADD NEW PAYMENT
export const addPayment = async (req, res) => {
  try {
    const {
      cbp_name,
      invoice_amount,
      paid_amount,
      payment_date,
      payment_mode,
      cheque_number,
      bank_name,
      receipt_no,
      remarks,
      account_manager_id, // 👈 Expecting User ID from frontend
    } = req.body;

    const sql = `INSERT INTO payments 
      (cbp_name, invoice_amount, paid_amount, payment_date, payment_mode, cheque_number, bank_name, receipt_no, remarks, account_manager_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const [result] = await pool.execute(sql, [
      cbp_name,
      invoice_amount || 0,
      paid_amount || 0,
      payment_date,
      payment_mode || 'Cash',
      cheque_number || null,
      bank_name || null,
      receipt_no || null,
      remarks || '',
      account_manager_id, // 👈 Inserted as ID
    ]);

    res.status(201).json({
      success: true,
      message: 'Payment recorded!',
      id: result.insertId,
    });
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res
        .status(400)
        .json({ error: 'Invalid Customer Name or Manager ID.' });
    }
    res.status(500).json({ error: error.message });
  }
};

// 2. GET ALL PAYMENTS (With Rank and Manager Name)
export const getPayments = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await pool.execute(
      `
      SELECT 
        ROW_NUMBER() OVER (ORDER BY p.payment_id ASC) AS rank_id,
        p.*,
        CONCAT(u.first_name, ' ', u.last_name) AS manager_full_name
      FROM payments p
      LEFT JOIN users u ON p.account_manager_id = u.user_id
      WHERE p.account_manager_id = ?
      ORDER BY p.payment_id DESC
    `,
      [userId],
    );
    // Note: p.balance is now automatically handled by the database
    //console.log(rows);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. GET INDIVIDUAL CUSTOMER HISTORY
export const getIndividualCustomerHistory = async (req, res) => {
  try {
    const { cbpName } = req.params;

    const [rows] = await pool.execute(
      `
       SELECT 
        ROW_NUMBER() OVER (ORDER BY p.payment_date DESC) AS rank_id,
        p.payment_id,
        p.invoice_amount,
        p.paid_amount,
        p.balance, 
        DATE_FORMAT(p.payment_date, '%d-%m-%Y') AS formatted_date,
        p.payment_mode,
        p.cheque_number,
        p.bank_name,
        CONCAT(u.first_name, ' ', u.last_name) AS account_manager,
        p.remarks
      FROM payments p
      LEFT JOIN users u ON p.account_manager_id = u.user_id
      WHERE p.cbp_name = ?
      ORDER BY p.payment_date DESC
    `,
      [cbpName],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        customer: cbpName,
        message: 'No history found.',
      });
    }

    const summary = rows.reduce(
      (acc, curr) => {
        acc.totalInvoice += parseFloat(curr.invoice_amount);
        acc.totalPaid += parseFloat(curr.paid_amount);
        acc.totalBalance += parseFloat(curr.balance);
        return acc;
      },
      { totalInvoice: 0, totalPaid: 0, totalBalance: 0 },
    );

    res.json({ customer: cbpName, summary, history: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. GET PAYMENTS FOR A SPECIFIC CUSTOMER (Detailed History)
export const getCustomerHistory = async (req, res) => {
  try {
    const { cbpName } = req.params;

    const query = `
      SELECT 
        p.payment_id,
        p.cbp_name,
        p.invoice_amount,
        p.paid_amount,
        p.balance, -- Database auto-calculated column
        DATE_FORMAT(p.payment_date, '%d-%m-%Y') AS payment_date,
        p.payment_mode,
        p.receipt_no,
        p.remarks,
        CONCAT(u.first_name, ' ', u.last_name) AS account_manager_name
      FROM payments p
      LEFT JOIN users u ON p.account_manager_id = u.user_id
      WHERE p.cbp_name = ?
      ORDER BY p.payment_date DESC
    `;

    const [rows] = await pool.execute(query, [cbpName]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: `No payment history found for customer: ${cbpName}`,
      });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error('getCustomerHistory Error:', error);
    res.status(500).json({ error: error.message });
  }
};

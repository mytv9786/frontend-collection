import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 's123',
  database: process.env.DB_NAME || 'collection',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // 💡 Aiven క్లౌడ్ డేటాబేస్ కనెక్ట్ అవ్వడానికి SSL చాలా ముఖ్యం
  ssl: {
    rejectUnauthorized: false,
  },
});

pool
  .getConnection()
  .then(conn => {
    console.log('Successfully connected to MySQL database!');
    conn.release(); // Release it back to the pool
  })
  .catch(err => {
    console.error('Database connection failed:', err.message);
  });

export default pool;

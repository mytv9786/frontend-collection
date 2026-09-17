import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 's123',
  database: 'collection',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // 💡 Aiven క్లౌడ్ డేటాబేస్ కనెక్ట్ అవ్వడానికి SSL చాలా ముఖ్యం
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

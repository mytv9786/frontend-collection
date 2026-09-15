import express from 'express';
import connection from './database/DbConnection.js';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/user.route.js';
import customerRoutes from './routes/customer.route.js';
import paymentRoutes from './routes/payment.route.js';

const app = express();
dotenv.config();

const corsOptions = {
  origin: '*', // Replace with your exact frontend URL
  credentials: true, // Required if you are sending cookies or tokens
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.use('/api/users', userRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/payments', paymentRoutes);

const startServer = async () => {
  try {
    // Assuming your connection export handles the .connect() logic
    await connection;
    console.log('✅ Database connected successfully');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1); // Stop the app if it can't connect to the DB
  }
};

startServer();

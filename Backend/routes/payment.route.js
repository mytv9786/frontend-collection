import express from 'express';
import {
  addPayment,
  getPayments,
  getCustomerHistory,
  getIndividualCustomerHistory,
} from '../controllers/payment.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, addPayment);
router.get('/', verifyToken, getPayments);
router.get('/history/:customerName', verifyToken, getCustomerHistory);
router.get('/individual/:cbpName', getIndividualCustomerHistory);

export default router;

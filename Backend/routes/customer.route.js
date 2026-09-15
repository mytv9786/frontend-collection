import express from 'express';
import {
  addCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} from '../controllers/customer.controller.js';
import { verifyToken, authorizeRoles } from '../middleware/verifyToken.js';

const router = express.Router();

router.post(
  '/',
  //verifyToken,
  //authorizeRoles('admin', 'superadmin'),
  addCustomer,
);
router.get('/', getCustomers);
router.put(
  '/:id',
  verifyToken,
  authorizeRoles('admin', 'superadmin'),
  updateCustomer,
);
//router.delete('/:id', deleteCustomer);

export default router;

import express from 'express';
import {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  disableUser,
  getRoles,
  getUserProfile,
} from '../controllers/user.controller.js';
import { verifyToken, authorizeRoles } from '../middleware/verifyToken.js';

const router = express.Router();

router.post(
  '/register',

  registerUser,
);
router.post('/login', loginUser);
router.get('/', verifyToken, getUsers);
router.get('/roles', getRoles);
router.get('/profile', verifyToken, getUserProfile);
//router.get('/', verifyToken, getUsers);
router.put(
  '/:id',
  verifyToken,
  authorizeRoles('admin', 'superadmin'),
  updateUser,
);
router.delete(
  '/:id',
  verifyToken,
  authorizeRoles('admin', 'superadmin'),
  disableUser,
);

export default router;

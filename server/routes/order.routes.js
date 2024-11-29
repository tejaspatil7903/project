import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  getOrderById
} from '../controllers/order.controller.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrderById);
router.patch('/:id/status', protect, authorize('admin', 'delivery'), updateOrderStatus);

export default router;
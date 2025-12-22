// backend/routes/orderRoutes.js - FIXED
import express from 'express';
const router = express.Router();
import { 
  addOrderItems, 
  getMyOrders, 
  getOrders, 
  updateOrderStatus,
  updateOrderToDelivered, 
  getOrderById, 
  deleteOrder,
  getRevenueStats,
  getTopCustomers,
  getOrdersOverview,
  updatePaymentStatus // ✅ THÊM
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Admin stats routes
router.get('/stats/revenue', protect, admin, getRevenueStats);
router.get('/stats/top-customers', protect, admin, getTopCustomers);
router.get('/stats/overview', protect, admin, getOrdersOverview);

// Order routes
router.route('/')
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders);
  
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, admin, updateOrderStatus);
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

// ✅ THÊM ROUTE CẬP NHẬT THANH TOÁN
router.put('/:id/payment', protect, admin, updatePaymentStatus);

router.delete('/:id', protect, deleteOrder);

export default router;
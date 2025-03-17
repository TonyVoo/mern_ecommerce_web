import express from 'express';
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { createOrder, getOrders, updateOrderStatus, getAllOrders, deleteOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", protect, createOrder);

router.get("/user", protect, getOrders);

router.get("/", protect, adminOnly, getAllOrders);

router.patch("/:orderId", protect, adminOnly, updateOrderStatus);

router.delete("/:orderId", protect, adminOnly, deleteOrder);

export default router;

import express from 'express';
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { deleteUser, getUser, getUserOrders, getUsers, login, login_google, register } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post("/login_google", login_google);

router.get("/", protect, adminOnly, getUsers);
router.delete("/:id", protect, adminOnly, deleteUser);

router.get("/me", protect, getUser);
router.get("/me/orders", protect, getUserOrders);

export default router;
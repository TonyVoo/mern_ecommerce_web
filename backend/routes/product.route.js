import express from 'express';
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { addProduct, deleteProduct, getProduct, getProducts, getProductsByCategory, searchProduct, updateProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getProducts);

router.get("/search", searchProduct);

router.get('/:id', getProduct);

router.post('/', protect, adminOnly, addProduct);

router.put('/:id', protect, adminOnly, updateProduct);

router.delete('/:id', protect, adminOnly, deleteProduct);

router.get('/category/:category',getProductsByCategory);

export default router;

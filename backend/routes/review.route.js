import express from 'express';
import { addReview, getAllReviews, getReviews } from '../controllers/review.controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/reviews", getAllReviews);

router.get("/:productId/reviews", getReviews);

router.post("/:productId/reviews", protect, addReview);



export default router;
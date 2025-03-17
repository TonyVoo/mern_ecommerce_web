import Review from "../models/review.model.js"

export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reviews", error });
    }
};

export const addReview = async (req, res) => {
    const { user, rating, comment } = req.body;
    
    if (!user || !rating || !comment) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newReview = new Review({
            productId: req.params.productId,
            user,
            rating,
            comment
        });

        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(500).json({ message: "Error saving review", error });
    }
};

export const getAllReviews = async (req, res) => {
    try {
        const { filter } = req.query;
        let query = {};

        if (filter === "top") {
            query.rating = 5;
        } else if (filter === "bad") {
            query.rating = { $lte: 2 };
        }

        const reviews = await Review.find(query).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
}

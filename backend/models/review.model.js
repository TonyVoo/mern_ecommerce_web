import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    user: { 
        type: String, 
        required: true 
    },
    rating: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 5 
    },
    comment: { 
        type: String, 
        required: true 
    },
});

export default mongoose.model("Review", reviewSchema);
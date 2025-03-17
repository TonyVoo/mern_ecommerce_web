import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ProductPage.css"
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

function ProductPage() {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ user: "", rating: 0, comment: "" });
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchProduct();
        fetchReviews();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
            setProduct(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching product details:", error);
            setLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/products/${id}/reviews`);
            setReviews(data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const submitReview = async () => {
        if (!user || !token) {
            alert("You must be logged in to submit a review.");
            return;
        }

        if (newReview.comment.trim() && newReview.rating > 0) {
            try {
                const { data } = await axios.post(
                    `http://localhost:5000/api/products/${id}/reviews`,
                    { user: user.name, rating: newReview.rating, comment: newReview.comment },
                    { headers: { Authorization: `Bearer ${token}` } } 
                );

                setReviews([...reviews, data]);
                setNewReview({ rating: 0, comment: "" });
            } catch (error) {
                console.error("Error submitting review:", error);
            }
        }
    };

    const handleAddToCart = () => {
        dispatch(addToCart(product));  
        alert("Product added to cart!");
    };

    if (loading) return <h2>Loading product...</h2>;
    if (!product) return <h2>Product not found.</h2>;

    return (
        <div>
        <div className="product-details">
            <img src={product.image} alt={product.name} />
            <div className="details">
                <h1>{product.name}</h1>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Stock:</strong> {product.stock} available</p>
                <h2>Price: ${product.price}</h2>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
        <div>
        <motion.div className="review-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <h2>Customer Reviews</h2>
                {reviews.length > 0 ? (
                    <ul>
                        {reviews.map((review) => (
                            <motion.li key={review.id} whileHover={{ scale: 1.05 }}>
                                <strong>{review.user}:</strong>
                                {" "}
                                {[...Array(review.rating)].map((_, index) => (
                                    <FaStar key={index} color="gold" />
                                ))}
                                <p>{review.comment}</p>
                            </motion.li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews yet. Be the first to review!</p>
                )}

                {user ? (
                    <div className="review-input">
                        <h3>Write a Review</h3>
                        <select value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}>
                            <option value="0">Select Rating</option>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <option key={star} value={star}>{star} Stars</option>
                            ))}
                        </select>
                        <textarea value={newReview.comment} onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} placeholder="Write your review..." />
                        <button onClick={submitReview}>Submit Review</button>
                    </div>
                ) : (
                    <p>You must <a href="/login">log in</a> to write a review.</p>
                )}
            </motion.div>
        </div>
    </div>
    );
}
export default ProductPage;

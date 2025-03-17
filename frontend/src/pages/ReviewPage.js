import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "../styles/ReviewPage.css";

const ReviewPage = () => {
    const [reviews, setReviews] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/products/reviews");
            setReviews(data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const filteredReviews = () => {
        if (filter === "top") {
            return reviews.filter(review => review.rating === 5);
        } else if (filter === "bad") {
            return reviews.filter(review => review.rating <= 2);
        }
        return reviews;
    };

    return (
        <div className="review-page">
            <h1>All Product Reviews</h1>
            <div className="filter-buttons">
                <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>All Reviews</button>
                <button onClick={() => setFilter("top")} className={filter === "top" ? "active" : ""}>Top Rated</button>
                <button onClick={() => setFilter("bad")} className={filter === "bad" ? "active" : ""}>Bad Reviews</button>
            </div>

            <ul className="review-list">
                {filteredReviews().map((review) => (
                    <li key={review.id} className="review-item">
                        <strong>{review.user}:</strong>
                        <div className="rating">
                            {[...Array(review.rating)].map((_, index) => (
                                <FaStar key={index} color="gold" />
                            ))}
                        </div>
                        <p>{review.comment}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReviewPage;

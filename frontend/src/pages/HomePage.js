import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/HomePage.css";
import { addToCart } from "../redux/cartSlice";

function HomePage() {
    const [products, setProducts] = useState([]);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/api/products");
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>🔥 Featured Products</h1>
            <div className="product-list">
                {products.map((product) => (
                    <div 
                        key={product._id} 
                        className="product-card"
                        onMouseEnter={() => setHoveredProduct(product._id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                    >
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            onClick={() => navigate(`/product/${product._id}`)}
                        />
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>

                        <button 
                            className={`add-to-cart-btn ${hoveredProduct === product._id ? "visible" : ""}`} 
                            onClick={() => dispatch(addToCart(product))}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;

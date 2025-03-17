import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SearchResults.css";

function SearchResultsPage() {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    // Extract search term from URL
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("q");

    useEffect(() => {
        const fetchProducts = async () => {
            if (!searchTerm) return;
            try {
                const { data } = await axios.get(
                    `http://localhost:5000/api/products/search?q=${encodeURIComponent(searchTerm)}`
                );
                setProducts(data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };
        fetchProducts();
    }, [searchTerm]);

    return (
        <div className="search-results">
            <h2>Search Results for: "{searchTerm}"</h2>
            <div className="product-list">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="product-card">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                onClick={() => navigate(`/products/${product._id}`)}
                            />
                            <h3>{product.name}</h3>
                            <p>${product.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
}

export default SearchResultsPage;

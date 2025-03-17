import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/CategoryPage.css"

const CategoryPage = () => {
  const { category } = useParams(); 
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [category]); 

  return (
    <div>
      <h2>{category}</h2>
      <div className="category-product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="category-product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

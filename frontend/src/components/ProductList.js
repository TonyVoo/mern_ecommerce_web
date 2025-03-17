import { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products").then(res => setProducts(res.data));
    }, []);

    return (
        <div>
            {products.map(product => (
                <div key={product._id}>
                    <h3>{product.name}</h3>
                    <p>Price: ${product.price}</p>
                </div>
            ))}
        </div>
    );
}

export default ProductList;

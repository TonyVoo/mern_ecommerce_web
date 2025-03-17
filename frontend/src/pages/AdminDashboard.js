import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [activePanel, setActivePanel] = useState("products");

    useEffect(() => {
        fetchProducts();
        fetchUsers();
        fetchOrders();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/products",
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleSubmit = async () => {
        if (!name || !price || !category || !stock || !description || !image) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            if (editingId) {
                await axios.put(`http://localhost:5000/api/products/${editingId}`, { name, price, category, stock, description, image },
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                    }
                );
                console.log("Product updated successfully", products);
            } else {
                await axios.post("http://localhost:5000/api/products", { name, price, category, stock, description, image },
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                    }
                );
                console.log("Product added successfully", products);
            }
            resetForm();
            fetchProducts();
        } catch (error) {
            console.error("Error adding/updating product:", error);
        }
    };

    const handleEdit = (product) => {
        setEditingId(product._id);
        setName(product.name);
        setPrice(product.price);
        setCategory(product.category);
        setStock(product.stock);
        setDescription(product.description);
        setImage(product.image);
    };

    const deleteProduct = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                }
            );
            fetchProducts();
            console.log("Product deleted successfully", products);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setName("");
        setPrice("");
        setCategory("");
        setStock("");
        setDescription("");
        setImage("");
    };

    const fetchUsers = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found. Redirecting to login...");
            return;
        }
        try {
            const { data } = await axios.get("http://localhost:5000/api/auth", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/auth/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            fetchUsers();
            console.log("User deleted successfully", users);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/orders", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await axios.patch(
                `http://localhost:5000/api/orders/${orderId}`,
                { orderStatus: newStatus },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            fetchOrders();
        } catch (error) {
            console.error("Error updating order:", error);  
        }
    };

    const deleteOrder = async (orderId) => {
        if (!window.confirm("Are you sure you want to delete this order?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            fetchOrders();
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    return (
        <div className="admin-dashboard">
            <div className="button-group">
                <button onClick={() => setActivePanel("products")}>Manage Products</button>
                <button onClick={() => setActivePanel("users")}>Manage Users</button>
                <button onClick={() => setActivePanel("orders")}>Manage Orders</button>
            </div>
            {activePanel === "products" && (
            <div>
                <h2>Products Management</h2>
                <div className="form-container">
                    <h3>{editingId ? "Update Product" : "Add New Product"}</h3>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                    <input type="text" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
                    <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
                    <button onClick={handleSubmit}>{editingId ? "Update Product" : "Add Product"}</button>
                    {editingId && <button className="cancel-btn" onClick={resetForm}>Cancel</button>}
                </div>
            
                <h3>Product List</h3>
                <div className="admin-product-list">
                    {products.map((product) => (
                        <div key={product._id} className="admin-product-card">
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <p>Category: {product.category}</p>
                            <p>Stock: {product.stock}</p>
                            <p>Description: {product.description}</p>
                            <img src={product.image} alt={product.name} />
                            <div className="product-actions">
                                <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                                <button className="delete-btn" onClick={() => deleteProduct(product._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            )}
            {activePanel === "users" && (
            <div>
            <h2>Users Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="delete-btn" onClick={() => deleteUser(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        )}
        {activePanel === "orders" && (
        <div>
        <h2>Orders Management</h2>
            <table>     
            <tbody>
                {orders.map((order) => (
                <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>
                        {order.userId?.name ? (
                            <>
                                {order.userId.name} <br /> ({order.userId.email})
                            </>
                        ) : (
                            "N/A"
                        )}
                    </td>
                    <td>${order.totalAmount?.toFixed(2) || "0.00"}</td>
                    <td>{order.shippingAddress || "N/A"}</td>
                    <td>{order.paymentMethod || "N/A"}</td>
                    <td>
                        <select
                            value={order.orderStatus}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        >
                            {["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td>
                        <button className="delete-btn" onClick={() => deleteOrder(order._id)}>
                            Delete
                        </button>
                    </td>
                </tr>
                ))}
        </tbody>
        </table>
    </div>
    )}
        </div>
    );
}

export default AdminDashboard;

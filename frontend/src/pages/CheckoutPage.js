import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/CheckoutPage.css";
import { useState } from "react";

function CheckoutPage() {
    const cart = useSelector((state) => state.cart.cartItems) || [];
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    const [shippingAddress, setShippingAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Credit Card");

    const totalPrice = cart.length > 0
        ? cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
        : "0.00";

    const handlePlaceOrder = async () => {
        const token = user?.token || localStorage.getItem("token");
        if (!user || !token) {
            alert("You need to be logged in to place an order");
            return;
        }

        if(!shippingAddress) {
            alert("Please enter a valid shipping address!");
            return;
        }

        const orderData = {
            userId: user._id, 
            items: cart.map(item => ({
                productId: item._id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            total: totalPrice,
            shippingAddress, 
            paymentMethod,
            orderStatus: "Pending"
        };

        try {
            const response = await axios.post("http://localhost:5000/api/orders", orderData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 201) {
                alert("Order placed successfully!");
                console.log("Order Response:", response.data);
                navigate("/order-confirmation", { state: { order: response.data.order } });
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order. Please try again.");
        }
    };

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>

            {cart.length === 0 ? (
                <h3>Your cart is empty</h3>
            ) : (
                <div className="checkout-details">
                    <h2>Order Summary</h2>
                    {cart.map(item => (
                        <div className="checkout-item" key={item._id}>
                            <img src={item.image} alt={item.name} />
                            <div>
                                <h3>{item.name}</h3>
                                <p>Price: ${item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                        </div>
                    ))}
                    <h2>Total Price: ${totalPrice}</h2>

                    <div className="input-group">
                        <label>Shipping Address:</label>
                        <input
                            type="text"
                            placeholder="Enter your address"
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Payment Method:</label>
                        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                            <option value="Credit Card">Credit Card</option>
                            <option value="PayPal">PayPal</option>
                            <option value="Cash on Delivery">Cash on Delivery</option>
                        </select>
                    </div>

                    <button className="place-order-btn" onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                </div>
            )}
        </div>
    );
}

export default CheckoutPage;

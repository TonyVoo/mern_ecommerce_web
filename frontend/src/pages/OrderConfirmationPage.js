import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/OrderConfirmationPage.css";

const OrderConfirmationPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const order = location.state?.order || {}; 

    useEffect(() => {
        dispatch(clearCart());
    }, [dispatch]);

    return (
        <div className="order-confirmation">
            <h2>🎉 Order Placed Successfully!</h2>
            <p>Thank you for your purchase! You will receive a confirmation email soon.</p>

            {order.items ? (
                <div className="order-details">
                    <h3>Order Summary</h3>
                    <p><strong>📦Order Status:</strong> {order.orderStatus || "N/A"}</p>
                    <p><strong>🚚Shipping Address:</strong> {order.shippingAddress || "N/A"}</p>
                    <p><strong>💳Payment Method:</strong> {order.paymentMethod || "N/A"}</p>
                    

                    <h3>🛍️Items Ordered:</h3>
                    <div className="order-items">
                        {order?.items?.map((item) => (
                            <div key={item.productId} className="order-item">
                                <div>
                                    <p><strong>{item.name} (x{item.quantity}): ${item.price}</strong></p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2>💰Total: ${order.totalAmount  || "0.00"}</h2>
                </div>
            ) : (
                <p>No order details found.</p>
            )}

            <button className="home-btn" onClick={() => navigate("/")}>
                Back to Home
            </button>
        </div>
    );
};

export default OrderConfirmationPage;

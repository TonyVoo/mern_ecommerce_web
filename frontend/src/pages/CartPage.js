import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, decreaseQuantity } from "../redux/cartSlice";
import "../styles/CartPage.css";  
import { useNavigate } from "react-router-dom";

function CartPage() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cartItems);
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("token");

    const handleIncrease = (product) => {
        dispatch(addToCart(product)); 
    };

    const handleDecrease = (product) => {
        if (product.quantity > 1) {
            dispatch(decreaseQuantity(product._id)); 
        } else {
            dispatch(removeFromCart(product._id)); 
        }   
    };

    const handleRemove = (productId) => {
        dispatch(removeFromCart(productId)); 
    };

    const handleCheckout = () => {
        if (!isLoggedIn) {
            navigate("/login"); 
        } else {
            navigate("/checkout"); 
        }
    };

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    return (
        <div className="cart-container">
            <div className="cart-items">
                <h1>Shopping Cart</h1>
                {cart.length === 0 ? (
                    <h3>Your cart is empty</h3>
                ) : (
                    cart.map(item => (
                        <div className="cart-item" key={item._id}>
                            <img src={item.image} alt={item.name} />
                            <div className="cart-details">
                                <h3>{item.name}</h3>
                                <p>${item.price}</p>
                                <div className="cart-actions">
                                    <div className="cart-quantity">
                                        <button onClick={() => handleDecrease(item)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleIncrease(item)}>+</button>
                                    </div>
                                    <button className="remove-btn" onClick={() => handleRemove(item._id)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="cart-summary">
                <h2>Subtotal ({cart.length} items)</h2>
                <p>${totalPrice}</p>
                <button 
                    className="checkout-btn" 
                    onClick={handleCheckout} 
                    disabled={cart.length === 0}
                    >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}

export default CartPage;

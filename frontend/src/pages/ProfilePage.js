import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ProfilePage.css"

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));

    axios.get("http://localhost:5000/api/auth/me/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="profile-container">
      {user ? (
        <>
          <h2>Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>

          <div className="order-history">
            <h3>Order History</h3>
            {orders.length > 0 ? (
              <ul className="order-list">
                {orders.map(order => (
                  <li key={order._id}>
                    <p><strong>Order ID:</strong> {order._id}</p>
                    <p><strong>Total:</strong> ${order.totalAmount}</p>
                    <p><strong>Status:</strong> {order.orderStatus}</p>
                    <hr />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="loading-message">No orders found.</p>
            )}
          </div>
        </>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
}

export default Profile;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", { name, email, password });

      console.log("API Response:", res.data);

      if (res.data.token || res.data.success) {
        navigate("/login");
      } else {
        setMessage("Unexpected response format");
      }
    } catch (err) {
      console.error("Registration failed:", err.response ? err.response.data : err.message);
      setMessage(err.response?.data?.message || "Error signing up");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Register</button>
        </form>
        <p>{message}</p>
        <p className="register-link" onClick={() => navigate("/login")}>
          Already have an account? Sign in
        </p>
      </div>
    </div>
  );
}

export default Register;

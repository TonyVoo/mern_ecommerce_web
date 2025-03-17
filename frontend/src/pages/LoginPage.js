import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); 
    try {
      console.log("Logging in with:", formData.email, formData.password);
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);

      console.log("Response:", res.data); 
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setMessage("Login successful!");
        navigate("/", { replace: true });
      } else {
        setMessage("Unexpected response format");
      }
    } catch (err) {
      console.error("Login failed:", err.response ? err.response.data : err.message);
      setMessage(err.response?.data?.message || "Invalid credentials");
    }
  };

  const handleGoogleLogin = async (response) => {
    console.log("Google Login Response:", response);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login_google", {
        tokenId: response.credential,
      });

      console.log("Server Response:", res.data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setMessage("Google login successful!");
        navigate("/", { replace: true });
      }

    } catch (error) {
        console.error("Google login failed:", error);
        setMessage("Google login failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
          <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
        </form>
        <p>{message}</p>

        <GoogleLogin 
          onSuccess={handleGoogleLogin} 
          onError={() => setMessage("Google login failed")} />

        <p className="register-link" onClick={() => navigate("/register")}>
          Create an account
        </p>
      </div>
    </div>
  );  
}

export default Login;

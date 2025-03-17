import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { assets } from "../assets/asset.js";
import "../styles/Header.css";
import { clearCart } from "../redux/cartSlice";
import "../styles/SearchResults.css"; 
import Navbar from "../pages/NavBar.js";
import axios from "axios";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cartItems);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("User from storage:", parsedUser); // Debugging
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setSearchDropdownOpen(false);
      return;
    }
    axios
      .get(`http://localhost:5000/api/products/search?q=${searchTerm}`)
      .then((response) => {
        setSearchResults(response.data);
        setSearchDropdownOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setSearchDropdownOpen(false);
      });
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSearchDropdownOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(clearCart());
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  const handleLogoClick = () => {
    setSearchTerm("");
    setSearchDropdownOpen(false);
    navigate("/");
  };

  return (
    <>  
    <header className="header">
      <Link to="/" className="logo-btn" onClick={handleLogoClick}>
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>

      <div className="search-container" ref={searchContainerRef}>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setSearchDropdownOpen(true)}
            aria-label="Search products"
          />
          <button type="submit" className="search-button">
            <FaSearch size={18} />
          </button>
        </form>

        {searchDropdownOpen && searchResults.length > 0 && (
          <ul className="search-dropdown">
            {searchResults.map((product) => (
              <li key={product._id} onClick={() => navigate(`/product/${product._id}`)}>
                <img src={product.image} alt={product.name} className="search-product-image" />
                <span className="search-product-name">{product.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="header-right">
        <Link to="/cart" className="cart-icon">
          <FaShoppingCart size={24} />
          <span className="cart-count">{cartCount}</span>
        </Link>

        {user ? (
          <div className="user-menu" ref={userMenuRef}>
            <button onClick={() => setUserDropdownOpen(!userDropdownOpen)}>
              Welcome, {user.name} ▼
            </button>
            {userDropdownOpen && (
              <ul className="dropdown">
              {user && user.isAdmin && (
                <li>
                  <Link to="/admin" onClick={() => setUserDropdownOpen(false)}>Admin Dashboard</Link>
                </li>
                )}
                <li>
                  <Link to="/profile" onClick={() => setUserDropdownOpen(false)}>Profile</Link>
                </li>
                <li>
                  <Link onClick={handleLogout}>Logout</Link>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    </header>
    <Navbar />
    </>
  );
}

export default Header;

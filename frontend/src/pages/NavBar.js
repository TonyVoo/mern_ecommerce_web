import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaLaptop, FaMobileAlt, FaTv, FaComment, FaStar } from "react-icons/fa";
import "../styles/NavBar.css"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={menuOpen ? "nav-links open" : "nav-links"}>
        <li><Link to="/category/PC&Laptop"><FaLaptop/>PC/Laptop</Link></li>
        <li><Link to="/category/SmartPhone"><FaMobileAlt/>SmartPhone</Link></li>
        <li><Link to="/category/Electronics"><FaTv/>Electronics</Link></li>
        <li><Link to="/forum"><FaComment /> Forum</Link></li>
        <li><Link to="/review"><FaStar /> Review</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

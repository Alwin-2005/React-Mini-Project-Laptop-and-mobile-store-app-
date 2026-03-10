import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ currentUser, onLogout, cartCount }) {
  const navigate = useNavigate();

  const handleLogoutClick = (e) => {
    e.preventDefault();
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h2>TechStore</h2>
      <ul className="nav-links">
        <li><Link to="/">Store</Link></li>
        <li><Link to="/cart">Cart {cartCount > 0 && `(${cartCount})`}</Link></li>
        <li><Link to="/feedback">Feedback</Link></li>

        {currentUser ? (
          <>
            <li><span style={{ color: '#fff', fontWeight: 'bold' }}>Hi, {currentUser.name}</span></li>
            <li><a href="/" onClick={handleLogoutClick} style={{ cursor: 'pointer' }}>Logout</a></li>
          </>
        ) : (
          <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

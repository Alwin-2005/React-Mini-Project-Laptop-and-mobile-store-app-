import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Products from './components/Products';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Feedback from './components/Feedback';

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const handleRegister = (userData) => {
    setUsers([...users, userData]);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCartItems([]); // Clear cart upon logout
  };

  const handleAddToCart = (product) => {
    if (!currentUser) {
      alert("Please login to add items to the cart!");
      return;
    }
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      setCartItems(cartItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <div className="App">
        <Navbar currentUser={currentUser} onLogout={handleLogout} cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<Products onAddToCart={handleAddToCart} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} users={users} />} />
          <Route path="/login" element={<Login users={users} onLogin={handleLogin} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} currentUser={currentUser} />} />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} currentUser={currentUser} />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

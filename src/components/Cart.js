import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cartItems, setCartItems, currentUser }) {
    const navigate = useNavigate();
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        if (cartItems.length === 0) return;
        navigate('/checkout');
    };

    const updateQuantity = (id, qt) => {
        setCartItems(cartItems.map(item => {
            if (item.id === id) {
                const newQuantity = item.quantity + qt;
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
            }
            return item;
        }));
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    if (!currentUser) {
        return (
            <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
                <h2>Please login to view your cart.</h2>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="form-container" style={{ maxWidth: '600px' }}>
                <h2>Your Shopping Cart</h2>

                {cartItems.length > 0 ? (
                    <div>
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <div>
                                    <h4 style={{ margin: 0, color: '#1e293b' }}>{item.name}</h4>
                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem', gap: '0.75rem' }}>
                                        <button style={{ padding: '0.2rem 0.6rem', backgroundColor: '#e2e8f0', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => updateQuantity(item.id, -1)}>-</button>
                                        <span style={{ color: '#64748b', fontSize: '0.95rem', minWidth: '1.5rem', textAlign: 'center', fontWeight: 'bold' }}>{item.quantity}</span>
                                        <button style={{ padding: '0.2rem 0.6rem', backgroundColor: '#e2e8f0', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => updateQuantity(item.id, 1)}>+</button>
                                        <button style={{ marginLeft: '1rem', padding: '0.3rem 0.8rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }} onClick={() => removeItem(item.id)}>Remove</button>
                                    </div>
                                </div>
                                <div style={{ fontWeight: 'bold', color: '#3b82f6', fontSize: '1.2rem' }}>
                                    ₹{item.price * item.quantity}
                                </div>
                            </div>
                        ))}

                        <div className="cart-total">
                            Total: ₹{total}
                        </div>

                        <button className="btn-primary" style={{ marginTop: '1.5rem' }} onClick={handleCheckout}>
                            Checkout
                        </button>
                    </div>
                ) : (
                    <p style={{ textAlign: 'center', color: '#64748b' }}>Your cart is empty.</p>
                )}
            </div>
        </div>
    );
}

export default Cart;

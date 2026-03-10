import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout({ cartItems, setCartItems, currentUser }) {
    const [formData, setFormData] = useState({
        address: '',
        city: '',
        zip: '',
        payment: 'card'
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (!currentUser) {
        return (
            <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
                <h2>Please login to view checkout.</h2>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
                <h2>Your cart is empty.</h2>
                <button className="btn-primary" style={{ marginTop: '1rem', width: 'auto', padding: '0.75rem 2rem' }} onClick={() => navigate('/')}>Go to Store</button>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        let temp = {};
        if (!formData.address) {
            temp.address = "Address is required";
        } else if (formData.address.trim().length < 10) {
            temp.address = "Please enter a complete address (min 10 characters)";
        }

        if (!formData.city) {
            temp.city = "City is required";
        }

        if (!formData.zip) {
            temp.zip = "ZIP/PIN code is required";
        } else if (!/^[1-9][0-9]{5}$/.test(formData.zip)) {
            temp.zip = "ZIP must be exactly 6 digits and cannot start with 0";
        }

        setErrors(temp);
        return Object.keys(temp).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            alert(`Order placed successfully! Total: ₹${total}`);
            setCartItems([]);
            navigate('/');
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Checkout Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Delivery Address</label>
                        <textarea name="address" value={formData.address} onChange={handleChange} rows="3" placeholder="Enter delivery address"></textarea>
                        {errors.address && <span className="error-msg">{errors.address}</span>}
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Enter your city" />
                        {errors.city && <span className="error-msg">{errors.city}</span>}
                    </div>
                    <div className="form-group">
                        <label>ZIP Code</label>
                        <input type="text" name="zip" value={formData.zip} onChange={handleChange} placeholder="Enter ZIP code" />
                        {errors.zip && <span className="error-msg">{errors.zip}</span>}
                    </div>
                    <div className="form-group">
                        <label>Payment Method</label>
                        <select name="payment" value={formData.payment} onChange={handleChange}>
                            <option value="card">Credit / Debit Card</option>
                            <option value="upi">UPI</option>
                            <option value="cod">Cash on Delivery</option>
                        </select>
                    </div>

                    <div style={{ margin: '1.5rem 0', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>Order Summary</h3>
                        <p style={{ margin: 0, color: '#64748b' }}>Items: {cartItems.reduce((acc, i) => acc + i.quantity, 0)}</p>
                        <p style={{ margin: '0.5rem 0 0 0', fontWeight: 'bold', fontSize: '1.1rem', color: '#3b82f6' }}>Total Amount: ₹{total}</p>
                    </div>

                    <button type="submit" className="btn-primary">Place Order</button>
                </form>
            </div>
        </div>
    );
}

export default Checkout;

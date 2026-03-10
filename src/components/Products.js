import React from 'react';

const products = [
    { id: 1, name: 'MacBook Pro M3', type: 'Laptop', price: 1599, desc: 'Powerful laptop for professionals.', image: '💻' },
    { id: 2, name: 'Dell XPS 15', type: 'Laptop', price: 1399, desc: 'Sleek design with stunning display.', image: '💻' },
    { id: 3, name: 'Lenovo ThinkPad X1', type: 'Laptop', price: 1499, desc: 'The ultimate business machine.', image: '💻' },
    { id: 4, name: 'iPhone 15 Pro', type: 'Mobile', price: 999, desc: 'Titanium design with advanced camera.', image: '📱' },
    { id: 5, name: 'Samsung Galaxy S24 Ultra', type: 'Mobile', price: 1199, desc: 'AI-powered flagship phone.', image: '📱' },
    { id: 6, name: 'Google Pixel 8 Pro', type: 'Mobile', price: 899, desc: 'Best-in-class computational photography.', image: '📱' },
];

function Products({ onAddToCart }) {
    const laptops = products.filter(p => p.type === 'Laptop');
    const mobiles = products.filter(p => p.type === 'Mobile');

    const renderGrid = (items) => (
        <div className="products-grid">
            {items.map(product => (
                <div key={product.id} className="product-card">
                    <div className="product-image">
                        <span role="img" aria-label={product.type}>{product.image}</span>
                    </div>
                    <div className="product-details">
                        <h3 className="product-title">{product.name}</h3>
                        <div className="product-price">₹{product.price}</div>
                        <p className="product-description">{product.desc}</p>
                        <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', marginTop: '1rem', color: '#1e293b' }}>Laptops</h2>
            {renderGrid(laptops)}

            <h2 style={{ textAlign: 'center', margin: '3rem 0 1.5rem', color: '#1e293b' }}>Mobiles</h2>
            {renderGrid(mobiles)}
        </div>
    );
}

export default Products;

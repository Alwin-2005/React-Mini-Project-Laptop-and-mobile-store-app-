import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Feedback() {
    const [formData, setFormData] = useState({
        rating: '5',
        comment: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.comment.trim()) {
            setError("Please provide a comment.");
            return;
        }
        setError("");
        alert("Thank you for your feedback!");
        navigate('/');
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Leave Feedback</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Rating</label>
                        <select name="rating" value={formData.rating} onChange={handleChange}>
                            <option value="5">5 - Excellent</option>
                            <option value="4">4 - Good</option>
                            <option value="3">3 - Average</option>
                            <option value="2">2 - Poor</option>
                            <option value="1">1 - Terrible</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Comment</label>
                        <textarea
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            rows="5"
                            placeholder="Tell us what you think..."
                        />
                        {error && <span className="error-msg">{error}</span>}
                    </div>
                    <button type="submit">Submit Feedback</button>
                </form>
            </div>
        </div>
    );
}

export default Feedback;

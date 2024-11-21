import React, { useState } from 'react';

const AddAdmin = () => {
    const [newAdminEmail, setNewAdminEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // State for loading

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        setLoading(true); // Show loading spinner

        if (!validateEmail(newAdminEmail)) {
            setError("Invalid email format.");
            setLoading(false); // Hide loading spinner
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/admin/addAdmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: newAdminEmail }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add new admin');
            }

            setMessage('Admin added successfully');
            setNewAdminEmail('');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false); // Hide loading spinner when done
        }
    };

    const validateEmail = (email) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    };

    return (
        <div style={{ padding: '20px', width: '300px', margin: 'auto', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h2>Add More Admins</h2>
            <form onSubmit={handleAddAdmin}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Admin Email:</label>
                    <input
                        type="email"
                        value={newAdminEmail}
                        onChange={(e) => setNewAdminEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '4px',
                    }}
                    disabled={loading} // Disable button while loading
                >
                    {loading ? 'Adding...' : 'Add Admin'}
                </button>
            </form>
            {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
    );
};

export default AddAdmin;

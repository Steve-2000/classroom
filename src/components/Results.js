import React, { useState, useEffect } from 'react';
import './Results.css'; // Import the CSS file
import { getAuth } from 'firebase/auth';
import { useParams } from 'react-router-dom';

const Results = () => {
    const { id } = useParams();
    const [index, setIndex] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    // Extract user index from email
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            // Get the index from the email (before '@')
            const emailParts = user.email.split('@');
            setIndex(emailParts[0]);  // This assumes the part before @ is the index
        }
    }, [user]);

    const handleResults = async (e) => {
        e.preventDefault();
        setError(null);
        setData([]);

        try {
            const response = await fetch(`http://localhost:5000/api/results/${index}`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const results = await response.json();
            setData(results);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="results-container">
            <form className="results-form" onSubmit={handleResults}>
                <label htmlFor="index">Index Number</label>
                <input 
                    type="text"
                    value={index}
                    id="index"
                    readOnly // Make it read-only so the user can't edit it
                    required
                />
                <button type="submit">Enter</button>
            </form>
            {error && <p>{error}</p>}
            {data.length > 0 && (
                <div className="results-table-container">
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>Index No</th>
                                <th>Subject</th>
                                <th>Department</th>
                                <th>Marks</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((result, idx) => (
                                <tr key={idx}>
                                    <td>{result.indexNo}</td>
                                    <td>{result.subject}</td>
                                    <td>{result.department}</td>
                                    <td>{result.marks}</td>
                                    <td>{result.marks > 50 ? 'Done' : 'Fail'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Results;

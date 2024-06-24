import React, { useState } from 'react';
import './Results.css'; // Import the CSS file

const Results = () => {
    const [index, setIndex] = useState("");
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    

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
                    placeholder="index number"
                
                    value={index}
                    onChange={(e) => setIndex(e.target.value)}
                    id="index"
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
                                    <td>{(result.marks)>50 ? result.status="done":"fsil"}</td>
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

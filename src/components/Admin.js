import React, { useState } from 'react';
import './Admins.css'; // Import the CSS file

const Admin = () => {
    const [students, setStudents] = useState(
        Array(2).fill({ indexNo: '', subject: '', department: '', marks: '', status: '' })
    );
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (index, field, value) => {
        const updatedStudents = [...students];
        updatedStudents[index] = { ...updatedStudents[index], [field]: value };
        setStudents(updatedStudents);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/api/admin/saveResults', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(students),
            });

            if (!response.ok) {
                throw new Error('Failed to save data');
            }

            setMessage('Data saved successfully');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="admin-container">
            <form className="admin-form" onSubmit={handleSave}>
                <table className="admin-table">
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
                        {students.map((student, idx) => (
                            <tr key={idx}>
                                <td>
                                    <input
                                        type="text"
                                        value={student.indexNo}
                                        onChange={(e) => handleInputChange(idx, 'indexNo', e.target.value)}
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={student.subject}
                                        onChange={(e) => handleInputChange(idx, 'subject', e.target.value)}
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={student.department}
                                        onChange={(e) => handleInputChange(idx, 'department', e.target.value)}
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={student.marks}
                                        onChange={(e) => handleInputChange(idx, 'marks', e.target.value)}
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={student.marks > 50 ? 'Pass' : 'Fail'}
                                        readOnly
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type="submit">Save</button>
                {message && <p>{message}</p>}
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Admin;

import React, { useState } from 'react';
import axios from 'axios';

const ManageSubjects = () => {
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [department, setDepartment] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleManageSubjects = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/admin/saveSubject', {
                year,
                semester,
                department,
                subject
            });
            setMessage('Subject added successfully!');
            setYear('');
            setSemester('');
            setDepartment('');
            setSubject('');
        } catch (err) {
            console.error('Error adding subject:', err);
            setError('Failed to add subject. Please try again.');
        }
    };

    return (
        <div>
            <h2>Manage Subjects</h2>
            <form onSubmit={handleManageSubjects}>
                <label>Year:</label>
                <select value={year} onChange={(e) => setYear(e.target.value)} required>
                    <option value="">Select Year</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>

                <label>Semester:</label>
                <select value={semester} onChange={(e) => setSemester(e.target.value)} required>
                    <option value="">Select Semester</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>

                <label>Department:</label>
                <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
                    <option value="">Select Department</option>
                    <option value="ICT">ICT</option>
                    <option value="BST">BST</option>
                    <option value="ENT">ENT</option>
                </select>

                <label>Subject:</label>
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                />
                <button type="submit">Add Subject</button>
            </form>

            {message && <div style={{ color: 'green' }}>{message}</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default ManageSubjects;

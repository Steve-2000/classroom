import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './Admins.css'; // Import the CSS file

const allowedEmails = ['dilan@gmail.com']; // Replace with the allowed admin emails

const departments = ['ICT', 'BST', 'ENT']; // Example departments
const subjects = ['Math', 'Science', 'English']; // Example subjects

const Admin = () => {
    const [user, setUser] = useState(null);
    const [students, setStudents] = useState([{ indexNo: '', subject: '', department: '', marks: '', status: '' }]);
    const [rowCount, setRowCount] = useState(1);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [defaultDepartment, setDefaultDepartment] = useState('');
    const [defaultSubject, setDefaultSubject] = useState('');

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                if (allowedEmails.includes(currentUser.email)) {
                    setUser(currentUser);
                } else {
                    alert('You are not authorized to access this section.');
                    window.location.href = '/'; // Redirect to home or login page
                }
            } else {
                window.location.href = '/login'; // Redirect to login if not authenticated
            }
        });

        return () => unsubscribe();
    }, []);

    const handleInputChange = (index, field, value) => {
        const updatedStudents = [...students];
        updatedStudents[index] = { ...updatedStudents[index], [field]: value };

        // Update status based on marks
        if (field === 'marks') {
            updatedStudents[index].status = value > 50 ? 'Pass' : 'Fail';
        }

        setStudents(updatedStudents);

        // Update default values if first row is edited
        if (index === 0) {
            if (field === 'department') {
                setDefaultDepartment(value);
            } else if (field === 'subject') {
                setDefaultSubject(value);
            }
        }
    };

    const handleAddRow = () => {
        const lastIndex = students.length - 1;
        const newIndexNo = students[lastIndex]?.indexNo
            ? incrementIndex(students[lastIndex].indexNo)
            : '';

        setStudents([
            ...students,
            { indexNo: newIndexNo, subject: defaultSubject, department: defaultDepartment, marks: '', status: '' },
        ]);
    };

    const incrementIndex = (index) => {
        const prefix = index.slice(0, 3);
        const number = parseInt(index.slice(3), 10) + 1;
        return `${prefix}${String(number).padStart(3, '0')}`;
    };

    const handleRemoveRow = (index) => {
        const updatedStudents = students.filter((_, i) => i !== index);
        setStudents(updatedStudents);
    };

    const handleRowCountChange = (e) => {
        const count = parseInt(e.target.value, 10);
        if (count > students.length) {
            setStudents([
                ...students,
                ...Array(count - students.length).fill({
                    indexNo: '',
                    subject: defaultSubject,
                    department: defaultDepartment,
                    marks: '',
                    status: '',
                }),
            ]);
        } else {
            setStudents(students.slice(0, count));
        }
        setRowCount(count);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        // Ensure that all fields are properly set and validated
        const validatedStudents = students.map(student => ({
            ...student,
            status: student.marks > 50 ? 'Pass' : 'Fail'
        }));

        try {
            const response = await fetch('http://localhost:5000/api/admin/saveResults', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(validatedStudents),
            });

            if (!response.ok) {
                throw new Error('Failed to save data');
            }

            setMessage('Data saved successfully');
        } catch (error) {
            setError(error.message);
        }
    };

    if (!user) {
        return <p>Loading...</p>; // Show a loading message or spinner
    }

    return (
        <div className="admin-container">
            <div className="row-control-container">
                <label htmlFor="rowCount">Number of Rows:</label>
                <input
                    type="number"
                    id="rowCount"
                    value={rowCount}
                    onChange={handleRowCountChange}
                    min="1"
                    max="100"
                    className="row-count-input"
                />
                <button type="button" onClick={handleAddRow} className="add-row-button">+ Add Row</button>
            </div>
            <form className="admin-form" onSubmit={handleSave}>
                <div className="table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Index No</th>
                                <th>Subject</th>
                                <th>Department</th>
                                <th>Marks</th>
                                <th>Status</th>
                                <th>Actions</th>
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
                                            className="student-input"
                                        />
                                    </td>
                                    <td>
                                        <select
                                            value={student.subject}
                                            onChange={(e) => handleInputChange(idx, 'subject', e.target.value)}
                                            required
                                            className="student-input"
                                        >
                                            {subjects.map((subject) => (
                                                <option key={subject} value={subject}>
                                                    {subject}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <select
                                            value={student.department}
                                            onChange={(e) => handleInputChange(idx, 'department', e.target.value)}
                                            required
                                            className="student-input"
                                        >
                                            {departments.map((department) => (
                                                <option key={department} value={department}>
                                                    {department}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={student.marks}
                                            onChange={(e) => handleInputChange(idx, 'marks', e.target.value)}
                                            required
                                            className="student-input"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={student.status}
                                            readOnly
                                            className="student-input"
                                        />
                                    </td>
                                    <td>
                                        <button type="button" onClick={() => handleRemoveRow(idx)} className="remove-row-button">✘</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button type="submit" className="save-button">Save</button>
                {message && <p className="message">{message}</p>}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default Admin;

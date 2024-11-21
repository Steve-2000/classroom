import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [department, setDepartment] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [error, setError] = useState('');

    const [numRows, setNumRows] = useState(1);
    const [studentsData, setStudentsData] = useState([
        { indexNo: '', selectedSubject: '', marks: '', status: '' },
    ]);

    useEffect(() => {
        if (year && semester && department) {
            fetchSubjects();
        }
    }, [year, semester, department]);

    const fetchSubjects = async () => {
        setError('');
        try {
            const response = await axios.get('http://localhost:5000/api/admin/getSubjects', {
                params: { year, semester, department },
            });
            setSubjects(response.data);
        } catch (error) {
            setError('No subjects found for the selected filters.');
            setSubjects([]);
        }
    };

    const generateIndexNumber = (prefix, index) => {
        return `${prefix}${index.toString().padStart(3, '0')}`;
    };

    const handleDepartmentChange = (e) => {
        const selectedDepartment = e.target.value;
        setDepartment(selectedDepartment);

        if (selectedDepartment) {
            const prefix = selectedDepartment.toLowerCase(); // Use the department as prefix
            setStudentsData([{ indexNo: generateIndexNumber(prefix, 0), selectedSubject: '', marks: '', status: '' }]);
            setNumRows(1);
        }
    };

    const handleAddRows = (e) => {
        const rows = parseInt(e.target.value, 10);
        setNumRows(rows);

        const newStudentsData = [...studentsData];
        let lastIndex = studentsData[studentsData.length - 1]?.indexNo || ''; // Get last index or empty if none
        const prefix = department.toLowerCase(); // Department as prefix

        for (let i = studentsData.length; i < rows; i++) {
            if (lastIndex) {
                const lastNumberPart = parseInt(lastIndex.slice(-3), 10); // Extract last number
                lastIndex = generateIndexNumber(prefix, lastNumberPart + 1);
            }
            newStudentsData.push({
                indexNo: lastIndex,
                selectedSubject: '',
                marks: '',
                status: '',
            });
        }

        setStudentsData(newStudentsData);
    };

    const handleRowChange = (index, field, value) => {
        const updatedData = [...studentsData];
        updatedData[index][field] = value;

        if (field === 'indexNo' && index === 0 && studentsData.length > 1) {
            // Auto-increment subsequent rows when the first index is updated
            let currentIndex = value;
            const prefix = department.toLowerCase();
            for (let i = 1; i < studentsData.length; i++) {
                currentIndex = generateIndexNumber(prefix, parseInt(currentIndex.slice(-3), 10) + 1);
                updatedData[i].indexNo = currentIndex;
            }
        }

        if (field === 'marks') {
            updatedData[index].status = value > 50 ? 'Pass' : 'Fail';
        }

        setStudentsData(updatedData);
    };

    const handleDeleteRow = (index) => {
        const updatedData = studentsData.filter((_, i) => i !== index);
        setStudentsData(updatedData);
        setNumRows(updatedData.length);
    };

    const handleResultSubmission = async (e) => {
        e.preventDefault();
        const invalidRow = studentsData.find(
            (data) =>
                !data.indexNo || !data.selectedSubject || !data.marks || !data.status
        );

        if (invalidRow) {
            alert('Please fill in all fields for every row');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/admin/saveResults', studentsData);
            alert('Results updated successfully');
            setStudentsData([{ indexNo: '', selectedSubject: '', marks: '', status: '' }]);
            setNumRows(1);
        } catch (error) {
            console.error('Error saving result:', error);
            alert('Failed to update results');
        }
    };

    return (
        <div>
            <h2>Admin Page - Manage Results</h2>

            <div>
                <h3>Filter Subjects</h3>
                <label>Year:</label>
                <select value={year} onChange={(e) => setYear(e.target.value)}>
                    <option value="">Select Year</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>

                <label>Semester:</label>
                <select value={semester} onChange={(e) => setSemester(e.target.value)}>
                    <option value="">Select Semester</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>

                <label>Department:</label>
                <select value={department} onChange={handleDepartmentChange}>
                    <option value="">Select Department</option>
                    <option value="ICT">ict</option>    
                    <option value="BST">Bst</option>
                    <option value="ENT">Ent</option>
                </select>

                <h3>Subjects:</h3>
                {error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : (
                    <ul>
                        {subjects.map((subject, index) => (
                            <li key={index}>{subject.subject}</li>
                        ))}
                    </ul>
                )}
            </div>

            <div>
                <h3>Enter Results for Students</h3>
                <label>Number of Rows:</label>
                <input
                    type="number"
                    value={numRows}
                    min="1"
                    onChange={handleAddRows}
                    max="10"
                />

                {studentsData.map((student, index) => (
                    <div key={index} className="student-row">
                        <label>Index Number:</label>
                        <input
                            type="text"
                            value={student.indexNo}
                            onChange={(e) =>
                                handleRowChange(index, 'indexNo', e.target.value)
                            }
                            placeholder="Enter Index Number"
                        />

                        <label>Subject:</label>
                        <select
                            value={student.selectedSubject}
                            onChange={(e) =>
                                handleRowChange(index, 'selectedSubject', e.target.value)
                            }
                        >
                            <option value="">Select Subject</option>
                            {subjects.map((subject, idx) => (
                                <option key={idx} value={subject.subject}>
                                    {subject.subject}
                                </option>
                            ))}
                        </select>

                        <label>Marks:</label>
                        <input
                            type="number"
                            value={student.marks}
                            onChange={(e) => handleRowChange(index, 'marks', e.target.value)}
                            placeholder="Enter Marks"
                        />

                        <label>Status:</label>
                        <select
                            value={student.status}
                            onChange={(e) =>
                                handleRowChange(index, 'status', e.target.value)
                            }
                        >
                            <option value="">Select Status</option>
                            <option value="Pass">Pass</option>
                            <option value="Fail">Fail</option>
                        </select>

                        <button
                            type="button"
                            onClick={() => handleDeleteRow(index)}
                            style={{ backgroundColor: 'red', color: 'white' }}
                        >
                            Delete
                        </button>
                    </div>
                ))}

                <button type="submit" onClick={handleResultSubmission}>
                    Submit Results
                </button>
            </div>
        </div>
    );
};

export default AdminPage;

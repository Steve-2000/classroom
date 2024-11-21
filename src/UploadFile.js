// UploadFile.js
import React, { useState } from 'react';
import axios from 'axios';
import './style.css'

const UploadFile = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            setMessage("Please select a file!");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post("http://localhost:5000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Error uploading file!");
        }
    };

    return (
        <div className="upload-container">
            <h2>Upload Past Paper</h2>
            <form onSubmit={handleFileUpload} className="upload-form">
                <input type="file" onChange={handleFileChange} required />
                <button type="submit" className="upload-btn">Upload</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default UploadFile;

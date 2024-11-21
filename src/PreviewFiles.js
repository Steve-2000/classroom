// PreviewFiles.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PreviewFiles = () => {
    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get("http://localhost:5000/files");
                setFiles(response.data);
                if (response.data.length === 0) {
                    setMessage("No files uploaded yet.");
                } else {
                    setMessage("");
                }
            } catch (error) {
                console.error("Error fetching files:", error);
                setMessage("Error fetching files.");
            }
        };

        fetchFiles();
    }, []);

    return (
        <div className="preview-container">
            <h2>Preview Past Papers</h2>
            {message && <p className="message">{message}</p>}
            {files.length > 0 ? (
                <ul className="file-list">
                    {files.map((file, index) => (
                        <li key={index} className="file-item">
                            <a href={`http://localhost:5000/${file.filePath}`} target="_blank" rel="noopener noreferrer" className="file-link">
                                {file.filename}
                            </a>
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

export default PreviewFiles;

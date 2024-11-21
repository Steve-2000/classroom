import React, { useState } from 'react';
import axios from 'axios';
function UploadMaterial() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    file: null,
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    try {
      await axios.post('/api/materials/upload', data);
      alert('File uploaded successfully');
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Title: <input type="text" name="title" onChange={handleChange} /></label>
      <label>Description: <textarea name="description" onChange={handleChange}></textarea></label>
      <label>Type:
        <select name="type" onChange={handleChange}>
          <option value="past-paper">Past Paper</option>
          <option value="study-material">Study Material</option>
          <option value="project-sample">Project Sample</option>
          <option value="current-material">Current Material</option>
        </select>
      </label>
      <label>File: <input type="file" name="file" onChange={handleFileChange} /></label>
      <button type="submit">Upload</button>
    </form>
  );
}
export default UploadMaterial;
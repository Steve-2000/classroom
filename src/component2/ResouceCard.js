import React from 'react';
function ResourceCard({ title, description, fileUrl }) {
  return (
    <div className="resource-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={fileUrl} download>Download</a>
    </div>
  );
}
export default ResourceCard;
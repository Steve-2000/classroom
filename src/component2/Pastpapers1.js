import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResourceCard from './ResouceCard';
function PastPapers1() {
  const [materials, setMaterials] = useState([]);

  
  useEffect(() => {
    axios.get('/api/materials/past-papers')
      .then(response => setMaterials(response.data))
      .catch(error => console.error("Error fetching past papers", error));
  }, []);
  return (
    <div>
      <h2>Past Papers</h2>
      {materials.map((material) => (    
        <ResourceCard key={material._id} {...material} />
      ))}
    </div>
  );
}
export default PastPapers1;
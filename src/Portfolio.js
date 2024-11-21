// App.js
import React from 'react';
import UploadFile from './UploadFile';
import PreviewFiles from './PreviewFiles';

const Portfolio = () => {
  return (
    <div className="App">
      <h1>Past Paper preview</h1>
      {/* <UploadFile /> */}
      <PreviewFiles />
    </div>
  );
};

export default Portfolio;

import React from 'react';
import '../styling/Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="loader-animation">
          <div className="loader-ring">
            <div className="loader-ring-inner"></div>
          </div>
          <div className="loader-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="loader-text">
          <h2>Om Dhage</h2>
          <p>Full Stack Developer</p>
          <div className="loading-progress">
            <span>Loading Portfolio...</span>
          </div>
        </div>
      </div>
      <div className="loader-bg-animation">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;

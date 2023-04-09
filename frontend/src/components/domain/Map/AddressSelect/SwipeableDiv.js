// src/SwipeableDiv.js
import React from 'react';
import './SwipeableDiv.css';

const SwipeableDiv = ({ children, onButtonClick, isExpanded }) => {
  return (
    <div className="container">
      <button
        id="expandButton"
        className={isExpanded ? 'expanded' : ''}
        onClick={onButtonClick}
      >
        {isExpanded ? "▼" : "▲"}
      </button>
      <div className={`content ${isExpanded ? 'expanded' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default SwipeableDiv;

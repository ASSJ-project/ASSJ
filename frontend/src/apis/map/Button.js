import React from 'react';

const Button = ({ text, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '8px 16px',
        backgroundColor: disabled ? '#ddd' : '#007bff',
        color: '#fff',
        borderRadius: '4px',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        margin: '20px',
        top: '10px',
        left: '10px',
        height: '30px',
        width: '30px',
      }}
    >
      {text}
    </button>
  );
};

export default Button;
import React from 'react';
import './style.css';

function Button({ label, variant = 'primary', onClick, type }) {
  return (
    <button type={type} className={`share-button ${variant}`.trim()} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
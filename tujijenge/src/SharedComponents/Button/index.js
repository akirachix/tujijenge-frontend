import React from 'react';
import './style.css';

function Button({ label, variant = 'primary', onClick }) {
  return (
    <button className={`share-button ${variant}`.trim()} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
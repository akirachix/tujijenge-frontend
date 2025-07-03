import React from 'react';
import './button.css'

function Button({
    label,
    variant = 'primary',
    onClick,
   
}) {
    return (
        <button
            className={`share-button ${variant}`.trim()}
            onClick={onClick}
        >
            {label}
        </button>
    );
}

export default Button;



import React from "react";
import './style.css'


function Input({ id, label, value, onChange, type = "text", placeholder }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input 
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-input"
      />
    </div>
  );
}

export default Input;
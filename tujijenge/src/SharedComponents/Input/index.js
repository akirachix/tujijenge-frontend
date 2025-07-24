// import React from "react";
// import './style.css'


// function Input({ id, label, value, onChange, type = "text", placeholder }) {
//   return (
//     <div className="form-group">
//       <label htmlFor={id}>{label}</label>
//       <input 
//         id={id}
//         type={type}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className="form-input"
        
//       />
//     </div>
//   );
// }

// export default Input;


import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import './style.css';  // Your CSS file where styles will live

function Input({ id, label, value, onChange, type = "text", placeholder }) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-group input-with-icon">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={inputType}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-input"
      />
      {type === "password" && (
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          onClick={togglePasswordVisibility}
          className="eye-icon"
          aria-label={showPassword ? "Hide password" : "Show password"}
          role="button"
          tabIndex={0}
          onKeyPess={(e) => {
            if (e.key === 'Enter' || e.key === ' ') togglePasswordVisibility();
          }}
        />
      )}
    </div>
  );
}

export default Input;


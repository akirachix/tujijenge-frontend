import React, { useState } from "react";
import "./Form.css";


function Form({ role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (input) => {
    input.preventDefault();
    alert('Try again')
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Email:</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </div>
      <div className="form-row">
        <label >Password:</label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>
      <button type="submit" className="sign-in-btn">Sign in</button>
    </form>
  );
}

export default Form;
import React, { useState } from "react";

function LoginForm({ onSubmit }) {
  const [form, setForm] = useState({ email: "", password: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Sign in</button>
    </form>
  );
}

export default LoginForm;
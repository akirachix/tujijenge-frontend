import './App.css';
import Button from './SharedComponents/Button';
import Input from './SharedComponents/Input';
import React, { useState } from "react";


function App() {
  const [email, setEmail] = useState("");
  return (
    <div className="App">

       <Button
        label="Save"
        onClick={() => alert('Saved!')}
        type="submit"
        disabled={false}
      />

      <Button
        label="Cancel!"
        variant="secondary"
        onClick={() => alert('Canceled!')}
      /> 
      <Button
        label="Cancel!"
        variant="quaternary"
        onClick={() => alert('Canceled!')}
      />


    <Input
        id="email"
        label="Email:"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      /> 


      
    </div>
  );
}




export default App;

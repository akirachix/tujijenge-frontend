import './App.css';
import Button from './SharedComponents/Button';
import Input from './SharedComponents/Input';
import React, { useState } from "react";

function App() {
  const handleClick = (action) => {
    console.log('button clicked!')};

  return (
    <div >
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Tujijenge Buttons and input field</h1>
      <Button label="Login" variant="primary" onClick={() => handleClick('Login')} />
      <Button label="Join Community" variant="secondary" onClick={() => handleClick('Join')} />
      <Button label="Submit" variant="tertiary" onClick={() => handleClick('Submit')} />
      <Button label="Cancel" variant="quaternary" onClick={() => handleClick('Cancel')} />
      <Input 
        label={"Email:"}
    placeholder ={"email"}
    />  
    
    
       </div>
  );
}

export default App;


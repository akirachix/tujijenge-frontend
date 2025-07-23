import './App.css';
import React from "react";
import Splash from './Onboarding/Splash/index.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SupplyChain from './Onboarding/SupplyChain/index.js';
import Training from './Onboarding/Training/index.js';
import Orders from './Onboarding/Orders/index.js';
import Verification from './Onboarding/Verification/index.js';
import SignIn from './Onboarding/SignIn/index.js';
import Welcome from './Onboarding/Home/index.js';
// import ForgotPassword from './Onboarding/ForgotPassword/index.js'
function App() {
  console.log(`${process.env.REACT_APP_API_URL}/users/login/`); // Should print http://127.0.0.1:8000


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/supplychain" element={<SupplyChain />} />
        <Route path="/training" element={<Training />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/home" element={<Welcome />} />
        <Route path="/signin" element={<SignIn />} />
        {/* <Route path = "/forgotpassword" element = {<ForgotPassword/>}/> */}





        
        
      </Routes>

    </Router>
  );
}

export default App;


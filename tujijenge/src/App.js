
import './App.css';
import React from "react";
import Splash from './Onboarding/Splash/index.js'
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import SupplyChain from './Onboarding/SupplyChain/index.js';
import Training from './Onboarding/Training/index.js';
import Orders from './Onboarding/Orders/index.js';
import Verification from './Onboarding/Verification/index.js';
import SignIn from './Onboarding/SignIn/index.js';
import Welcome from './Onboarding/Home/index.js';
// import Dashboard from "./Dashboard/index";
// import TrainingCalendar from "./TrainingCalendar/index";
// import DashboardLayout from "./SharedComponents/Layouts/index";
// import { EventsProvider } from './context/useEvents';



function App() {
  console.log(`${process.env.REACT_APP_API_URL}/users/login/`); 


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
      </Routes>

    </Router>

//     <div>
//       <EventsProvider>
//       <Router>
//        <Routes>
//         <Route element={<DashboardLayout/>}>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/training-calendar" element={<TrainingCalendar />} />
//         </Route>
//         </Routes>
//         <div>

//         </div>
//       </Router>
//     </EventsProvider>
//     </div>

  );
}

export default App;
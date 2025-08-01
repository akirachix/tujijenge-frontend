import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import Dashboard from "./Dashboard/index";
import { useState, useEffect } from 'react';
import TrainingCalendar from "./TrainingCalendar/index";
import DashboardLayout from "./SharedComponents/Layouts/index";
import { EventsProvider } from './context/useEvents';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem('token') || null;
     
      setToken(newToken);
    };
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(() => {
      const newToken = localStorage.getItem('token') || null;
      if (newToken !== token) {
       
        setToken(newToken);
      }
    }, 1000);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setToken(null); 
  };

  return (
    <div>
      <EventsProvider>
      <Router>
      {!token ? (
        <div className="unauthorized-container">
          <h2>Unauthorized</h2>
        </div>
      ) : (
        <Routes>
        <Route element={<DashboardLayout onLogout={handleLogout}/>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/training-calendar" element={<TrainingCalendar />} />
        </Route>
        </Routes>
       )}
      </Router>
    </EventsProvider>
    </div>
    
    
  );
}


export default App;
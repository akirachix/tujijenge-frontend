import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import DashboardPage from "./Pages/GainDashboard/index";
import CalendarPage from "./Pages/CalendarPage/index";


function App() {
  return (
    <div>
      <EventsProvider>
      <Router>
       <Routes>
        <Route element={<DashboardLayout/>}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Route>
        </Routes>
        <div>

        </div>
      </Router>
    </EventsProvider>
    </div>
    
  );
}

export default App;
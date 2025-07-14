import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Using Router for distinct "pages"
import { EventsProvider } from './context/useEvents'; 
import MyCalendar from './Pages/GainDashboard/components/CalendarView/index';
import DashboardPage from "./Pages/GainDashboard/index";
import CalendarPage from "./Pages/CalendarPage/index";


function App() {
  return (
    <div>
      <EventsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        <div>

        </div>
      </Router>
    </EventsProvider>
    </div>
    
  );
}

export default App;
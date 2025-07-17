import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import Dashboard from "./Dashboard/index";
import TrainingCalendar from "./TrainingCalendar/index";
import DashboardLayout from "./SharedComponents/Layouts/index";
import { EventsProvider } from './context/useEvents';


function App() {


  return (
    <div>
      <EventsProvider>
      <Router>
       <Routes>
        <Route element={<DashboardLayout/>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/training-calendar" element={<TrainingCalendar />} />
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
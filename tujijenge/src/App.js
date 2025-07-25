// App.js
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { EventsProvider } from './context/useEvents';
import Dashboard from './Dashboard/index';
import TrainingCalendar from './TrainingCalendar/index';
import DashboardLayout from './SharedComponents/Layouts/index';
import GroupOrders from './GroupOrders';
import RecentOrders from './RecentOrders';
import './App.css';

const TOKEN_STORAGE_KEY = 'authTokenKey';
const AUTH_TOKEN = process.env.REACT_APP_AUTH_TOKEN;

function App() {
  const [token, setToken] = useState(() => {
    // Initialize token from localStorage or AUTH_TOKEN
    if (!localStorage.getItem(TOKEN_STORAGE_KEY) && AUTH_TOKEN) {
      localStorage.setItem(TOKEN_STORAGE_KEY, AUTH_TOKEN);
    }
    return localStorage.getItem(TOKEN_STORAGE_KEY) || null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem(TOKEN_STORAGE_KEY) || null;
      setToken(newToken);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <EventsProvider>
      <Router>
        {!token ? (
          <div className="unauthorized-container">
            <h2>Unauthorized: Please log in</h2>
          </div>
        ) : (
          <Routes>
            <Route element={<DashboardLayout />}>
              {/* <Route path="/" element={<Dashboard />} />
              <Route path="/training-calendar" element={<TrainingCalendar />} /> */}
            </Route>
            <Route path="/group-orders/:groupId" element={<GroupOrders />} />
            <Route path="/" element={<RecentOrders />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </Router>
    </EventsProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CatalogueScreen from "./Catalogue";
import CatalogueLayout from "./sharedComponents/Layouts/index";
import { EventsProvider } from './context/useEvents';

function App() {
  return (
    <div>
        <EventsProvider>
          <Router>
            <Routes>
              <Route element={<CatalogueLayout />}>
                <Route path="/" element={<CatalogueScreen />} />
              </Route>
            </Routes>
          </Router>
        </EventsProvider>
    </div>
  );
}

export default App;
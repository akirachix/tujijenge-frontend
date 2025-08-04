import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { EventsProvider } from './context/useEvents';
import CatalogueScreen from './Catalogue';
import RecentOrders from './RecentOrders';
import GroupOrders from './GroupOrders';
import SupplierLayout from './sharedComponents/SupplierLayouts';
import SignIn from './Onboarding/SignIn';
import Splash from './Onboarding/Splash/index.js' 
import SupplyChain from './Onboarding/SupplyChain/index.js';
import Training from './Onboarding/Training/index.js';
import Orders from './Onboarding/Orders/index.js';
import Verification from './Onboarding/Verification/index.js';
import Welcome from './Onboarding/Home/index.js';
import TrainingCalendar from "./TrainingCalendar/index";
import AppLayout from "./Dashboard/index";
import DashboardLayout from "./sharedComponents/Layouts/Gain/index";


function App() {

  return (
    <EventsProvider>
      <Router>
        <Routes>

          <Route path="/" element={<Splash />} />
          <Route path="/supplychain" element={<SupplyChain />} />
          <Route path="/training" element={<Training />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/home" element={<Welcome />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route element={<SupplierLayout />}>
            <Route path="/Catalogue" element={<CatalogueScreen />} />
            <Route path="/RecentOrders" element={<RecentOrders />} />
            <Route path="/group-orders/:groupId" element={<GroupOrders />} />
          </Route>
          <Route element={<DashboardLayout/>}>
          <Route path="/dashboard" element={<AppLayout/>} />
          <Route path="/training-calendar" element={<TrainingCalendar />} />
        </Route>
        </Routes>
      </Router>
    </EventsProvider>
  );
}


export default App;
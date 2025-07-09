import './App.css';

import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import GroupOrders from './Components/GroupOrders';
import CommunityOrders from './Components/CommunityOrders';
import GainDashboard from './Pages/GainDashboard'

import React from "react";


function App() {


  return (

    <Router>
      <Routes>
        <Route path='/Community' element={<CommunityOrders/>}/>
        <Route path='/group-orders/:groupId' element={<GroupOrders/>}/>
        <Route path='/' element={<GainDashboard/>}/>
        
        

      </Routes>
    </Router>
  );
}

export default App;




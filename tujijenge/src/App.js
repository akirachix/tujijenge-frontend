import './App.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import GroupOrders from './Components/GroupOrders';
import CommunityOrders from './Components/CommunityOrders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<CommunityOrders/>}/>
        <Route path='/group-orders/:groupId' element={<GroupOrders/>}/>

      </Routes>
    </Router>
  );
}

export default App;

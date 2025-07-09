import React, { useState } from 'react';
import ImpactChart from './components/ImpactChart/index';
import Sidebar from '../../SharedComponents/Sidebar/index';
import Notification from '../../SharedComponents/Notifications/index';
import TrainingTable from './components/TrainingTable/index';
import './index.css'



const notifications = [
  { message: '1 message' },
  { message: '2 message' },
  { message: '1 message' },
  { message: '2 message' },
  { message: '1 message' },
  { message: '2 message' },
  { message: '1 message' },
  { message: '2 message' },
  { message: '1 message' },
  { message: '2 message' },
  { message: '2 message' },
];


export default function AppLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);


  return (
    <div style={{ display: 'flex' }}>
      <Sidebar
        isCollapsed={isCollapsed}
        toggleSidebar={() => setIsCollapsed(!isCollapsed)}
      />
      <div>

        <div className={`main ${isCollapsed ? 'main-collapsed' : 'main-expanded'}`}>
          <div className="chart-and-calendar-container">
            <ImpactChart />
            
          </div>
          <TrainingTable/>
        </div>
        
      </div>
      <Notification notifications={notifications} />
    </div>
  );
}
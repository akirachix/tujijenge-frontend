
import Sidebar from '../Sidebar';
import { Outlet } from 'react-router-dom'


export default function DashboardLayout({ onLogout }) {
    
    return (
        <div className="dashboard-layout">
            <Sidebar onLogout={onLogout}/>

            <div className="dashboard-content">
                <Outlet/>
            </div>
        </div>
    );
}
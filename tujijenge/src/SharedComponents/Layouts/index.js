import './styles.css'
import Sidebar from '../Sidebar';
import { Outlet } from 'react-router-dom'


export default function DashboardLayout() {
    return (
        <div className="dashboard-layout">
            <Sidebar/>

            <div className="dashboard-content">
                <Outlet/>
            </div>
        </div>
    );
}

// // App.js
// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { EventsProvider } from './context/useEvents';
// import Dashboard from './Dashboard/index';
// import TrainingCalendar from './TrainingCalendar/index';
// import DashboardLayout from './SharedComponents/Layouts/index';
// import GroupOrders from './GroupOrders';
// import RecentOrders from './RecentOrders';
// import './App.css';


// // import './App.css';
// // import React from "react";
// // import Splash from './Onboarding/Splash/index.js'
// // import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
// // import SupplyChain from './Onboarding/SupplyChain/index.js';
// // import Training from './Onboarding/Training/index.js';
// // import Orders from './Onboarding/Orders/index.js';
// // import Verification from './Onboarding/Verification/index.js';
// // import SignIn from './Onboarding/SignIn/index.js';
// // import Welcome from './Onboarding/Home/index.js';
// // import Dashboard from "./Dashboard/index";
// // import TrainingCalendar from "./TrainingCalendar/index";
// // import DashboardLayout from "./SharedComponents/Layouts/index";
// // import { EventsProvider } from './context/useEvents';



// const TOKEN_STORAGE_KEY = 'authTokenKey';
// const AUTH_TOKEN = process.env.REACT_APP_AUTH_TOKEN;

// function App() {
//   const [token, setToken] = useState(() => {
//     // Initialize token from localStorage or AUTH_TOKEN
//     if (!localStorage.getItem(TOKEN_STORAGE_KEY) && AUTH_TOKEN) {
//       localStorage.setItem(TOKEN_STORAGE_KEY, AUTH_TOKEN);
//     }
//     return localStorage.getItem(TOKEN_STORAGE_KEY) || null;
//   });

//   useEffect(() => {
//     const handleStorageChange = () => {
//       const newToken = localStorage.getItem(TOKEN_STORAGE_KEY) || null;
//       setToken(newToken);
//     };

//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   return (
//     <EventsProvider>
//       <Router>
//         {!token ? (
//           <div className="unauthorized-container">
//             <h2>Unauthorized: Please log in</h2>
//           </div>
//         ) : (
//           <Routes>
//             <Route element={<DashboardLayout />}>
//               {/* <Route path="/" element={<Dashboard />} />
//               <Route path="/training-calendar" element={<TrainingCalendar />} /> */}
//             </Route>
//             <Route path="/group-orders/:groupId" element={<GroupOrders />} />
//             <Route path="/" element={<RecentOrders />} />
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         )}
//       </Router>
//     </EventsProvider>


//     // <Router>
//     //   <Routes>
//     //     <Route path="/" element={<Splash />} />
//     //     <Route path="/supplychain" element={<SupplyChain />} />
//     //     <Route path="/training" element={<Training />} />
//     //     <Route path="/orders" element={<Orders />} />
//     //     <Route path="/verification" element={<Verification />} />
//     //     <Route path="/home" element={<Welcome />} />
//     //     <Route path="/signin" element={<SignIn />} /> 
//     //   </Routes>

//     // </Router>

// //     <div>
// //       <EventsProvider>
// //       <Router>
// //        <Routes>
// //         <Route element={<DashboardLayout/>}>
// //           <Route path="/" element={<Dashboard />} />
// //           <Route path="/training-calendar" element={<TrainingCalendar />} />
// //         </Route>
// //         </Routes>
// //         <div>

// //         </div>
// //       </Router>
// //     </EventsProvider>
// //     </div>

//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CatalogueScreen from "./Catalogue/Components/CatalogueScreen/";
import CatalogueLayout from "./SharedComponents/Layouts/index";
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
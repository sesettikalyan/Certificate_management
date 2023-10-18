import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import HomePage from './components/category';
import Login from './components/login';
// import Staffdetails from './components/staffdetails';
import Branch from './components/branch';
// import Branch from './components/branch';
import Studentview from './components/studentview';
import Certificateview1 from './components/Certificateview1';
import Certificateview2 from './components/Certificateview2';
import Principal from './components/Principal';
import StaffApproval from './components/staffApproval';
import BranchDetails from './components/branchDetails';
import { Profile } from './components/profile';
import Search from './components/search';
import LecturerView from './components/lecturerview';
import NewStaff from "./components/newStaff"
// import Electrical from './components/electrical';
// import Civil from './components/civil';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/branch" element={<Branch />} />
        <Route path="/studentview" element={<Studentview />} />
        <Route path="/certificateview1" element={<Certificateview1 />} />
        <Route path="/certificateview2" element={<Certificateview2 />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/ece" element={<Branch />} /> */}
        <Route path="/:branch" element={<BranchDetails />} />
        {/* <Route path="/electrical" element={<Electrical />} /> */}
        {/* <Route path="/civil" element={<Civil />} /> */}
        <Route path="/:branch/:pin" element={<Studentview />} />
        <Route path='/:branch/lecturer/:id' element={<LecturerView />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/staff/:id" element={<StaffApproval />} />
        <Route path="/search" element={<Search />} />
        <Route path="/:branch/newstaff" element={<NewStaff/>}/>

      </Routes>
    </BrowserRouter>
    {/* <App /> */}

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

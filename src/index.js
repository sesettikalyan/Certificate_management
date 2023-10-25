import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import HomePage from "./components/category";
import Login from "./components/login";
import Login1 from './components/login1';
// import Staffdetails from './components/staffdetails';
import Certificateview1 from './components/Certificateview1';
import Certificateview2 from './components/Certificateview2';
import Staffcertificate1 from './components/staffcertificate1';
import Staffcertificate from './components/staffcertificate';
// import Branch from './components/branch';
import Studentview from "./components/studentview";
import Principal from "./components/Principal";
import StaffApproval from "./components/staffApproval";
import BranchDetails from "./components/branchDetails";
import { Profile } from "./components/profile";
import Search from "./components/search";
import LecturerView from "./components/lecturerview";
import NewStaff from "./components/newStaff";
import StaffPage from "./components/staffpage";
import StudentApproval from "./components/studentApproval";
import StudentDetails from "./components/studentDetails";
import StudentLogin from "./components/studentlogin";
import StaffLogin from "./components/stafflogin";
// import Electrical from './components/electrical';
// import Civil from './components/civil';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login1" element={<Login1 />} />
        <Route path="/selectbranch" element={<Selectbranch />} />
        <Route path="/branch" element={<Branch />} />
        <Route path="/studentview" element={<Studentview />} />
        <Route path="/certificateview1" element={<Certificateview1 />} />
        <Route path="/certificateview2" element={<Certificateview2 />} />
        <Route path="/staffcertificate1" element={<Staffcertificate1 />} />
        <Route path="/staffcertificate" element={<Staffcertificate />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/stafflogin" element={<StaffLogin />} />
        {/* <Route path="/ece" element={<Branch />} /> */}
        <Route path="/:branch" element={<BranchDetails />} />
        {/* <Route path="/electrical" element={<Electrical />} /> */}
        {/* <Route path="/civil" element={<Civil />} /> */}
        <Route path="/:branch/:pin" element={<Studentview />} />
        <Route path="/:branch/lecturer/:id" element={<LecturerView />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/staff/:id" element={<StaffApproval />} />
        <Route path="/search" element={<Search />} />
        <Route path="/:branch/newstaff" element={<NewStaff />} />
        <Route path="/:branch/staffpage" element={<StaffPage />} />
        <Route path="/:branch/studentapproval" element={<StudentApproval />} />
        <Route
          path="/:branch/studentapproval/:pin"
          element={<StudentDetails />}
        />
      </Routes>
    </BrowserRouter>
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/Pages/SignUp";
import SignIn from "./components/Pages/SignIn"
import StudentDashboard from "./Dashboards/Student/StudentDashboard";
import RectorAdminDashboard from "./Dashboards/RectorAdmin/RectorAdminDashboard";
import WardenDashboard from "./Dashboards/Warden/WardenDashboard";
import Home from "./components/Home"
import About from "./components/About"
import Contact from "./components/Contact"
import Navbar from "./components/Navbar";
import bgImage from "./assets/bg.avif";
import EntryForm from "./Dashboards/Warden/EntryForm";
import EntryDetails from "./Dashboards/Warden/EntryDetails";
import Gallery from "./components/Gallery";
import NoticeForm from "./Dashboards/RectorAdmin/NoticeForm";
import NoticesList from "./Dashboards/NoticeList";
import AddIssue from "./Dashboards/Student/AddIssue";
import IssuesList from "./Dashboards/IssueList";
import LeaveForm from "./Dashboards/Student/LeaveForm";
import LeaveManagement from "./Dashboards/RectorAdmin/LeaveManagement";
import Notification from "./components/Notification";

function App() {
  return (
    <Router>
       <div
        style={{
          minHeight: "100vh",
          display: "flex",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Navbar />
        <div
          style={{
            marginLeft: "250px",
            padding: "20px",
            width: "100%",
            color: "white",
          }}
        >

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/add-issue" element={<AddIssue />} />
        <Route path="/issues-list" element={<IssuesList />} />
        <Route path="/leave-form" element={<LeaveForm />} />
        <Route path="/rector_administrator" element={<RectorAdminDashboard />} />
        <Route path="/leave-management" element={<LeaveManagement />} />
        <Route path="/notice" element={<NoticeForm />} />
        <Route path="/notice-list" element={<NoticesList />} />
        <Route path="/warden" element={<WardenDashboard />} />
        <Route path="/entry_form" element={<EntryForm />} />
        <Route path="entry_details" element={<EntryDetails/>} /> 
        <Route path="/notification" element={<Notification />} />
        
      </Routes>
      </div>
      </div>
    </Router>
  );
}

export default App;

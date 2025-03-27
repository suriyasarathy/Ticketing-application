import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ContextProvider } from "./views/ContextData";  // ✅ Correct Import

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import TicketEditPage from "views/admin/TicketEditPage";
import CreateTeam from "views/CreateTeam";
import Admin from "layouts/Admin.js";
import Login from "./LoginFolder/Login";   
import LoginForget from "LoginFolder/LoginForget";
import User from "./views/userPage/User";
import CreateTicket from "views/CreateTicket";
import TicketDetailuser from "./views/userPage/TicketDetailUser";
import ResetPassword from "LoginFolder/ResetPassword";
import UserProfile from "./views/UserProfile";
import UserCreateTicket from "./views/userPage/userCreate";
import ProjectList from "./views/userPage/ProjectList";
import ProjetofTicket from "./views/userPage/Listofticket";
import ProjectEditPage from "views/admin/ProjectEditPage";
import CommentSection from "components/CommentSection";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ContextProvider>  {/* ✅ Use Correctly Named Provider */}
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/user" element={<User />} />
        <Route path="/forgot-password" element={<LoginForget />} />
        <Route path="/" element={<Navigate to="/login" />} />
        {/* <Route path='/admin/Team' element={<CreateTeam/>}/> */}
        <Route path="/Create-ticket" element={<CreateTicket />} />
        <Route path="/reset-Password/:token" element={<ResetPassword />} />
        <Route path="/User-Profile" element={<UserProfile />} />
        <Route path="/UserCreateTicket" element={<UserCreateTicket />} />
        <Route path="/ProjectList" element={<ProjectList />} />
        <Route path="/ProjectOfTicket/:projectID" element={<ProjetofTicket />} />
        <Route path="/ticketDetail/:TicketId" element={<TicketDetailuser />} />
        <Route path="/ProjectEdit/:Id" element={<ProjectEditPage/>}/>
        <Route path="/TicketEditPage/:project_id/:Ticket_id" element={<TicketEditPage/>}/>
        <Route path ="/Commentsetion" element={<CommentSection/>}/>
        
      </Routes>
    </BrowserRouter>
  </ContextProvider>
);

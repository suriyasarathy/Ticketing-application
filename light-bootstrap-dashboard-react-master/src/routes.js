
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import TicketList from "views/TicketList";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import CreateTicket from "views/CreateTicket";
import ProjectTicket from "views/Project/ProjectTicket";
import TicketDetail from "views/Project/TicketDetail";
import Newuser from "views/Newuser";
import { Name } from "ajv";
import CreateTeam from "views/CreateTeam";

import ProjectForm from "views/Project/ProjectForm";
import NewTrash from "views/NewTrash";


const dashboardRoutes = [
 
  {
    path: "/Newuser",
    name: "Create user",
  
    component: Newuser,
    layout: "/admin"
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    
    component: Dashboard,
    layout: "/admin"
  },
  // {
  //   path:"/Newuser",
  //   Name :"Newuser",
  //   component : New_user,
  //   layout:'/admin'
  // },
  {
    path: "/user",
    name: "User Profile",
   
    component: UserProfile,
    layout: "/admin"
  },
   {
    path: "/table",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin"
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-paper-2",
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/TicketList",
  //   name: "TicketList",
  //   icon: "nc-icon nc-notes",
  //   component: TicketList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin"
  // },
  {
    path: "/Project Ticket",
    name: "Project",
    icon: "",
    component: ProjectTicket,
    layout: "/admin"
  },
  // {
  //   path :'/CreateTicket',
  //   name :'Create Ticket',
  //   component :CreateTicket,
  //   layout :"/admin"
  // },
  // {
  //   path:'/TicketDetail',
  //   name :'TicketDetail',
  //   component:TicketDetail,
  //   layout :'/admin'
  // },
  {
    path:"/CreateTeam",
    name :"Create Team",
    component:CreateTeam,
    layout :'/admin'
  },
  {
    path:'/Project Form',
    name :'Create Project',
    component:ProjectForm,
    layout :'/admin'
  }

 
];

export default dashboardRoutes;

// const dashboardRoutes = [
//   {
//     name: "Dashboard",
//     path: "/dashboard",
//     component: Dashboard,
//     layout: "/admin",
//   },
//   {
//     name: "test",
//     path: "/Team",
//     component: CreateTeam,
//     layout: "/admin",
//   },
//   {
//     name: "User Management",
//     icon: "nc-icon nc-single-02", // Add icons if needed
//     subRoutes: [
//       {
//         path: "/newuser",
//         name: "Create User",
//         component: Newuser,
//         layout: "/admin",
//       },
//       {
//         path: "/Team",
//         name: "Create Team",
//         component: CreateTeam,
//         layout: "/admin",
//       },
//     ],
//   },
//   {
//     name: "Project Management",
//     icon: "nc-icon nc-badge", // Add icons if needed
//     subRoutes: [
//       {
//         path: "/projectform",
//         name: "Create Project",
//         component: ProjectForm,
//         layout: "/admin",
//       },
//       {
//         path: "/projectticket",
//         name: "Project",
//         component: ProjectTicket,
//         layout: "/admin",
//       },
//       {
//             path :'/CreateTicket',
//             name :'CreateTicket',
//             component :CreateTicket,
//             layout :"/admin"
//           },
//     ],
//   },
// ];

// export default dashboardRoutes;


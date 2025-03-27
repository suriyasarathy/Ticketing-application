import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useProject } from "../ContextData";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CustomDateRange from "components/DatePicker";

function ProjectTickets() {
  const { projectID } = useParams();
  const { selectedProject } = useProject();
  localStorage.setItem("project_id", projectID);
  const navigate = useNavigate();
  const userID = localStorage.getItem("user_id");
  const token = localStorage.getItem("authToken");


  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [status ,setstatus] =useState("")
  const [projectsetting,setProjectSetting] =useState("")


  useEffect(() => {
    fetchTickets();
  }, [projectID, userID]);
  const ProjectSetting =async ()=>{
    try{
      const response= await fetch(`http://localhost:3000/project/settings/${projectID}`).
      setProjectSetting(response);

    }
    catch(err){
      console.error("error ocured in fetching projectsetting",err);

    }
  }
  const fetchTickets = async () => {
    try {
      const response = await fetch(`http://localhost:3000/project/${projectID}/user/${userID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setTicketData(data.tickets);
      } else {
        throw new Error("Failed to fetch tickets");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!ticketData) return <p>No ticket data available.</p>;

  return (
    <div className="container mt-4">
      <h3>Tickets</h3>
      <div className="d-flex justify-content-end mb-3">
  <button className="btn btn-primary" onClick={() => navigate(`/UserCreateTicket`)}>
    + New Ticket
  </button>
</div>
      <div className="col-12 mb-4">
  <div className="card p-3  shadow-lg rounded-3">
    <h3 className="mb-3">Project Details</h3>
    <div className="row">
      <div className="col-md-6">
        <p><span className="fw-bold">Project ID:</span> {selectedProject?.project_id}</p>
        <p><span className="fw-bold">Project Name:</span> {selectedProject?.name}</p>
        <p><span className="fw-bold">Manger:</span> {selectedProject?.manager_name}</p>
      </div>
      <div className="col-md-6">
        <p><span className="fw-bold">Start Date:</span> 
          {selectedProject?.created_at 
            ? format(new Date(selectedProject.created_at), "MM-dd-yyyy HH:mm a") 
            : "N/A"}
        </p>
        <p><span className="fw-bold">End Date:</span> 
          {selectedProject?.due_date 
            ? format(new Date(selectedProject.due_date), "MM-dd-yyyy ") 
            : "N/A"}
        </p>
      </div>
    </div>
  </div>
</div>


      <TicketTable title="My Tickets" tickets={ticketData.assignedToUser || []} />
      <TicketTable title="Tickets Assigned to Others" tickets={ticketData.assignedToOthers || []} />
      <TicketTable title="Unassigned Tickets" tickets={ticketData.unassigned || []} />
    </div>
  );
}

const TicketTable = ({ title, tickets }) => {
  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [createdDateRange, setCreatedDateRange] = useState(null);
  const [dueDateRange, setDueDateRange] = useState(null);
 
   
  const filteredTickets = tickets.filter((ticket) => {
    const matchesPriority = priorityFilter ? ticket.priority === priorityFilter : true;
    const matchesStatus = statusFilter ? ticket.status === statusFilter : true;

    const ticketCreatedDate = new Date(ticket.ticket_created_date);
    const ticketDueDate = new Date(ticket.due_date);

    const matchesCreatedDate = createdDateRange
      ? ticketCreatedDate >= new Date(createdDateRange.startDate) &&
        ticketCreatedDate <= new Date(createdDateRange.endDate)
      : true;

    const matchesDueDate = dueDateRange
      ? ticketDueDate >= new Date(dueDateRange.startDate) &&
        ticketDueDate <= new Date(dueDateRange.endDate)
      : true;

    return matchesPriority && matchesStatus && matchesCreatedDate && matchesDueDate;
  });

  return (
    <>  <div className="row">
    <div className="col-12 mb-4">
    <div className="card p-3 shadow-lg rounded-3  bg-light ">
      <h4>{title}</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="text-center">Ticket #</th>
            <th className="text-center">Title</th>
            <th className="d-flex align-items-center justify-content-center">
              Priority
              <select className="form-select ms-2" onChange={(e) => setPriorityFilter(e.target.value)}>
                <option value="">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </th>
            <th>Ticket Created  <CustomDateRange onFilterChange={setCreatedDateRange} />

            </th>
            
            <th>
  Due Date
  <CustomDateRange onFilterChange={setDueDateRange} />

</th>
<th className="d-flex">
              Status
              <select className="form-select" onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">All</option>
                <option value="In open">Open</option>
                <option value="In progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </th>
            <th># Dates</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.map((ticket) => (
            <tr key={ticket.ticket_id}>
              <td>
                <Link to={`/ticketDetail/${ticket.ticket_id}`} className="text-decoration-none">
                  {ticket.ticket_id}
                </Link>
              </td>
              <td>{ticket.Tittle}</td>
              <td>
                <span className={`badge bg-${getPriorityClass(ticket.priority)}`}>{ticket.priority}</span>
              </td>
              <td>{format(new Date(ticket.ticket_created_date), "MM-dd-yyyy")}</td>
              <td>
                <span className={`badge bg-${getStatusClass(ticket.status)}`}>{ticket.status}</span>
              </td>
              <td>{format(new Date(ticket.due_date), "MM-dd-yyyy")}</td>
              <td>{ticket.days}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
      </div>
    </>
  );
};

const getPriorityClass = (priority) => (priority === "high" ? "danger" : priority === "medium" ? "warning" : "success");
const getStatusClass = (status) => (status === "open" ? "info" : status === "in-progress" ? "primary" : status === "resolved" ? "success" : "dark");

export default ProjectTickets;

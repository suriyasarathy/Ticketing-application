    const exprerss =require('express')
    const router = exprerss.Router();
    const teamContoler =require('../controllers/teamCo')
    const upload =require("../middleware/multerconfig")
    const {uploadFile} =require("../controllers/UploadController")
    const userController =require('../controllers/userController')
    const ticketController =require('../controllers/ticketController')
    const userTicketController =require('../controllers/UserScreen/Uticket')
    const { updateTicketStatus } = require('../controllers/UserScreen/statusTicketController');
    const roleController  =require("../controllers/roleController")
    const ProjectController =require("../controllers/projectController")
    const NewuserController =require('../controllers/NewUserConroller')
    const LoginController =require('../controllers/LoginController')
    const verifyToken = require('../middleware/auth')
    const ListProject =require('../controllers/ListProjectController')
    const Reset_password =require("../controllers/ResetController")
    const userProfile =require("../controllers/userProfile")
    const ChartController =require('../controllers/ChartController')
    const { getUsers, assignTicket } = require('../controllers/UserScreen/Reassigncontroller');
    const commentController = require('../controllers/CommentSection/commentController');
    const { getProjectSettings } = require("../controllers/ProjectSettingController");
    const clientController = require("../controllers/ClientController");
    const PhaseController =require("../controllers/PhaseController")
    const ListProjectTicket =require("../controllers/UserScreen/ProjestTicketList.js")
    const projectTeamsController = require("../controllers/projectTeamsController");
    const AdminProjectListTicket =require("../controllers/AdmimProjectListTicketconroller")
    const adminProjectTicketList =require("../controllers/adminProjectTicketListcontrolle1r")
    const projectModifyController = require("../controllers/projectAltercontroller/projectListinMOdified");
    const CreateTicket =require("../controllers/CreateTicketController")

    router.get("/ProjectTicket", AdminProjectListTicket.AdmminProjectListTicket);

    router.get("/project/:project_id", projectModifyController.getProjectDetails);
    router.put("/project/:project_id",projectModifyController.updateProject);
    // Delete multiple projects
    router.delete("/projectdelete", projectModifyController.deleteProjects);
    router.put("/project/ticket/update/:Ticket_id", projectModifyController.updateTicket);
    router.get("/project/ticket/:ticket_id",projectModifyController.getTicketDetails)
    router.post("/project/team/add", projectModifyController.addTeamToProject);
    router.delete("/project/team/remove", projectModifyController.removeTeamFromProject);
    // Add team member
    router.post("/project/teammember/add", projectModifyController.addTeamMember);

    // Remove team member
    router.delete("/project/teammember/remove",projectModifyController.removeTeamMember);

    // Update team member role
    router.put("/project/team/update-role", projectModifyController.updateTeamMemberRole);

    // Reassign a ticket
    router.put("/project/ticket/reassign",projectModifyController.reassignTicket);
    router.get("/project/ticket/:ticket_id/details", projectModifyController.getTicketDetails);

    // Update project settings
    router.put("/project/settings/:project_id", projectModifyController.updateProjectSettings);

    // Get project settings
    router.get("/project/settings/:project_id", projectModifyController.getProjectSettings);

    // Routes
    router.get("/clients", clientController.getAllClients);  // Fetch all clients
    router.get("/clientsGet/:id", clientController.getClientById); // Fetch client by ID
    router.get("/project-teams/:projectId", projectTeamsController.getProjectTeams);
    router.get("/project&ticket", adminProjectTicketList.adminProjectTicketList);

    router.get("/projects/:project_id/settings", getProjectSettings);
    router.get("/projects/:userId",ListProject.getProjectUser)
    router.get("/PhasesGet",PhaseController.getPhaser)
    router.post('/PhasesAdd',PhaseController.addPhases)
    router.post('/Comment', upload.single("file"),commentController.addComment);
    router.get('/commentdisplay', commentController.getComments);
    router.get('/projects/:projectId/users', getUsers);
    router.put('/tickets/:ticketId/assign', assignTicket);

    router.post("/create-ticket", CreateTicket.createTicket);
    router.get("/project/:projectID/user/:userID",ListProjectTicket.getListTicket)
    router.get('/team',teamContoler.getTeam);
    router.post('/upload',upload.single('image'),uploadFile)
    router.post('/create-team', teamContoler.postTeam);
    router.get('/users',userController.getAllUsers);
    router.get('/tickets', ticketController.getAllTickets);
    router.get('/user-tickets',userTicketController.getUserTickets)
    router.put('/update-ticket-status',updateTicketStatus);
    router.get('/role', roleController.getAllRoles); 
    router.post("/create-project", ProjectController.createProject);
    router.post('/signup', NewuserController.signup);
    router.post('/addRole',NewuserController.addRole)
    router.post('/login', LoginController.login);
    router.get('/project',ListProject.getProjects);
    router.post("/send-reset-email", Reset_password.sendResetEmail);
    router.post("/reset-password", Reset_password.resetPassword);
    router.get("/userProfile",  userProfile.getUserProfile);
    router.put("/updateUserProfile", userProfile.updateUserProfile);
    router.get('/piechart',ChartController.getPieChart)
    router.get("/team/:team_id/members", teamContoler.getTeamMembers);
    router.get("/available-members", teamContoler.getAvailableMembers); // New API
    router.delete("/teamDelete",teamContoler.deleteTeam)


    module.exports =router
const { Reassign } = require('../../model/ReAssign');

const getUsers = async (req, res) => {
    const { projectId } = req.params;
    try {
        const [users] = await Reassign.getUsersByProject(projectId);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

const assignTicket = async (req, res) => {
    const { ticketId } = req.params;
    const { userId, projectId } = req.body;

    try {
        await Reassign.assignTicketToUser(ticketId, userId, projectId);
        res.json({ message: "Ticket assigned successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getUsers, assignTicket };

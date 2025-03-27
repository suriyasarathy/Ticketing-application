const TicketModel = require("../model/CreateTicket");

const createTicket = async (req, res) => {
    try {
        console.log('Request Body:', req.body);

        const {
            title, description, priority, status, project_id, 
            reported_id, assign_id, due_date, tagging, ip_address, type, comment
        } = req.body;

        const assignIdValue = parseInt(assign_id, 10);
        const reportedIdValue = parseInt(reported_id, 10);

        
        
        if (isNaN(reportedIdValue) || reportedIdValue <= 0) {
            return res.status(400).json({ message: 'Invalid reported_id.' });
        }
        if (!title || !description || !priority || !status || !project_id || !due_date || !type) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Generate custom Ticket ID
        const ticketId = await TicketModel.generateTicketId(project_id);
        console.log(ticketId);
        

        // Insert ticket
        await TicketModel.insertTicket([
            ticketId, title, description, priority, status, project_id, 
            reportedIdValue, assignIdValue, due_date, tagging, ip_address, type
        ]);

        // Insert comment if provided
        if (comment && comment.trim() !== '') {
            await TicketModel.insertComment(ticketId, reportedIdValue, comment);
            return res.status(201).json({ message: 'Ticket and comment created successfully.', ticketId });
        }

        res.status(201).json({ message: 'Ticket created successfully.', ticketId });
    } catch (error) {
        console.error("Error creating ticket:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = {
    createTicket
};

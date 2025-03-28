const { update } = require("lodash");
const db = require("../config/db");


const Reassign = {
    // Get users assigned to a specific project
    getUsersByProject: async (projectId) => {
        return db.query(
            `SELECT u.user_id, u.name 
             FROM user u
             JOIN project_user pu ON u.user_id = pu.user_id
             WHERE pu.project_id = ?`, 
            [projectId]
        );
    },
    // unassigin ticket to myself
    updateunassginTicket: async (user_id, Ticket_id) => { 
        const query =`UPDATE tickets SET assigin_id =? where ticket_id =?`
        console.log(user_id,Ticket_id);
        
        try{
            return db.query(query,[user_id,Ticket_id])
            
        }catch(err){
            console.log("error ocured in updating myself",err);
            
        }


    },
    // Assign a ticket to a user after checking if they are in the project
    assignTicketToUser: async (ticketId, userId, projectId) => {
        console.log(ticketId,userId,projectId);
        
        // Check if the user is part of the project before assigning
        const [userCheck] = await db.query(
            `SELECT 1 FROM project_user WHERE user_id = ? AND project_id = ?`, 
            [userId, projectId]
        );

        if (!userCheck || userCheck.length === 0) {
            throw new Error("User is not part of the project");
        }

        // Update the ticket assignment
        return db.query(
            `UPDATE tickets SET assigin_id= ? WHERE ticket_id = ?`, 
            [userId, ticketId]
        );
    }
}

module.exports = { Reassign };

const db = require('../config/db'); // Import database connection

class updateStatus {
  static async updateStatus(ticketId, status) {
    const query = 'UPDATE tickets SET status = ? WHERE Ticket_id = ?';
    const [results] = await db.query(query, [status, ticketId]);
    return results;
  }
}

module.exports = updateStatus;

const Ticket = require('../../model/updateStatus');

const statusMapping = {
  'open': 'In open',
  'in open': 'In open',
  'progress': 'In progress',
  'in progress': 'In progress',
  'resolved': 'resolved',
  'closed': 'closed'
};

const updateTicketStatus = async (req, res) => {
  const { ticketId, status } = req.body;

  if (!ticketId || !status) {
    return res.status(400).json({ message: 'Ticket ID and status are required' });
  }

  const normalizedStatus = statusMapping[status.toLowerCase().trim()];

  if (!normalizedStatus) {
    return res.status(400).json({ message: `Invalid status value: ${status}` });
  }

  try {
    const results = await Ticket.updateStatus(ticketId, normalizedStatus);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json({ message: 'Ticket status updated successfully' });
  } catch (err) {
    console.error('Error updating ticket status:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { updateTicketStatus };

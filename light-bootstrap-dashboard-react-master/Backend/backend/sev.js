const express = require('express');
const router = express.Router();
const db = require('../backend/config/db'); // Database connection

// 1️⃣ Create a New Project
router.post('/create-project', async (req, res) => {
    const { user_id, name, description, project_manager_id, teams, client_id, phase_id, due_date, settings } = req.body;
    try {
        const [result] = await db.query(
            `INSERT INTO projects (name, user_id, description, project_manager_id, client_id, phase_id, due_date, created_at, updated_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [name, user_id, description, project_manager_id, client_id, phase_id, due_date]
        );
        
        const projectId = result.insertId;
        
        if (teams.length > 0) {
            const teamValues = teams.map(teamId => [projectId, teamId]);
            await db.query(`INSERT INTO project_teams (project_id, team_id) VALUES ?`, [teamValues]);
        }
        
        res.json({ message: 'Project created successfully', projectId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2️⃣ Fetch All Clients
router.get('/clients', async (req, res) => {
    try {
        const [clients] = await db.query('SELECT * FROM clients');
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3️⃣ Add a New Client
router.post('/clients', async (req, res) => {
    const { name, email, phone, company } = req.body;
    try {
        const [result] = await db.query(
            `INSERT INTO clients (name, email, phone, company, created_at) VALUES (?, ?, ?, ?, NOW())`,
            [name, email, phone, company]
        );
        res.json({ message: 'Client added successfully', clientId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4️⃣ Fetch All Project Phases
router.get('/project-phases', async (req, res) => {
    try {
        const [phases] = await db.query('SELECT * FROM project_phases');
        res.json(phases);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5️⃣ Add a New Project Phase
router.post('/project-phases', async (req, res) => {
    const { name, description } = req.body;
    try {
        const [result] = await db.query(
            `INSERT INTO project_phases (name, description, created_at) VALUES (?, ?, NOW())`,
            [name, description]
        );
        res.json({ message: 'Project phase added successfully', phaseId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 6️⃣ Fetch All Managers
router.get('/users/managers', async (req, res) => {
    try {
        const [managers] = await db.query("SELECT user_id, name FROM users WHERE role = 'Manager'");
        res.json(managers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 7️⃣ Fetch All Teams
router.get('/teams', async (req, res) => {
    try {
        const [teams] = await db.query('SELECT * FROM teams');
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 8️⃣ Create a New Team
router.post('/teams', async (req, res) => {
    const { name, team_lead_id } = req.body;
    try {
        const [result] = await db.query(
            `INSERT INTO teams (name, team_lead_id, created_at) VALUES (?, ?, NOW())`,
            [name, team_lead_id]
        );
        res.json({ message: 'Team created successfully', teamId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 9️⃣ Fetch Default Ticket Settings
router.get('/project-settings', async (req, res) => {
    try {
        const [settings] = await db.query('SELECT * FROM ticket_settings');
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔟 Update Project Settings
router.post('/project-settings', async (req, res) => {
    const { project_id, reassign_tickets, default_priority, default_status } = req.body;
    try {
        await db.query(
            `INSERT INTO project_settings (project_id, reassign_tickets, default_priority, default_status, updated_at) 
             VALUES (?, ?, ?, ?, NOW()) 
             ON DUPLICATE KEY UPDATE 
             reassign_tickets = VALUES(reassign_tickets), 
             default_priority = VALUES(default_priority), 
             default_status = VALUES(default_status), 
             updated_at = NOW()`,
            [project_id, reassign_tickets, default_priority, default_status]
        );
        res.json({ message: 'Project settings updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

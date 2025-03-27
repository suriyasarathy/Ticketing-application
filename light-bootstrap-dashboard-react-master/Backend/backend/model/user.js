const db = require('../config/db');

const User = {
    findAll: async () => {
        const query = 'SELECT * FROM user';
        const [rows] = await db.query(query);
        return rows;
    },
    findUserById: async (userId) => {
        const query = `
     SELECT 
    u.user_id, 
    u.name, 
    u.email, 
    u.about_me, 
    u.profile_image, 
    r.name AS role_name, 
    COALESCE(GROUP_CONCAT(DISTINCT p.name SEPARATOR ', '), 'No Projects') AS projects,
    COALESCE(GROUP_CONCAT(DISTINCT t.name SEPARATOR ', '), 'No Teams') AS teams
FROM user u
JOIN role r ON u.role_id = r.role_id
LEFT JOIN project_user pu ON u.user_id = pu.user_id
LEFT JOIN projects p ON pu.project_id = p.project_id
LEFT JOIN user_teams ut ON u.user_id = ut.user_id
LEFT JOIN teams t ON ut.team_id = t.team_id
WHERE u.user_id = ?
GROUP BY u.user_id, r.name;

`;
    
        const [rows] = await db.query(query, [userId]);
        
        if (!rows.length) return null;
    
        return {
            ...rows[0],
            teams: rows[0].teams ? rows[0].teams.split(",") : [], // Convert CSV string to an array of team names
            projects: rows[0].projects ? rows[0].projects.split(",") : [] // Convert CSV string to an array of project names
        };
        
    },
    
    
    

    updateUserProfile: async (userId, name, aboutMe, profileImage) => {
        const query = `UPDATE user SET name = ?, about_me = ?, profile_image = ? WHERE user_id = ?`;
        await db.query(query, [name, aboutMe, profileImage, userId]);
    }
   
} 

module.exports = User;

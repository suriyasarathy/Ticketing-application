// model/userModel.js
const db = require('../config/db');
const bcrypt = require('bcrypt');

const userModel = {
  getRoleId: async (role) => {
    const query = 'SELECT Role_id FROM role WHERE name = ?';
    const [results] = await db.query(query, [role]);

    if (results.length === 0) {
      throw new Error('Invalid role');
    }

    return results[0].Role_id;
  },

  createUser: async (name, email, password, roleId) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO user (name, email, password, Role_id, verified) VALUES (?, ?, ?, ?, true)';

    await db.query(query, [name, email, hashedPassword, roleId]);
  },
  roleExists: async (roleName) => {
    const query = 'SELECT Role_id FROM role WHERE name = ?';
    const [results] = await db.query(query, [roleName]);
    return results.length > 0; // Returns true if role exists
  },
  addRole:async (roleName)=>{
    const query  ='INSERT INTO role (name) VALUES (?)';
    const [result] =await db.query(query,[roleName])
    return result.insertId
  }

};

module.exports = userModel;

// controllers/userController.js
const userModel = require('../model/NewUser');

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const roleId = await userModel.getRoleId(role);
    await userModel.createUser(name, email, password, roleId);

    res.status(201).json({ message: 'Signup successful!' });
  } catch (err) {
    if (err.message === 'Invalid role') {
      return res.status(400).json({ message: err.message });
    }

    console.error('Error signing up user:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.addRole = async (req, res) => {
    try {
      const { roleName } = req.body; // Extract role name from request
  
      if (!roleName) {
        return res.status(400).json({ message: 'Role name is required' });
      }
  
      const roleExists = await userModel.roleExists(roleName); // Check if role already exists
      if (roleExists) {
        return res.status(400).json({ message: 'Role already exists' });
      }
  
      const roleId = await userModel.addRole(roleName); // Add new role to database
      res.status(201).json({ message: 'Role added successfully', roleId }); // Send success response
    } catch (err) {
      console.error('Error adding role:', err.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

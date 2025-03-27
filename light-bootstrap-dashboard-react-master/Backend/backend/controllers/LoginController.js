const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/LoginUserModel'); 
const JWT_SECRET  = 'your_secret_key'; // Ensure JWT_SECRET is defined

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Request body:", req.body); 

  // Validation checks
  if (!email) return res.status(400).json({ message: 'Email is required' });
  if (!password) return res.status(400).json({ message: 'Password is required' });

  try {
    // Fetch user by email from the database
    const user = await User.findByEmail(email);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare password with the hashed password stored in DB
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.user_id, email: user.email, role_id: user.role_id, role: user.role_name },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        role_id: user.role_id,
        role: user.role_name,
      },
    });

  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

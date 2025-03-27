import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const SignUp = () => {
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });
  const [newRole, setNewRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const token =localStorage.getItem('authToken')
console.log(token);

  useEffect(() => {
    if (token) {
      fetch('http://localhost:3000/role', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Attach the token in the Authorization header
        },
      })
        .then((res) => res.json())
        .then((data) => setRoles(data))
        .catch((err) => console.error('Error fetching roles:', err));
    } else {
      console.error('No token found in localStorage');
    }
  }, [token]); // Run the effect when the token changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNewRoleChange = (e) => {
    setNewRole(e.target.value);
  };

  const handleAddRole = async () => {
    if (!newRole.trim()) return;
    try {
      const roleResponse = await fetch('http://localhost:3000/addRole', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
           "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ roleName: newRole }),
      });
      
      const roleData = await roleResponse.json();
      if (roleResponse.ok) {
        const addedRole = { id: roleData.roleId, name: newRole };
        setRoles((prevRoles) => [...prevRoles, addedRole]);
        setFormData((prevData) => ({ ...prevData, role: newRole }));
        setNewRole('');
        setShowModal(false);
      } else {
        throw new Error(roleData.message);
      }
    } catch (err) {
      console.error('Error adding role:', err);
      setError('Failed to add role. Try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}`, },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message);
        setError('');
        setFormData({ name: '', email: '', password: '', role: '' });
      } else {
        setError(data.message);
        setSuccess('');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="bg-white shadow-lg rounded-lg p-4 p-md-5" style={{ width: '100%', maxWidth: '400px' }}>
        <h1 className="text-center mb-4">New User</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="form-control" />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="form-control" />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} required className="form-control" />
          </div>
          <div className="form-group d-flex align-items-center">
            <label className="mr-2">Role:</label>
            <select name="role" value={formData.role} onChange={handleInputChange} required className="form-control">
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.name}>{role.name}</option>
              ))}
            </select>
            <button type="button" className="btn btn-primary ml-2" onClick={() => setShowModal(true)}>+ Add</button>
          </div>
          <button type="submit" disabled={loading} className="btn btn-success btn-block mt-3">
            {loading ? 'Signing Up...' : 'New User'}
          </button>
        </form>
        {success && <p className="text-success mt-3 text-center">{success}</p>}
        {error && <p className="text-danger mt-3 text-center">{error}</p>}
      </div>

      {/* Centered Bootstrap Modal for Adding New Role */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" value={newRole} onChange={handleNewRoleChange} className="form-control" placeholder="Enter new role" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="success" onClick={handleAddRole}>Done</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignUp;

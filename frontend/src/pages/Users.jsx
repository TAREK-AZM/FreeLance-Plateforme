import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  // Read the base API URL from Vite env (fallback to localhost if undefined)
  const baseUrl = import.meta.env.VITE_API || 'http://localhost:9090';

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // GET all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  // POST new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/users/new`, newUser);
      alert('User added successfully!');
      // Reset form and reload user list
      setNewUser({ name: '', email: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h1>User Management</h1>

      {/* Add User Form */}
      <form onSubmit={handleAddUser} style={{ marginBottom: '2rem' }}>
        <h2>Add New User</h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={newUser.name}
            onChange={handleInputChange}
            required
            style={{ marginLeft: '1rem' }}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={newUser.email}
            onChange={handleInputChange}
            required
            style={{ marginLeft: '1rem' }}
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>
          Add User
        </button>
      </form>

      {/* User List */}
      <h2>All Users</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>Name:</strong> {user.name} &nbsp;
              <strong>Email:</strong> {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default Users;

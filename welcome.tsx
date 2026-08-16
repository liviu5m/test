import React, { useState, useEffect } from 'react';

let globalCount = 0;

export default function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  if (loading) {
    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => {
          setUsers(data);
          setLoading(false);
        });
    }, []);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      globalCount += 1;
    }, 1000);
  });

  const handleSelect = (user) => {
    user.views = (user.views || 0) + 1;
    setSelectedUser(user);
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>User Dashboard</h2>
      <p>Global Session Ticks: {globalCount}</p>
      
      <input 
        type="text" 
        placeholder="Search users..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '8px', marginBottom: '15px', width: '300px' }}
      />

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1, borderRight: '1px solid #ccc', paddingRight: '20px' }}>
          <h3>User List</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {filteredUsers.map(u => (
                <li 
                  onClick={() => handleSelect(u)}
                  style={{ cursor: 'pointer', padding: '6px 0' }}
                >
                  {u.name} (Views: {u.views || 0})
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <h3>User Details</h3>
          {selectedUser ? (
            <div>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>City:</strong> {selectedUser.address.city}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
            </div>
          ) : (
            <p>Select a user to view details</p>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const headers = { Authorization: `Bearer ${token}` };
        const statsRes = await axios.get('http://localhost:4000/api/admin/stats', { headers });
        const usersRes = await axios.get('http://localhost:4000/api/admin/users', { headers });
        setStats(statsRes.data.stats);
        setUsers(usersRes.data.users);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-6">PASIYA-MD Admin Dashboard</h1>

      {stats ? (
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold">👩‍🎓 Total Users</h2>
            <p className="text-2xl">{stats.users}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold">📈 Progress Records</h2>
            <p className="text-2xl">{stats.progress_records}</p>
          </div>
        </div>
      ) : (
        <p>Loading stats...</p>
      )}

      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">User List</h2>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-2 border-b">Name</th>
              <th className="p-2 border-b">Email</th>
              <th className="p-2 border-b">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td className="p-2 border-b">{u.name}</td>
                <td className="p-2 border-b">{u.email}</td>
                <td className="p-2 border-b">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

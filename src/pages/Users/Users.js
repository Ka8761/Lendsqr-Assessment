import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Users.css';

const API_USERS = 'https://mockbin.io/bins/47162d2b44164d148856160628d20b2e';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = localStorage.getItem('allUsers');
    if (cached) {
      setUsers(JSON.parse(cached));
      setLoading(false);
      return;
    }

    fetch(API_USERS)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        localStorage.setItem('allUsers', JSON.stringify(data));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading users...</div>;

  return (
    <div className="users-page">
      <h1>Users</h1>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ORGANIZATION</th>
              <th>USERNAME</th>
              <th>EMAIL</th>
              <th>PHONE NUMBER</th>
              <th>DATE JOINED</th>
              <th>STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.slice(0, 20).map(user => (
              <tr key={user.id}>
                <td>{user.organization}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.dateJoined}</td>
                <td>
                  <span className={`status ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <Link to={`/users/${user.id}`} className="view-details">View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span>Showing 1-20 out of {users.length}</span>
      </div>
    </div>
  );
}

export default Users;
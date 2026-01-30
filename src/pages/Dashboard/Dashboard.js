import { useState, useEffect } from 'react';
import { FiFilter } from 'react-icons/fi';

// Import different images for each card
import usersIcon from '../../assets/users.png';
import activeUsersIcon from '../../assets/active.png';
import loanUsersIcon from '../../assets/loans.png';
import savingsUsersIcon from '../../assets/savings.png';

import './Dashboard.css';

const API_USERS = 'https://mockbin.io/bins/47162d2b44164d148856160628d20b2e';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const stats = [
    {
      count: '2,453',
      label: 'USERS',
      desc: 'USERS',
      image: usersIcon,
    },
    {
      count: '2,453',
      label: 'ACTIVE USERS',
      desc: 'ACTIVE USERS',
      image: activeUsersIcon,
    },
    {
      count: '12,453',
      label: 'USERS WITH LOANS',
      desc: 'USERS WITH LOANS',
      image: loanUsersIcon,
    },
    {
      count: '102,453',
      label: 'USERS WITH SAVINGS',
      desc: 'USERS WITH SAVINGS',
      image: savingsUsersIcon,
    },
  ];

  useEffect(() => {
    const cached = localStorage.getItem('allUsers');
    if (cached) {
      setUsers(JSON.parse(cached));
      setLoading(false);
      return;
    }

    fetch(API_USERS)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        localStorage.setItem('allUsers', JSON.stringify(data));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats-row">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <img
              src={stat.image}
              alt={`${stat.label} icon`}
              className="stat-image"
            />
            {/* <div className="stat-label">{stat.label.split(' ')[0]}</div> */}
            <h3>{stat.count}</h3>
            <p>{stat.desc}</p>
          </div>
        ))}
      </div>

      <div className="recent-users">
        <h2>Recent Users</h2>

        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>
                    ORGANIZATION <FiFilter className="filter-icon" />
                  </th>
                  <th>
                    USERNAME <FiFilter className="filter-icon" />
                  </th>
                  <th>
                    EMAIL <FiFilter className="filter-icon" />
                  </th>
                  <th>
                    PHONE NUMBER <FiFilter className="filter-icon" />
                  </th>
                  <th>
                    DATE JOINED <FiFilter className="filter-icon" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.slice(0, 10).map((user) => (
                  <tr key={user.id}>
                    <td>{user.organization || 'N/A'}</td>
                    <td>{user.username || 'N/A'}</td>
                    <td>{user.email || 'N/A'}</td>
                    <td>{user.phoneNumber || 'N/A'}</td>
                    <td>{user.dateJoined || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
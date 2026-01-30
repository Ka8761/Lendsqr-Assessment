import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon users">Users</div>
          <h3>2,453</h3>
          <p>USERS</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon active">Active</div>
          <h3>2,453</h3>
          <p>ACTIVE USERS</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon loans">Loans</div>
          <h3>12,453</h3>
          <p>USERS WITH LOANS</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon savings">Savings</div>
          <h3>102,453</h3>
          <p>USERS WITH SAVINGS</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
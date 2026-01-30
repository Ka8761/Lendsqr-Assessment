import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiUsers,
  FiShield,
  FiDollarSign,
  FiBriefcase,
  FiSettings,
  FiFileText,
  FiBarChart2,
  FiCreditCard,
  FiActivity,
  FiUserCheck,
  FiList,
  FiAlertCircle,
} from 'react-icons/fi';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="switch-org">
          <FiBriefcase size={18} />
          <span>Switch Organization</span>
          <span className="arrow">▼</span>
        </div>

        <NavLink to="/dashboard" className="nav-item dashboard">
  <FiHome size={18} />
  <span>Dashboard</span>
</NavLink>
      </div>

      <div className="sidebar-section">
        <div className="section-title">CUSTOMERS</div>
        <NavLink to="/users" className="nav-item">
          <FiUsers size={18} />
          <span>Users</span>
        </NavLink>
        <NavLink to="#" className="nav-item">
          <FiShield size={18} />
          <span>Guarantors</span>
        </NavLink>
        <NavLink to="#" className="nav-item">
          <FiDollarSign size={18} />
          <span>Loans</span>
        </NavLink>
        <NavLink to="#" className="nav-item">
          <FiActivity size={18} />
          <span>Decision Models</span>
        </NavLink>
        <NavLink to="#" className="nav-item">
          <FiCreditCard size={18} />
          <span>Savings</span>
        </NavLink>
        <NavLink to="#" className="nav-item">
          <FiList size={18} />
          <span>Loan Requests</span>
        </NavLink>
        <NavLink to="#" className="nav-item">
          <FiUserCheck size={18} />
          <span>Whitelist</span>
        </NavLink>
        <NavLink to="#" className="nav-item">
          <FiAlertCircle size={18} />
          <span>Karma</span>
        </NavLink>
      </div>

      <div className="sidebar-section">
        <div className="section-title">BUSINESSES</div>
        <NavLink to="#" className="nav-item">
          <FiBriefcase size={18} />
          <span>Organization</span>
        </NavLink>
        <NavLink to="#" className="nav-item">
          <FiDollarSign size={18} />
          <span>Loan Products</span>
        </NavLink>
        <NavLink to="#" className="nav-item">
          <FiCreditCard size={18} />
          <span>Savings Products</span>
        </NavLink>
        <NavLink to="#" className="nav-item">
          <FiBarChart2 size={18} />
          <span>Fees and Charges</span>
        </NavLink>
        <NavLink to="#" className="nav-item">
          <FiActivity size={18} />
          <span>Transactions</span>
        </NavLink>
        <NavLink to="#" className="nav-item">
          <FiFileText size={18} />
          <span>Services</span>
        </NavLink>
        <NavLink to="#" className="nav-item">
          <FiList size={18} />
          <span>Service Account</span>
        </NavLink>
        <NavLink to="#" className="nav-item">
          <FiDollarSign size={18} />
          <span>Settlements</span>
        </NavLink>
        <NavLink to="#" className="nav-item">
          <FiBarChart2 size={18} />
          <span>Reports</span>
        </NavLink>
      </div>

      <div className="sidebar-section">
        <div className="section-title">SETTINGS</div>
        <NavLink to="#" className="nav-item">
          <FiSettings size={18} />
          <span>Preferences</span>
        </NavLink>
        <NavLink to="#" className="nav-item">
          <FiBarChart2 size={18} />
          <span>Fees and Pricing</span>
        </NavLink>
        <NavLink to="#" className="nav-item">
          <FiFileText size={18} />
          <span>Audit Logs</span>
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;
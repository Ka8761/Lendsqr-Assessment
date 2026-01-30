import { useState } from 'react';
import { FiCalendar } from 'react-icons/fi';
import './FilterPopover.css';

function FilterContainer({ onClose, onFilter }) {
  const [organization, setOrganization] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');

  // Extract unique organizations from mock data (you can make this dynamic)
  const organizations = ['Lendsqr', 'Lendstar', 'Irorun', 'Karma', 'Whitelsit'];

  const handleReset = () => {
    setOrganization('');
    setUsername('');
    setEmail('');
    setPhone('');
    setDate('');
    setStatus('');
  };

  const handleApply = () => {
    onFilter({ organization, username, email, phone, date, status });
    onClose();
  };

  return (
    <div className="filter-popover">
      <div className="filter-header">
        <h3>Filter</h3>
        <button onClick={onClose} className="close-btn">✕</button>
      </div>

      <div className="filter-body">
        <div className="filter-field">
          <label>Organization</label>
          <select value={organization} onChange={e => setOrganization(e.target.value)}>
            <option value="">Select organization</option>
            {organizations.map(org => (
              <option key={org} value={org}>{org}</option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label>Username</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
        </div>

        <div className="filter-field">
          <label>Email</label>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
        </div>

        <div className="filter-field">
          <label>Phone Number</label>
          <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter phone" />
        </div>

        <div className="filter-field">
          <label>Date Joined</label>
          <div className="date-input-wrapper">
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            <FiCalendar className="calendar-icon" />
          </div>
        </div>

        <div className="filter-field">
          <label>Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="">Select status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
            <option value="Blacklisted">Blacklisted</option>
          </select>
        </div>
      </div>

      <div className="filter-footer">
        <button className="reset-btn" onClick={handleReset}>Reset</button>
        <button className="filter-btn" onClick={handleApply}>Filter</button>
      </div>
    </div>
  );
}

export default FilterContainer;
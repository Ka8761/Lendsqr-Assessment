import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './UserDetails.css';

const API_USERS = 'https://mockbin.io/bins/47162d2b44164d148856160628d20b2e';

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = localStorage.getItem('allUsers');
    if (cached) {
      const allUsers = JSON.parse(cached);
      const found = allUsers.find(u => u.id === id);
      if (found) {
        setUser(found);
        setLoading(false);
        return;
      }
    }

    fetch(API_USERS)
      .then(res => res.json())
      .then(data => {
        const found = data.find(u => u.id === id);
        if (found) {
          setUser(found);
          localStorage.setItem(`user_${id}`, JSON.stringify(found));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading">Loading user details...</div>;
  if (!user) return <div className="not-found">User not found</div>;

  return (
    <div className="user-details-page">
      <div className="top-bar">
        <Link to="/users" className="back-link">
          <FiArrowLeft size={20} /> Back to Users
        </Link>

        <div className="actions">
          <button className="blacklist-btn">BLACKLIST USER</button>
          <button className="activate-btn">ACTIVATE USER</button>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-left">
          <div className="avatar">
            <img src={user.avatar || `https://i.pravatar.cc/150?u=${user.id}`} alt={user.fullName} />
          </div>
          <div className="name-section">
            <h2>{user.fullName || user.username}</h2>
            <p className="user-id">{user.id}</p>
          </div>
        </div>

        <div className="profile-right">
          <div className="tier-section">
            <div className="tier-label">User's Tier</div>
            <div className="stars">★★★</div>
          </div>
          <div className="loan-section">
            <div className="amount">N200,000.00</div>
            <div className="account-info">
              <div>Account Number</div>
              <div>LSQF5878P0</div>
            </div>
            <div className="bank-name">Providus Bank</div>
          </div>
        </div>
      </div>

      <div className="tabs">
        <button className="tab active">General Details</button>
        <button className="tab">Documents</button>
        <button className="tab">Bank Details</button>
        <button className="tab">Loans</button>
        <button className="tab">Savings</button>
        <button className="tab">App and System</button>
      </div>

      <div className="details-section">
        <div className="section">
          <h3>Personal Information</h3>
          <div className="info-grid">
            <div><strong>Full Name:</strong> {user.fullName || 'N/A'}</div>
            <div><strong>Phone Number:</strong> {user.phoneNumber || 'N/A'}</div>
            <div><strong>Email Address:</strong> {user.email || 'N/A'}</div>
            <div><strong>BVN:</strong> {user.bvn || 'N/A'}</div>
            <div><strong>Gender:</strong> {user.gender || 'N/A'}</div>
          </div>
          <div className="info-grid">
            <div><strong>Marital Status:</strong> {user.maritalStatus || 'N/A'}</div>
            <div><strong>Children:</strong> {user.children || '0'}</div>
            <div><strong>Type of Residence:</strong> {user.residence || 'N/A'}</div>
          </div>
        </div>

        <div className="section">
          <h3>Education and Employment</h3>
          <div className="info-grid">
            <div><strong>Level of Education:</strong> {user.levelOfEducation || 'N/A'}</div>
            <div><strong>Employment Status:</strong> {user.employmentStatus || 'N/A'}</div>
            <div><strong>Sector of Employment:</strong> {user.sector || 'N/A'}</div>
            <div><strong>Duration of Employment:</strong> {user.duration || 'N/A'}</div>
          </div>
          <div className="info-grid">
            <div><strong>Office Email:</strong> {user.officeEmail || 'N/A'}</div>
            <div><strong>Monthly Income:</strong> {user.monthlyIncome || 'N/A'}</div>
            <div><strong>Loan Repayment:</strong> {user.loanRepayment || 'N/A'}</div>
          </div>
        </div>

        <div className="section">
          <h3>Socials</h3>
          <div className="info-grid">
            <div><strong>Twitter:</strong> {user.twitter || 'N/A'}</div>
            <div><strong>Facebook:</strong> {user.facebook || 'N/A'}</div>
            <div><strong>Instagram:</strong> {user.instagram || 'N/A'}</div>
          </div>
        </div>

        <div className="section">
          <h3>Guarantor</h3>
          <div className="info-grid">
            <div><strong>Full Name:</strong> {user.guarantorFullName || 'N/A'}</div>
            <div><strong>Phone Number:</strong> {user.guarantorPhone || 'N/A'}</div>
            <div><strong>Email Address:</strong> {user.guarantorEmail || 'N/A'}</div>
            <div><strong>Relationship:</strong> {user.guarantorRelationship || 'N/A'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
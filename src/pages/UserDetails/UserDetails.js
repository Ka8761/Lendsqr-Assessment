import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserDetails.css';

const API_USERS = 'https://mockbin.io/bins/47162d2b44164d148856160628d20b2e';

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = localStorage.getItem(`user_${id}`);
    if (cached) {
      setUser(JSON.parse(cached));
      setLoading(false);
      return;
    }

    const allUsers = localStorage.getItem('allUsers');
    if (allUsers) {
      const users = JSON.parse(allUsers);
      const found = users.find(u => u.id === id);
      if (found) {
        setUser(found);
        localStorage.setItem(`user_${id}`, JSON.stringify(found));
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
    <div className="user-details">
      <div className="header">
        <h1>User Details</h1>
        <div className="actions">
          <button className="blacklist">BLACKLIST USER</button>
          <button className="activate">ACTIVATE USER</button>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-top">
          <div className="avatar">
            <img src={user.avatar || `https://i.pravatar.cc/150?u=${user.id}`} alt="" />
          </div>
          <div className="info">
            <h2>{user.fullName || user.username}</h2>
            <p>{user.organization}</p>
          </div>
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <label>USER'S TIER</label>
            <div className="tier">★★★</div>
          </div>
          <div className="detail-item">
            <label>LOAN BALANCE</label>
            <p>N200,000.00</p>
          </div>
        </div>
      </div>

      <div className="tabs">
        <button className="tab active">General Details</button>
        <button className="tab">Documents</button>
        <button className="tab">Bank Details</button>
        <button className="tab">Loans</button>
        <button className="tab">Savings</button>
      </div>

      <div className="section">
        <h3>Personal Information</h3>
        <div className="grid-4">
          <div>
            <label>FULL NAME</label>
            <p>{user.fullName || user.username}</p>
          </div>
          <div>
            <label>PHONE NUMBER</label>
            <p>{user.phoneNumber}</p>
          </div>
          <div>
            <label>EMAIL ADDRESS</label>
            <p>{user.email}</p>
          </div>
          <div>
            <label>BVN</label>
            <p>{user.bvn || 'N/A'}</p>
          </div>
          <div>
            <label>GENDER</label>
            <p>{user.gender || 'N/A'}</p>
          </div>
          <div>
            <label>MARITAL STATUS</label>
            <p>{user.maritalStatus || 'N/A'}</p>
          </div>
          <div>
            <label>CHILDREN</label>
            <p>{user.children || 0}</p>
          </div>
          <div>
            <label>TYPE OF RESIDENCE</label>
            <p>{user.residence || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Education and Employment</h3>
        <div className="grid-4">
          <div>
            <label>LEVEL OF EDUCATION</label>
            <p>{user.levelOfEducation || 'N/A'}</p>
          </div>
          <div>
            <label>EMPLOYMENT STATUS</label>
            <p>{user.employmentStatus || 'N/A'}</p>
          </div>
          <div>
            <label>SECTOR OF EMPLOYMENT</label>
            <p>{user.sector || 'N/A'}</p>
          </div>
          <div>
            <label>DURATION OF EMPLOYMENT</label>
            <p>{user.duration || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Guarantor</h3>
        <div className="grid-4">
          <div>
            <label>FULL NAME</label>
            <p>{user.guarantorFullName || 'N/A'}</p>
          </div>
          <div>
            <label>PHONE NUMBER</label>
            <p>{user.guarantorPhone || 'N/A'}</p>
          </div>
          <div>
            <label>EMAIL ADDRESS</label>
            <p>{user.guarantorEmail || 'N/A'}</p>
          </div>
          <div>
            <label>RELATIONSHIP</label>
            <p>{user.guarantorRelationship || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
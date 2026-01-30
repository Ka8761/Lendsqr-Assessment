import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiFilter, FiMoreVertical, FiEye, FiSlash, FiTrash2 } from 'react-icons/fi';
import './Users.css';

const API_USERS = 'https://mockbin.io/bins/47162d2b44164d148856160628d20b2e';
const ITEMS_PER_PAGE = 20;

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredUsers = users.filter(user =>
    [user.organization, user.username, user.email, user.phoneNumber, user.dateJoined]
      .some(field => field?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredUsers.length);
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setOpenDropdownId(null);
    }
  };

  const getStatusStyle = (status) => {
    const lower = (status || '').toLowerCase();
    if (lower === 'active') return { class: 'active', text: 'Active' };
    if (lower === 'inactive') return { class: 'inactive', text: 'Inactive' };
    if (lower === 'pending') return { class: 'pending', text: 'Pending' };
    if (lower === 'blacklisted') return { class: 'blacklisted', text: 'Blacklisted' };
    return { class: '', text: status || 'N/A' };
  };

  if (loading) return <div className="loading">Loading users...</div>;

  return (
    <div className="users-page">
      <div className="page-header">
        <h1>Users</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for anything"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
          <button className="search-btn">
            <FiFilter size={18} />
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>ORGANIZATION <FiFilter className="filter-icon" /></th>
              <th>USERNAME <FiFilter className="filter-icon" /></th>
              <th>EMAIL <FiFilter className="filter-icon" /></th>
              <th>PHONE NUMBER <FiFilter className="filter-icon" /></th>
              <th>DATE JOINED <FiFilter className="filter-icon" /></th>
              <th>STATUS <FiFilter className="filter-icon" /></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-results">No users found</td>
              </tr>
            ) : (
              paginatedUsers.map(user => {
                const statusInfo = getStatusStyle(user.status);
                return (
                  <tr key={user.id}>
                    <td>{user.organization || 'N/A'}</td>
                    <td>{user.username || 'N/A'}</td>
                    <td>{user.email || 'N/A'}</td>
                    <td>{user.phoneNumber || 'N/A'}</td>
                    <td>{user.dateJoined || 'N/A'}</td>
                    <td>
                      <span className={`status-badge ${statusInfo.class}`}>
                        {statusInfo.text}
                      </span>
                    </td>
                    <td className="actions">
                      <button
                        className="dots-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdownId(openDropdownId === user.id ? null : user.id);
                        }}
                      >
                        <FiMoreVertical size={20} />
                      </button>

                      {openDropdownId === user.id && (
                        <div className="dropdown" ref={dropdownRef}>
                          <Link
                            to={`/users/${user.id}`}
                            className="dropdown-item view"
                            onClick={() => setOpenDropdownId(null)}
                          >
                            <FiEye size={16} /> View Details
                          </Link>
                          <button className="dropdown-item blacklist">
                            <FiSlash size={16} /> Blacklist User
                          </button>
                          <button className="dropdown-item delete">
                            <FiTrash2 size={16} /> Delete User
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {filteredUsers.length > 0 && (
        <div className="table-footer">
          <div className="showing">
            Showing {startIndex + 1}–{endIndex} out of {filteredUsers.length}
          </div>

          <div className="pagination">
            <button
              className="page-arrow"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              ←
            </button>

            {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  className={`page-number ${currentPage === page ? 'active' : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              );
            })}

            {totalPages > 7 && <span className="ellipsis">...</span>}

            <button
              className="page-arrow"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
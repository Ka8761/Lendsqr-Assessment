import { useState } from 'react';
import { FiSearch, FiBell } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useSearch } from '../../context/SeachContext';
import mainlogo from '../../assets/mainlogo.png';
import profilepic from '../../assets/profilepic.png';
import './Navbar.css';

function Navbar({ onLogout }) {
  const { searchQuery, setSearchQuery } = useSearch();
  const [showDropdown, setShowDropdown] = useState(false);
  
  const [value, setValue] = useState('');

  const handleSearch = () => {
    setSearchQuery(value.trim());
  };


  return (
    <header className="navbar">
      <div className="left-section">
        <img src={mainlogo} alt="Lendsqr Logo" className="logo" />

        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search for anything"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-btn"onClick={handleSearch}>
            <FiSearch size={18} />
          </button>
        </div>
      </div>

      <div className="right-section">
        <Link to="/" className="docs-link">Docs</Link>

        <button className="notification-btn">
          <FiBell size={20} />
        </button>

        <div className="profile-dropdown-wrapper">
          <div
            className="profile-trigger"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img src={profilepic} alt="Profile" className="profile-pic" />
            <span className="username">Adeyemi</span>
            <IoIosArrowDown size={16} className="dropdown-arrow" />
          </div>

          {showDropdown && (
            <div className="dropdown-menu">
              <button onClick={onLogout} className="dropdown-item logout">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
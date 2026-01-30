import usersIcon from '../../assets/users.png';
import activeUsersIcon from '../../assets/active.png';
import loanUsersIcon from '../../assets/loans.png';
import savingsUsersIcon from '../../assets/savings.png';

import './StatCard.css';

function StatCard() {
  const stats = [
    {
      count: '2,453',
      label: 'USERS',
      image: usersIcon,
    },
    {
      count: '2,453',
      label: 'ACTIVE USERS',
      image: activeUsersIcon,
    },
    {
      count: '12,453',
      label: 'USERS WITH LOANS',
      image: loanUsersIcon,
    },
    {
      count: '102,453',
      label: 'USERS WITH SAVINGS',
      image: savingsUsersIcon,
    },
  ];

  return (
    <div className="stats-row">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <img
            src={stat.image}
            alt={stat.label}
            className="stat-image"
          />
          <div className="stat-label">{stat.label.split(' ')[0]}</div>
          <h3>{stat.count}</h3>
          <p>{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

export default StatCard;
import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <div className="w-full bg-white-100 p-4 flex justify-end">
      <Link to="/login" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
        <span role="img" aria-label="user-icon">👤</span>
      </Link>
    </div>
  );
};

export default TopBar;
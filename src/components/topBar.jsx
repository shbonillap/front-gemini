import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <div className="w-full bg-white-100 p-4 flex justify-end">
      <Link to="/" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
        <span role="img" aria-label="user-icon"><svg className="h-5 w-5 text-gray-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
</svg>
</span>
      </Link>
    </div>
  );
};

export default TopBar;
import React, { useState } from 'react';

const DocumentDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const filename = localStorage.getItem("file");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative mt-4">
          <button 
            onClick={toggleDropdown} 
            className="w-full flex justify-between items-center p-2 bg-white rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <div className="flex items-center">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <span className="ml-2">Documents</span>
            </div>
            <svg className={`h-4 w-4 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isOpen && filename && (
            <div className="mt-2 flex items-center">
            <div className="mr-4 w-px h-10 bg-gray-300"></div>
            <div className="w-full p-2 bg-gray-100 rounded-md shadow-md">
                <p className="truncate">{filename}</p>
              </div>
            </div>
          )}
        </div>
  );
};

export default DocumentDropdown;
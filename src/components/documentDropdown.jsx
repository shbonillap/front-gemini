import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const DocumentDropdown = ({ hideAll, setFilename }) => {
  const [isOpen, setIsOpen] = useState(true);
  const filename = localStorage.getItem("file");
  const navigate = useNavigate();  // Definir el hook de navegación


  const deleteFileLocal = () =>{
    localStorage.removeItem("file");
    setFilename("");
    setIsOpen(false);
    hideAll();

  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative mt-4">
          <button 
            onClick={toggleDropdown} 
            disabled={!filename}
            className="w-full flex justify-between items-center p-2 bg-white rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <div className="flex items-center">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <span className="ml-2">Document</span>
            </div>
            {filename &&
              <svg className={`h-4 w-4 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            }
          </button>
          {isOpen && filename && (
  <div className="mt-2 flex items-center">
    <div className="mr-4 w-px h-10 bg-gray-300"></div>
    <div className="mr-2 w-full p-2 bg-gray-100 rounded-md shadow-md flex justify-between items-center">
      <p className="truncate">{filename}</p>
      <svg className="h-5 w-5 text-red-500 hover:text-red-900"  width="24" height="24" onClick={deleteFileLocal}
        viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" 
        strokeLinecap="round" strokeLinejoin="round">  
        <path stroke="none" 
        d="M0 0h24v24H0z"/>  <line x1="4" y1="7" x2="20" y2="7" />  
        <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
      </svg>
    </div>
  </div>
)}
        </div>
  );
};

export default DocumentDropdown;
// src/App.js
import React from 'react';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="w-screen h-screen flex">
      {/* Sidebar */}
      <aside className="w-2/10 bg-gray-100 p-4 ">
        <h2 className="text-lg font-bold mb-4 mt-1">PROFESSOR GEMINI</h2>
        <ul className="mb-6">
          <li className="mb-2">tema 1</li>
          <li className="mb-2">tema 2</li>
          <li className="mb-2">tema 3</li>
          <li className="mb-2">tema 4</li>
        </ul>
        <button className="w-full py-2 text-red-600 border border-red-600 rounded">
          nuevo tema
        </button>
        <hr className="my-6" />
        <nav>
          <ul>
            <li className="flex items-center mb-4">
              <span className="mr-2">🏠</span> 
              <span>Contenido</span>
            </li>
            <li className="flex items-center mb-4">
              <span className="mr-2">📄</span> 
              <span>Resúmenes</span>
            </li>
            <li className="flex items-center mb-4">
              <span className="mr-2">✏️</span> 
              <span>Ejercicios</span>
            </li>
            <li className="flex items-center mb-4">
              <span className="mr-2">📝</span> 
              <span>Tests</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="w-8/10 h-screen flex flex-col">
        {/* Topbar */}
        <div className="w-full bg-gray-100 p-4 flex justify-end">
          <Link to="/login" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
            <span role="img" aria-label="user-icon">👤</span>
          </Link>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4">
          {/* Aquí puedes agregar el contenido principal */}
        </main>
      </div>
    </div>
  );
};

export default App;

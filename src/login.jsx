// src/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    //Logica de login esperar a ver como meter el login de google
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 border border-gray-300 rounded-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">Sign in to HelpStudy</h2>
        </div>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username or email address</label>
            <input 
              type="text" 
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
            />
            <div className="text-right mt-2">
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
            </div>
          </div>
          <button 
            type="submit" 
            className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Sign in
          </button>
        </form>
        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">Sign in with a passkey</a>
        </div>
        <div className="mt-6 text-center text-sm">
          New to HelpStudy? <a href="#" className="text-blue-600 hover:underline">Create an account</a>
        </div>
      </div>
    </div>
  );
};

export default Login;

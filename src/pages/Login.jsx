import useAppContext from '../context/useAppContext';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch, axiosInstance } = useAppContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://nurul-huda.org/api/auth/login', { email, password });
      const data = response.data;

      if (response.status === 200) {
        const authData = {
          token: data.data.token,
          user: data.data.user,
        };

        dispatch({
          type: 'SET_AUTH',
          payload: authData,
        });

        console.log('Token:', data.data.token);
        console.log('AuthData:', authData);
        toast.success('Login successful!');
        navigate('/admin-dashboard/main');
      } else {
        toast.error(data.message || 'Login failed!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

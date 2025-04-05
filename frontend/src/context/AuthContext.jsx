import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configure axios defaults
  const api = axios.create({
    baseURL: 'https://train-reservation-7aft.onrender.com/api',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    withCredentials: true
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Extract user details from token
        const decoded = JSON.parse(atob(token.split('.')[1]));
        if (decoded.user && decoded.user.id) {
          setUser({ id: decoded.user.id });
        }
      } catch (err) {
        console.error('Error processing token:', err);
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
      }
    }
    
    setLoading(false);
  }, []);

  // ✅ FIXED: register function should NOT store token or update user state
  const register = async (name, email, password, navigate) => {
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
      });

      alert(response.data.msg || "Registration successful! Please login.");
      return { success: true };
      navigate('/login'); // Redirect user to login page
      
     
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
      return { success: false, error: err.response?.data?.msg || 'Registration failed' };
    }
  };

  // ✅ Login function remains unchanged
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        if (decoded.user && decoded.user.id) {
          setUser({ id: decoded.user.id });
        }
      } catch (err) {
        console.error('Error decoding token:', err);
      }

      return { success: true };
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
      return { success: false, error: err.response?.data?.msg || 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = { user, loading, error, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const decoded = JSON.parse(atob(token.split('.')[1]));
        if (decoded.user && decoded.user.id) {
          setUser({ id: decoded.user.id });
        }
      } catch (err) {
        console.error('Error processing token:', err);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      }
    }
    setLoading(false);
  }, []);

  const register = async (name, email, password, navigate) => {
    try {
      const response = await axios.post('https://railwaybooking.onrender.com/api/auth/register', {
        name,
        email,
        password,
      });

      alert(response.data.msg || "Registration successful! Please login.");
      navigate('/login');
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.msg || 'Registration failed';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://railwaybooking.onrender.com/api/auth/login', {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const decoded = JSON.parse(atob(token.split('.')[1]));
      if (decoded.user && decoded.user.id) {
        setUser({ id: decoded.user.id });
      }

      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.msg || 'Login failed';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = { user, loading, error, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

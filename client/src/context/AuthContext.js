import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user data in localStorage
    const savedUser = localStorage.getItem('user');
    const savedPoints = localStorage.getItem('points');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setPoints(parseInt(savedPoints) || 0);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulated API call - replace with actual backend call
      const response = { user: { id: 1, email, name: email.split('@')[0] }, points: 100 };
      
      setUser(response.user);
      setPoints(response.points);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('points', response.points.toString());
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (email, password, name) => {
    try {
      // Simulated API call - replace with actual backend call
      const response = { user: { id: 1, email, name }, points: 0 };
      
      setUser(response.user);
      setPoints(response.points);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('points', response.points.toString());
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setPoints(0);
    localStorage.removeItem('user');
    localStorage.removeItem('points');
  };

  const addPoints = (amount) => {
    const newPoints = points + amount;
    setPoints(newPoints);
    localStorage.setItem('points', newPoints.toString());
  };

  const spendPoints = (amount) => {
    if (points >= amount) {
      const newPoints = points - amount;
      setPoints(newPoints);
      localStorage.setItem('points', newPoints.toString());
      return true;
    }
    return false;
  };

  const value = {
    user,
    points,
    loading,
    login,
    register,
    logout,
    addPoints,
    spendPoints,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

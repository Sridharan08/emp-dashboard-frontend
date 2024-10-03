import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Manage user state

  const login = (userData) => {
    setUser(userData); // Set user data upon successful login
  };

  const logout = () => {
    setUser(null); // Clear user data upon logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

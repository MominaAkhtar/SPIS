import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored =
        localStorage.getItem('spis_user') || sessionStorage.getItem('spis_user');
      return stored
        ? JSON.parse(stored)
        : {
            id: 'usr_researcher',
            name: 'Researcher Analyst',
            email: 'analyst@spis.org',
            role: 'Lead Intelligence Analyst',
          };
    } catch {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!(
      localStorage.getItem('spis_token') || sessionStorage.getItem('spis_token')
    );
  });

  const [loading, setLoading] = useState(false);

  const login = (userData, token = 'spis_jwt_session_token', rememberMe = false) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    
    // Clear any previous token from opposite storage to avoid stale tokens
    if (rememberMe) {
      sessionStorage.removeItem('spis_token');
      sessionStorage.removeItem('spis_user');
    } else {
      localStorage.removeItem('spis_token');
      localStorage.removeItem('spis_user');
    }

    storage.setItem('spis_token', token);
    storage.setItem('spis_user', JSON.stringify(userData));

    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('spis_token');
    localStorage.removeItem('spis_user');
    sessionStorage.removeItem('spis_token');
    sessionStorage.removeItem('spis_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      const isPersistent = !!localStorage.getItem('spis_token');
      const storage = isPersistent ? localStorage : sessionStorage;
      storage.setItem('spis_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        setLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;

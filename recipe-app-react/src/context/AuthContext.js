import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../auth/api'; // Import our configured axios instance

// Create the context
const AuthContext = createContext(null);

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle initial auth check

  // This effect runs once when the app loads to check for a valid session
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Make a request to a protected endpoint to see if the session is still valid
        // Your backend should have an endpoint like `/api/user/me` that returns user data
        const response = await api.get('/api/user/me');
        setUser(response.data); // If successful, set the user
      } catch (error) {
        // If the request fails, the user is not authenticated
        setUser(null);
      } finally {
        // We're done checking, so set loading to false
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (credentials) => {
    // The server will set the HttpOnly cookie upon successful login
    await api.post('/api/login', credentials);
    // After login, fetch the user data to update the context state
    const response = await api.get('/api/user/me');
    setUser(response.data);
  };

  // Logout function
  const logout = async () => {
    // Tell the server to clear the authentication cookie
    await api.post('/api/logout');
    setUser(null); // Clear the user state on the client
  };

  // The value provided to the context consumers
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user, // A handy boolean to check if the user is logged in
  };

  // Don't render the rest of the app until the initial auth check is complete
  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
  );
};

// Custom hook to easily use the auth context in other components
export const useAuth = () => {
  return useContext(AuthContext);
};
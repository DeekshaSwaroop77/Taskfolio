// Create Context and set up Provider
import { createContext, useContext, useState, useEffect } from 'react';
import { register, login, checkPermission } from 'api/auth';
import * as jwt from 'jsonwebtoken';
import { useLocation } from 'react-router-dom';

// Define the shared state and methods
const defaultAuthContext = {
  isAuthenticated: false, // Whether the user is logged in. Defaults to false; becomes true with a valid backend token.
  currentMember: null,    // Current user data. Defaults to null; will be set after successful login.
  register: null,         // Register method
  login: null,            // Login method
  logout: null,           // Logout method
};

// Create the Context using createContext
const AuthContext = createContext(defaultAuthContext);

// Export the AuthContext as a custom hook
export const useAuth = () => useContext(AuthContext);

// Define the provider and wrap the shared register, login, logout methods.
// It returns an <AuthContext.Provider> for child components to consume.
export const AuthProvider = ({ children }) => {
  // Initial state, passed to <AuthContext.Provider>:
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Auth status
  const [payload, setPayload] = useState(null); // Will hold user data extracted from authToken
  const { pathname } = useLocation();

  // Check if token is valid
  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        return;
      }

      const result = await checkPermission(authToken);
      if (result) {
        setIsAuthenticated(true);
        const tempPayload = jwt.decode(authToken);
        setPayload(tempPayload);
      } else {
        setIsAuthenticated(false);
        setPayload(null);
      }
    };

    checkTokenIsValid();
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && {
          // Using JWT decode to extract user info
          // ** Requires JSON Web Token library to use JWT decoding methods
          id: payload.sub,     // Extracted `sub` string as user ID
          name: payload.name,  // Extracted username
        },
        // Shared register logic
        register: async (data) => {
          const { success, authToken } = await register({
            username: data.username,
            password: data.password,
            email: data.email,
          });
          const tempPayload = jwt.decode(authToken);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        // Shared login logic
        login: async (data) => {
          const { success, authToken } = await login({
            username: data.username,
            password: data.password,
          });
          const tempPayload = jwt.decode(authToken);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        // Shared logout logic
        logout: () => {
          localStorage.removeItem('authToken');
          setPayload(null);
          setIsAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

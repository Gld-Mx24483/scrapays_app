import React, { createContext, useContext } from 'react';
import { useAuth0 } from 'react-native-auth0';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: () => Promise<void>;
  logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logoutUser: async () => {},
});

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { authorize, clearSession, user } = useAuth0();

  const login = async () => {
    try {
      await authorize();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logoutUser = async () => {
    try {
      await clearSession();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated: !!user,
      user,
      login,
      logoutUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

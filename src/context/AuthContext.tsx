// // src/context/AuthContext.tsx
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import Auth0 from 'auth0-react-native';

// interface AuthContextType {
//   isAuthenticated: boolean;
//   user: any;
//   login: () => Promise<void>;
//   logoutUser: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType>({
//   isAuthenticated: false,
//   user: null,
//   login: async () => {},
//   logoutUser: async () => {},
// });

// export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState<any>(null);
//   const [auth0Client, setAuth0Client] = useState<Auth0 | null>(null);

//   useEffect(() => {
//     // Directly use the values instead of the AUTH0_CONFIG
//     const clientId = 'Mck17XNhVQnGV8smNuSg2spbbBO61jPi';  // Directly specify the clientId
//     const domain = 'dev-mr0rccx8miz375v2.us.auth0.com'; // Directly specify the domain (issuer)

//     if (!clientId) {
//       console.error('Auth0 Client ID is missing!');
//       return;
//     }

//     try {
//       const client = new Auth0({
//         domain: domain,
//         clientId: clientId
//       });
//       setAuth0Client(client);

//       const checkAuthStatus = async () => {
//         try {
//           const credentials = await client.credentialsManager.getCredentials();
//           if (credentials) {
//             const decodedToken = await client.decodeToken(credentials.idToken);
//             setUser({
//               name: decodedToken.name,
//               email: decodedToken.email,
//               picture: decodedToken.picture
//             });
//             setIsAuthenticated(true);
//           }
//         } catch (error) {
//           console.log('No existing credentials');
//           setIsAuthenticated(false);
//         }
//       };

//       checkAuthStatus();
//     } catch (error) {
//       console.error('Failed to initialize Auth0 client:', error);
//     }
//   }, []);

//   const login = async () => {
//     if (!auth0Client) {
//       console.error('Auth0 client not initialized');
//       return;
//     }

//     try {
//       const credentials = await auth0Client.webAuth.authorize({
//         scope: 'openid profile email',
//         audience: `https://${auth0Client.domain}/userinfo`
//       });

//       await auth0Client.credentialsManager.saveCredentials(credentials);

//       const decodedToken = await auth0Client.decodeToken(credentials.idToken);
      
//       setUser({
//         name: decodedToken.name,
//         email: decodedToken.email,
//         picture: decodedToken.picture
//       });
//       setIsAuthenticated(true);
//     } catch (error) {
//       console.error('Login error:', error);
//     }
//   };

//   const logoutUser = async () => {
//     if (!auth0Client) {
//       console.error('Auth0 client not initialized');
//       return;
//     }

//     try {
//       await auth0Client.credentialsManager.clearCredentials();
//       await auth0Client.webAuth.clearSession({ federated: false });

//       setUser(null);
//       setIsAuthenticated(false);
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{
//       isAuthenticated,
//       user,
//       login,
//       logoutUser
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
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



// // src/context/AuthContext.tsx

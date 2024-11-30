declare module 'auth0-react-native' {
    export interface Credentials {
      accessToken: string;
      idToken: string;
      refreshToken?: string;
      scope?: string;
      expiresIn?: number;
    }
  
    export interface DecodeTokenOptions {
      
    }
  
    export interface WebAuthAuthorizeOptions {
      scope?: string;
      audience?: string;
    }
  
    export interface ClearSessionOptions {
      federated?: boolean;
    }
  
    export default class Auth0 {
      domain: any;
      constructor(options: { domain: string; clientId: string });
  
      webAuth: {
        authorize(options?: WebAuthAuthorizeOptions): Promise<Credentials>;
        clearSession(options?: ClearSessionOptions): Promise<void>;
      };
  
      credentialsManager: {
        getCredentials(): Promise<Credentials | null>;
        saveCredentials(credentials: Credentials): Promise<void>;
        clearCredentials(): Promise<void>;
      };
  
      decodeToken(token: string, options?: DecodeTokenOptions): Promise<any>;
    }
  }
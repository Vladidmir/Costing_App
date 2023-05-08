import React, {useState, ReactNode} from 'react';
import {createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextState {
  token: string | null;
  isAuth: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextState>({
  token: null,
  isAuth: false,
  authenticate: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({children}: AuthContextProviderProps) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  const authenticate = (token: string) => {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  };

  const logout = () => {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
  };

  const value: AuthContextState = {
    token: authToken,
    isAuth: !!authToken,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

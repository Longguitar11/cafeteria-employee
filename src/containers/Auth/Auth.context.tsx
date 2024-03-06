'use client';

import React, { createContext, useState, ReactNode, useContext } from 'react';
import { AuthContextInterface } from './Auth.models';

export const AuthContext = createContext<AuthContextInterface>({
  token: '',
  setToken: () => {},
  removeToken: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>(
    localStorage.getItem('userToken') || ''
  );

  const setNewToken = (newToken: string) => {
    if(newToken !== token) {
      localStorage.setItem('userToken', newToken)
      setToken(newToken)
    }
  }

  const removeToken = () => {
    localStorage.removeItem('userToken')
    setToken('')
  }

  return (
    <AuthContext.Provider value={{ token, setToken: setNewToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);


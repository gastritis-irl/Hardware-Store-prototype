import React, { createContext, useContext, useMemo, useState } from 'react';
import { login, logout, register } from '../api/api';

type AuthContextType = {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<string | null>(null);

  const loginUser = async (email: string, password: string) => {
    const token = await login(email, password);
    // Store the token in local storage
    localStorage.setItem('token', token);
    setUser(email);
  };

  const registerUser = async (email: string, password: string) => {
    const token = await register(email, password);
    // Store the token in local storage
    localStorage.setItem('token', token);
    setUser(email);
  };

  const logoutUser = async () => {
    await logout();
    // Remove the token from local storage
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      login: loginUser,
      register: registerUser,
      logout: logoutUser,
    }),
    [user, loginUser, registerUser, logoutUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Create a hook to use the AuthContext, this is what you can call in your components
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};

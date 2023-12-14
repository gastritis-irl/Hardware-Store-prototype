import React, { createContext, useContext, useMemo, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useLogin, useRegister, useLogout } from '../hooks/useAuth';

type User = {
  email: string;
  // Add other user properties here
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  const loginUser = async (email: string, password: string) => {
    const token = await loginMutation.mutateAsync({ email, password });
    const decodedToken = jwtDecode(token) as User;
    setUser(decodedToken);
  };

  const registerUser = async (email: string, password: string) => {
    const token = await registerMutation.mutateAsync({ email, password });
    const decodedToken = jwtDecode(token) as User;
    setUser(decodedToken);
  };

  const logoutUser = async () => {
    await logoutMutation.mutateAsync();
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

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};

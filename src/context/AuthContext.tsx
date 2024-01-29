import React, { createContext, useContext, useMemo, useState } from 'react';
import { AuthEntity } from '../types/AuthEntity';

const AuthContext = createContext<{
  authState: AuthEntity;
  setAuthState: (state: AuthEntity) => void;
} | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthEntity>({
    email: '',
    token: '',
    role: '',
    expirationDate: '',
    id: -1,
    themeId: 1,
  });

  const value = useMemo(() => ({ authState, setAuthState }), [authState, setAuthState]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

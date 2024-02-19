import { useMutation } from '@tanstack/react-query';
import { login, logout, register, updateThemeForCurrentUser } from '../../api/api';
import { useAuthContext } from '../../context/AuthContext';
import { AuthEntity } from '../../types/AuthEntity';
import { setToken } from '../../api/token';

type UserCredentials = {
  email: string;
  password: string;
};

export const useAuth = () => {
  const { authState, setAuthState } = useAuthContext();

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: UserCredentials) => {
      const response: AuthEntity | null = await login(email, password);
      if (response) {
        setAuthState(response);
        setToken(response.token);
      }
      return response;
    },
  });

  const registerMutation = useMutation({
    mutationFn: async ({ email, password }: UserCredentials) => {
      const response: AuthEntity | null = await register(email, password);
      console.log(response);
      if (response) {
        setAuthState(response);
        setToken(response.token);
      }
      return response;
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await logout();
      setAuthState({
        email: '',
        token: '',
        role: '',
        expirationDate: '',
        id: -1,
        themeId: 1,
      });
      setToken('');
    },
  });

  const useUserThemeMutation = useMutation({
    mutationFn: async (themeId: number) => {
      if (authState.id === -1) {
        return;
      }
      await updateThemeForCurrentUser(themeId, authState.id);
    },
  });

  return { loginMutation, registerMutation, logoutMutation, useUserThemeMutation };
};

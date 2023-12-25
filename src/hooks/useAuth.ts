import { useMutation } from '@tanstack/react-query';
import { login, logout, register } from '../api/api';
import { useAuthContext } from '../context/AuthContext';
import { AuthEntity } from '../types/AuthEntity';
import { setToken } from '../api/token';

type UserCredentials = {
  email: string;
  password: string;
};

export const useAuth = () => {
  const { setAuthState } = useAuthContext();

  // const loginMutation = () => {
  //   return useMutation<AuthEntity | null, Error, UserCredentials>({
  //     mutationFn: async ({ email, password }: UserCredentials) => {
  //       const response = await login(email, password);
  //       if (response) {
  //         setAuthState(response);
  //         setToken(response.token);
  //       }
  //       return response;
  //     },
  //   });
  // };

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

  // const registerMutation = () => {
  //   return useMutation<AuthEntity | null, Error, UserCredentials>({
  //     mutationFn: async ({ email, password }: UserCredentials) => {
  //       const response = await register(email, password);
  //       if (response) {
  //         setAuthState(response);
  //         setToken(response.token);
  //       }
  //       return response;
  //     },
  //   });
  // };

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

  // const logoutMutation = () => {
  //   return useMutation<void, Error, void>({
  //     mutationFn: async () => {
  //       await logout();
  //       setAuthState({
  //         email: '',
  //         token: '',
  //         role: '',
  //         expirationDate: '',
  //         userId: -1,
  //       });
  //       setToken('');
  //     },
  //   });
  // };

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await logout();
      setAuthState({
        email: '',
        token: '',
        role: '',
        expirationDate: '',
        id: -1,
      });
      setToken('');
    },
  });

  return { loginMutation, registerMutation, logoutMutation };
};

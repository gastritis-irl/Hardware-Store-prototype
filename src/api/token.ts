let token: string = '';

export const getToken = () => token;

export const setToken = (newToken: string) => {
  token = newToken;
};

let tokenCache: string | null = null;
let tokenTimeout: NodeJS.Timeout | null = null;

export const getToken = () => tokenCache;

export const storeToken = (token: string) => {
  console.log('Storing token:', token);
  // Store the token in memory
  tokenCache = token;
  // Set a timeout to clear the token after 60 minutes
  if (tokenTimeout) {
    clearTimeout(tokenTimeout);
  }
  tokenTimeout = setTimeout(
    () => {
      tokenCache = null;
    },
    60 * 60 * 1000,
  );
};

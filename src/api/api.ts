import axios from 'axios';
import { Product } from '../types/Product';
import { User } from '../types/User';
import { AuthEntity } from '../types/AuthEntity';
import { getToken, setToken } from './token';

const apiClient = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: { 'Content-Type': 'application/json' },
});

export const randomImage = () =>
  axios.get('https://api.api-ninjas.com/v1/randomimage?category=technology', {
    headers: {
      'X-Api-Key': process.env.API_KEY,
      Accept: 'image/jpg',
    },
  });

export const fetchProducts = (
  orderBy?: string,
  direction?: string,
  pageNumber?: number,
  minPrice?: number,
  maxPrice?: number,
  textSearch?: string,
  userId?: number,
  categoryName?: string,
) => {
  let url = '/product';
  const params = new URLSearchParams();

  if (orderBy) params.append('orderBy', orderBy);
  if (direction) params.append('direction', direction);
  if (pageNumber) params.append('pageNumber', pageNumber.toString());
  if (minPrice) params.append('MinPrice', minPrice.toString());
  if (maxPrice) params.append('MaxPrice', maxPrice.toString());
  if (textSearch) params.append('TextSearch', textSearch);
  if (userId) params.append('userId', userId.toString());
  if (categoryName) params.append('categoryName', categoryName);

  if (params.toString()) url += `?${params.toString()}`;

  return apiClient.get(url);
};

export const fetchProduct = (id: number) => apiClient.get(`/product/${id}`);
export const createProduct = (data: Product) => apiClient.post('/product', data);
export const updateProduct = (id: number, data: Product) => apiClient.put(`/product/${id}`, data);
export const deleteProduct = (id: number) => apiClient.delete(`/product/${id}`);
export const fetchUsers = () => apiClient.get('/user');
export const fetchUser = (id: number) => apiClient.get(`/user/${id}`);
export const createUser = (data: User) => apiClient.post('/user', data);
export const updateUser = async (id: number, data: User) => {
  const response = await apiClient.put(`/user/${id}`, data);
  if (response.data.token) {
    setToken(response.data.token);
  }
  return response;
};

export const deleteUser = (id: number) => apiClient.delete(`/user/${id}`);
const authenticateUser = async (endpoint: string, email: string, password: string): Promise<AuthEntity | null> => {
  const response = await apiClient.post(endpoint, {
    email,
    password,
  });
  let res: AuthEntity | null = null;
  if (response.data) {
    if (response.data === 'Invalid credentials') {
      console.log('Invalid credentials');
      throw new Error('Invalid credentials');
    }
    res = response.data;
  } else {
    console.log('No token found in response body');
    throw new Error('No token found in response body');
  }
  return res;
};

export const login = (email: string, password: string): Promise<AuthEntity | null> => {
  return authenticateUser('/login', email, password);
};

export const register = (email: string, password: string): Promise<AuthEntity | null> => {
  return authenticateUser('/register', email, password);
};
export const logout = async (): Promise<void> => {
  await apiClient.post('/logout');
};

export const refreshToken = async () => {
  const response = await apiClient.post('/refresh-token');
  return response.data;
};

export const getProductsByUser = async (userId: number) => {
  const response = await apiClient.get(`/user/${userId}/product`);
  return response.data;
};

export const getCategories = async (pageNumber: number, pageSize: number) => {
  const response = await apiClient.get('/category', {
    params: {
      pageNumber,
      pageSize,
    },
  });
  return response.data;
};

export const getCategory = async (id: number) => {
  const response = await apiClient.get(`/category/${id}`);
  return response.data;
};

export const createCategory = async (name: string, description: string) => {
  const response = await apiClient.post('/category', {
    name,
    description,
  });
  return response.data;
};

export const updateCategory = async (id: number, name: string, description: string) => {
  const response = await apiClient.put(`/category/${id}`, {
    name,
    description,
  });
  return response.data;
};

export const deleteCategory = async (id: number) => {
  const response = await apiClient.delete(`/category/${id}`);
  return response.data;
};

export const updateThemeForCurrentUser = async (themeId: number, userId: number) => {
  const response = await apiClient.post(`/user/${userId}/theme`, {
    themeId,
  });
  return response.data;
};

apiClient.interceptors.request.use((config) => {
  const currentToken = getToken();
  if (currentToken) {
    config.headers.Authorization = `Bearer ${currentToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if ((error.response.status === 403 || error.response.status === 404) && !originalRequest.retry) {
      originalRequest.retry = true;
      const newToken = await refreshToken();
      if (newToken) {
        setToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);

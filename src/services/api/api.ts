import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { ibgeApiUrl } from '@/fakeenv';
import useStore from '@/services/store';

export const useApi = ({ token = null }: { token: string | null }) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const instance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers,
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const loginCacheString = await SecureStore.getItemAsync('login_store');
          if (!loginCacheString) return Promise.reject(error);

          const loginCache = JSON.parse(loginCacheString);
          const { refreshToken } = loginCache;
          if (!refreshToken) return Promise.reject(error);

          const refreshApi = axios.create({
            baseURL: process.env.EXPO_PUBLIC_API_URL,
            headers: { 'Content-Type': 'application/json' },
          });

          const refreshResponse = await refreshApi.post('/refresh-token', { refreshToken });
          const newToken = refreshResponse.data.token;

          useStore.getState().setLogin({ token: newToken, refreshToken, isAuthenticated: true });
          await SecureStore.setItemAsync('login_store', JSON.stringify({ ...loginCache, token: newToken }));

          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return axios(originalRequest);
        } catch {
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export const ibge = axios.create({
  baseURL: process.env.EXPO_PUBLIC_IBGE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const forgotPasswordApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendOTP = async (email: string, purpose: 'register' | 'reset_password' | 'change_email') => {
  return forgotPasswordApi.post('/send-otp', { email, purpose });
};

export const verifyOTP = async (email: string, otp: string, purpose: 'register' | 'reset_password' | 'change_email') => {
  return forgotPasswordApi.post('/verify-otp', { email, otp, purpose });
};

export const sendPasswordResetCode = async (email: string) => {
  return forgotPasswordApi.post('/forgot-password', { email });
};

export const validateResetCode = async (email: string, code: string) => {
  return forgotPasswordApi.post('/validate-reset-code', { email, code });
};

export const resetPassword = async (email: string, verifiedToken: string, newPassword: string) => {
  return forgotPasswordApi.post('/reset-password', { email, verifiedToken, newPassword });
};

export const checkUserExists = async (type: 'EMAIL' | 'USERNAME', value: string) => {
  return forgotPasswordApi.post('/check-user-exists', { type, value });
};
import axios from 'axios';
import { ibgeApiUrl } from '@/fakeenv';

export const useApi = ({ token = null }: { token: string | null }) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers,
  });
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

export const sendPasswordResetCode = async (email: string) => {
  return forgotPasswordApi.post('/forgot-password', { email });
};

export const validateResetCode = async (email: string, code: string) => {
  return forgotPasswordApi.post('/validate-reset-code', { email, code });
};

export const resetPassword = async (email: string, code: string, newPassword: string) => {
  return forgotPasswordApi.post('/reset-password', { email, code, newPassword });
};

export const checkUserExists = async (type: 'EMAIL' | 'USERNAME', value: string) => {
  return forgotPasswordApi.post('/check-user-exists', { type, value });
};
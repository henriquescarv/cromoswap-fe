import axios from 'axios';
import { urlApi, ibgeApiUrl } from '@/fakeenv';

export const useApi = ({ token = null }: { token: string | null }) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios.create({
    baseURL: urlApi,
    headers,
  });
};

export const ibge = axios.create({
  baseURL: ibgeApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
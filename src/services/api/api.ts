import axios from 'axios';
import { urlApi } from '@/fakeenv';

const api = axios.create({
  baseURL: urlApi,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postLogin = async ({ username, password }: postLoginProps) => {
  try {
    const response = await api.post('/login', { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
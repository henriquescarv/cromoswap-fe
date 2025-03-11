import axios from 'axios';
import { urlApi } from '@/fakeenv';

const api = axios.create({
  baseURL: urlApi,
  headers: {
    'Content-Type': 'application/json',
  },
});

type getLoginProps = {
  username: string;
  password: string;
}

export const getLogin = async ({ username, password }: getLoginProps) => {
  try {
    const response = await api.post('/login', { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
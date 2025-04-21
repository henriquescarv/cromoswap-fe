import { useApi } from "@/services/api/api";

export const postLogin = async ({ username, password }: postLoginProps) => {
  const api = useApi({ token: null });

  try {
    const response = await api.post('/login', { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
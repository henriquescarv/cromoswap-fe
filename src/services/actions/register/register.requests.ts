import { useApi } from "@/services/api/api";
import useStore from "@/services/store";
import { postRegisterProps } from "./register.requests.types";

export const postRegister = async ({ username, email, password }: postRegisterProps) => {
  const api = useApi({ token: null });

  try {
    const response = await api.post('/register', { username, email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const postLocation = async ({ latitude, longitude }: { latitude: number; longitude: number }) => {
  const state = useStore.getState();
  const api = useApi({ token: state.login.token });

  try {
    const response = await api.post('/update-location', { latitude, longitude });
    return response.data;
  } catch (error) {
    throw error;
  }
}
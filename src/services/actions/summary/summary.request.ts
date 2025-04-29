import { useApi } from "@/services/api/api";
import useStore from "@/services/store";


export const getSummary = async () => {
  const state = useStore.getState();
  const api = useApi({ token: state.login.token });

  try {
    const response = await api.get('/summary');

    return response.data;
  } catch (error) {
    throw error;
  }
};
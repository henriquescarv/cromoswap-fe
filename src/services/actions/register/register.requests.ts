import { useApi, ibge } from "@/services/api/api";
import useStore from "@/services/store";
import { postRegionProps, postRegisterProps } from "./register.requests.types";

export const postRegister = async ({ username, email, password }: postRegisterProps) => {
  const api = useApi({ token: null });

  try {
    const response = await api.post('/register', { username, email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const postRegion = async ({ countryState, city }: postRegionProps) => {
  const state = useStore.getState();
  const api = useApi({ token: state.login.token });

  try {
    const response = await api.post(`/region`, { countryState, city });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getIbgeStates = async () => {
  try {
    const response = await ibge.get('/localidades/estados');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getIbgeCities = async (countryState: string) => {
  try {
    const response = await ibge.get(`/localidades/estados/${countryState}/municipios`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
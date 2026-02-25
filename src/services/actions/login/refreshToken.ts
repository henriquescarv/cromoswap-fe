import { useApi } from "@/services/api/api";
import * as SecureStore from 'expo-secure-store';
import useStore from '@/services/store';

export const refreshAccessToken = async (): Promise<{ success: boolean; token?: string }> => {
  try {
    const loginCacheString = await SecureStore.getItemAsync('login_store');
    if (!loginCacheString) {
      return { success: false };
    }

    const loginCache = JSON.parse(loginCacheString);
    const { refreshToken } = loginCache;

    if (!refreshToken) {
      return { success: false };
    }

    const api = useApi({ token: null });
    const response = await api.post('/refresh-token', { refreshToken });

    const newToken = response.data.token;

    const store = useStore.getState();
    store.setLogin({ token: newToken, refreshToken, isAuthenticated: true });

    const updatedCache = {
      ...loginCache,
      token: newToken,
    };
    await SecureStore.setItemAsync('login_store', JSON.stringify(updatedCache));

    return { success: true, token: newToken };
  } catch (error) {
    console.error('Error refreshing token:', error);
    return { success: false };
  }
};

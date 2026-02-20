import { postLogin } from "./login.requests";
import * as SecureStore from 'expo-secure-store';

const setLoading = ({ set, loading }: setLoadingProps) => {
  set((state: any) => ({
    ...state,
    login: {
      ...state.login,
      loading,
    }
  }));
}

const setLogin = ({ set, token, isAuthenticated, invalidToken }: setLoginProps) => {
  set((state: any) => ({
    ...state,
    invalidToken: invalidToken || state.invalidToken,
    login: {
      ...state.login,
      token,
      isAuthenticated,
    },
  }));
};

const setStatus = ({ set, status }: setLoginStatusProps) => {
  set((state: any) => ({
    ...state,
    login: {
      ...state.login,
      status,
    },
  }));
}

const requestLogin = async ({ set, username, password }: requestLoginProps) => {
  try {
    setLoading({ set, loading: true });

    const data = await postLogin({ username, password });
    setLogin({ set, token: data.token, isAuthenticated: true, invalidToken: false });
    setStatus({ set, status: 'success' });

    const loginStoreCache = {
      token: data.token,
      isAuthenticated: true,
    }

    await SecureStore.setItemAsync('login_store', JSON.stringify(loginStoreCache));


    setLoading({ set, loading: false });
    return { success: true };
  } catch (error: any) {
    setStatus({ set, status: 'error' });

    setLoading({ set, loading: false });

    // Verificar se Ã© erro de credenciais (401/403/404) ou erro de servidor (500+)
    const statusCode = error?.response?.status;
    if (statusCode === 401 || statusCode === 403 || statusCode === 404) {
      return { success: false, errorType: 'credentials' };
    } else {
      return { success: false, errorType: 'server' };
    }
  }
};

const logout = async (set: any) => {
  setLogin({ set, token: null, isAuthenticated: false });
  await SecureStore.deleteItemAsync('login_store');
};

export const loginActions = {
  login: {
    set: setLogin,
    loading: setLoading,
    request: requestLogin,
    logout,
  },
};

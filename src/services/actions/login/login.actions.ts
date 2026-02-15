import { postLogin } from "./login.requests";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    await AsyncStorage.setItem('login_store', JSON.stringify(loginStoreCache));

    console.log('Login successful', `Message: ${data.message}`);

    setLoading({ set, loading: false });
    return { success: true };
  } catch (error: any) {
    setStatus({ set, status: 'error' });
    console.log('requestLogin', 'Something went wrong');

    setLoading({ set, loading: false });

    // Verificar se é erro de credenciais (401/403/404) ou erro de servidor (500+)
    const statusCode = error?.response?.status;
    if (statusCode === 401 || statusCode === 403 || statusCode === 404) {
      return { success: false, errorType: 'credentials' };
    } else {
      return { success: false, errorType: 'server' };
    }
  }
};

const logout = async (set: any) => {
  console.log('Logout successful', 'Message: Logout successful');
  setLogin({ set, token: null, isAuthenticated: false });
  await AsyncStorage.removeItem('login_store');
};

export const loginActions = {
  login: {
    set: setLogin,
    loading: setLoading,
    request: requestLogin,
    logout,
  },
};
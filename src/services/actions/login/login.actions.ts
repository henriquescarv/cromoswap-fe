import { postLogin } from "./login.requests";

const setLoading = ({ set, loading }: setLoadingProps) => {
  set((state: any) => ({
    ...state,
    login: {
      ...state.login,
      loading,
    }
  }));
}

const setLogin = ({set, token, isAuthenticated}: setLoginProps) => {
  set((state: any) => ({
    ...state,
    login: {
      ...state.login,
      token,
      isAuthenticated,
    },
  }));
};

const setStatus = ({set, status}: setLoginStatusProps) => {
  set((state: any) => ({
    ...state,
    login: {
      ...state.login,
      status,
    },
  }));
}

const requestLogin = async ({set, username, password}: requestLoginProps) => {
  try {
    setLoading({ set, loading: true });

    const data = await postLogin({ username, password });
    setLogin({ set, token: data.token, isAuthenticated: true });
    setStatus({ set, status: 'success' });

    console.log('Login successful', `Message: ${data.message}`);

    setLoading({ set, loading: false });
  } catch (error) {
    setStatus({ set, status: 'error' });
    console.log('requestLogin', 'Something went wrong');

    setLoading({ set, loading: false });
  }
};

const logout = (set: any) => {
  setLogin({ set, token: null, isAuthenticated: false });
};

export const loginActions = {
  login: {
    loading: setLoading,
    request: requestLogin,
    logout,
  },
};
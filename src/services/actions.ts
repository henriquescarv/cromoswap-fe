import { getLogin } from './api';

type setLoginProps = {
  set: any;
  token: string | null;
  isAuthenticated: boolean;
}

type requestLoginProps = {
  set: any;
  username: string;
  password: string;
}

type setLoadingProps = {
  set: any;
  loading: boolean;
}

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

const requestLogin = async ({set, username, password}: requestLoginProps) => {
  try {
    setLoading({ set, loading: true });

    const data = await getLogin({ username, password });
    setLogin({ set, token: data.token, isAuthenticated: true });

    console.log('Login successful', `Token: ${data.token}`);
  } catch (error) {
    console.log('Error', 'Something went wrong');
  } finally {
    setLoading({ set, loading: false });
  }
};

const logout = (set: any) => {
  setLogin({ set, token: null, isAuthenticated: false });
};

export const actions = {
  login: {
    loading: setLoading,
    request: requestLogin,
    logout,
  },
};
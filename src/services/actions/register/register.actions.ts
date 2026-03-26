import { setLoadingProps } from "../login/login.actions.types";
import { requestRegisterProps, setRegisterProps } from "./register.actions.types";
import { postRegister, postLocation } from "./register.requests";
import * as SecureStore from 'expo-secure-store';

const setLoading = ({ set, loading }: setLoadingProps) => {
  set((state: any) => ({
    ...state,
    register: {
      ...state.register,
      loading,
    }
  }));
}

const setRegister = ({ set, status, token = null, refreshToken = null }: setRegisterProps) => {
  set((state: any) => ({
    ...state,
    login: {
      ...state.login,
      isAuthenticated: !!token,
      status: status === 'success' ? status : state.login.status,
      token,
      refreshToken,
    },
    register: {
      ...state.register,
      status,
    },
  }));
};

const requestRegister = async ({ set, username, email, password, latitude, longitude }: requestRegisterProps) => {
  try {
    setLoading({ set, loading: true });

    const registerData = await postRegister({ username, email, password });
    setRegister({ set, status: 'success', token: registerData.token, refreshToken: registerData.refreshToken });

    await postLocation({ latitude, longitude });

    const loginStoreCache = {
      token: registerData.token,
      refreshToken: registerData.refreshToken,
      isAuthenticated: true,
    };
    await SecureStore.setItemAsync('login_store', JSON.stringify(loginStoreCache));

    setLoading({ set, loading: false });
  } catch (error) {
    setRegister({ set, status: 'error' });
    setLoading({ set, loading: false });
  }
};

const setIbgeStatesLoading = ({ set, loading }: setLoadingProps) => {
  set((state: any) => ({
    ...state,
    register: {
      ...state.register,
      ibge: {
        ...state.register.ibge,
        countryStates: {
          ...state.register.ibge.countryStates,
          loading,
        }
      }
    }
  }));
}

const requestIbgeStates = async ({ set }: requestIbgeStatesProps) => {
  try {
    setIbgeStatesLoading({ set, loading: true });

    const response = await getIbgeStates();

    const countryStates = response.map((state: any) => ({
      id: state.sigla,
      name: state.nome,
    }));

    set((state: any) => ({
      ...state,
      register: {
        ...state.register,
        ibge: {
          ...state.register.ibge,
          countryStates: {
            ...state.register.ibge.countryStates,
            list: countryStates,
            loading: false,
          }
        }
      }
    }));
  } catch (error) {
    setIbgeStatesLoading({ set, loading: false });
  }
}

const setIbgeCitiesLoading = ({ set, loading }: setLoadingProps) => {
  set((state: any) => ({
    ...state,
    register: {
      ...state.register,
      ibge: {
        ...state.register.ibge,
        cities: {
          ...state.register.ibge.cities,
          loading,
        }
      }
    }
  }));
}

const requestIbgeCities = async ({ set, countryStateId }: requestIbgeCitiesProps) => {
  try {
    setIbgeCitiesLoading({ set, loading: true });

    const response = await getIbgeCities(countryStateId);

    const cities = response.map((city: any) => ({
      name: city.nome,
    }));

    set((state: any) => ({
      ...state,
      register: {
        ...state.register,
        ibge: {
          ...state.register.ibge,
          cities: {
            ...state.register.ibge.cities,
            list: cities,
            loading: false,
          }
        }
      }
    }));
  } catch (error) {
    setIbgeCitiesLoading({ set, loading: false });
  }
}


export const registerActions = {
  register: {
    loading: setLoading,
    request: requestRegister,
  },
  ibge: {
    states: {
      request: requestIbgeStates,
      loading: setIbgeStatesLoading,
    },
    cities: {
      request: requestIbgeCities,
      loading: setIbgeCitiesLoading,
    }
  }
};

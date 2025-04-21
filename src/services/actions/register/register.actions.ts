import { postRegion, postRegister, getIbgeStates, getIbgeCities } from "./register.requests";

const setLoading = ({ set, loading }: setLoadingProps) => {
  set((state: any) => ({
    ...state,
    register: {
      ...state.register,
      loading,
    }
  }));
}

const setRegister = ({set, status, token = null, countryState = null, city = null}: setRegisterProps) => {
  set((state: any) => ({
    ...state,
    login: {
      ...state.login,
      isAuthenticated: !!token,
      status: status === 'success' ? status : state.login.status,
      token,
    },
    register: {
      ...state.register,
      status,
      countryState,
      city,
    },
  }));
};

const requestRegister = async ({set, username, email, password, countryState, city}: requestRegisterProps) => {
  try {
    setLoading({ set, loading: true });

    const registerData = await postRegister({ username, email, password });
    setRegister({ set, status: 'success', token: registerData.token, countryState, city });

    await postRegion({ username, countryState, city });

    setLoading({ set, loading: false });
  } catch (error) {
    setRegister({ set, status: 'error' });
    console.log('requestRegister', 'Something went wrong', error);

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

const requestIbgeStates = async ({set}: requestIbgeStatesProps) => {
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
    console.log('requestIbgeStates', 'Something went wrong', error);
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

const requestIbgeCities = async ({set, countryStateId}: requestIbgeCitiesProps) => {
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
    console.log('requestIbgeCities', 'Something went wrong', error);
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
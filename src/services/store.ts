import {create} from 'zustand';
import { loginActions } from './actions/login/login.actions';
import { registerActions } from './actions/register/register.actions';
import { StoreState } from './store.types';

const initialState = {
  login: {
    isAuthenticated: false,
    token: null,
    loading: false,
    status: null,
  },
  register: {
    loading: false,
    status: null,
    countryState: null,
    city: null,
    ibge: {
      countryStates: {
        list: [],
        loading: false,
      },
      cities: {
        list: [],
        loading: false,
      },
    }
  }
};

const useStore = create<StoreState>((set) => {
  const requestLogin = ({ username, password }: requestLoginProps) => loginActions.login.request({ set, username, password });
  const logout = () => loginActions.login.logout(set);

  const requestRegister = ({
    username,
    email,
    password,
    countryState,
    city
  }: requestRegisterProps) => registerActions.register.request({ 
    set,
    username,
    email,
    password,
    countryState,
    city
  });

  const requestIbgeStates = () => registerActions.ibge.states.request({ set });
  const requestIbgeCities = (countryStateId: string) => registerActions.ibge.cities.request({ set, countryStateId });

  return {
    ...initialState,
    requestLogin,
    requestRegister,
    requestIbgeStates,
    requestIbgeCities,

    logout,
  }
});

export default useStore;
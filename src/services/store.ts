import {create} from 'zustand';
import { actions } from './actions/login/login.actions';

const initialState = {
  login: {
    isAuthenticated: false,
    token: null,
    loading: false,
  },
};

const useStore = create((set) => ({
  ...initialState,
  requestLogin: (username: string, password: string) => actions.login.request({ set, username, password }),
  logout: () => actions.login.logout(set),
}));

export default useStore;
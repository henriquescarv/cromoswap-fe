import {create} from 'zustand';
import { loginActions } from './actions/login/login.actions';
import { registerActions } from './actions/register/register.actions';
import { summaryActions } from './actions/summary/summary.actions';
import { albumsActions } from './actions/albums/albums.actions';
import { StoreState } from './store.types';

const initialState = {
  invalidToken: false,
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
  },
  summary: {
    loading: false,
    status: null,
    data: null,
  },
  nearbyUsers: {
    loading: false,
    status: null,
    list: [],
  },
  userAlbums: {
    loading: false,
    status: null,
    list: [],
  },
  albumsTemplates: {
    loading: false,
    status: null,
    list: [],
  },
  purchaseAlbum: {
    loading: false,
    status: null,
    albumTemplateId: null,
  },
  albumDetails: {
    loading: false,
    status: null,
    data: null,
  }
};

const useStore = create<StoreState>((set) => {
  const requestLogin = ({ username, password }: requestLoginProps) => loginActions.login.request({ set, username, password });
  const setLogin = ({ token, isAuthenticated }: setLoginProps) => loginActions.login.set({ set, token, isAuthenticated });
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

  const requestSummary = () => summaryActions.request({ set });

  const requestAlbumsTemplates = () => albumsActions.getAlbumsTemplates.request({ set });
  const requestPurchaseAlbum = ({ albumTemplateId }) => albumsActions.purchaseAlbum.request({ set, albumTemplateId });
  const requestUserAlbums = () => albumsActions.userAlbums.request({ set });
  const requestAlbumDetails = ({ userAlbumId }) => albumsActions.albumDetails.request({ set, userAlbumId });

  return {
    ...initialState,
    requestLogin,
    setLogin,

    requestRegister,
    requestIbgeStates,
    requestIbgeCities,

    requestSummary,

    requestAlbumsTemplates,
    requestPurchaseAlbum,
    requestUserAlbums,
    requestAlbumDetails,

    logout,
  }
});

export default useStore;
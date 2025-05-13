import {create} from 'zustand';
import { loginActions } from './actions/login/login.actions';
import { registerActions } from './actions/register/register.actions';
import { summaryActions } from './actions/summary/summary.actions';
import { albumsActions } from './actions/albums/albums.actions';
import { StoreState } from './store.types';
import { StickerToUpdate } from './actions/albums/albums.actions.types';
import { requestLoginProps, setLoginProps } from './actions/login/login.actions.types';
import { requestRegisterProps } from './actions/register/register.actions.types';
import { userActions } from './actions/user/user.actions';

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
  externalUserAlbums: {
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
  },
  usersByRegion: {
    loading: false,
    status: null,
    list: [],
  },
  externalUserProfile: {
    loading: false,
    status: null,
    data: null,
  },
  follows: {
    loading: false,
    status: null,
    list: [],
  },
  followUser: {
    loading: false,
    status: null,
    userId: null,
  },
  unfollowUser: {
    loading: false,
    status: null,
    userId: null,
  },
  notifications: {
    loading: false,
    status: null,
    list: [],
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
  const requestExternalUserAlbums = ({ userId }) => albumsActions.externalUserAlbums.request({ set, userId });
  const requestAlbumDetails = ({ userAlbumId }) => albumsActions.albumDetails.request({ set, userAlbumId });
  const resetAlbumDetails = () => albumsActions.albumDetails.reset({ set });
  const requestUsersByRegion = () => albumsActions.usersByRegion.request({ set });
  const requestExternalUserProfile = ({ userId }) => albumsActions.externalUserProfile.request({ set, userId });
  const requestUpdateStickersQuantity = ({ stickersToUpdate }: { stickersToUpdate: StickerToUpdate[] }) => albumsActions.updateStickersQuantity.request({ set, stickersToUpdate });

  const requestFollows = ({ userId, type }) => userActions.follows.request({ set, userId, type });
  const requestFollowUser = ({ userId, requestFrom }) => userActions.followUser.request({ set, userId, requestFrom });
  const requestUnfollowUser = ({ userId, requestFrom }) => userActions.unfollowUser.request({ set, userId, requestFrom });
  const requestNotifications = () => userActions.notifications.request({ set });

  return {
    ...initialState,
    // login
    requestLogin,
    setLogin,

    // register
    requestRegister,
    requestIbgeStates,
    requestIbgeCities,

    // summary
    requestSummary,

    // albums
    requestAlbumsTemplates,
    requestPurchaseAlbum,
    requestUserAlbums,
    requestExternalUserAlbums,
    requestAlbumDetails,
    resetAlbumDetails,
    requestUsersByRegion,
    requestExternalUserProfile,
    requestUpdateStickersQuantity,

    // users
    requestFollows,
    requestFollowUser,
    requestUnfollowUser,
    requestNotifications,

    logout,
  }
});

export default useStore;
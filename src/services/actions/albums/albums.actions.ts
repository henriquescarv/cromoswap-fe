import AsyncStorage from "@react-native-async-storage/async-storage";
import { commonActions } from "../common/common.actions";
import { requestAlbumDetailsProps, requestAlbumTemplatesProps, requestExternalUserAlbumsProps, requestExternalUserProfileProps, requestPurchaseAlbumProps, requestUpdateStickersQuantityProps, requestUserAlbumsProps, requestUsersByRegionProps, setAlbumDetailsLoadingProps, setAlbumDetailsProps, setAlbumTemplatesLoadingProps, setAlbumTemplatesProps, setExternalUserAlbumsLoadingProps, setExternalUserAlbumsProps, setExternalUserProfileLoadingProps, setExternalUserProfileProps, setPurchaseAlbumLoadingProps, setPurchaseAlbumProps, setUpdateStickersQuantityLoadingProps, setUpdateStickersQuantityProps, setUserAlbumsLoadingProps, setUserAlbumsProps, setUsersByRegionLoadingProps, setUsersByRegionProps } from "./albums.actions.types";
import { getAlbumDetails, getAlbumTemplates, getExternalUserAlbums, getExternalUserProfile, getUserAlbums, getUsersByRegion, postPurchaseAlbum, postStickersQuantity } from "./albums.requests";

const setAlbumsTemplatesLoading = ({ set, loading }: setAlbumTemplatesLoadingProps) => {
  set((state: any) => ({
    ...state,
    albumsTemplates: {
      ...state.albumsTemplates,
      loading,
    }
  }));
};

const setAlbumsTemplates = ({ set, list = null, status = null }: setAlbumTemplatesProps) => {
  set((state: any) => ({
    ...state,
    albumsTemplates: {
      ...state.albumsTemplates,
      loading: false,
      status,
      list,
    },
  }));
};

const requestAlbumsTemplates = async ({ set }: requestAlbumTemplatesProps) => {
  console.log('requestAlbumsTemplates', 'requestAlbumsTemplates');
  try {
    setAlbumsTemplatesLoading({ set, loading: true });

    const data = await getAlbumTemplates();

    setAlbumsTemplates({ set, list: data, status: 'success' });
  } catch (error: any) {
    setAlbumsTemplatesLoading({ set, loading: false });

    if (error.response?.data?.message === 'INVALID_TOKEN') {
      commonActions.setInvalidToken({ set, invalidToken: true });
    }

    setAlbumsTemplates({ set, status: 'error' });
    console.log('requestAlbumsTemplates', 'Something went wrong');
  }
};



const setPurchaseAlbumLoading = ({ set, loading }: setPurchaseAlbumLoadingProps) => {
  set((state: any) => ({
    ...state,
    purchaseAlbum: {
      ...state.purchaseAlbum,
      loading,
    }
  }));
};

const setPurchaseAlbum = ({ set, status = null, albumTemplateId }: setPurchaseAlbumProps) => {
  set((state: any) => ({
    ...state,
    purchaseAlbum: {
      ...state.purchaseAlbum,
      loading: false,
      status,
      albumTemplateId,
    },
  }));
};

const requestPurchaseAlbum = async ({ set, albumTemplateId }: requestPurchaseAlbumProps) => {
  try {
    setPurchaseAlbumLoading({ set, loading: true });

    const data = await postPurchaseAlbum({ albumTemplateId });

    setPurchaseAlbum({ set, status: 'success', albumTemplateId: data.albumTemplateId });
  } catch (error: any) {
    setPurchaseAlbumLoading({ set, loading: false });

    if (error.response?.data?.message === 'INVALID_TOKEN') {
      commonActions.setInvalidToken({ set, invalidToken: true });
    }

    setAlbumsTemplates({ set, status: 'error' });
    console.log('requestPurchaseAlbum', 'Something went wrong');
  }
};



const setUserAlbumsLoading = ({ set, loading }: setUserAlbumsLoadingProps) => {
  set((state: any) => ({
    ...state,
    userAlbums: {
      ...state.userAlbums,
      loading,
    }
  }));
};

const setUserAlbums = ({ set, list = null, status = null }: setUserAlbumsProps) => {
  set((state: any) => ({
    ...state,
    userAlbums: {
      ...state.userAlbums,
      loading: false,
      status,
      list,
    },
  }));
};

const requestUserAlbums = async ({ set }: requestUserAlbumsProps) => {
  try {
    setUserAlbumsLoading({ set, loading: true });

    const data = await getUserAlbums();

    setUserAlbums({ set, list: data, status: 'success' });
  } catch (error: any) {
    setUserAlbumsLoading({ set, loading: false });

    if (error.response?.data?.message === 'INVALID_TOKEN') {
      commonActions.setInvalidToken({ set, invalidToken: true });
    }

    setUserAlbums({ set, status: 'error' });
    console.log('requestUserAlbums', 'Something went wrong');
  }
};



const setExternalUserAlbumsLoading = ({ set, loading }: setExternalUserAlbumsLoadingProps) => {
  set((state: any) => ({
    ...state,
    externalUserAlbums: {
      ...state.externalUserAlbums,
      loading,
    }
  }));
};

const setExternalUserAlbums = ({ set, list = null, status = null }: setExternalUserAlbumsProps) => {
  set((state: any) => ({
    ...state,
    externalUserAlbums: {
      ...state.externalUserAlbums,
      loading: false,
      status,
      list,
    },
  }));
};

const requestExternalUserAlbums = async ({ set, userId }: requestExternalUserAlbumsProps) => {
  try {
    setExternalUserAlbumsLoading({ set, loading: true });

    const data = await getExternalUserAlbums({ userId });

    setExternalUserAlbums({ set, list: data, status: 'success' });
  } catch (error: any) {
    setExternalUserAlbumsLoading({ set, loading: false });

    if (error.response?.data?.message === 'INVALID_TOKEN') {
      commonActions.setInvalidToken({ set, invalidToken: true });
    }

    setExternalUserAlbums({ set, status: 'error' });
    console.log('requestExternalUserAlbums', 'Something went wrong');
  }
};



const setAlbumDetailsLoading = ({ set, loading }: setAlbumDetailsLoadingProps) => {
  set((state: any) => ({
    ...state,
    albumDetails: {
      ...state.albumDetails,
      loading,
    }
  }));
};

const setAlbumDetails = ({ set, data, status }: setAlbumDetailsProps) => {
  set((state: any) => ({
    ...state,
    albumDetails: {
      ...state.albumDetails,
      loading: false,
      status,
      data,
    },
  }));
};

const requestAlbumDetails = async ({ set, userAlbumId, page = 1, maxStickers = 100, ownership, terms }: requestAlbumDetailsProps) => {
  try {
    setAlbumDetailsLoading({ set, loading: true });

    console.log(ownership)

    const data = await getAlbumDetails({ userAlbumId, page, maxStickers, ownership, terms });

    setAlbumDetails({ set, status: 'success', data });
  } catch (error: any) {
    setAlbumDetailsLoading({ set, loading: false });

    if (error.response?.data?.message === 'INVALID_TOKEN') {
      commonActions.setInvalidToken({ set, invalidToken: true });
    }

    setAlbumsTemplates({ set, status: 'error' });
    console.log('requestAlbumDetails', 'Something went wrong');
  }
};

const resetAlbumDetails = ({ set }: { set: any }) => {
  set((state: any) => ({
    ...state,
    albumDetails: {
      // albumDetails.initialState
      loading: false,
      status: null,
      data: null,
    },
  }));
}



const setUsersByRegionLoading = ({ set, loading }: setUsersByRegionLoadingProps) => {
  set((state: any) => ({
    ...state,
    usersByRegion: {
      ...state.usersByRegion,
      loading,
    }
  }));
};

const setUsersByRegion = ({ set, list, status }: setUsersByRegionProps) => {
  set((state: any) => ({
    ...state,
    usersByRegion: {
      ...state.usersByRegion,
      loading: false,
      status,
      list,
    },
  }));
};

const requestUsersByRegion = async ({ set }: requestUsersByRegionProps) => {
  try {
    setUsersByRegionLoading({ set, loading: true });

    const list = await getUsersByRegion();

    setUsersByRegion({ set, status: 'success', list });
  } catch (error: any) {
    setUsersByRegionLoading({ set, loading: false });

    if (error.response?.data?.message === 'INVALID_TOKEN') {
      commonActions.setInvalidToken({ set, invalidToken: true });
    }

    setAlbumsTemplates({ set, status: 'error' });
    console.log('requestUsersByRegion', 'Something went wrong');
  }
};



const setExternalUserProfileLoading = ({ set, loading }: setExternalUserProfileLoadingProps) => {
  set((state: any) => ({
    ...state,
    externalUserProfile: {
      ...state.externalUserProfile,
      loading,
    }
  }));
};

const setExternalUserProfile = ({ set, data, status }: setExternalUserProfileProps) => {
  set((state: any) => ({
    ...state,
    externalUserProfile: {
      ...state.externalUserProfile,
      loading: false,
      status,
      data,
    },
  }));
};

const requestExternalUserProfile = async ({ set, userId }: requestExternalUserProfileProps) => {
  try {
    setExternalUserProfileLoading({ set, loading: true });

    const data = await getExternalUserProfile({ userId });

    setExternalUserProfile({ set, status: 'success', data });
  } catch (error: any) {
    setExternalUserProfileLoading({ set, loading: false });

    if (error.response?.data?.message === 'INVALID_TOKEN') {
      commonActions.setInvalidToken({ set, invalidToken: true });
    }

    setAlbumsTemplates({ set, status: 'error' });
    console.log('requestExternalUserProfile', 'Something went wrong');
  }
};



const setUpdateStickersQuantityLoading = ({ set, loading }: setUpdateStickersQuantityLoadingProps) => {
  set((state: any) => ({
    ...state,
    updateStickersQuantity: {
      ...state.updateStickersQuantity,
      loading,
    }
  }));
};

const setUpdateStickersQuantity = ({ set, status }: setUpdateStickersQuantityProps) => {
  set((state: any) => ({
    ...state,
    updateStickersQuantity: {
      ...state.updateStickersQuantity,
      loading: false,
      status,
    },
  }));
};

const requestUpdateStickersQuantity = async ({ set, stickersToUpdate }: requestUpdateStickersQuantityProps) => {
  console.log('requestUpdateStickersQuantity called with:', stickersToUpdate);
  try {
    setUpdateStickersQuantityLoading({ set, loading: true });

    console.log('Calling postStickersQuantity...');
    await postStickersQuantity({ stickersToUpdate });
    console.log('postStickersQuantity completed successfully');

    await AsyncStorage.removeItem('stickers_to_update_cache');

    setUpdateStickersQuantity({ set, status: 'success' });

    await requestUserAlbums({ set });
    await requestUsersByRegion({ set });
  } catch (error: any) {
    setUpdateStickersQuantityLoading({ set, loading: false });

    if (error.response?.data?.message === 'INVALID_TOKEN') {
      commonActions.setInvalidToken({ set, invalidToken: true });
    }

    setAlbumsTemplates({ set, status: 'error' });
    console.log('requestUpdateStickersQuantity', 'Something went wrong');
  }
};

export const albumsActions = {
  getAlbumsTemplates: {
    request: requestAlbumsTemplates,
  },
  purchaseAlbum: {
    request: requestPurchaseAlbum,
  },
  userAlbums: {
    request: requestUserAlbums,
  },
  externalUserAlbums: {
    request: requestExternalUserAlbums,
  },
  albumDetails: {
    request: requestAlbumDetails,
    reset: resetAlbumDetails,
  },
  usersByRegion: {
    request: requestUsersByRegion,
  },
  updateStickersQuantity: {
    request: requestUpdateStickersQuantity,
  },
  externalUserProfile: {
    request: requestExternalUserProfile,
  },
};
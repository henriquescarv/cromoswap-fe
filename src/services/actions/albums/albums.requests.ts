import { useApi } from "@/services/api/api";
import useStore from "@/services/store";


export const getAlbumTemplates = async () => {
  const state = useStore.getState();
  const api = useApi({ token: state.login.token });

  try {
    const response = await api.get('/template-albums');

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postPurchaseAlbum = async ({ albumTemplateId }) => {
  const state = useStore.getState();
  const api = useApi({ token: state.login.token });

  try {
    const response = await api.post(`/add-album/${albumTemplateId}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserAlbums = async () => {
  const state = useStore.getState();
  const api = useApi({ token: state.login.token });

  try {
    const response = await api.get(`/user-albums`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getExternalUserAlbums = async ({ userId }) => {
  const state = useStore.getState();
  const api = useApi({ token: state.login.token });

  try {
    const response = await api.get(`/external-user-albums/${userId}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAlbumDetails = async ({ userAlbumId }) => {
  const state = useStore.getState();
  const api = useApi({ token: state.login.token });

  try {
    const response = await api.get(`/album-details/${userAlbumId}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsersByRegion = async () => {
  const state = useStore.getState();
  const api = useApi({ token: state.login.token });

  try {
    const response = await api.get(`/users/by-region`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getExternalUserProfile = async ({ userId }) => {
  const state = useStore.getState();
  const api = useApi({ token: state.login.token });

  try {
    const response = await api.get(`/user-profile/${userId}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postStickersQuantity = async ({ stickersToUpdate }) => {
  const state = useStore.getState();
  const api = useApi({ token: state.login.token });

  try {
    const response = await api.post('/user-sticker/batch-update', { stickersToUpdate });

    return response.data;
  } catch (error) {
    throw error;
  }
};
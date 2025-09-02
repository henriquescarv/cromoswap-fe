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

export const getAlbumDetails = async ({ userAlbumId, page = 1, maxStickers = 100, ownership, terms }) => {
  const state = useStore.getState();
  const api = useApi({ token: state.login.token });

  try {
    let url = `/album-details/${userAlbumId}?page=${page}&maxStickers=${maxStickers}`;
    
    if (ownership) {
      url += `&ownership=${ownership}`;
    }
    
    if (terms && terms.trim()) {
      url += `&terms=${encodeURIComponent(terms.trim())}`;
    }

      console.log(ownership)

    const response = await api.get(url);

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
  console.log('postStickersQuantity called with:', stickersToUpdate);
  const state = useStore.getState();
  const api = useApi({ token: state.login.token });

  try {
    console.log('Making API request to /user-sticker/batch-update');
    const response = await api.post('/user-sticker/batch-update', { stickersToUpdate });
    console.log('API response:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error in postStickersQuantity:', error);
    throw error;
  }
};
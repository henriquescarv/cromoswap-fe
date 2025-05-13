import { useApi } from "@/services/api/api";
import useStore from "@/services/store";

export const getMessagesWithUser = async ({ userId }) => {
  const state = useStore.getState();
  const api = useApi({ token: state.login.token });

  try {
    const response = await api.get(`/messages/${userId}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLastMessages = async () => {
  const state = useStore.getState();
  const api = useApi({ token: state.login.token });

  try {
    const response = await api.get('/last-messages');

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUnreadMessagesCount = async () => {
  const state = useStore.getState();
  const api = useApi({ token: state.login.token });

  try {
    const response = await api.get('/unread-messages-count');

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postMessagesMarkAllSeen = async ({ userId }) => {
  const state = useStore.getState();
  const api = useApi({ token: state.login.token });

  try {
    const response = await api.post(`/messages/mark-seen/${userId}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};
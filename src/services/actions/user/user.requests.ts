import { useApi } from "@/services/api/api";
import useStore from "@/services/store";
import { postFollowsProps } from "./user.actions.types";

export const postFollows = async ({ userId, type }: postFollowsProps) => {
  const state = useStore.getState();
  const api = useApi({ token: state.login.token });

  try {
    const response = await api.post(`/follows/${userId}`, { type });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postFollowUser = async ({ userId }: postFollowsProps) => {
  const state = useStore.getState();
  const api = useApi({ token: state.login.token });

  try {
    const response = await api.post(`/follow-user/${userId}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postUnfollowUser = async ({ userId }: postFollowsProps) => {
  const state = useStore.getState();
  const api = useApi({ token: state.login.token });

  try {
    const response = await api.post(`/unfollow-user/${userId}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNotifications = async () => {
  const state = useStore.getState();
  const api = useApi({ token: state.login.token });

  try {
    const response = await api.get(`/notifications`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNotificationsUnreadCount = async () => {
  const state = useStore.getState();
  const api = useApi({ token: state.login.token });

  try {
    const response = await api.get(`/notifications-unread-count`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postNotificationsAsSeen = async ({ notificationId }) => {
  const state = useStore.getState();
  const api = useApi({ token: state.login.token });

  try {
    const response = await api.post(`/notification-seen/${notificationId}`, { seenNewValue: true });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putChangeUserData = async ({ dataToChange, oldValue, newValue }) => {
  const state = useStore.getState();
  const api = useApi({ token: state.login.token });
  try {
    const payload: any = {};

    payload[dataToChange] = newValue;

    if (oldValue) {
      payload['oldValue'] = oldValue;
    }

    const response = await api.put(`/update-profile`, payload);

    return response.data;
  } catch (error) {
    throw error;
  }
};

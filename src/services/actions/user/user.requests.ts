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
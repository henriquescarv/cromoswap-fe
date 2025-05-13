import { commonActions } from "../common/common.actions";
import { requestFollowsProps, requestFollowUserProps, requestNotificationsProps, requestUnfollowUserProps, setFollowsLoadingProps, setFollowsProps, setFollowUserLoadingProps, setFollowUserProps, setNotificationsLoadingProps, setNotificationsProps, setUnfollowUserLoadingProps, setUnfollowUserProps } from "./user.actions.types";
import { getNotifications, postFollows, postFollowUser, postUnfollowUser } from "./user.requests";

const setFollowsLoading = ({ set, loading }: setFollowsLoadingProps) => {
  set((state: any) => ({
    ...state,
    follows: {
      ...state.follows,
      loading,
    }
  }));
};

const setFollows = ({ set, list = null, status = null }: setFollowsProps) => {
  set((state: any) => ({
    ...state,
    follows: {
      ...state.follows,
      loading: false,
      status,
      list,
    },
  }));
};

const requestFollows = async ({ set, userId, type }: requestFollowsProps) => {
  try {
    setFollowsLoading({ set, loading: true });

    const data = await postFollows({ userId, type });

    setFollows({ set, list: data, status: 'success' });
  } catch (error: any) {
    setFollowsLoading({ set, loading: false });

    if (error.response?.data?.message === 'INVALID_TOKEN') {
      commonActions.setInvalidToken({ set, invalidToken: true });
    }

    setFollows({ set, status: 'error' });
    console.log('requestFollows', 'Something went wrong');
  }
};



const setFollowUserLoading = ({ set, loading }: setFollowUserLoadingProps) => {
  set((state: any) => ({
    ...state,
    followUser: {
      ...state.followUser,
      loading,
    }
  }));
}

const setFollowUser = ({ set, userId = null, status = null, requestFrom }: setFollowUserProps) => {
  set((state: any) => {
    let newExternalUserProfile = state.externalUserProfile;

    if (requestFrom === 'UserProfile' && state.externalUserProfile?.data !== null) {
      newExternalUserProfile = {
        ...state.externalUserProfile,
        data: {
          ...state.externalUserProfile.data,
          followers: state.externalUserProfile.data.followers + 1,
          isFollowing: true,
        }
      };
    }

    let newFollows = state.follows;

    if (requestFrom === 'FollowListScreen' && !!state.follows.list.length) {
      newFollows = {
        ...state.follows,
        list: state.follows.list.map((item: any) =>
          item.id === userId ? { ...item, following: true } : item
        ),
      };
    }

    return {
      ...state,
      followUser: {
        ...state.followUser,
        loading: false,
        status,
        userId,
      },
      externalUserProfile: newExternalUserProfile,
      follows: newFollows,
    };
  });
};

const requestFollowUser = async ({ set, userId, requestFrom }: requestFollowUserProps) => {
  try {
    setFollowUserLoading({ set, loading: true });

    await postFollowUser({ userId });

    setFollowUser({ set, userId, status: 'success', requestFrom });
  } catch (error: any) {
    setFollowUserLoading({ set, loading: false });

    if (error.response?.data?.message === 'INVALID_TOKEN') {
      commonActions.setInvalidToken({ set, invalidToken: true });
    }

    setFollowUser({ set, status: 'error' });
    console.log('requestFollowUser', 'Something went wrong');
  }
}



const setUnfollowUserLoading = ({ set, loading }: setUnfollowUserLoadingProps) => {
  set((state: any) => ({
    ...state,
    unfollowUser: {
      ...state.unfollowUser,
      loading,
    }
  }));
}

const setUnfollowUser = ({ set, userId = null, status = null, requestFrom }: setUnfollowUserProps) => {
  set((state: any) => {
    let newExternalUserProfile = state.externalUserProfile;

    if (requestFrom === 'UserProfile' && state.externalUserProfile?.data !== null) {
      newExternalUserProfile = {
        ...state.externalUserProfile,
        data: {
          ...state.externalUserProfile.data,
          followers: state.externalUserProfile.data.followers - 1,
          isFollowing: false,
        }
      };
    }

    let newFollows = state.follows;

    if (requestFrom === 'FollowListScreen' && !!state.follows.list.length) {
      newFollows = {
        ...state.follows,
        list: state.follows.list.map((item: any) =>
          item.id === userId ? { ...item, following: false } : item
        ),
      };
    }

    return {
      ...state,
      unfollowUser: {
        ...state.unfollowUser,
        loading: false,
        status,
        userId,
      },
      externalUserProfile: newExternalUserProfile,
      follows: newFollows,
    };
  });
};

const requestUnfollowUser = async ({ set, userId, requestFrom }: requestUnfollowUserProps) => {
  try {
    setUnfollowUserLoading({ set, loading: true });

    await postUnfollowUser({ userId });

    setUnfollowUser({ set, userId, status: 'success', requestFrom });
  } catch (error: any) {
    setUnfollowUserLoading({ set, loading: false });

    if (error.response?.data?.message === 'INVALID_TOKEN') {
      commonActions.setInvalidToken({ set, invalidToken: true });
    }

    setUnfollowUser({ set, status: 'error' });
    console.log('requestFollowUser', 'Something went wrong');
  }
}



const setNotificationsLoading = ({ set, loading }: setNotificationsLoadingProps) => {
  set((state: any) => ({
    ...state,
    notifications: {
      ...state.notifications,
      loading,
    }
  }));
};

const setNotifications = ({ set, list = null, status = null }: setNotificationsProps) => {
  set((state: any) => ({
    ...state,
    notifications: {
      ...state.notifications,
      loading: false,
      status,
      list,
    },
  }));
};

const requestNotifications = async ({ set }: requestNotificationsProps) => {
  try {
    setNotificationsLoading({ set, loading: true });

    const data = await getNotifications();

    setNotifications({ set, list: data, status: 'success' });
  } catch (error: any) {
    setNotificationsLoading({ set, loading: false });

    if (error.response?.data?.message === 'INVALID_TOKEN') {
      commonActions.setInvalidToken({ set, invalidToken: true });
    }

    setNotifications({ set, status: 'error' });
    console.log('requestNotifications', 'Something went wrong');
  }
};



export const userActions = {
  follows: {
    request: requestFollows,
  },
  followUser: {
    request: requestFollowUser,
  },
  unfollowUser: {
    request: requestUnfollowUser,
  },
  notifications: {
    request: requestNotifications,
  }
};
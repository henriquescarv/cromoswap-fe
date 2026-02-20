import { commonActions } from "../common/common.actions";
import { requestLastMessagesProps, requestMessagesMarkAllSeenProps, requestMessagesWithUserProps, requestUnreadMessagesCountProps, resetUnreadMessagesCountProps, setLastMessagesLoadingProps, setLastMessagesProps, setMessagesMarkAllSeenLoadingProps, setMessagesMarkAllSeenProps, setMessagesWithUserLoadingProps, setMessagesWithUserProps, setUnreadMessagesCountLoadingProps, setUnreadMessagesCountProps } from "./messages.actions.types";
import { getLastMessages, getMessagesWithUser, getUnreadMessagesCount, postMessagesMarkAllSeen } from "./messages.requests";

const setMessagesWithUserLoading = ({ set, loading }: setMessagesWithUserLoadingProps) => {
  set((state: any) => ({
    ...state,
    messages: {
      ...state.messages,
      withUser: {
        ...state.messages.withUser,
        loading,
      }
    }
  }));
};

const setMessagesWithUser = ({ set, data = null, status = null, userId }: setMessagesWithUserProps) => {
  set((state: any) => ({
    ...state,
    messages: {
      ...state.messages,
      withUser: {
        ...state.messages.withUser,
        data,
        status,
        loading: false,
        userId,
      }
    }
  }));
};

const requestMessagesWithUser = async ({ set, userId }: requestMessagesWithUserProps) => {
  try {
    setMessagesWithUserLoading({ set, loading: true });

    const data = await getMessagesWithUser({ userId });

    setMessagesWithUser({ set, data: data, status: 'success', userId });
  } catch (error: any) {
    setMessagesWithUserLoading({ set, loading: false });

    if (error.response?.data?.message === 'INVALID_TOKEN') {
      commonActions.setInvalidToken({ set, invalidToken: true });
    }

    setMessagesWithUser({ set, status: 'error', userId });
  }
};



const setLastMessagesLoading = ({ set, loading }: setLastMessagesLoadingProps) => {
  set((state: any) => ({
    ...state,
    messages: {
      ...state.messages,
      lastMessages: {
        ...state.messages.lastMessages,
        loading,
      }
    }
  }));
};

const setLastMessages = ({ set, list = [], status = null }: setLastMessagesProps) => {
  set((state: any) => ({
    ...state,
    messages: {
      ...state.messages,
      lastMessages: {
        ...state.messages.lastMessages,
        status,
        list,
        loading: false,
      }
    }
  }));
};

const requestLastMessages = async ({ set }: requestLastMessagesProps) => {
  try {
    setLastMessagesLoading({ set, loading: true });

    const data = await getLastMessages();

    setLastMessages({ set, list: data, status: 'success' });
  } catch (error: any) {
    setLastMessagesLoading({ set, loading: false });

    if (error.response?.data?.message === 'INVALID_TOKEN') {
      commonActions.setInvalidToken({ set, invalidToken: true });
    }

    setLastMessages({ set, status: 'error' });
  }
};

const resetLastMessates = ({ set }: requestLastMessagesProps) => {
  set((state: any) => ({
    ...state,
    messages: {
      ...state.messages,
      lastMessages: {
        ...state.messages.lastMessages,
        // lastMessages initial state
        status: null,
        list: [],
        loading: false,
      }
    }
  }));
};



const setUnreadMessagesCountLoading = ({ set, loading }: setUnreadMessagesCountLoadingProps) => {
  set((state: any) => ({
    ...state,
    messages: {
      ...state.messages,
      unreadMessagesCount: {
        ...state.messages.unreadMessagesCount,
        loading,
      }
    }
  }));
};

const setUnreadMessagesCount = ({ set, unreadCount, status = null }: setUnreadMessagesCountProps) => {
  set((state: any) => ({
    ...state,
    messages: {
      ...state.messages,
      unreadMessagesCount: {
        ...state.messages.unreadMessagesCount,
        status,
        unreadCount,
        loading: false,
      }
    }
  }));
};

const requestUnreadMessagesCount = async ({ set }: requestUnreadMessagesCountProps) => {
  try {
    setUnreadMessagesCountLoading({ set, loading: true });

    const data = await getUnreadMessagesCount();

    setUnreadMessagesCount({ set, unreadCount: data?.unreadCount, status: 'success' });
  } catch (error: any) {
    setUnreadMessagesCountLoading({ set, loading: false });

    if (error.response?.data?.message === 'INVALID_TOKEN') {
      commonActions.setInvalidToken({ set, invalidToken: true });
    }

    setUnreadMessagesCount({ set, status: 'error' });
  }
};

const resetUnreadMessagesCount = ({ set }: resetUnreadMessagesCountProps) => {
  set((state: any) => ({
    ...state,
    messages: {
      ...state.messages,
      unreadMessagesCount: {
        ...state.messages.unreadMessagesCount,
        // unreadMessagesCount initial state
        status: null,
        unreadCount: 0,
        loading: false,
      }
    }
  }));
};



const setMessagesMarkAllSeenLoading = ({ set, loading, userId }: setMessagesMarkAllSeenLoadingProps) => {
  set((state: any) => ({
    ...state,
    messages: {
      ...state.messages,
      messagesMarkSeen: {
        ...state.messages.messagesMarkSeen,
        loading,
        userId,
      }
    }
  }));
};

const setMessagesMarkAllSeen = ({ set, status = null, userId }: setMessagesMarkAllSeenProps) => {
  set((state: any) => ({
    ...state,
    messages: {
      ...state.messages,
      messagesMarkSeen: {
        ...state.messages.messagesMarkSeen,
        status,
        loading: false,
        userId,
      }
    }
  }));
};

const requestMessagesMarkAllSeen = async ({ set, userId }: requestMessagesMarkAllSeenProps) => {
  try {
    setMessagesMarkAllSeenLoading({ set, loading: true, userId });

    const data = await postMessagesMarkAllSeen({ userId });

    setMessagesMarkAllSeen({ set, unreadCount: data?.unreadCount, status: 'success', userId });
  } catch (error: any) {
    setMessagesMarkAllSeenLoading({ set, loading: false, userId });

    if (error.response?.data?.message === 'INVALID_TOKEN') {
      commonActions.setInvalidToken({ set, invalidToken: true });
    }

    setMessagesMarkAllSeen({ set, status: 'error', userId });
  }
};



export const messagesActions = {
  getMessagesWithUser: {
    request: requestMessagesWithUser,
    set: setMessagesWithUser,
  },
  lastMessages: {
    request: requestLastMessages,
    reset: resetLastMessates,
  },
  unreadMessagesCount: {
    request: requestUnreadMessagesCount,
    reset: resetUnreadMessagesCount,
  },
  messagesMarkAllSeen: {
    request: requestMessagesMarkAllSeen,
  },
};

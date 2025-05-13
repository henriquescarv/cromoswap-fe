export type setMessagesWithUserLoadingProps = {
  set: any;
  loading: boolean;
}

export type setMessagesWithUserProps = {
  set: any,
  data?: any,
  status?: 'success' | 'error' | null,
  userId?: number | string | null,
}

export type requestMessagesWithUserProps = {
  set: any;
  userId?: number | string | null;
}



export type setLastMessagesLoadingProps = {
  set: any;
  loading: boolean;
}

export type setLastMessagesProps = {
  set: any,
  status?: 'success' | 'error' | null,
  list?: any,
  userId?: number | string | null,
}

export type requestLastMessagesProps = {
  set: any;
}

export type resetLastMessagesProps = {
  set: any;
}



export type setUnreadMessagesCountLoadingProps = {
  set: any;
  loading: boolean;
}

export type setUnreadMessagesCountProps = {
  set: any,
  status?: 'success' | 'error' | null,
  unreadCount?: number | null,
}

export type requestUnreadMessagesCountProps = {
  set: any;
}

export type resetUnreadMessagesCountProps = {
  set: any;
}



export type setMessagesMarkAllSeenLoadingProps = {
  set: any;
  loading: boolean;
  userId?: number | string | null,
}

export type setMessagesMarkAllSeenProps = {
  set: any,
  status?: 'success' | 'error' | null,
  userId?: number | string | null,
  unreadCount?: number | null,
}

export type requestMessagesMarkAllSeenProps = {
  set: any;
  userId?: number | string | null,
}
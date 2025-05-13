export type postFollowsProps = {
  userId: number | string;
  type?: "followers" | "following";
}

export type requestFollowsProps = {
  set: any;
  userId: number | string;
  type: "followers" | "following";
}

export type setFollowsLoadingProps = {
  set: any;
  loading: boolean;
}

export type setFollowsProps = {
  set: any;
  list?: any;
  status?: string | null;
}



export type postFollowUserProps = {
  userId: number | string;
}

export type requestFollowUserProps = {
  set: any;
  userId: number | string;
  requestFrom?: "FollowListScreen" | "UserProfile"
}

export type setFollowUserLoadingProps = {
  set: any;
  loading: boolean;
}

export type setFollowUserProps = {
  set: any;
  userId?: number | string | null;
  status?: string | null;
  requestFrom?: "FollowListScreen" | "UserProfile"
}



export type postUnfollowUserProps = {
  userId: number | string;
}

export type requestUnfollowUserProps = {
  set: any;
  userId: number | string;
  requestFrom?: "FollowListScreen" | "UserProfile"
}

export type setUnfollowUserLoadingProps = {
  set: any;
  loading: boolean;
}

export type setUnfollowUserProps = {
  set: any;
  userId?: number | string | null;
  status?: string | null;
  requestFrom?: "FollowListScreen" | "UserProfile"
}



export type requestNotificationsProps = {
  set: any;
}

export type setNotificationsLoadingProps = {
  set: any;
  loading: boolean;
}

export type setNotificationsProps = {
  set: any;
  userId?: number | string | null;
  status?: string | null;
  list?: any;
}
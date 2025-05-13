export type setLoginProps = {
  set: any;
  token: string | null;
  isAuthenticated: boolean;
  status?: 'success' | 'error' | null;
  invalidToken?: boolean;
}

export type requestLoginProps = {
  set: any;
  username: string;
  password: string;
}

export type setLoadingProps = {
  set: any;
  loading: boolean;
}

export type setLoginStatusProps = {
  set: any;
  status: 'success' | 'error' | null;
}

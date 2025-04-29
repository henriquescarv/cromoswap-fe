type setLoginProps = {
  set: any;
  token: string | null;
  isAuthenticated: boolean;
  status?: 'success' | 'error' | null;
  invalidToken?: boolean;
}

type requestLoginProps = {
  set: any;
  username: string;
  password: string;
}

type setLoadingProps = {
  set: any;
  loading: boolean;
}

type setLoginStatusProps = {
  set: any;
  status: 'success' | 'error' | null;
}

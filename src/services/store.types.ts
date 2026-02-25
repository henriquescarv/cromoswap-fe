interface LoginState {
  token: string | null;
  refreshToken?: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  status: 'success' | 'error' | null;
}

export interface StoreState {
  invalidToken: boolean;
  login: LoginState;

  requestLogin: (params: { username: string; password: string }) => Promise<{ success: boolean; errorType?: string }>;
  setLogin: (params: { token: string | null; refreshToken?: string | null; isAuthenticated: boolean }) => void;
  logout: () => void;
  [key: string]: any;
}

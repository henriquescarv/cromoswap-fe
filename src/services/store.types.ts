interface LoginState {
  token: string | null;
}

export interface StoreState {
  login: LoginState;
}

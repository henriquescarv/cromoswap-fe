export type setRegisterProps = {
  set: any;
  status: 'success' | 'error' | null;
  token?: string | null;
  refreshToken?: string | null;
}

export type requestRegisterProps = {
  set: any;
  username: string;
  email: string;
  password: string;
  latitude: number;
  longitude: number;
}

export type requestIbgeStatesProps = {
  set: any;
}

export type requestIbgeCitiesProps = {
  set: any;
  countryStateId: string;
}


export type getIbgeCitiesProps = {
  set: any;
  countryState: string;
}
export type setRegisterProps = {
  set: any;
  status: 'success' | 'error' | null;
  countryState?: string | null;
  token?: string | null;
  city?: string | null;
}

export type requestRegisterProps = {
  set: any;
  username: string;
  email: string;
  password: string;
  countryState: string,
  city: string;
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
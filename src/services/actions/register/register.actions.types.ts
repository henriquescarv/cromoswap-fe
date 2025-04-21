type setRegisterProps = {
  set: any;
  status: 'success' | 'error' | null;
  countryState?: string | null;
  token?: string | null;
  city?: string | null;
}

type requestRegisterProps = {
  set: any;
  username: string;
  email: string;
  password: string;
  countryState: string,
  city: string;
}

type requestIbgeStatesProps = {
  set: any;
}

type requestIbgeCitiesProps = {
  set: any;
  countryStateId: string;
}


type getIbgeCitiesProps = {
  set: any;
  countryState: string;
}
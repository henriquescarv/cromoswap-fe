export type UserProps = {
  id: number;
  username: string;
  youNeed: number,
  youHave: number,
  countryState?: string;
  city?: string;
  albumsInCommon: string[];
  avatar?: any;
}
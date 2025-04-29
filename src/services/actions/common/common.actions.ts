import { setInvalidTokenProps } from "./common.actions.types";

const setInvalidToken = ({set, invalidToken}: setInvalidTokenProps) => {
  set((state) => ({
    ...state,
    invalidToken,
  }));
}

export const commonActions = {
  setInvalidToken,
};
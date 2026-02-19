import { Dispatch, SetStateAction } from "react";
import { DefaultErrorsProps } from "@/validators/forms/forms.types";

export type BasicInfosStepProps = {
  username: string;
  setUsername: (username: string) => void;
  email: string;
  setEmail: (email: string) => void;
  inputErrors: DefaultErrorsProps;
  setInputErrors: Dispatch<SetStateAction<DefaultErrorsProps>>;
  handleVerifyErrors: () => boolean;
  handleGoToPasswordStep: () => void;
  handleBackToLoginStep: () => void;
  basicInfosButtonIsDisabled: boolean;
};
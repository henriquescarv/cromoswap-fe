import { DefaultRegionErrorsProps } from "@/validators/forms/forms.types";

export type RegionStepProps = {
  statesList: [];
  citiesList: [];
  handleClickRegister: () => void;
  handleVerifyRegionErrors: () => void;
  handleGoToBasicInfosStep: () => void;
  regionButtonIsDisabled?: boolean;
  city: string;
  buttonIsLoading?: boolean;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  countryState: string;
  setCountryState: React.Dispatch<React.SetStateAction<string>>;
  regionErrors: DefaultRegionErrorsProps;
  setRegionErrors: React.Dispatch<React.SetStateAction<DefaultRegionErrorsProps>>;
}
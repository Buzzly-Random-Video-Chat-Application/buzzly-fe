import { IUser } from "../types/user";
import { countries } from "../constants/country";

export const getUserFlag = (user: IUser | null) => {
    return countries.find((country) => country.name === (user?.nationality || ""))?.flag;
  };
  
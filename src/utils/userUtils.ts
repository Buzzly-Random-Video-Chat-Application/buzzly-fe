import { IUser } from "../types/user";
import { countries } from "../constants/country";

export const getUserFlag = (user: IUser | null) => {
  return countries.find((country) => country.name === (user?.nationality || ""))?.flag;
};

export const getUser = (users: IUser[] | undefined, userId: string): IUser | undefined => {
  if (!Array.isArray(users)) {
    return undefined;
  }
  return users.find((user) => user.id === userId);
};
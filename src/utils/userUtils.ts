import { countries } from '@constants/country';

export const getUserFlag = (user: IUser | null) => {
  return `https://flagcdn.com/${countries
    .find((country) => country.value === user?.nationality)
    ?.value.toLowerCase()}.svg`;
};

export const getUserById = (users: IUser[] | undefined, userId: string): IUser | undefined => {
  if (!Array.isArray(users)) {
    return undefined;
  }
  return users.find((user) => user.id === userId);
};

export const getUserByEmail = (users: IUser[] | undefined, email: string): IUser | undefined => {
  if (!Array.isArray(users)) {
    return undefined;
  }
  return users.find((user) => user.email === email);
};

export const getUserCountry = (user: IUser | null) => {
  return countries.find((country) => country.value === user?.nationality)?.label || 'Unknown';
};
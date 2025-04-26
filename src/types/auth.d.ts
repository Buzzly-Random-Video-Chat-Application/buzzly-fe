import { IToken } from "./token";
import { IUser } from "./user";

export interface IAuth {
    user: IUser;
    tokens: IToken;
}
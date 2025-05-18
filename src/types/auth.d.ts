type IAuthResponse = {
    result: IUser;
    tokens: IToken;
}

type IForgotPasswordResponse = {
    message: string;
    token: string;
}
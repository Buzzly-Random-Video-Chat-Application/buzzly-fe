type AccessToken = {
    token: string;
    expires: Date;
}

type RefreshToken = {
    token: string;
    expires: Date;
}

type IToken = {
    access: AccessToken;
    refresh: RefreshToken;
}
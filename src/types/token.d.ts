export interface AccessToken {
    token: string;
    expires: Date;
}

export interface RefreshToken {
    token: string;
    expires: Date;
}

export interface IToken {
    access: AccessToken;
    refresh: RefreshToken;
}
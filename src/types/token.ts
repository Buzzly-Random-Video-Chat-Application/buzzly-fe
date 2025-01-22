export interface AccessToken {
    token: string;
    expires: Date;
}

export interface RefreshToken {
    token: string;
    expires: Date;
}

export interface Token {
    access: AccessToken;
    refresh: RefreshToken;
}
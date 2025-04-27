export interface IUser {
    id: string;
    email: string;
    name: string;
    avatar: string;
    gender: string;
    nationality: string;
    role: string;
    isShowReview: boolean;
    isOnline: boolean;
    isEmailVerified?: boolean;
    hashTags: string[];
    aboutMe: string;
    preferredLanguage: string[];
    location: string;
}

export interface IUserResponse {
    message: string;
    result: IUser;
}

export interface IUserListResponse {
    message: string;
    results: IUser[];
    total: number;
    page: number;
    limit: number;
    totalPage: number;
}

export interface IUserCreate {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface IUserUpdate {
    name?: string;
    gender?: string;
    nationality?: string;
    hashTags?: string[];
    aboutMe?: string;
    preferredLanguage?: string[];
    location?: string;
}

export interface IUserRequest {
    sortBy?: string;
    limit?: number;
    page?: number;
}
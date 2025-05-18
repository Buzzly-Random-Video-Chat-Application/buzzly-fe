type IUser = {
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

type IUserResponse = {
    message: string;
    result: IUser;
}

type IUserListResponse = {
    message: string;
    results: IUser[];
    total: number;
    page: number;
    limit: number;
    totalPage: number;
}

type IUserCreate = {
    name: string;
    email: string;
    password: string;
    role: string;
}

type IUserUpdate = {
    name?: string;
    gender?: string;
    nationality?: string;
    hashTags?: string[];
    aboutMe?: string;
    preferredLanguage?: string[];
    location?: string;
}

type IUserRequest = {
    sortBy?: string;
    limit?: number;
    page?: number;
}
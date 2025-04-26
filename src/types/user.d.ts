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


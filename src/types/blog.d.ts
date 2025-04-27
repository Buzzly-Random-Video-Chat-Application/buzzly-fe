import { IUser } from "./user";

export interface IBlog {
    id: string;
    label: string;
    title: string;
    description: string;
    image: string;
    image_title: string;
    content: {
        intro: string;
        sections: {
            title: string;
            paragraphs: string[];
            listItems: string[];
        }[];
    }[];
    author: IUser;
    isPinned: boolean;
    deleteAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface IBlogResponse {
    message: string;
    result: IBlog;
}

export interface IBlogListResponse {
    results: IBlog[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
}

export interface IBlogRequest {
    sortBy?: string;
    limit?: number;
    page?: number;
}
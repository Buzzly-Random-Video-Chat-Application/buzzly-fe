export interface IReview {
    id?: string;
    userId: string;
    name?: string;
    rating: number;
    review: string;
}

export interface IAppRating {
    rating: number;
    reviewCount: number;
    excellent: number;
    good: number;
    average: number;
    belowAverage: number;
    poor: number;
}

export interface IReviewResponse {
    message: string;
    result: IReview;
}

export interface IReviewListResponse {
    message: string;
    results: IReview[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
}

export interface IReviewRequest {
    sortBy?: string;
    limit?: number;
    page?: number;
}

export interface IReviewUpdate {
    rating: number;
    review: string;
}


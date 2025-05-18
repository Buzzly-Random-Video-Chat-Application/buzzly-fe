type IReview = {
    id?: string;
    userId: string;
    name?: string;
    rating: number;
    review: string;
}

type IAppRating = {
    rating: number;
    reviewCount: number;
    excellent: number;
    good: number;
    average: number;
    belowAverage: number;
    poor: number;
}

type IReviewResponse = {
    message: string;
    result: IReview;
}

type IReviewListResponse = {
    message: string;
    results: IReview[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
}

type IReviewRequest = {
    sortBy?: string;
    limit?: number;
    page?: number;
}

type IReviewUpdate = {
    rating: number;
    review: string;
}


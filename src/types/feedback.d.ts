type IFeedback = {
    id: string;
    name: string;
    email: string;
    title: string;
    message: string;
    isProcessed: boolean;
    createdAt: string;
    updatedAt: string;
}   

type IFeedbackResponse = {
    message: string;
    result: IFeedback;
}

type IFeedbackListResponse = {
    message: string;
    results: IFeedback[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
}

type IFeedbackRequest = {
    name: string;
    email: string;
    title: string;
    message: string;
}

type IFeedbackListRequest = {
    sortBy?: string;
    limit?: number;
    page?: number;
}

type IFeedbackUpdateRequest = {
    feedbackId: string;
    isProcessed: boolean;
}
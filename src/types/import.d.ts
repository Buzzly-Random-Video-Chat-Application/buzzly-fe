type IImport = {
    id: string;
    fileName: string;
    fileUrl: string;
    entryDate: Date;
    author: IUser;
    createdAt: Date;
    updatedAt: Date;
}

type IImportListResponse = {
    results: IImport[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
}

type IImportRequest = {
    sortBy?: string;
    limit?: number;
    page?: number;
}
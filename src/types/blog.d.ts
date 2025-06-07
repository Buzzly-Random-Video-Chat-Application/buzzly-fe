type IBlog = {
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

type IBlogResponse = {
    message: string;
    result: IBlog;
}

type IBlogListResponse = {
    results: IBlog[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
}

type IBlogRequest = {
    sortBy?: string;
    limit?: number;
    page?: number;
}

type IImportBlogsResponse = {
    message: string;
    results: {
        success: boolean;
        error?: string;
        blog?: IBlog;
    }[];
}

type IMainInformationRow = {
    title: string;
    label: string;
    description: string;
    image_url: string;
    image_title: string;
    intro_content: string;
    isPinned: string | boolean;
}

type IContentDetailsRow = {
    blog_title: string;
    section_title: string;
    paragraph: string;
    list_item: string;
}
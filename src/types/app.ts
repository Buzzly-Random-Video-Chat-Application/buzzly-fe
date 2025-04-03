export interface IHeader {
    name: string;
    href: string;
}

export interface IService {
    label: string;
    icon: string;
    href: string;
    type: number;
}

export interface IGuide {
    title: string;
    description: string;
}

export interface IReview {
    name: string;
    rating: number;
    review: string;
}

export interface ICountry {
    name: string;
    code?: string;
    flag?: string;
}

export interface IBlog {
    label: string;
    title: string;
    description: string;
    image: string;
}

export interface IMessage {
    sender: string;
    text: string;
}
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

export interface IMessage {
    sender: string;
    text: string;
}
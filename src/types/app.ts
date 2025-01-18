export interface NavbarProps {
    name: string;
    href: string;
}

export interface ServiceProps {
    label: string;
    icon: string;
    href: string;
    type: number;
}

export interface GuideProps {
    title: string;
    description: string;
}

export interface ReviewProps {
    name: string;
    rating: number;
    review: string;
}

export interface CountryProps {
    name: string;
    code?: string;
    flag?: string;
}

export interface BlogProps {
    label: string;
    title: string;
    description: string;
    image: string;
}
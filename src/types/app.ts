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
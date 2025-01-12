interface NavbarItem {
    name: string;
    href: string;
}

const NavbarItems: NavbarItem[] = [
    { name: 'Video Chat', href: '/video-chat' },
    { name: 'Live', href: '/live' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'About', href: '/about' }
];

export default NavbarItems;
import { icons } from "../assets";
import { NavbarProps, ServiceProps, GuideProps, ReviewProps } from "../types/app";

export const NavbarItems: NavbarProps[] = [
    { name: 'Video Chat', href: '/video-chat' },
    { name: 'Live', href: '/live' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'About', href: '/about' }
];

export const ServiceData: ServiceProps[] = [
    { label: 'Random Video Chat', icon: icons.service1, href: '/video-chat', type: 1 },
    { label: 'Live Streaming', icon: icons.service2, href: '/live', type: 2 },
    { label: 'Safe and Secure Conversations', icon: icons.service3, href: '/', type: 3 },
    { label: 'Multi-Language Support', icon: icons.service4, href: '/', type: 1 },
    { label: 'Gender and Region Filters', icon: icons.service5, href: '/', type: 2 },
    { label: 'Text Chat Option', icon: icons.service6, href: '/', type: 3 }
]

export const GuideCardData: GuideProps[] = [
    { title: "Sign Up or Log In", description: "To get started, you'll need to create an account or log in to our platform. This allows you to easily connect and join random video chat sessions with others." },
    { title: "Set Up and Test Your Equipment", description: "Before you start your video chat, make sure your camera and microphone are set up correctly. We provide a tool to test your devices and ensure the call quality is optimal." },
    { title: "Choose the Random Chat Mode", description: "After logging in and testing your equipment, select the random chat mode. You will be connected with another user, and your chat will begin instantly." },
    { title: "Start the Conversation", description: "Once the chat is connected, feel free to engage with the other person. You can turn your camera and microphone on/off at any time during the conversation." },
    { title: "End the Chat and Reconnect", description: "When you’re ready to end the conversation, simply click the “End Chat” button. You can return and start a new conversation with someone else at any time." },
    { title: "Enjoy and Explore", description: "Enjoy new experiences and meet new people through random video chats!" }
]

export const ReviewData: ReviewProps[] = [
    { name: 'John Doe', rating: 5, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { name: 'Jane Smith', rating: 4.5, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { name: 'Alice Johnson', rating: 5, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { name: 'Bob Brown', rating: 4, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { name: 'Maria Garcia', rating: 4.5, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { name: 'David Martinez', rating: 5, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
]
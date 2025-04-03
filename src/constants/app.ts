import { icons, images } from "../assets";
import { IHeader, IService, IGuide, IReview, IBlog } from "../types/app";

export const Headers: IHeader[] = [
    { name: 'Video Chat', href: '/video-chat' },
    { name: 'Live', href: '/live' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'About', href: '/about' }
];

export const Services: IService[] = [
    { label: 'Random Video Chat', icon: icons.service1, href: '/video-chat', type: 1 },
    { label: 'Live Streaming', icon: icons.service2, href: '/live', type: 2 },
    { label: 'Safe and Secure Conversations', icon: icons.service3, href: '/', type: 3 },
    { label: 'Multi-Language Support', icon: icons.service4, href: '/', type: 1 },
    { label: 'Gender and Region Filters', icon: icons.service5, href: '/', type: 2 },
    { label: 'Text Chat Option', icon: icons.service6, href: '/', type: 3 }
]

export const Guides: IGuide[] = [
    { title: "Sign Up or Log In", description: "To get started, you'll need to create an account or log in to our platform. This allows you to easily connect and join random video chat sessions with others." },
    { title: "Set Up and Test Your Equipment", description: "Before you start your video chat, make sure your camera and microphone are set up correctly. We provide a tool to test your devices and ensure the call quality is optimal." },
    { title: "Choose the Random Chat Mode", description: "After logging in and testing your equipment, select the random chat mode. You will be connected with another user, and your chat will begin instantly." },
    { title: "Start the Conversation", description: "Once the chat is connected, feel free to engage with the other person. You can turn your camera and microphone on/off at any time during the conversation." },
    { title: "End the Chat and Reconnect", description: "When you’re ready to end the conversation, simply click the “End Chat” button. You can return and start a new conversation with someone else at any time." },
    { title: "Enjoy and Explore", description: "Enjoy new experiences and meet new people through random video chats!" }
]

export const Reviews: IReview[] = [
    { name: 'John Doe', rating: 5, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { name: 'Jane Smith', rating: 4.5, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { name: 'Alice Johnson', rating: 5, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { name: 'Bob Brown', rating: 4, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { name: 'Maria Garcia', rating: 4.5, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { name: 'David Martinez', rating: 5, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
]

export const Blogs: IBlog[] = [
    { label: 'Making Friends', title: 'Online Chat, Live Conversations: How To Find the Best Platforms', description: 'Explore live chat and start creating online connections with Azar Live. Learn more here!Online live chat platforms are gaining traction fast. They allow us to meet people worldwide, making social connections all the more accessible. Azar is a leader in the online live chat space, setting itself apart from many similar platforms by encouraging healthy, positive, platonic relationships. Let\'s explore the benefits of forming digital friendships and highlight features to check for in a video chat platform.', image: images.blog },
    { label: 'Making Friends', title: 'Online Friendships: How to Make Friends Online', description: 'Making friends online is a great way to connect with people from all over the world. With Azar Live, you can easily make new friends and build lasting relationships. Learn more about the benefits of online friendships and how to get started today!', image: images.blog },
    { label: 'Safety', title: "Tips for Safe Online Chatting: How to Stay Secure", description: 'Online chatting is a fun way to meet new people and make friends. However, it\'s important to stay safe while chatting online. With Azar Live, you can enjoy secure online chatting and make connections with confidence. Here are some tips to help you stay safe while chatting online.', image: images.blog },
    { label: 'Conversation Topics', title: 'Interesting Conversation Topics for Online Chatting', description: 'Starting a conversation with someone new can be intimidating, but it doesn\'t have to be! With Azar Live, you can easily find interesting conversation topics to keep the chat flowing. Whether you\'re looking to make new friends or connect with someone special, these conversation topics are sure to spark interesting discussions.', image: images.blog },
    { label: 'Safety', title: 'How To Approach Red Flags In A Person Online', description: 'When chatting with someone online, it\'s important to be aware of red flags that may indicate potential issues. With Azar Live, you can enjoy safe and secure online chatting while being mindful of red flags. Here are some tips on how to approach red flags in a person online and protect yourself while chatting.', image: images.blog },
]
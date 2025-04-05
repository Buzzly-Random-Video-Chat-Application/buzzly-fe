import { icons, images } from "../assets";
import { IHeader, IService, IGuide, IReview, IBlog } from "../types/app";

export const headers: IHeader[] = [
    { name: 'Video Chat', href: '/video-chat' },
    { name: 'Live', href: '/live' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'About', href: '/about' }
];

export const services: IService[] = [
    { label: 'Random Video Chat', icon: icons.service1, href: '/video-chat', type: 1 },
    { label: 'Live Streaming', icon: icons.service2, href: '/live', type: 2 },
    { label: 'Safe and Secure Conversations', icon: icons.service3, href: '/', type: 3 },
    { label: 'Multi-Language Support', icon: icons.service4, href: '/', type: 1 },
    { label: 'Gender and Region Filters', icon: icons.service5, href: '/', type: 2 },
    { label: 'Text Chat Option', icon: icons.service6, href: '/', type: 3 }
]

export const guides: IGuide[] = [
    { title: "Sign Up or Log In", description: "To get started, you'll need to create an account or log in to our platform. This allows you to easily connect and join random video chat sessions with others." },
    { title: "Set Up and Test Your Equipment", description: "Before you start your video chat, make sure your camera and microphone are set up correctly. We provide a tool to test your devices and ensure the call quality is optimal." },
    { title: "Choose the Random Chat Mode", description: "After logging in and testing your equipment, select the random chat mode. You will be connected with another user, and your chat will begin instantly." },
    { title: "Start the Conversation", description: "Once the chat is connected, feel free to engage with the other person. You can turn your camera and microphone on/off at any time during the conversation." },
    { title: "End the Chat and Reconnect", description: "When you’re ready to end the conversation, simply click the “End Chat” button. You can return and start a new conversation with someone else at any time." },
    { title: "Enjoy and Explore", description: "Enjoy new experiences and meet new people through random video chats!" }
]

export const reviews: IReview[] = [
    { name: 'John Doe', rating: 5, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { name: 'Jane Smith', rating: 4.5, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { name: 'Alice Johnson', rating: 5, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { name: 'Bob Brown', rating: 4, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { name: 'Maria Garcia', rating: 4.5, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { name: 'David Martinez', rating: 5, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
]

export const blogs: IBlog[] = [
    {
        label: "Making Friends",
        title: "Making Friends 2025: An Introvert’s Guide To Making New Friends as an Adult",
        description: "Engaging in social interactions to make new friends can feel daunting, so we’ve put together the top tips for forging new friendships as an introvert.",
        image: images.blog1,
        date: "September 20, 2025",
    },
    {
        label: "Making Friends",
        title: "Building Lasting Friendships: Tips for Deep Connections in 2025",
        description: "Discover how to create meaningful friendships that last a lifetime with these practical tips tailored for 2025.",
        image: images.blog2,
        date: "September 20, 2025",
    },
    {
        label: "Making Friends",
        title: "How to Make Friends Online: A 2025 Guide for Digital Connections",
        description: "Learn the best strategies for making friends online in 2025, from video chats to social platforms.",
        image: images.blog3,
        date: "September 20, 2025",
    },
    // Chủ đề: Safety
    {
        label: "Safety",
        title: "Staying Safe While Making Friends Online in 2025",
        description: "Explore essential safety tips to protect yourself while building new friendships online in 2025.",
        image: images.blog4,
        date: "September 20, 2025",
    },
    {
        label: "Safety",
        title: "2025 Guide to Safe Social Interactions: Protecting Your Privacy",
        description: "Understand how to safeguard your personal information during social interactions in 2025.",
        image: images.blog5,
        date: "September 20, 2025",
    },
    {
        label: "Safety",
        title: "Safety First: How to Spot Red Flags in New Friendships in 2025",
        description: "Learn to identify warning signs and protect yourself when forming new friendships in 2025.",
        image: images.blog6,
        date: "September 20, 2025",
    },
    // Chủ đề: Conversation Topics
    {
        label: "Conversation Topics",
        title: "Top Conversation Starters for 2025: Break the Ice with Ease",
        description: "Find the best conversation topics to start meaningful discussions and make new friends in 2025.",
        image: images.blog7,
        date: "September 20, 2025",
    },
    {
        label: "Conversation Topics",
        title: "2025 Guide to Deep Conversations: Topics That Build Strong Bonds",
        description: "Discover conversation topics that foster deeper connections and help you build lasting friendships in 2025.",
        image: images.blog8,
        date: "September 20, 2025",
    },
    {
        label: "Conversation Topics",
        title: "Fun and Engaging Topics for Video Chats in 2025",
        description: "Keep your video chats lively with these fun and engaging conversation topics for 2025.",
        image: images.blog9,
        date: "September 20, 2025",
    },
];

export const content1 = {
    intro: "Making friends is tough. Period. And, if your idea of a fun Friday night is curled up with a book and a weighted blanket, going to loud social events is probably about as much fun as more outgoing people would have at a silent retreat. Building lasting friendships is about connecting with people who actually get you. If you’re ready to expand your social circle, here are some tips to make friends as an introvert.",
    sections: [
        {
            title: "How Do I Know If I’m An Introvert?",
            paragraphs: [
                "First, let’s define what an introvert is. It’s important to recognize that there isn’t a “set” definition of the term. Humans are complex, and introversion can manifest differently in everyone. That said, introverts tend to share some common traits.",
            ],
            listItems: [
                "<strong>You’re a pre-planner listener:</strong> While others are busy talking, you’re listening and processing. You prefer to think before you speak, and you’re often the one who notices the details.",
                "<strong>Approve Overwhelm:</strong> You know your social limit, and when you hit it, you’re done. You need time to recharge after social interactions.",
                "<strong>You recharge alone:</strong> After a day of socializing, you might feel more tired than energized. So, alone time is never “lonely”; it’s pure bliss.",
                "<strong>You’re independent:</strong> You don’t need constant validation to feel good. You’re comfortable doing things on your own and don’t need a group to feel secure.",
                "<strong>You keep your circle small (and solid):</strong> You prefer deep connections with a few people over shallow ones with many. Anything from an exit strategy to a good friend to spend time with makes the social event more manageable.",
            ],
        },
        {
            title: "How Introverts Differ From Extroverts in Social Situations",
            paragraphs: [
                "While introverts and extroverts both enjoy socializing, they experience social interactions differently. An introvert might seek deep conversations, whereas extroverts blossom in more energetic, spontaneous environments.",
            ],
            listItems: [
                "<strong>Energy levels:</strong> Introverts recharge solo. For extroverts, people are the power bank. A big event may leave an introvert feeling drained, whereas an extrovert might feel invigorated.",
                "<strong>Preferred conversations:</strong> Introverts thrive on deep, more focused discussions. On the other hand, extroverts are comfortable bouncing between multiple conversations.",
                "<strong>Processing thoughts:</strong> Introverts tend to take time to consider their words carefully. Extroverts may process thoughts out loud, speaking spontaneously.",
                "<strong>Comfort zones:</strong> Introverts prefer smaller, more intimate settings with familiar faces where they can feel comfortable and close friends.",
            ],
        },
        {
            title: "Aim For Quality Over Quantity",
            paragraphs: [
                "Having more friends doesn’t necessarily equate to great happiness. Rather than chasing a huge network of friends, focus on building a few good ones that spark joy and understanding. Introverts don’t need to spread their energy thin in maintaining surface-level relationships; instead, focus on bonds that feel authentic and easy.",
            ],
        },
    ],
};

export const content2 = {
    intro: "Friendships are more than just casual interactions—they’re about creating deep, meaningful connections that stand the test of time. In 2025, with the rise of digital communication, building lasting friendships requires a blend of authenticity and intentionality. Here’s how you can foster deep connections.",
    sections: [
        {
            title: "Be Authentic in Your Interactions",
            paragraphs: [
                "Authenticity is the foundation of any lasting friendship. People are drawn to those who are genuine and true to themselves. In 2025, where social media often portrays curated lives, being real can set you apart.",
            ],
            listItems: [
                "<strong>Share your true self:</strong> Don’t be afraid to show your quirks and vulnerabilities. Authenticity fosters trust.",
                "<strong>Listen actively:</strong> Show genuine interest in what others have to say. Ask thoughtful questions and avoid interrupting.",
                "<strong>Be consistent:</strong> Follow through on promises and show up when you say you will. Reliability builds trust over time.",
            ],
        },
        {
            title: "Leverage Technology for Connection",
            paragraphs: [
                "In 2025, technology offers countless ways to connect with others. From video chats to virtual events, you can build friendships without leaving your comfort zone.",
            ],
            listItems: [
                "<strong>Join online communities:</strong> Find groups that share your interests, whether it’s gaming, books, or cooking.",
                "<strong>Use video chats:</strong> Platforms like Buzzly make it easy to have face-to-face conversations with new people.",
                "<strong>Stay in touch:</strong> Use messaging apps to check in regularly and maintain your connections.",
            ],
        },
        {
            title: "Invest Time in Your Friendships",
            paragraphs: [
                "Lasting friendships require effort and time. In 2025, with busy schedules and digital distractions, it’s more important than ever to prioritize your relationships.",
                "Make time for regular catch-ups, whether in person or online. Small gestures, like sending a thoughtful message, can go a long way in strengthening your bond.",
            ],
        },
    ],
};

export const content3 = {
    intro: "The digital age has transformed how we make friends, and in 2025, online platforms offer endless opportunities to connect with people worldwide. Whether you’re an introvert or extrovert, making friends online can be a rewarding experience. Here’s how to do it effectively.",
    sections: [
        {
            title: "Choose the Right Platform",
            paragraphs: [
                "Not all online platforms are created equal. In 2025, there are countless apps and websites designed for making friends, but choosing the right one is key.",
            ],
            listItems: [
                "<strong>Video chat apps:</strong> Platforms like Buzzly allow you to have face-to-face conversations with strangers in a safe environment.",
                "<strong>Social media groups:</strong> Join groups on platforms like Facebook or Reddit that align with your interests.",
                "<strong>Gaming communities:</strong> If you’re a gamer, platforms like Discord are great for meeting like-minded people.",
            ],
        },
        {
            title: "Craft a Genuine Profile",
            paragraphs: [
                "Your online profile is your first impression. In 2025, people value authenticity, so make sure your profile reflects who you are.",
            ],
            listItems: [
                "<strong>Use a real photo:</strong> A clear, friendly photo helps others feel comfortable connecting with you.",
                "<strong>Share your interests:</strong> Highlight your hobbies and passions to attract people with similar interests.",
                "<strong>Be honest:</strong> Don’t pretend to be someone you’re not. Authenticity leads to better connections.",
            ],
        },
        {
            title: "Start Conversations with Confidence",
            paragraphs: [
                "Initiating a conversation online can feel daunting, but in 2025, there are plenty of tools to help you break the ice.",
                "Start with a simple greeting or a question about a shared interest. For example, if you’re on a video chat, you might say, “Hi, I see you’re into hiking—what’s your favorite trail?”",
            ],
        },
    ],
};

export const content4 = {
    intro: "Making friends online in 2025 is easier than ever, but it’s important to prioritize your safety. With the rise of digital platforms, there are risks to be aware of. Here are some essential tips to stay safe while building new friendships online.",
    sections: [
        {
            title: "Protect Your Personal Information",
            paragraphs: [
                "When making friends online, it’s easy to get caught up in the excitement and share too much. However, protecting your personal information is crucial.",
            ],
            listItems: [
                "<strong>Don’t share sensitive details:</strong> Avoid sharing your address, financial information, or other sensitive data.",
                "<strong>Use a nickname:</strong> On platforms like Buzzly, you can use a nickname instead of your real name for added privacy.",
                "<strong>Be cautious with photos:</strong> Avoid sharing photos that reveal your location or personal details.",
            ],
        },
        {
            title: "Choose Secure Platforms",
            paragraphs: [
                "Not all online platforms are safe. In 2025, it’s important to choose platforms that prioritize user safety and privacy.",
            ],
            listItems: [
                "<strong>Look for encryption:</strong> Ensure the platform uses end-to-end encryption for video chats and messages.",
                "<strong>Read reviews:</strong> Check user reviews to see if the platform has a good reputation for safety.",
                "<strong>Use trusted apps:</strong> Stick to well-known apps like Buzzly that have robust safety features.",
            ],
        },
        {
            title: "Trust Your Instincts",
            paragraphs: [
                "Your instincts are a powerful tool for staying safe. If something feels off about a new friend, don’t ignore it.",
                "If someone makes you uncomfortable or pressures you to share information, end the conversation and report them to the platform. Your safety always comes first.",
            ],
        },
    ],
};

export const content5 = {
    intro: "Social interactions in 2025 often happen online, whether through video chats, social media, or messaging apps. While these platforms make it easy to connect, they also pose risks to your privacy. Here’s how to protect yourself during social interactions.",
    sections: [
        {
            title: "Understand Privacy Settings",
            paragraphs: [
                "Most platforms in 2025 offer privacy settings that allow you to control who can see your information. Understanding and using these settings is key to staying safe.",
            ],
            listItems: [
                "<strong>Limit visibility:</strong> Set your profile to private so only approved friends can see your posts.",
                "<strong>Control contact access:</strong> On video chat apps like Buzzly, choose who can contact you.",
                "<strong>Review permissions:</strong> Check what data the app can access, such as your location or contacts.",
            ],
        },
        {
            title: "Be Mindful of What You Share",
            paragraphs: [
                "Even in casual conversations, it’s easy to accidentally share information that could compromise your privacy.",
            ],
            listItems: [
                "<strong>Avoid oversharing:</strong> Don’t share details like your daily routine or workplace.",
                "<strong>Be cautious with links:</strong> Don’t click on links from people you don’t trust—they could lead to phishing sites.",
                "<strong>Use secure connections:</strong> Avoid using public Wi-Fi for sensitive conversations.",
            ],
        },
        {
            title: "Monitor Your Digital Footprint",
            paragraphs: [
                "Your digital footprint is the trail of data you leave online. In 2025, it’s more important than ever to monitor and manage this footprint.",
                "Regularly search for your name online to see what information is publicly available. If you find something you don’t want shared, take steps to remove it.",
            ],
        },
    ],
};

export const content6 = {
    intro: "Forming new friendships in 2025 can be exciting, but it’s important to stay vigilant. Not everyone you meet online has good intentions. Here’s how to spot red flags and protect yourself when making new friends.",
    sections: [
        {
            title: "Recognize Suspicious Behavior",
            paragraphs: [
                "Certain behaviors can indicate that a new friend might not have your best interests at heart. Being aware of these red flags can help you stay safe.",
            ],
            listItems: [
                "<strong>Too much too soon:</strong> If someone asks for personal information early on, like your address or financial details, be cautious.",
                "<strong>Inconsistent stories:</strong> If their stories don’t add up or they frequently change details, they might be hiding something.",
                "<strong>Pressure to meet:</strong> If they push you to meet in person before you’re ready, it’s a red flag.",
            ],
        },
        {
            title: "Watch for Emotional Manipulation",
            paragraphs: [
                "Some people use emotional manipulation to gain your trust. In 2025, with more interactions happening online, this can be harder to spot.",
            ],
            listItems: [
                "<strong>Guilt-tripping:</strong> If they make you feel guilty for not sharing information or meeting up, they might be manipulative.",
                "<strong>Overly flattering:</strong> Excessive compliments early on can be a tactic to lower your guard.",
                "<strong>Gaslighting:</strong> If they make you doubt your feelings or perceptions, it’s a sign of manipulation.",
            ],
        },
        {
            title: "Take Action When Needed",
            paragraphs: [
                "If you spot a red flag, don’t ignore it. Taking action can protect you from potential harm.",
                "End the conversation if you feel uncomfortable, and report the user to the platform. On apps like Buzzly, you can block users who make you feel unsafe.",
            ],
        },
    ],
};

export const content7 = {
    intro: "Starting a conversation can be intimidating, especially when meeting new people. In 2025, with more interactions happening online, having a few go-to conversation starters can make all the difference. Here are some top topics to break the ice.",
    sections: [
        {
            title: "Ask About Their Interests",
            paragraphs: [
                "One of the easiest ways to start a conversation is by asking about someone’s interests. In 2025, people love talking about their hobbies and passions.",
            ],
            listItems: [
                "<strong>Favorite hobbies:</strong> “What do you love doing in your free time?”",
                "<strong>Recent activities:</strong> “Have you tried any new activities lately?”",
                "<strong>Shared interests:</strong> “I see you’re into photography—what kind do you do?”",
            ],
        },
        {
            title: "Talk About Pop Culture",
            paragraphs: [
                "Pop culture is a universal topic that can spark lively conversations. In 2025, there are plenty of new trends to discuss.",
            ],
            listItems: [
                "<strong>Movies and TV shows:</strong> “Have you watched the latest sci-fi series on Netflix?”",
                "<strong>Music:</strong> “What’s the last song you listened to?”",
                "<strong>Trends:</strong> “Have you tried any of the new AR games that came out this year?”",
            ],
        },
        {
            title: "Share a Fun Fact",
            paragraphs: [
                "Sharing a fun fact can be a great way to get the conversation going. It’s lighthearted and can lead to interesting discussions.",
                "For example, you might say, “Did you know that in 2025, virtual reality concerts are more popular than live ones?” Then ask, “What do you think about that?”",
            ],
        },
    ],
};

export const content8 = {
    intro: "Deep conversations are the foundation of strong friendships. In 2025, with more people connecting online, knowing how to dive into meaningful topics can help you build lasting bonds. Here are some ideas to get started.",
    sections: [
        {
            title: "Explore Their Values and Beliefs",
            paragraphs: [
                "Talking about values and beliefs can lead to deeper understanding and connection. In 2025, people are more open to discussing these topics online.",
            ],
            listItems: [
                "<strong>Life goals:</strong> “What’s something you’ve always wanted to achieve?”",
                "<strong>Core values:</strong> “What’s the most important value you live by?”",
                "<strong>Beliefs about the future:</strong> “What do you think the world will be like in 10 years?”",
            ],
        },
        {
            title: "Discuss Personal Growth",
            paragraphs: [
                "Personal growth is a topic that resonates with many people in 2025, as self-improvement continues to be a popular focus.",
            ],
            listItems: [
                "<strong>Lessons learned:</strong> “What’s the biggest lesson you’ve learned in the past year?”",
                "<strong>Challenges overcome:</strong> “What’s a challenge you’ve faced and how did you overcome it?”",
                "<strong>Future aspirations:</strong> “What’s one thing you’d like to improve about yourself?”",
            ],
        },
        {
            title: "Share Meaningful Experiences",
            paragraphs: [
                "Sharing experiences can create a sense of closeness. In 2025, with more virtual interactions, these conversations can happen over video chats.",
                "For example, you might say, “One of my favorite memories is traveling to Japan in 2023—what’s a memory that means a lot to you?”",
            ],
        },
    ],
};

export const content9 = {
    intro: "Video chats are a popular way to connect in 2025, and keeping the conversation fun and engaging is key to making new friends. Here are some topics that can make your video chats lively and enjoyable.",
    sections: [
        {
            title: "Play a Virtual Game",
            paragraphs: [
                "Incorporating a game into your video chat can make the conversation more interactive. In 2025, there are plenty of virtual games to choose from.",
            ],
            listItems: [
                "<strong>Trivia questions:</strong> “Let’s play a quick trivia game—what’s the capital of France?”",
                "<strong>Would you rather:</strong> “Would you rather travel to the past or the future?”",
                "<strong>Guess the object:</strong> “I’m thinking of something in my room—can you guess what it is?”",
            ],
        },
        {
            title: "Talk About Future Plans",
            paragraphs: [
                "Discussing future plans can be a fun way to keep the conversation light and engaging.",
            ],
            listItems: [
                "<strong>Weekend plans:</strong> “What are you up to this weekend?”",
                "<strong>Dream vacation:</strong> “If you could travel anywhere in 2025, where would you go?”",
                "<strong>Bucket list:</strong> “What’s one thing on your bucket list for this year?”",
            ],
        },
        {
            title: "Share Funny Stories",
            paragraphs: [
                "Laughter is a great way to bond. Sharing funny stories can make your video chat more enjoyable.",
                "For example, you might say, “The funniest thing happened to me last week—I accidentally joined a video call with my camera off and didn’t realize for 10 minutes! What’s a funny story you have?”",
            ],
        },
    ],
};

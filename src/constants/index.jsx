import {
  DeviceArrowIcon,
  DeviceCardsIcon,
  DeviceClockIcon,
  DeviceListIcon,
  DeviceLockIcon,
  DeviceChartIcon,
} from "@/components/homeLayout/StockLogos";

import templateImage from '@/images/template.png';


export const navData = [
  {
    _id: 101,
    title: "Home",
    href: "/",
  },
  {
    _id: 102,
    title: "Components",
    href: "/component",
  },
  {
    _id: 103,
    title: "Templates",
    href: "/templates",
  },
  {
    _id: 104,
    title: "Animations",
    href: "/animations",
  },
];

export const accountData = [
  {
    name: "Frontend Animation Library",
    description:
      "Explore a comprehensive frontend animation library designed to simplify the process of adding interactive animations to your web projects.",
    icon: DeviceArrowIcon,
  },
  {
    name: "Customizable Web Components",
    description:
      "Enhance the interactivity and aesthetics of your websites with a wide range of customizable web components and UI elements.",
    icon: DeviceCardsIcon,
  },
  {
    name: "Real-Time Collaboration Tools",
    description:
      "Collaborate seamlessly with fellow developers in real-time, facilitating the integration of animations and effects into your web applications.",
    icon: DeviceClockIcon,
  },
  {
    name: "Engage with a Vibrant Developer Community",
    description:
      "Join a thriving developer community where you can exchange ideas, share advanced animation techniques, and collaborate on cutting-edge web projects.",
    icon: DeviceListIcon,
  },
  {
    name: "Prioritize Security in Web Development",
    description:
      "Adopt a security-first approach with our web development resources to ensure the protection of your animations and frontend assets.",
    icon: DeviceLockIcon,
  },
  {
    name: "Optimize Performance with Analytics",
    description:
      "Analyze the performance of your animations using detailed tracking and optimization tools, enabling you to create lightning-fast web experiences.",
    icon: DeviceChartIcon,
  },
];

export const reviews = [
  {
    title: "It really works.",
    body: "I downloaded Investa today and turned $5000 into $25,000 in half an hour.",
    author: "CrazyInvestor",
    rating: 5,
  },
  {
    title: "You need this app.",
    body: "I did not understand the stock market at all before Investa. I still do not, but at least I am rich now.",
    author: "CluelessButRich",
    rating: 5,
  },
  {
    title: "This should not be legal.",
    body: "Investa makes it so easy to win big in the stock market that I can not believe it is actually legal.",
    author: "LivingDaDream",
    rating: 4,
  },
  {
    title: "Screw financial advisors.",
    body: "I barely made any money investing in mutual funds. With Investa, I am doubling my net-worth every single month.",
    author: "JordanBelfort1962",
    rating: 5,
  },
  {
    title: "I love it!",
    body: "I started providing insider information myself and now I get new insider tips every 5 minutes. I do not even have time to act on all of them. New Lamborghini is being delivered next week!",
    author: "MrBurns",
    rating: 3,
  },
  {
    title: "Too good to be true.",
    body: "I was making money so fast with Investa that it felt like a scam. But I sold my shares and withdrew the money and it is really there, right in my bank account. This app is crazy!",
    author: "LazyRich99",
    rating: 2,
  },
  {
    title: "Wish I could give 6 stars",
    body: "This is literally the most important app you will ever download in your life. Get on this before it is so popular that everyone else is getting these tips too.",
    author: "SarahLuvzCash",
    rating: 5,
  },
  {
    title: "Bought an island.",
    body: "Yeah, you read that right. Want your own island too? Get Investa.",
    author: "ScroogeMcduck",
    rating: 5,
  },
  {
    title: "No more debt!",
    body: "After 2 weeks of trading on Investa I was debt-free. Why did I even go to school at all when Investa exists?",
    author: "BruceWayne",
    rating: 1,
  },
  {
    title: "I am 13 and I am rich.",
    body: "I love that with Investa transaction anonymization I could sign up and start trading when I was 12 years old. I had a million dollars before I had armpit hair!",
    author: "RichieRich",
    rating: 5,
  },
  {
    title: "Started an investment firm.",
    body: "I charge clients a 3% management fee and just throw all their investments into Investa. Easy money!",
    author: "TheCountOfMonteChristo",
    rating: 5,
  },
  {
    title: "It is like a superpower.",
    body: "Every tip Investa has sent me has paid off. It is like playing Blackjack but knowing exactly what card is coming next!",
    author: "ClarkKent",
    rating: 4,
  },
  {
    title: "Quit my job.",
    body: "I downloaded Investa three days ago and quit my job today. I can not believe no one else thought to build a stock trading app that works this way!",
    author: "GeorgeCostanza",
    rating: 5,
  },
  {
    title: "Do not download this app",
    body: "Unless you want to have the best life ever! I am literally writing this from a yacht.",
    author: "JeffBezos",
    rating: 3,
  },
];

// Components card static data
export const cardData = [
  // {
  //   id: 1,
  //   userName: 'Card Title 1',
  //   content: 'Card content goes here 1.',
  //   userImg: '/vercel.ico',
  //   code: `
  //   <button
  //     className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
  //   >
  //     Click Me Here
  // </button>
  //   `,
  // },
  // {
  //   id: 2,
  //   userName: 'Card Title 1',
  //   content: 'Card content goes here 1.',
  //   userImg: '/vercel.ico',
  //   code: `
  //     <button
  //       className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
  //     >
  //       Click Me Here
  //     </button>
  //   `,
  // },


  {
    id: 1,
    userName: 'Card Title 1',
    content: 'Card content goes here 1.',
    userImg: '/vercel.ico',
    code: `
    <div className="flex items-center justify-center h-[50vh] bg-blue-200">
      <div className="flex p-6 border border-blue-600 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 bg-opacity-80 backdrop-blur-lg">
        {/* Left Side: User Profile Image */}
        <div className="w-20 h-20 mr-4 overflow-hidden rounded-full">
          <img
            src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
            alt="User"
            style={{height: "42px"}}
            className="object-cover w-42 h-42"
          />
        </div>

        {/* Right Side: User Name and Ratings */}
        <div className="flex-grow">
          <div className="mb-2 text-xl font-bold text-white">User Name</div>

          {/* Ratings */}
          <div className="flex items-center mb-4">
            <div style={{backgroundColor: "yellow"}} className="w-6 h-6 mr-2 rounded-full"></div>
            <div style={{backgroundColor: "yellow"}} className="w-6 h-6 mr-2 rounded-full"></div>
            <div style={{backgroundColor: "yellow"}} className="w-6 h-6 rounded-full"></div>
          </div>
        </div>

        {/* Bottom Right Corner: Close Icon */}
        <div className="absolute top-0 right-0 p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="red"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>`
  },
  {
    id: 2,
    userName: 'Card Title 2',
    content: 'Card content goes here 2.',
    userImg: '/vercel.ico',
    code: `
    <div style={{ backgroundColor: '#4299e1' }} className="flex items-center justify-center h-[50vh]">
      <button
        className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
      >
        Click Me Here
      </button>
    </div>
  `,
  },
  {
    id: 3,
    userName: 'Card Title 3',
    content: 'Card content goes here 3.',
    userImg: '/vercel.ico',
    code: `
    <div className="flex items-center p-4 justify-center h-[50vh]">
      <div style={{backgroundColor: "#3490dc"}} className="p-4">
        <div className="p-4 text-white rounded-lg">
            <h2 className="text-2xl font-semibold">Card Title</h2>
            <p className="mt-2">This is a simple card with a custom background color using inline CSS.</p>
        </div>
      </div>
    </div>
  `,
  },
  {
    id: 4,
    userName: 'Card Title 4',
    content: 'Card content goes here 4.',
    userImg: '/vercel.ico',
    code: `
    <div style={{ backgroundColor: '#4299e1' }} className="flex items-center justify-center h-[50vh]">
      <button
        className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
      >
        Click Me Here
      </button>
    </div>
  `,
  },
  {
    id: 5,
    userName: 'Card Title 5',
    content: 'Card content goes here 5.',
    userImg: '/vercel.ico',
    code: `
    <div style={{ backgroundColor: '#4299e1' }} className="flex items-center justify-center h-[50vh]">
      <button
        className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
      >
        Click Me Here
      </button>
    </div>
  `,
  },
  {
    id: 6,
    userName: 'Card Title 6',
    content: 'Card content goes here 6.',
    userImg: '/vercel.ico',
    code: `
    <div style={{ backgroundColor: '#4299e1' }} className="flex items-center justify-center h-[50vh]">
      <button
        className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
      >
        Click Me Here
      </button>
    </div>
  `,
  },
  {
    id: 7,
    userName: 'Card Title 7',
    content: 'Card content goes here 7.',
    userImg: '/vercel.ico',
    code: `
    <div style={{ backgroundColor: '#4299e1' }} className="flex items-center justify-center h-[50vh]">
      <button
        className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
      >
        Click Me Here
      </button>
    </div>
  `,
  },
  {
    id: 8,
    userName: 'Card Title 8',
    content: 'Card content goes here 8.',
    userImg: '/vercel.ico',
    code: `
    <div style={{ backgroundColor: '#4299e1' }} className="flex items-center justify-center h-[50vh]">
      <button
        className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
      >
        Click Me Here
      </button>
    </div>
  `,
  },
  {
    id: 9,
    userName: 'Card Title 9',
    content: 'Card content goes here 9.',
    userImg: '/vercel.ico',
    code: `
    <div style={{ backgroundColor: '#4299e1' }} className="flex items-center justify-center h-[50vh]">
      <button
        className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
      >
        Click Me Here
      </button>
    </div>
  `,
  },
  {
    id: 10,
    userName: 'Card Title 10',
    content: 'Card content goes here 10.',
    userImg: '/vercel.ico',
    code: `
    <div style={{ backgroundColor: '#4299e1' }} className="flex items-center justify-center h-[50vh]">
      <button
        className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
      >
        Click Me Here
      </button>
    </div>
  `,
  },
  {
    id: 11,
    userName: 'Card Title 11',
    content: 'Card content goes here 11.',
    userImg: '/vercel.ico',
    code: `
    <div style={{ backgroundColor: '#4299e1' }} className="flex items-center justify-center h-[50vh]">
      <button
        className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
      >
        Click Me Here
      </button>
    </div>
  `,
  },
  {
    id: 12,
    userName: 'Card Title 12',
    content: 'Card content goes here 12.',
    userImg: '/vercel.ico',
    code: `
    <div style={{ backgroundColor: '#4299e1' }} className="flex items-center justify-center h-[50vh]">
      <button
        className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
      >
        Click Me Here
      </button>
    </div>
  `,
  },
  {
    id: 13,
    userName: 'Card Title 13',
    content: 'Card content goes here 13.',
    userImg: '/vercel.ico',
  },
  {
    id: 14,
    userName: 'Card Title 14',
    content: 'Card content goes here 14.',
    userImg: '/vercel.ico',
  },
  {
    id: 15,
    userName: 'Card Title 15',
    content: 'Card content goes here 15.',
    userImg: '/vercel.ico',
  },
  {
    id: 16,
    userName: 'Card Title 16',
    content: 'Card content goes here 16.',
    userImg: '/vercel.ico',
    
  },
  {
    id: 17,
    userName: 'Card Title 17',
    content: 'Card content goes here 17.',
    userImg: '/vercel.ico',
  },
  {
    id: 18,
    userName: 'Card Title 18',
    content: 'Card content goes here 18.',
    userImg: '/vercel.ico',
  },
  {
    id: 19,
    userName: 'Card Title 19',
    content: 'Card content goes here 19.',
    userImg: '/vercel.ico',
  },
  {
    id: 20,
    userName: 'Card Title 20',
    content: 'Card content goes here 20.',
    userImg: '/vercel.ico',
  },
  {
    id: 21,
    userName: 'Card Title 21',
    content: 'Card content goes here 21.',
    userImg: '/vercel.ico',
  },
  {
    id: 22,
    userName: 'Card Title 22',
    content: 'Card content goes here 22.',
    userImg: '/vercel.ico',
  },
  {
    id: 23,
    userName: 'Card Title 23',
    content: 'Card content goes here 23.',
    userImg: '/vercel.ico',
  },
  {
    id: 24,
    userName: 'Card Title 24',
    content: 'Card content goes here 24.',
    userImg: '/vercel.ico',
  },
  {
    id: 25,
    userName: 'Card Title 25',
    content: 'Card content goes here 25.',
    userImg: '/vercel.ico',
  },
];


export const templatesData = [
  {
    id: 1,
    imageUrl: templateImage, // Use the imported image
    title: 'Website Template 1',
    description: 'This is a description for Website Template 1.',
    githubLink: 'https://github.com/Akshay200228/landing_page',
    deployLink: 'https://landing-page-zeta-flax.vercel.app/',
  },
  {
    id: 2,
    imageUrl: templateImage, // Use the imported image
    title: 'Website Template 2',
    description: 'This is a description for Website Template 2.',
    githubLink: 'https://github.com/Akshay200228/landing_page',
    deployLink: 'https://landing-page-zeta-flax.vercel.app/',
  },
  {
    id: 3,
    imageUrl: templateImage, // Use the imported image
    title: 'Website Template 3',
    description: 'This is a description for Website Template 3.',
    githubLink: 'https://github.com/Akshay200228/landing_page',
    deployLink: 'https://landing-page-zeta-flax.vercel.app/',
  },
  {
    id: 4,
    imageUrl: templateImage, // Use the imported image
    title: 'Website Template 3',
    description: 'This is a description for Website Template 3.',
    githubLink: 'https://github.com/Akshay200228/landing_page',
    deployLink: 'https://landing-page-zeta-flax.vercel.app/',
  },
  {
    id: 5,
    imageUrl: templateImage, // Use the imported image
    title: 'Website Template 1',
    description: 'This is a description for Website Template 1.',
    githubLink: 'https://github.com/Akshay200228/landing_page',
    deployLink: 'https://landing-page-zeta-flax.vercel.app/',
  },
  {
    id: 6,
    imageUrl: templateImage, // Use the imported image
    title: 'Website Template 2',
    description: 'This is a description for Website Template 2.',
    githubLink: 'https://github.com/Akshay200228/landing_page',
    deployLink: 'https://landing-page-zeta-flax.vercel.app/',
  },
  {
    id: 7,
    imageUrl: templateImage, // Use the imported image
    title: 'Website Template 3',
    description: 'This is a description for Website Template 3.',
    githubLink: 'https://github.com/Akshay200228/landing_page',
    deployLink: 'https://landing-page-zeta-flax.vercel.app/',
  },
  {
    id: 8,
    imageUrl: templateImage, // Use the imported image
    title: 'Website Template 3',
    description: 'This is a description for Website Template 3.',
    githubLink: 'https://github.com/Akshay200228/landing_page',
    deployLink: 'https://landing-page-zeta-flax.vercel.app/',
  },
  {
    id: 9,
    imageUrl: templateImage, // Use the imported image
    title: 'Website Template 3',
    description: 'This is a description for Website Template 3.',
    githubLink: 'https://github.com/Akshay200228/landing_page',
    deployLink: 'https://landing-page-zeta-flax.vercel.app/',
  },
  {
    id: 10,
    imageUrl: templateImage, // Use the imported image
    title: 'Website Template 3',
    description: 'This is a description for Website Template 3.',
    githubLink: 'https://github.com/Akshay200228/landing_page',
    deployLink: 'https://landing-page-zeta-flax.vercel.app/',
  },
  {
    id: 11,
    imageUrl: templateImage, // Use the imported image
    title: 'Website Template 3',
    description: 'This is a description for Website Template 3.',
    githubLink: 'https://github.com/Akshay200228/landing_page',
    deployLink: 'https://landing-page-zeta-flax.vercel.app/',
  },
  {
    id: 12,
    imageUrl: templateImage, // Use the imported image
    title: 'Website Template 3',
    description: 'This is a description for Website Template 3.',
    githubLink: 'https://github.com/Akshay200228/landing_page',
    deployLink: 'https://landing-page-zeta-flax.vercel.app/',
  },
  {
    id: 13,
    imageUrl: templateImage, // Use the imported image
    title: 'Website Template 3',
    description: 'This is a description for Website Template 3.',
    githubLink: 'https://github.com/Akshay200228/landing_page',
    deployLink: 'https://landing-page-zeta-flax.vercel.app/',
  },
  {
    id: 14,
    imageUrl: templateImage, // Use the imported image
    title: 'Website Template 3',
    description: 'This is a description for Website Template 3.',
    githubLink: 'https://github.com/Akshay200228/landing_page',
    deployLink: 'https://landing-page-zeta-flax.vercel.app/',
  },
  {
    id: 15,
    imageUrl: templateImage, // Use the imported image
    title: 'Website Template 3',
    description: 'This is a description for Website Template 3.',
    githubLink: 'https://github.com/Akshay200228/landing_page',
    deployLink: 'https://landing-page-zeta-flax.vercel.app/',
  },
  {
    id: 16,
    imageUrl: templateImage, // Use the imported image
    title: 'Website Template 3',
    description: 'This is a description for Website Template 3.',
    githubLink: 'https://github.com/Akshay200228/landing_page',
    deployLink: 'https://landing-page-zeta-flax.vercel.app/',
  },
  // Add more cards as needed
];
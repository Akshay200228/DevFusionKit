import {devLogo} from '@/images'


// export default async function sitemap() {
//     const baseUrl = process.env.NEXT_PUBLIC_NEXUS_URL;
//     return[
//         {url: baseUrl, lastModified: new Date()},
//     ]
// }

// please update required information
const siteMetadata = {
    title: 'DevNexus - Web Components, Code, Animations, and APIs',
    author: 'DevNexus',
    headerTitle: 'DevNexus',
    description: 'Explore a world of web development possibilities with DevNexus. Discover web application components, code snippets, animations, and backend APIs to supercharge your projects.',
    language: 'en-us',
    siteUrl: 'https://dev-nexus.vercel.app/', // website URL
    siteLogo: devLogo,
    socialBanner: '/devNexus.png',
    email: 'akshayrs096@gmail.com',
    github: 'https://github.com/Akshay200228',
    twitter: 'https://twitter.com/sankpal2812',
    linkedin: 'https://www.linkedin.com/in/akshay-sankpal-a12426259/',
    locale: 'en-US',
}

module.exports = siteMetadata
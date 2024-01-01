
import Header from "@/components/homeLayout/Header";
import "./globals.css";
import Footer from "@/components/homeLayout/Footer";
import { ThemeProvider } from "./ThemeContext";


export const metadata = {
  title: {
    template: '%s | DevNexus',
    default: 'DevNexus - Web Components, Code, Animations, and APIs'
  },
  description: 'Explore a world of web development possibilities with DevNexus. Discover web application components, code snippets, animations, and backend APIs to supercharge your projects.',
  keywords: ['web development, web components, code snippets, web animations, backend APIs, DevNexus'],
  author: 'Akshay Sankpal',
  siteUrl: 'https://dev-fusion-kit.vercel.app/',
};

export default function RootLayout({ children }) {
  const initialTheme = typeof window !== 'undefined'
    ? localStorage.getItem('color-theme') || 'light'
    : 'dark';

  console.log('Initial Theme:', initialTheme);

  return (
    <html lang="en">
      <body>
        <ThemeProvider initialTheme={initialTheme}>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

import Header from "@/components/homeLayout/Header";
import Footer from "@/components/homeLayout/Footer";
import "./globals.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

export const metadata = {
  title: {
    template: '%s | DevNexus',
    default: 'DevNexus - Web Components, Code, Animations, and APIs',
  },
  description: 'Explore a world of web development possibilities with DevNexus. Discover web application components, code snippets, animations, and backend APIs to supercharge your projects.',
  keywords: ['web development, web components, code snippets, web animations, backend APIs, DevNexus'],
  author: 'Akshay Sankpal',
  siteUrl: 'https://dev-fusion-kit.vercel.app/',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleOAuthProvider clientId={"1074299599837-4lbh376sv07rpk6295tsemmgrnhkkga4.apps.googleusercontent.com"}>
        <body className="scrollbar-none scroll-smooth">
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </GoogleOAuthProvider>
    </html>
  );
};

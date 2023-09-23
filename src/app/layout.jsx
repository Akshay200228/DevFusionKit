import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: 'DevFusionKit - Web Components, Code, Animations, and APIs',
  description: 'Explore a world of web development possibilities with DevFusionKit. Discover web application components, code snippets, animations, and backend APIs to supercharge your projects.',
  keywords: 'web development, web components, code snippets, animations, backend APIs, DevFusionKit',
  author: 'Akshay Sankpal',
  siteUrl: 'https://dev-fusion-kit.vercel.app/',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}

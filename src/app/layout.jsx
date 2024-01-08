"use client"
import { Toaster } from 'sonner';
import Header from "@/components/homeLayout/Header";
import "./globals.css";
import Footer from "@/components/homeLayout/Footer";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName="custom-toaster-container"
          toastClassName={({ state, type }) => `custom-toast ${type} ${state}`}
          duration={3000}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

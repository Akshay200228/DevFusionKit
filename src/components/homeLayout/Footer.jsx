import React from "react";
import { TextField } from "./Fields";
import Button from "./Button";
import Container from "./Container";
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="py-4 text-white bg-gray-900">
      <Container>
        <div className="flex flex-col py-8 md:flex-row md:justify-between">
          <div className="mb-6 md:w-1/2 md:pr-8 md:mb-0">
            <h2 className="mb-2 text-lg font-semibold">Subscribe to Our Newsletter</h2>
            <p className="mb-4 text-sm text-gray-300">
              Don't miss out on our latest updates and offers. Subscribe now!
            </p>
            <form className="flex flex-col items-center w-full md:flex-row">
              <TextField
                type="email"
                aria-label="Email address"
                placeholder="Your email"
                autoComplete="email"
                required
                className="w-full mb-4 md:w-auto md:mb-0 md:mr-4"
              />
              <Button type="submit" color="blue" className="w-full md:w-auto">
                Subscribe
              </Button>
            </form>
          </div>
          <nav className="flex flex-col justify-center md:w-1/2 md:flex-row md:justify-end">
            <ul className="flex flex-wrap justify-center md:justify-end">
              <li className="mb-2 md:mb-0 md:mr-4">
                <Link href="/about" className="text-sm text-gray-300 transition-colors duration-300 hover:text-gray-100">Privacy Policy</Link>
              </li>
              <li className="mb-2 md:mb-0 md:mr-4">
                <Link href="/about" className="text-sm text-gray-300 transition-colors duration-300 hover:text-gray-100">Terms of Service</Link>
              </li>
              <li className="mb-2 md:mb-0 md:mr-4">
                <Link href="/about" className="text-sm text-gray-300 transition-colors duration-300 hover:text-gray-100">About Us</Link>
              </li>
              <li className="mb-2 md:mb-0">
                <Link href="/about" className="text-sm text-gray-300 transition-colors duration-300 hover:text-gray-100">Contact Us</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="pt-6 text-xs text-center text-gray-500 border-t border-gray-800">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

import React from "react";
import { TextField } from "./Fields";
import Button from "./Button";
import Container from "./Container";

const Footer = () => {
  return (
    <footer>
      <Container>
        <div className="flex flex-col items-center pt-8 pb-12 border-t border-gray-200 md:flex-row md:justify-between md:pt-6">
          <p className="text-xs text-gray-500">
            &copy; Copyright {new Date().getFullYear()}. All rights reserved.
          </p>
          <form className="flex justify-center w-full mt-6 md:w-auto md:mt-0">
            <TextField
              type="email"
              aria-label="Email address"
              placeholder="Email address"
              autoComplete="email"
              required
              className="min-w-0 w-60 shrink"
            />
            <Button type="submit" color="blue" className="flex-none ml-4">
              <span className="hidden lg:inline">Join our newsletter</span>
              <span className="lg:hidden">Join newsletter</span>
            </Button>
          </form>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

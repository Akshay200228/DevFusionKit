import React from "react";
import CircleBackground from "./CircleBackground";
import Container from "./Container";
import Title from "./Title";

const CallToAction = () => {
  return (
    <section
      id="get-free-shares-today"
      className="relative py-20 overflow-hidden bg-gray-900 sm:py-28"
    >
      <div className="absolute -translate-y-1/2 left-20 top-1/2 sm:left-1/2 sm:-translate-x-1/2">
        <CircleBackground color="#fff" className="animate-spin-slower" />
      </div>
      <Container className="relative">
        <div className="max-w-md mx-auto sm:text-center">
          <Title
            title="Supercharge Your Web Development"
            className="text-3xl text-white sm:text-4xl"
          />
          <p className="mt-4 text-lg text-gray-300">
            DevNexus provides a comprehensive collection of web application components, code snippets, animations, and backend APIs to streamline your web development projects. Sign up now to access these valuable resources and accelerate your web development journey.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default CallToAction;

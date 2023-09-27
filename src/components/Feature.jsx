import React from "react";
import Container from "./Container";
import Title from "./Title";
import DesktopFeature, { FeatureMobile } from "./DesktopFeature";

const Feature = () => {
  return (
    <section
      id="features"
      aria-label="Features for investing all your money"
      className="py-20 bg-gray-900 sm:py-32"
    >
      <Container>
        <div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-3xl">
          <Title
            title="Unlock the Full Potential of Web Development with DevNexus."
            className="text-2xl text-white md:text-4xl"
          />
          <p className="mt-2 text-lg text-gray-400">
            DevNexus is designed for web developers like you who want to take their projects to new heights. Our powerful features, components, and resources are here to supercharge your web development journey.
          </p>
        </div>
      </Container>
      {/* Desktop View */}
      <div className="hidden max-w-screen-xl mx-auto md:mt-20 md:block">
        <DesktopFeature />
      </div>
      {/* Mobile View */}
      <div className="mt-16 md:hidden">
        <FeatureMobile />
      </div>
    </section>
  );
};

export default Feature;

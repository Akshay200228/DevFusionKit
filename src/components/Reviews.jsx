import React from "react";
import Container from "./Container";
import Title from "./Title";
import ReviewGrid from "./ReviewGrid";

const Reviews = () => {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="pt-20 pb-16 sm:pb-24 sm:pt-32"
    >
      <Container>
        <Title
          title="Explore Our Latest Work at DevNexus."
          id="reviews-title"
          className="text-4xl font-medium tracking-tight text-gray-900 md:text-5xl sm:text-center"
        />
        <p className="mt-2 text-xl text-gray-600 sm:text-center">
          Dive into our recent projects and discover the magic of DevNexus in action.
        </p>
        <ReviewGrid />
      </Container>
    </section>
  );
};

export default Reviews;

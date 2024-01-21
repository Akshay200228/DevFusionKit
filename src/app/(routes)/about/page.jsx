// pages/about.jsx

import Container from "@/components/homeLayout/Container";
import MemberCard from "@/components/About/MemberCard";

const members = [
  {
    id: 1,
    name: "Akshay Sankpal",
    role: "Founder",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit....",
    image: "https://res.cloudinary.com/daqvbo5ys/image/upload/v1704980512/yi58e7mip89h5yvholbd",
    link: "https://www.linkedin.com/in/akshay-sankpal-a12426259/",
  },
  {
    id: 2,
    name: "Sahil Wagh",
    role: "Co-Founder",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...",
    image: "https://res.cloudinary.com/daqvbo5ys/image/upload/v1704980512/edwk9y1s52jj5be3pp5l",
    link: "https://www.linkedin.com/in/sahil-wagh-665a31248/",
  },
];

const About = () => {
  return (
    <Container>
      <section className="h-screen pt-6 md:pt-10">
        <h1 className="mb-8 text-4xl font-bold">About Us</h1>
        <p className="text-gray-600">
          Welcome to our community! Learn more about the people behind our
          platform.
        </p>
        <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-2">
          {members.map((member) => (
            <MemberCard key={member.id} {...member} />
          ))}
        </div>
      </section>
    </Container>
  );
};

export default About;

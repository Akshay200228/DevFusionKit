import React from "react";
import Container from "./Container";
import Title from "./Title";
import Image from "next/image";
import Button from "./Button";
import { BsPlayCircle } from "react-icons/bs";
import playStore from "@/images/playStore.png";
import ExtraLogos from "./ExtraLogos";
import BackgroundDesign from "./BackgroundDesign";
import { dboy } from "@/images";

const Hero = () => {
  return (
    <section
      id="home"
      className="h-screen py-20 overflow-hidden sm:py-32 lg:pb-32 xl:pb-36"
    >
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          {/* Right side */}
          <div className="relative z-10 max-w-2xl mx-auto lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <Title title="Supercharge Your Web Development" className="text-4xl md:text-6xl" />
            <p className="mt-6 text-lg text-gray-600">
              Unlock the full potential of web development with DevFusionKit. Our extensive collection of web components, code snippets, and animations will elevate your projects to new heights. Maximize creativity and efficiency with our high-quality resources.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8 gap-x-6">
              <Image className="w-32 h-auto" src={playStore} alt="playImg" />
              <Button variant="outline" href="https://youtu.be/vviFia-Stqk">
                <BsPlayCircle className="text-xl" />
                <span className="ml-2.5">Watch the video</span>
              </Button>
            </div>
          </div>
          {/* Left side */}
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <BackgroundDesign className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0" />
            <div className="-mx-4 h-[448px] px-9 [mask-image:linear-gradient(to_bottom,white_60%,transparent)] sm:mx-0 lg:absolute lg:-inset-x-10 lg:-bottom-20 lg:-top-10 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32">
              <div className="flex items-center justify-center h-full overflow-hidden">
                {/* Image */}
                <Image
                  src={dboy}
                  alt="Hero Image"
                  width={800}
                  height={600}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;

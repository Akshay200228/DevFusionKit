import Container from "./Container";
import Title from "./Title";
import Image from "next/image";
import Button from "./Button";
import { BsPlayCircle } from "react-icons/bs";
import BackgroundDesign from "./BackgroundDesign";
import { dboy } from "@/images";
import ExtraLogos from "./ExtraLogos";

const Hero = () => {
  return (
    <section
      id="home"
      className="h-auto py-10 overflow-hidden mb-28 md:mb-0 sm:py-20 lg:pb-32 xl:pb-36"
    >
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-28">
          {/* Right side */}
          <div className="relative z-10 max-w-2xl mx-auto lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <Title title="Supercharge Your Web Development" className="text-4xl md:text-5xl" />
            <p className="mt-6 text-lg text-gray-600">
              Unlock the full potential of web development with DevNexus. Our extensive collection of web components, code snippets, and animations will elevate your projects to new heights. Maximize creativity and efficiency with our high-quality resources.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8 gap-x-6">
              {/* Btn 1 */}
              <Button variant="solid" href="/component">
                <BsPlayCircle className="text-xl" />
                <span className="ml-2.5">Get Started</span>
              </Button>
              {/* Btn 2 */}
              <Button variant="outline" href="/">
                <BsPlayCircle className="text-xl" />
                <span className="ml-2.5">Watch the video</span>
              </Button>
            </div>
          </div>
          {/* Left side */}
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <BackgroundDesign className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0" />
            <div className="-mx-4 h-[448px] px-9 sm:mx-0 lg:absolute lg:-inset-x-10 lg:-bottom-20 lg:-top-10 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32">
              <div className="flex items-center justify-center h-auto overflow-hidden">
                {/* Image */}
                <Image
                  src={dboy}
                  alt="Hero Image"
                  width={800}
                  height={600}
                  loading="lazy"
                  priority={false}
                  className="sm:max-w-screen-sm max-h-[600px]"
                />
              </div>
            </div>
          </div>
        </div>
        <ExtraLogos />
      </Container>
    </section>
  );
};

export default Hero;

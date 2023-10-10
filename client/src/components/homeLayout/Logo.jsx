import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { devLogo } from "@/images";

const Logo = ({ className, props }) => {
  return (
    <Link href={"/"}>
      <div className="flex items-center justify-center">
        <Image
          src={devLogo}
          alt="Logo"
          className="w-[4rem] h-auto"
        />
        <h2
          className={clsx(
            "text-3xl font-bold text-blue-500 duration-300",
            className
          )}
          {...props}
        >
          DevNexus
        </h2>
        <style jsx>{`
        .text-[#6e8157] {
          color: #6e8157;
        }

        .text-stroke {
          -webkit-text-stroke: 1px #2196F3;
          text-stroke: 1px #000;
          color: #F5F5F5;
        }
      `}</style>
      </div>
    </Link>
  );
};

export default Logo;

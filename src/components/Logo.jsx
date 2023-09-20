import Link from "next/link";
import clsx from "clsx";

const Logo = ({ className, props }) => {
  return (
    <Link href={"/"}>
      <h2
        className={clsx(
          "text-3xl font-bold text-blue-500 duration-300",
          className
        )}
        {...props}
      >
        DevFusionKit
        {/* Dev
        <span className="text-stroke">Fusion</span>
        Kit */}
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
    </Link>
  );
};

export default Logo;

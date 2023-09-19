import Link from "next/link";
import clsx from "clsx";

const Logo = ({ className, props }) => {
  return (
    <Link href={"/"}>
      <h2
        className={clsx(
          "text-3xl font-bold text-blue-500 duration-300" ,
          className
        )}
        {...props}
      >
        Dev
        <span className="text-[#F5F5F5]" style={{ textShadow: "1px 1px 2px #000" }}>
          Fusion
        </span>
        Kit
      </h2>
      <style jsx>{`
        .text-[#6e8157] {
          color: #6e8157; /* Define the green color here */
        }
      `}</style>
    </Link>
  );
};

export default Logo;

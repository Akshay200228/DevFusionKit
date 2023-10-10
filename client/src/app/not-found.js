import Link from "next/link";
import Image from "next/image";
import { error } from "@/images";

export default function NotFound() {
  return (
    <main className="w-full px-2">
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <Image
          src={error}
          alt="Error"
          width={400}
          height={300}
          className="mb-4"
        />
        <Link href="/" className="mt-4 text-red-400 underline hover:text-red-700">
          Click here to Home page
        </Link>
      </div>
    </main>
  );
}

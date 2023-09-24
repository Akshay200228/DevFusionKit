"use client"
import SearchBar from "@/components/comLayout/SearchBar";
import Sidebar from "@/components/comLayout/Sidebar";
import { Link } from "next/link";
import { usePathname } from "next/navigation";


export default function Layout({ children }) {
  const pathName = usePathname();
  const isComponentPage = pathName.startsWith("/component");


  return (
    <>
      {isComponentPage ? (
        <div className="flex h-[100vh]">
          <Sidebar />
          <div className="w-full bg-gray-100">
            <SearchBar />
            {children} {/* Render the page content */}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-bold">
            Only certain people can access this page. Please navigate to a valid page.
          </h1>
          <br />
          <Link href="/login" className="p-2 bg-pink-300 border rounded-lg">
            Go back
          </Link>
        </div>
      )}
    </>
  );
}

"use client";
import { useEffect, useState } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import Container from "./Container";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import Button from "./Button";
import { Popover } from "@headlessui/react";
import { TbMenu2 } from "react-icons/tb";
import { IoIosArrowUp } from "react-icons/io";
import { navData } from "@/constants";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import the Cookies library
import ProfileSkeltonLoaing from "./ProfileSkeltonLoaing";


const MobileNavLink = ({ children, ...props }) => {
  return (
    <Popover.Button
      as={Link}
      className="block text-base leading-7 tracking-tight text-gray-700"
      {...props}
    >
      {children}
    </Popover.Button>
  );
};

const Header = ({ userId }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user: authUser, error, isLoading } = useAuth(userId);
  const [user, setUser] = useState(null); // Local user state

  const router = useRouter();


  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 50);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);

      // Clean up the scroll event listener when the component unmounts
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setUser(null);
    router.push("/login");
  };

  // Update local user state when authentication state changes
  useEffect(() => {
    if (authUser) {
      setUser(authUser);
    }
  }, [authUser]);

  return (
    <header className={`w-full sticky top-0 z-50 bg-white  ${isScrolled && "shadow-xl"}`}>
      <nav>
        <Container className="relative z-40 flex justify-between py-4">
          {/* Logo */}
          <div className="relative z-10 flex items-center gap-16">
            <Logo />
          </div>
          {/* NavLinks */}
          <div className="items-center hidden lg:flex lg:gap-10">
            <NavLinks />
          </div>
          {/* Buttons */}
          <div className="flex items-center gap-6">
            {isLoading ? (
              <ProfileSkeltonLoaing />
            ) : user ? (
              // Display user data
              <div className="relative hidden group lg:block" onClick={toggleDropdown}>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 10 }}
                  className="flex items-center cursor-pointer"
                >
                  <motion.img
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    src={user.avatar}
                    alt={user.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 border-2 border-blue-600 rounded-full"
                  />
                  <motion.p
                    initial={{ opacity: 0, y: -20, color: "#718096" }}
                    animate={{ opacity: 1, y: 0, color: "#2c5282" }}
                    transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100, damping: 10 }}
                    className="hidden ml-2 font-serif text-lg font-semibold text-blue-700 md:inline-block"
                  >
                    <span className="text-gray-800">Hi, </span>
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.7, type: "spring", stiffness: 100, damping: 10 }}
                      className="text-indigo-600"
                    >
                      {user.name}
                    </motion.span>
                  </motion.p>
                </motion.div>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="absolute right-0 z-10 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-72 top-12"
                    >
                      <div className="py-2">
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-gray-800 hover:text-primary hover:bg-gray-100"
                        >
                          <FaUser className="inline-block mr-2" /> Profile
                        </Link>
                        <motion.button
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="block w-full px-4 py-2 text-left text-red-600 hover:text-red-800 hover:bg-red-100"
                          onClick={handleLogout}
                        >
                          <FaSignOutAlt className="inline-block mr-2" /> Log Out
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Button href="/" variant="outline" className="hidden lg:block">
                  Get Started
                </Button>
                <Button href="/signup" className="hidden lg:block">
                  Sign Up
                </Button>
              </>
            )
            }
            {/* Mobile NavLinks */}
            <Popover className="lg:hidden">
              {({ open }) => (
                <>
                  <Popover.Button
                    className="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-gray-900 p-2 hover:bg-gray-200/50 hover:stroke-gray-600 active:stroke-gray-900 [&:not(:focus-visible)]:focus:outline-none outline-none"
                    aria-label="Toggle site navigation"
                  >
                    {({ open }) =>
                      open ? (
                        <IoIosArrowUp className="text-2xl" />
                      ) : (
                        <TbMenu2 className="text-2xl" />
                      )
                    }
                  </Popover.Button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <>
                        <Popover.Overlay
                          static
                          as={motion.div}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-0 bg-gray-300/60 backdrop-blur"
                        />
                        <Popover.Panel
                          static
                          as={motion.div}
                          initial={{ opacity: 0, y: -32 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            y: -32,
                            transition: { duration: 0.2 },
                          }}
                          className="absolute inset-x-0 top-0 z-0 px-6 pt-20 pb-6 origin-top shadow-2xl rounded-b-2xl bg-gray-50 shadow-gray-900/20"
                        >
                          <div className="space-y-4 text-center">
                            {navData.map(({ _id, title, href }) => (
                              <MobileNavLink href={href} key={_id}>
                                {title}
                              </MobileNavLink>
                            ))}
                          </div>
                          {user ? (
                            // Add user profile and logout button also 
                            <div className="flex flex-col gap-4 mt-4">
                              <Link
                                href="/profile"
                                className="flex items-center justify-center p-2 text-gray-800 transition duration-300 rounded-md hover:text-primary hover:bg-gray-100"
                              >
                                <motion.img
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.5, delay: 0.3 }}
                                  src={user.avatar}
                                  alt={user.name}
                                  width={48}
                                  height={48}
                                  className="w-12 h-12 border-2 border-blue-600 rounded-full"
                                />
                                <span className="ml-2 text-lg font-semibold">Profile</span>
                              </Link>
                              <div className="text-left">
                                <Button
                                  variant="outline"
                                  onClick={handleLogout}
                                  className="block w-full px-4 py-2 text-left text-red-600 transition duration-300 rounded-md hover:text-red-800 hover:bg-red-100"
                                >
                                  Log Out
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-4 mt-8">
                              <Button href="#" variant="outline">
                                Sign Up
                              </Button>
                              <Button href="#">
                                Log In
                              </Button>
                            </div>
                          )}
                        </Popover.Panel>
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>
          </div>
        </Container>
      </nav>
    </header>
  );
};

export default Header;

// src/components/Navbar.tsx
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Profile {
  logo: string;
  name: string;
}

const Navbar = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu visibility

  useEffect(() => {
    // Fetch profile data from the API
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "https://yoloverse.pythonanywhere.com/api/profile/"
        );
        const data = await response.json();
        setProfile(data[0]); // Assuming only one profile
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <nav className="bg-blue-600 p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto relative">
        {/* Logo and Name */}
        <div className="flex items-center space-x-4">
          <Link href="/" passHref>
            <Image
              src={profile.logo}
              alt="Logo"
              width={40}
              height={40}
              className="cursor-pointer"
            />
          </Link>
          <h1 className="text-white text-xl">{profile.name}</h1>
        </div>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="block lg:hidden text-white focus:outline-none"
        >
          {/* Hamburger Icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:flex lg:space-x-6 absolute lg:static top-full left-0 w-full lg:w-auto bg-blue-600 lg:bg-transparent p-4 lg:p-0`}
        >
          <Link href="/" className="block text-white hover:text-gray-200">
            Home
          </Link>
          <Link href="/menus" className="block text-white hover:text-gray-200">
            Menu
          </Link>
          <Link href="/FAQ" className="block text-white hover:text-gray-200">
            FAQ
          </Link>
          <Link
            href="/ContactUs"
            className="block text-white hover:text-gray-200"
          >
            Contact Us
          </Link>
          <Link
            href="/Testimonials"
            className="block text-white hover:text-gray-200"
          >
            Testimonials
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// src/components/Navbar.tsx

import { useEffect, useState } from "react";
import Link from "next/link";
import "../styles/global.css";
interface Profile {
  logo: string;
  name: string;
}

const Navbar = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

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
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo and Name */}
        <div className="flex items-center space-x-4">
          <img src={profile.logo} alt="Logo" width={40} height={40} />
          <h1 className="text-white text-xl">{profile.name}</h1>
        </div>

        {/* Navigation Links (Right-Aligned) */}
        <div className="space-x-6">
          <Link href="/" className="text-white hover:text-gray-200">
            Home
          </Link>
          <Link href="/menus" className="text-white hover:text-gray-200">
            Menu
          </Link>
          <Link href="/FAQ" className="text-white hover:text-gray-200">
            FAQ
          </Link>
          <Link href="/ContactUs" className="text-white hover:text-gray-200">
            Contact Us
          </Link>
          <Link href="/Testimonials" className="text-white hover:text-gray-200">
            Testimonials
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

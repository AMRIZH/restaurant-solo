// src/pages/index.tsx

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Profile {
  logo: string;
  name: string;
  about_us: string;
}

interface OpeningHour {
  id: number;
  day: string;
  opening_time: string;
  closing_time: string;
}

interface Hour {
  id: number;
  day: string;
  opening_time: string;
  closing_time: string;
}

const Home = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [openingHours, setOpeningHours] = useState<OpeningHour[]>([]);

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

    // Fetch opening hours data from the API
    const fetchOpeningHours = async () => {
      try {
        const response = await fetch(
          "https://yoloverse.pythonanywhere.com/api/opening-hour/"
        );
        const data = await response.json();
        // Format the time to remove seconds (HH:MM)
        const formattedData = data.map((hour: Hour) => ({
          ...hour,
          opening_time: hour.opening_time.slice(0, 5), // Remove seconds
          closing_time: hour.closing_time.slice(0, 5), // Remove seconds
        }));
        setOpeningHours(formattedData);
      } catch (error) {
        console.error("Error fetching opening hours:", error);
      }
    };

    fetchProfile();
    fetchOpeningHours();
  }, []);

  if (!profile || openingHours.length === 0) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col">
        {/* Main content area */}
        <div className="flex-grow p-6 bg-gray-100">
          <div className="max-w-7xl mx-auto">
            {/* Profile Information */}
            <div className="text-center">
              <Image
                src={profile.logo}
                alt="Logo"
                width={160}
                height={160}
                className="mx-auto"
              />
              <h1 className="text-4xl font-bold text-gray-800 mt-4">
                {profile.name}
              </h1>
              <p className="mt-2 text-gray-600">{profile.about_us}</p>
            </div>

            {/* Opening Hours Section */}
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-semibold text-blue-600">
                Opening Hours
              </h2>
              <div className="overflow-x-auto mt-4">
                <table className="max-w-3xl mx-auto table-auto border-collapse border border-blue-500 rounded-lg">
                  <thead>
                    <tr className="bg-blue-200">
                      <th className="px-6 py-3 text-left text-blue-700 font-semibold">
                        Day
                      </th>
                      <th className="px-6 py-3 text-left text-blue-700 font-semibold">
                        Opening Time
                      </th>
                      <th className="px-6 py-3 text-left text-blue-700 font-semibold">
                        Closing Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {openingHours.map((hour) => (
                      <tr key={hour.id} className="border-b hover:bg-blue-50">
                        <td className="px-6 py-3 text-gray-700">{hour.day}</td>
                        <td className="px-6 py-3 text-gray-700">
                          {hour.opening_time}
                        </td>
                        <td className="px-6 py-3 text-gray-700">
                          {hour.closing_time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Footer will be at the bottom */}
        <Footer />
      </div>
    </>
  );
};

export default Home;

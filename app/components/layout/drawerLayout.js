// src/components/drawer/DrawerLayout.js
import React, { useState, useEffect } from "react";
import Drawer from "../others/drawer/drawer";
import { getProfileById } from "@/app/services/profileService";

const DrawerLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUserId = localStorage.getItem("userId");
        //console.log("Retrieved userId from localStorage:", storedUserId); // Depuración
        if (storedUserId) {
          const profileData = await getProfileById(storedUserId);
          //console.log("Fetched profile:", profileData); // Depuración
          setProfile(profileData);
        } else {
          throw new Error("User ID not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(error.message);
      }
    };

    fetchProfile();
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <Drawer isOpen={isOpen} onToggle={handleToggle} profile={profile} />
      <div
        className={`flex-1 ${
          isOpen ? "ml-64" : "ml-16"
        } transition-all duration-300`}
      >
        {children}
      </div>
    </div>
  );
};

export default DrawerLayout;

// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserProfile } from "@/app/services/userService"; // Asegúrate de que la ruta sea correcta

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        console.log("Fetched user profile:", profile); // Para depuración
        setUser(profile);
        if (!profile.rolId) {
          setErrorMessage(
            "Comuniquese con el grupo de TECH para adquirir su rol"
          );
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error); // Para depuración
        setErrorMessage("Failed to fetch user profile. Please try again.");
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, errorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

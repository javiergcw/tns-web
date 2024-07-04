// src/pages/index.js
import ProfileForm from "@/app/components/others/container/profileForm";
import ProfileImage from "@/app/components/others/container/profileImage";
import CategoryTable from "@/app/components/profile/categoryTable";
import ProfileTable from "@/app/components/profile/profileTable"; // Asegúrate de que la ruta sea correcta
import { AuthProvider, useAuth } from '@/app/store/authContext'; // Importa el contexto de autenticación
import '/app/globals.css';
import React from 'react';

const Profile = () => {
  const { errorMessage } = useAuth();

  return (
    <div className="min-h-screen justify-center bg-gray-100">
      {errorMessage ? (
        <div className="text-center mt-10">
          <p className="text-red-500">{errorMessage}</p>
        </div>
      ) : (
        <>
          <ProfileImage />
          <ProfileForm />
          <div className="mt-8">
            <CategoryTable />
          </div>
          <div className="mt-8">
            <ProfileTable />
          </div>
        </>
      )}
    </div>
  );
};

const ProfilePage = () => (
  <AuthProvider>
    <Profile />
  </AuthProvider>
);

export default ProfilePage;

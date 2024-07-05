
import React from "react";
import MainLayout from "@/app/components/layout/drawerLayout"; // Asegúrate de que la ruta sea correcta
import ProfileForm from "@/app/components/others/container/profileForm";
import CategoryTable from "@/app/components/profile/categoryTable";
import ProfileTable from "@/app/components/profile/profileTable";
import StatusTable from "@/app/components/profile/statusTable"; // Importa StatusTable
import "/app/globals.css";

const Profile = () => {
  return (
    <div className="min-h-screen h-2 justify-center bg-gray-100 overflow-y-auto">
      {/* <ProfileImage /> */}
      <ProfileForm />
      <div className="mt-8">
        <CategoryTable />
      </div>
      <div className="mt-8">
        <ProfileTable />
      </div>
      <div className="mt-8">
        <StatusTable /> {/* Añade StatusTable aquí */}
      </div>

    </div>
  );
};

const ProfilePage = () => (
  <MainLayout>
    <Profile />
  </MainLayout>
);

export default ProfilePage;

import React from "react";
import MainLayout from "@/app/components/layout/drawerLayout"; // Asegúrate de que la ruta sea correcta
import ProfileForm from "@/app/components/others/container/profileForm";
import CategoryTable from "@/app/components/profile/categoryTable";
import ProfileTable from "@/app/components/profile/profileTable";
import StatusTable from "@/app/components/profile/statusTable";
import RoleTable from "@/app/components/profile/roleTable"; // Importa StatusTable
import "/app/globals.css";

const Profile = () => {
  return (
    <div className="min-h-screen h-2 justify-center bg-gray-100 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg pt-8 pb-6 my-8 mx-4 md:mx-8 lg:mx-12">
        <ProfileForm />
      </div>
      <div className="bg-white rounded-lg shadow-lg pt-8 pb-6 mb-8 mx-4 md:mx-8 lg:mx-12">
        <CategoryTable />
      </div>
      <div className="bg-white rounded-lg shadow-lg pt-8 pb-6 mb-8 mx-4 md:mx-8 lg:mx-12">
        <ProfileTable />
      </div>
      <div className="bg-white rounded-lg shadow-lg pt-8 pb-6 mb-8 mx-4 md:mx-8 lg:mx-12">
        <StatusTable /> {/* Añade StatusTable aquí */}
      </div>
      <div className="bg-white rounded-lg shadow-lg pt-8 pb-6 mb-8 mx-4 md:mx-8 lg:mx-12">
        <RoleTable /> {/* Añade StatusTable aquí */}
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

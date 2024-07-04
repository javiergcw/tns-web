// src/pages/index.js
import ProfileForm from "@/app/components/others/container/profileForm";
import ProfileImage from "@/app/components/others/container/profileImage";
import CategoryTable from "@/app/components/profile/categoryTable";
import ProfileTable from "@/app/components/profile/profileTable"; // Asegúrate de que la ruta sea correcta
import "/app/globals.css";
import React from "react";

const Profile = () => {
  return (
    <div className="min-h-screen justify-center bg-gray-100">
      <>
        {/*         // <ProfileImage /> */}
        <ProfileForm />
        <div className="mt-8">
          <CategoryTable />
        </div>
        <div className="mt-8">
          <ProfileTable />
        </div>
      </>
    </div>
  );
};

const ProfilePage = () => <Profile />;

export default ProfilePage;

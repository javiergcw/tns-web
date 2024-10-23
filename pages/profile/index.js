import React, { useEffect, useState } from "react";
import DrawerLayout from "@/app/components/layout/drawerLayout";
import ProfileForm from "@/app/components/others/container/profileForm";
import CategoryTable from "@/app/components/profile/categoryTable";
import ProfileTable from "@/app/components/profile/profileTable";
import StatusTable from "@/app/components/profile/statusTable";
import RoleTable from "@/app/components/profile/roleTable";
import { getProfileById } from "@/app/services/profileService";
import PrivateRoute from "@/app/components/privateRoute";
import "/app/globals.css";
import BugTable from "@/app/components/profile/bugTable";
import AreaTable from "@/app/components/profile/areaTable";
import AccountTypeTable from "@/app/components/profile/accounTypeTable";
import AdmissionsTable from "@/app/components/admisiones/admissionTable";

const Profile = ({ role }) => {
  return (
    <div className="min-h-screen h-2 justify-center bg-gray-100 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg pt-8 pb-6 my-8 mx-4 md:mx-8 lg:mx-12 max-w-full">
        <ProfileForm />
      </div>

      {(role === "Secretariado") && (
        <div className="bg-white rounded-lg shadow-lg pt-8 pb-6 mb-8 mx-4 md:mx-8 lg:mx-12">
          <AdmissionsTable />
        </div>
      )}

      {(role === "admin" || role === "Compras" || role === "Developer") && (
        <>
          {(role === "admin" || role === "Developer") && (
            <>
              <div className="bg-white rounded-lg shadow-lg pt-8 pb-6 mb-8 mx-4 md:mx-8 lg:mx-12">
                <BugTable />
              </div>
              <div className="bg-white rounded-lg shadow-lg pt-8 pb-6 mb-8 mx-4 md:mx-8 lg:mx-12">
                <ProfileTable />
              </div>
              <div className="bg-white rounded-lg shadow-lg pt-8 pb-6 mb-8 mx-4 md:mx-8 lg:mx-12">
                <StatusTable />
              </div>
              <div className="bg-white rounded-lg shadow-lg pt-8 pb-6 mb-8 mx-4 md:mx-8 lg:mx-12">
                <RoleTable />
              </div>
              <div className="bg-white rounded-lg shadow-lg pt-8 pb-6 mb-8 mx-4 md:mx-8 lg:mx-12">
                <AdmissionsTable />
              </div>
              <div className="bg-white rounded-lg shadow-lg pt-8 pb-6 mb-8 mx-4 md:mx-8 lg:mx-12">
                <AccountTypeTable />
              </div>
            </>
          )}

          <div className="bg-white rounded-lg shadow-lg pt-8 pb-6 mb-8 mx-4 md:mx-8 lg:mx-12">
            <AreaTable />
          </div>
        </>
      )}
    </div>
  );
};

const ProfilePage = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUserId = localStorage.getItem("profileId");
        console.log(storedUserId);

        if (storedUserId) {
          const profile = await getProfileById(storedUserId);
          setRole(profile.rol ? profile.rol.name : "");
        } else {
          throw new Error("User ID not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <DrawerLayout>
      <Profile role={role} />
    </DrawerLayout>
  );
};

export default PrivateRoute(ProfilePage);

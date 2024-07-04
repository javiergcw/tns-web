import ProfileForm from "@/app/components/others/container/profileForm";
import ProfileImage from "@/app/components/others/container/profileImage";
import CategoryTable from "@/app/components/profile/categoryTable";
import { getUserProfile } from "@/app/services/userService"; // Asegúrate de que la ruta sea correcta
import "/app/globals.css";
import React, { useEffect, useState } from 'react';

const Profile = () => {
  // const [role, setRole] = useState(null);
   const [errorMessage, setErrorMessage] = useState('');

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const profile = await getUserProfile();
  //       console.log('Fetched user profile:', profile); // Para depuración
  //       if (!profile.rolId) {
  //         setErrorMessage('Comuniquese con el grupo de TECH para adquirir su rol');
  //       } else {
  //         setRole(profile.rolId);
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch user profile:', error); // Para depuración
  //       setErrorMessage('Failed to fetch user profile. Please try again.');
  //     }
  //   };

  //   fetchUserProfile();
  // }, []);

  return (
    <>
      <div className="min-h-screen justify-center bg-gray-100">
        {errorMessage ? (
          <div className="text-center mt-10">
            <p className="text-red-500">{errorMessage}</p>
          </div>
        ) : (
          <>
            
              <>
                <ProfileImage />
                <ProfileForm />
                <div className="mt-8">
                  <CategoryTable />
                </div>
              </>
      
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
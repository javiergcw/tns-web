// src/pages/index.js
import ProfileForm from "@/app/components/others/container/profileForm";
import ProfileImage from "@/app/components/others/container/profileImage";
import CategoryTable from "@/app/components/profile/categoryTable";
import ProfileTable from "@/app/components/profile/profileTable"; // Asegúrate de que la ruta sea correcta
import { AuthProvider, useAuth } from '@/app/store/authContext'; // Importa el contexto de autenticación
import '/app/globals.css';
import React from 'react';


const Profile = () => {
  /*   const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile();
        setProfile(userProfile);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  } */
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

const ProfilePage = () => <Profile />;

export default ProfilePage;

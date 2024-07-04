// src/pages/index.js
import ProfileForm from "@/app/components/others/container/profileForm";
import ProfileImage from "@/app/components/others/container/profileImage";
import CategoryTable from "@/app/components/profile/categoryTable";
import "/app/globals.css";
import React from "react";

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
      <ProfileImage />
      <ProfileForm />
      <div className="mt-8">
        <CategoryTable />
      </div>
      <div />
    </div>
  );
};

const ProfilePage = () => <Profile />;

export default ProfilePage;

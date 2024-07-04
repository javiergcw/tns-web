import { useState, useEffect } from "react";
import TextInput from "@/app/components/others/fields/textInput";
import { getUserProfile } from "@/app/services/userService";

const ProfileForm = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  // Usar useEffect para obtener y establecer el perfil del usuario cuando el componente se monte
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile();
        setName(profile.name);
        setId(profile.id);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleNameChange = (e) => {
    console.log("Name input value:", e.target.value); // Log para depuración
    setName(e.target.value);
  };
  const handleIdChange = (e) => {
    console.log("ID input value:", e.target.value); // Log para depuración
    setId(e.target.value);
  };

  return (
    <div className="w-2/3 pl-8">
      <div className="mb-4">
        <label className="block text-blue-700 font-bold mb-2">
          Nombre completo:
        </label>
        <TextInput
          labelText="Nombre"
          labelColor="blue"
          inputSize="large"
          inputType="text"
          value={name}
          onChange={handleNameChange}
        />
        <TextInput
          labelText="ID"
          labelColor="blue"
          inputSize="large"
          inputType="text"
          value={id}
          onChange={handleIdChange}
        />
      </div>
    </div>
  );
};

export default ProfileForm;

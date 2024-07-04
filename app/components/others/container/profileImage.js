import { ImagesPath } from "@/app/utils/assetsPath";
import { useState } from "react";

const ProfileImage = () => {
  const [image, setImage] = useState(ImagesPath.logoH);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center w-1/3">
      <div className="relative w-40 h-40 mb-4 group">
        <img
          src={image}
          alt="Profile"
          className="w-full h-full rounded-full object-cover border-4 border-green-500"
        />
        <label
          htmlFor="imageUpload"
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 7V4a2 2 0 012-2h3m10 0h3a2 2 0 012 2v3m-5 0h5m-5 0a2 2 0 01-2 2H8m0 0H4m0 0a2 2 0 01-2-2V8m0 0V4m0 4l8 8m0 0l-8-8m8 8l8-8"
            />
          </svg>
        </label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
      <button className="w-32 bg-blueButton text-white p-3 rounded-md font-bold">
        Guardar
      </button>
    </div>
  );
};

export default ProfileImage;

import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTransgender,
  FaCity,
  FaGlobe,
} from "react-icons/fa";

const MyProfile = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6 space-y-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 border-b pb-2">
        My Profile
      </h2>

      <div className="flex items-center gap-3 text-gray-700">
        <FaUser className="text-blue-600" />
        <span className="font-semibold">Name:</span>
        <p>{loggedInUser?.name}</p>
      </div>

      <div className="flex items-center gap-3 text-gray-700">
        <FaEnvelope className="text-purple-600" />
        <span className="font-semibold">Email:</span>
        <p>{loggedInUser.email}</p>
      </div>

      <div className="flex items-center gap-3 text-gray-700">
        <FaPhone className="text-green-600" />
        <span className="font-semibold">Phone:</span>
        <p>{loggedInUser.phone}</p>
      </div>

      <div className="flex items-center gap-3 text-gray-700">
        <FaMapMarkerAlt className="text-red-500" />
        <span className="font-semibold">Address:</span>
        <p>{loggedInUser.address}</p>
      </div>

      <div className="flex items-center gap-3 text-gray-700">
        <FaTransgender className="text-pink-600" />
        <span className="font-semibold">Gender:</span>
        <p>{loggedInUser.gender}</p>
      </div>

      <div className="flex items-center gap-3 text-gray-700">
        <FaCity className="text-indigo-600" />
        <span className="font-semibold">City:</span>
        <p>{loggedInUser.city}</p>
      </div>

      <div className="flex items-center gap-3 text-gray-700">
        <FaGlobe className="text-yellow-600" />
        <span className="font-semibold">Country:</span>
        <p>{loggedInUser.country}</p>
      </div>
    </div>
  );
};

export default MyProfile;

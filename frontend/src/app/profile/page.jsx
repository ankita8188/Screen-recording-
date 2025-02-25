"use client";
import React, { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    bio: "A software developer from California.",
    profilePicture: "https://via.placeholder.com/150",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch data from localStorage after the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("name") || "";
      const storedEmail = localStorage.getItem("email") || "";
      setUser((prevUser) => ({
        ...prevUser,
        name: storedName,
        email: storedEmail,
      }));
      setIsLoading(false); // Mark as loaded
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Toggle editing mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="text-center mb-6">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="mx-auto rounded-full w-32 h-32 mb-4"
          />
          <h2 className="text-2xl font-semibold">{user.name}</h2>
        </div>

        {isEditing ? (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Bio</label>
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={toggleEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <p className="text-gray-600">Email: {user.email}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-600">Bio: {user.bio}</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={toggleEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

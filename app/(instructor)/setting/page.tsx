"use client";

import { useState } from "react";

export default function InstructorSettings() {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    experience: "",
    expertise: "",
    linkedin: "",
    github: "",
    website: "",
  });

  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150",
  );

  const [tempImage, setTempImage] = useState<string | null>(null);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const preview = URL.createObjectURL(file);
      setTempImage(preview);
    }
  };

  const saveImage = () => {
    if (tempImage) {
      setProfileImage(tempImage);
      setTempImage(null);
    }
  };

  const discardImage = () => {
    setTempImage(null);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Profile Preview */}
        <div className="bg-white rounded-2xl shadow p-6 text-center h-fit">
          <img
            src={tempImage || profileImage}
            className="w-32 h-32 rounded-full object-cover mx-auto"
          />

          <h2 className="mt-4 font-semibold text-lg">
            {formData.name || "Instructor Name"}
          </h2>

          <p className="text-gray-500 text-sm">
            {formData.expertise || "Your Expertise"}
          </p>
        </div>

        {/* Settings Form */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow p-8">
          <h1 className="text-2xl font-bold mb-6">Instructor Settings</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image */}
            <div>
              <label className="block font-medium mb-2">Profile Image</label>

              <input
                type="file"
                onChange={handleImageChange}
                className="border p-2 rounded-lg w-full"
              />

              {tempImage && (
                <div className="flex gap-3 mt-3">
                  <button
                    type="button"
                    onClick={saveImage}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                  >
                    Save Image
                  </button>

                  <button
                    type="button"
                    onClick={discardImage}
                    className="border px-4 py-2 rounded-lg"
                  >
                    Discard
                  </button>
                </div>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="block font-medium mb-2">Full Name</label>

              <input
                type="text"
                name="name"
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="John Doe"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block font-medium mb-2">Bio</label>

              <textarea
                name="bio"
                rows={4}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="Tell students about yourself..."
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block font-medium mb-2">
                Experience (Years)
              </label>

              <input
                type="number"
                name="experience"
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="5"
              />
            </div>

            {/* Expertise */}
            <div>
              <label className="block font-medium mb-2">
                Expertise / Skills
              </label>

              <input
                type="text"
                name="expertise"
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="React, Node.js, AWS"
              />
            </div>

            {/* Social Links */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium mb-2">LinkedIn</label>

                <input
                  type="text"
                  name="linkedin"
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">GitHub</label>

                <input
                  type="text"
                  name="github"
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Website</label>

                <input
                  type="text"
                  name="website"
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

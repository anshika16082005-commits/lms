"use client";

import { Github, Linkedin, Globe, BookOpen, Users, Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function InstructorProfile() {
  const [instructor, setInstructor] = useState({
    name: "",
    profileImage: "",
    bio: "",
    expertise: [],
    createdCourses: [],
    experience: 0,
    socialLinks: {
      linkedin: "",
      github: "",
      website: "",
    },
  });

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const res = await fetch("/api/users/me", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { data } = await res.json();
        setInstructor({
          name: data.name ? data.name : "John Doe",
          profileImage: data.profileImage
            ? data.profileImage
            : "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
          bio: data.bio
            ? data.bio
            : "Passionate educator with 8+ years of experience in web development. Dedicated to empowering students with practical skills and real-world knowledge.",
          expertise: data.expertise
            ? data.expertise
            : ["Web Development", "JavaScript", "React"],
          experience: data.experience ? data.experience : 8,
          createdCourses: data.createdCourses ? data.createdCourses : [],

          socialLinks: data.socialLinks
            ? data.socialLinks
            : {
                linkedin: "#",
                github: "#",
                website: "#",
              },
        });
      } catch (error) {
        console.error("Error fetching instructor profile:", error);
      }
    };
    fetchInstructor();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Banner */}
      <div className="h-60 bg-linear-to-r from-indigo-600 to-purple-600"></div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 -mt-20 relative">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Image */}
            <img
              src={
                instructor.profileImage ||
                "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
              }
              className="w-40 h-40 rounded-xl object-cover border-4 border-white shadow-md"
            />

            {/* Instructor Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800">
                {instructor.name}
              </h1>

              <p className="text-gray-500 mt-1">
                {instructor.experience}+ Years Teaching Experience
              </p>

              <p className="mt-4 text-gray-600 leading-relaxed">
                {instructor.bio}
              </p>

              {/* Expertise */}
              <div className="flex flex-wrap gap-2 mt-4">
                {instructor.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-700 px-3 py-1 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-5">
                <a
                  href={instructor.socialLinks.linkedin}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-indigo-100"
                >
                  <Linkedin size={18} />
                </a>

                <a
                  href={instructor.socialLinks.github}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-indigo-100"
                >
                  <Github size={18} />
                </a>

                <a
                  href={instructor.socialLinks.website}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-indigo-100"
                >
                  <Globe size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <BookOpen className="text-indigo-600" size={28} />
            <div>
              <h3 className="text-xl font-bold">
                {instructor.createdCourses?.length || 0}
              </h3>
              <p className="text-gray-500 text-sm">
                {instructor.createdCourses?.length === 1 ? "Course" : "Courses"}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <Star className="text-indigo-600" size={28} />
            <div>
              <h3 className="text-xl font-bold">4.8</h3>
              <p className="text-gray-500 text-sm">Rating</p>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Courses by {instructor.name.toUpperCase()}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((course) => (
              <div
                key={course}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <div className="h-40">
                  <img
                    src="/images/softwaredevelopment.jpg"
                    alt=""
                    className="bg-cover"
                  />
                </div>

                <div className="p-4 mt-2">
                  <h3 className="font-semibold text-gray-800">
                    Full Stack Web Development
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Beginner to Advanced
                  </p>

                  <div className="flex justify-between mt-3 text-sm text-gray-600">
                    <span>1200 Students</span>
                    <span>⭐ 4.7</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

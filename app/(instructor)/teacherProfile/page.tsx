"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Briefcase,
  Award,
  DollarSign,
  CheckCircle,
  Github,
  Linkedin,
  Globe,
} from "lucide-react";

type Instructor = {
  name: string;
  email: string;
  role: string;
  bio?: string;
  expertise?: string[];
  experience?: number;
  profileImage?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    website?: string;
  };
  isVerified?: boolean;
  totalEarnings?: number;
  createdCourses?: string[];
  createdAt?: string;
};

export default function InstructorProfile() {
  const [instructor, setInstructor] = useState<Instructor | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/users/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = await res.json();
      setInstructor(data);
    };
    fetchProfile();
  }, []);

  if (!instructor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8">
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6">
          {/* Profile Image */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100">
            <img
              src={instructor.profileImage || "/images/cybersecurity.jpg"}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Basic Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl font-bold text-gray-900">
                {instructor.name}
              </h1>

              {instructor.isVerified && (
                <CheckCircle className="text-green-500" size={20} />
              )}
            </div>

            <p className="text-gray-600 flex items-center gap-2 justify-center md:justify-start mt-1">
              <Mail size={16} /> {instructor.email}
            </p>

            <p className="text-sm text-blue-600 mt-2 capitalize">
              {instructor.role}
            </p>
          </div>
        </div>

        {/* ================= BIO ================= */}
        {instructor.bio && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">About</h2>
            <p className="text-gray-600">{instructor.bio}</p>
          </div>
        )}

        {/* ================= EXPERTISE ================= */}
        {instructor.expertise && instructor.expertise.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {instructor.expertise.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ================= EXPERIENCE & EARNINGS ================= */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-4 rounded-xl flex items-center gap-3">
            <Briefcase className="text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Experience</p>
              <p className="font-semibold">
                {instructor.experience || 0} Years
              </p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl flex items-center gap-3">
            <Award className="text-purple-600" />
            <div>
              <p className="text-sm text-gray-500">Courses Created</p>
              <p className="font-semibold">
                {instructor.createdCourses?.length || 0}
              </p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl flex items-center gap-3">
            <DollarSign className="text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Total Earnings</p>
              <p className="font-semibold">
                ₹{instructor.totalEarnings?.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </div>

        {/* ================= SOCIAL LINKS ================= */}
        {(instructor.socialLinks?.github ||
          instructor.socialLinks?.linkedin ||
          instructor.socialLinks?.website) && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3">Social Links</h2>
            <div className="flex gap-4">
              {instructor.socialLinks?.github && (
                <a
                  href={instructor.socialLinks.github}
                  target="_blank"
                  className="text-gray-600 hover:text-black"
                >
                  <Github />
                </a>
              )}
              {instructor.socialLinks?.linkedin && (
                <a
                  href={instructor.socialLinks.linkedin}
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Linkedin />
                </a>
              )}
              {instructor.socialLinks?.website && (
                <a
                  href={instructor.socialLinks.website}
                  target="_blank"
                  className="text-green-600 hover:text-green-800"
                >
                  <Globe />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { Users, UserCheck, Search, Mail, BookOpen } from "lucide-react";

export default function InstructorStudents() {
  const students = [
    {
      name: "Aman Sharma",
      email: "aman@gmail.com",
      course: "React Bootcamp",
      progress: 75,
      status: "Active",
      joined: "12 Feb 2026",
    },
    {
      name: "Priya Singh",
      email: "priya@gmail.com",
      course: "Next.js Mastery",
      progress: 40,
      status: "Learning",
      joined: "20 Feb 2026",
    },
    {
      name: "Rahul Verma",
      email: "rahul@gmail.com",
      course: "JavaScript Fundamentals",
      progress: 100,
      status: "Completed",
      joined: "5 Feb 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-500 mt-1">
            Manage and track your enrolled learners
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700">
          Export Data
        </button>
      </div>

      {/* Stats Cards */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Users className="text-blue-600" size={22} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Students</p>
            <h2 className="text-2xl font-bold">1,920</h2>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <UserCheck className="text-green-600" size={22} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Learners</p>
            <h2 className="text-2xl font-bold">1,430</h2>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-lg">
            <BookOpen className="text-purple-600" size={22} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Courses Purchased</p>
            <h2 className="text-2xl font-bold">3,820</h2>
          </div>
        </div>
      </div>

      {/* Search */}

      <div className="bg-white border rounded-xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <Search size={18} className="text-gray-400" />

        <input
          type="text"
          placeholder="Search student by name or email..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* Students List */}

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-6 text-sm text-gray-500 bg-gray-50 px-6 py-4 font-medium">
          <div>Student</div>
          <div>Email</div>
          <div>Course</div>
          <div>Progress</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {students.map((student, index) => (
          <div
            key={index}
            className="grid grid-cols-6 items-center px-6 py-5 border-t hover:bg-gray-50 transition"
          >
            {/* Student */}

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold">
                {student.name.charAt(0)}
              </div>

              <span className="font-medium text-gray-900">{student.name}</span>
            </div>

            {/* Email */}

            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Mail size={14} />
              {student.email}
            </div>

            {/* Course */}

            <div className="text-sm text-gray-700">{student.course}</div>

            {/* Progress */}

            <div>
              <div className="w-32 h-2 bg-gray-200 rounded-full">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${student.progress}%` }}
                ></div>
              </div>

              <span className="text-xs text-gray-500">{student.progress}%</span>
            </div>

            {/* Status */}

            <div>
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  student.status === "Completed"
                    ? "bg-green-100 text-green-600"
                    : student.status === "Active"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {student.status}
              </span>
            </div>

            {/* Action */}

            <div>
              <button className="text-blue-600 text-sm font-medium hover:underline">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

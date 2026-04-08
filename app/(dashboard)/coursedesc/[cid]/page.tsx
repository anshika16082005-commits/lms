"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CoursePage() {
  const [openModule, setOpenModule] = useState<number | null>(null);

  const course = {
    title: "Complete React Bootcamp",
    thumbnail: "/images/mlai.jpg",
    instructor: "Saiful",
    description:
      "Master React from scratch to advanced level. Build real-world projects, understand hooks, state management, and modern frontend development.",
    modules: [
      {
        title: "Introduction",
        lessons: [
          { name: "What is React?", duration: 10 },
          { name: "Setting up environment", duration: 12 },
          { name: "JSX Basics", duration: 15 },
          { name: "First Component", duration: 18 },
          { name: "Project Setup", duration: 20 },
        ],
        desc: "Basics of React, environment setup, JSX, and first components.",
      },
      {
        title: "Components",
        lessons: [
          { name: "Functional Components", duration: 14 },
          { name: "Props Deep Dive", duration: 16 },
          { name: "State Management", duration: 18 },
          { name: "Event Handling", duration: 12 },
          { name: "Reusable Components", duration: 15 },
          { name: "Component Structure", duration: 10 },
          { name: "Forms in React", duration: 20 },
          { name: "Mini Project", duration: 25 },
        ],
        desc: "Deep dive into reusable components, props, state, and component lifecycle.",
      },
      {
        title: "Advanced Concepts",
        lessons: [
          { name: "useState Hook", duration: 12 },
          { name: "useEffect Hook", duration: 15 },
          { name: "Context API", duration: 18 },
          { name: "Performance Optimization", duration: 20 },
          { name: "Custom Hooks", duration: 14 },
          { name: "Best Practices", duration: 16 },
        ],
        desc: "Hooks, Context API, performance optimization, and best practices.",
      },
    ],
  };

  // Total duration (minutes)
  const totalMinutes = course.modules.reduce(
    (acc, mod) => acc + mod.lessons.reduce((a, l) => a + l.duration, 0),
    0,
  );

  const totalHours = (totalMinutes / 60).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HERO SECTION */}
      <div className="relative h-72 w-full">
        <Image
          src={course.thumbnail}
          alt="course"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center">
          <div className="max-w-3xl px-6 text-white">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              {course.title}
            </h1>

            <p className="mt-4 text-base md:text-lg font-medium text-gray-200">
              Created by{" "}
              <Link
                href="/instructor/profile"
                className="hover:text-white transition underline"
              >
                {course.instructor}
              </Link>
            </p>

            <p className="mt-2 text-sm text-gray-300">
              ⏱ {totalHours} hours of content
            </p>
          </div>
        </div>
      </div>

      {/* COURSE CONTENT */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* DESCRIPTION */}
        <div className="bg-white rounded-xl border p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">About this course</h2>
          <p className="text-slate-600">{course.description}</p>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card label="Modules" value={course.modules.length} />
          <Card
            label="Lessons"
            value={course.modules.reduce((a, m) => a + m.lessons.length, 0)}
          />
          <Card label="Duration" value={`${totalHours} hrs`} />
          <Card label="Level" value="Beginner" />
        </div>

        {/* MODULES */}
        <div className="space-y-6">
          {course.modules.map((mod, i) => {
            const moduleMinutes = mod.lessons.reduce(
              (a, l) => a + l.duration,
              0,
            );
            return (
              <div key={i} className="bg-white rounded-xl border p-6">
                <h3 className="text-lg font-semibold mb-2">
                  {i + 1}. {mod.title}
                </h3>

                <p className="text-sm text-slate-600 mb-3">{mod.desc}</p>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
                    {mod.lessons.length} Lessons •{" "}
                    {(moduleMinutes / 60).toFixed(1)} hrs
                  </span>

                  <button
                    onClick={() => setOpenModule(openModule === i ? null : i)}
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    {openModule === i ? "Hide Details" : "View Details"}
                  </button>
                </div>

                {/* LESSONS */}
                {openModule === i && (
                  <div className="mt-4 border-t pt-4 space-y-2">
                    {mod.lessons.map((lesson, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-slate-50 px-4 py-2 rounded-lg"
                      >
                        <p className="text-sm">
                          {idx + 1}. {lesson.name}
                        </p>
                        <span className="text-xs text-slate-500">
                          {lesson.duration} min
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ENROLL */}
        <div className="mt-10 flex justify-center">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl text-lg font-semibold">
            Enroll for Free
          </button>
        </div>
      </div>
    </div>
  );
}

function Card({ label, value }: any) {
  return (
    <div className="bg-white border rounded-xl p-4 text-center">
      <p className="text-sm text-slate-500">{label}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  );
}

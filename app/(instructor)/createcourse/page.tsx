"use client";

import { useState } from "react";

type Course = {
  title: string;
  instructor: number;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  category: string;
};

const CreateCoursePage = () => {
  const [formData, setFormData] = useState<Omit<Course, "instructor">>({
    title: "",
    description: "",
    level: "Beginner",
    duration: "",
    category: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Course, string>>>(
    {},
  );

  const validate = () => {
    const newErrors: Partial<Record<keyof Course, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    if (!formData.duration.trim()) {
      newErrors.duration = "Duration is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const res = await fetch("/api/course/createCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData }),
    });

    if (res.ok) {
      alert("Course Created Successfully!");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className="bg-white min-h-screen px-10 py-8">
      {/* Page Title */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-900">
          Create New Course
        </h1>
        <p className="text-gray-500 mt-1">
          Add the basic details for your course
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10 max-w-4xl">
        {/* Course Title */}
        <div className="grid grid-cols-3 gap-6 items-start">
          <div>
            <h3 className="font-medium text-gray-900">Course Title</h3>
            <p className="text-sm text-gray-500">
              Write a clear and descriptive title
            </p>
          </div>

          <div className="col-span-2">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="grid grid-cols-3 gap-6 items-start">
          <div>
            <h3 className="font-medium text-gray-900">Description</h3>
            <p className="text-sm text-gray-500">
              Describe what students will learn
            </p>
          </div>

          <div className="col-span-2">
            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
        </div>

        {/* Level */}
        <div className="grid grid-cols-3 gap-6 items-start">
          <div>
            <h3 className="font-medium text-gray-900">Course Level</h3>
            <p className="text-sm text-gray-500">Select difficulty level</p>
          </div>

          <div className="col-span-2">
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Duration */}
        <div className="grid grid-cols-3 gap-6 items-start">
          <div>
            <h3 className="font-medium text-gray-900">Duration</h3>
            <p className="text-sm text-gray-500">Estimated time to complete</p>
          </div>

          <div className="col-span-2">
            <input
              type="text"
              name="duration"
              placeholder="e.g. 8 weeks"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
            )}
          </div>
        </div>

        {/* Category */}
        <div className="grid grid-cols-3 gap-6 items-start">
          <div>
            <h3 className="font-medium text-gray-900">Category</h3>
            <p className="text-sm text-gray-500">Course subject or field</p>
          </div>

          <div className="col-span-2">
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCoursePage;

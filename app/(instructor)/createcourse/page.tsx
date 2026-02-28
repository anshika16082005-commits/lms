"use client";

import { useEffect, useState } from "react";

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
  const [instructor, setInstructor] = useState<number | null>(null);
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
      newErrors.duration = "Duration is required (e.g., 8 weeks)";
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

    try {
      const res = await fetch("/api/course/createCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });

      if (res.ok) {
        alert("Course Created Successfully!");
        setFormData({
          title: "",
          description: "",
          level: "Beginner",
          duration: "",
          category: "",
        });
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-bold mb-6">Create New Course</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium">Course Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* Level */}
        <div>
          <label className="block font-medium">Level</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block font-medium">Duration</label>
          <input
            type="text"
            name="duration"
            placeholder="e.g. 8 weeks"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm">{errors.duration}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            name="category"
            placeholder="e.g. Web Development"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCoursePage;

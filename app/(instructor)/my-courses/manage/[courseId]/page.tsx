"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function ManageCourse() {
  const params = useParams();
  const courseId = params.courseId;

  const [title, setTitle] = useState("");
  const [type, setType] = useState("video");
  const [file, setFile] = useState<File | null>(null);

  const [sections, setSections] = useState<any[]>([]);
  const [sectionTitle, setSectionTitle] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("courseId", courseId as string);
    formData.append("file", file);

    const res = await fetch("/api/course-content/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Content uploaded");
      setTitle("");
      setFile(null);
    }
  };

  const addSection = () => {
    if (!sectionTitle) return;

    setSections([...sections, { title: sectionTitle, lessons: [] }]);
    setSectionTitle("");
  };

  return (
    <div className="">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Course Builder</h1>
        <p className="text-gray-500">
          Build your curriculum, upload lessons and resources
        </p>
      </div>

      <div className="grid grid-cols-4 gap-8">
        {/* LEFT PANEL */}
        <div className="col-span-1 bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Upload Lesson Content</h2>

          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Lesson Title</label>

              <input
                type="text"
                placeholder="React Hooks"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 mt-1 w-full rounded"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Content Type</label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border p-2 mt-1 w-full rounded"
              >
                <option value="video">Video</option>
                <option value="pdf">PDF</option>
                <option value="assignment">Assignment</option>
                <option value="notes">Notes</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600">Upload File</label>

              <input
                type="file"
                onChange={handleFileChange}
                className="border p-2 mt-1 w-full rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Upload Lesson
            </button>
          </form>

          {/* Add Section */}
          <div className="mt-8">
            <h3 className="font-semibold mb-3">Add Section</h3>

            <input
              type="text"
              placeholder="Section title"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              className="border p-2 w-full rounded"
            />

            <button
              onClick={addSection}
              className="w-full mt-3 bg-green-600 text-white py-2 rounded"
            >
              Add Section
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="col-span-3 bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-6">Course Curriculum</h2>

          {sections.length === 0 && (
            <p className="text-gray-500">No sections added yet.</p>
          )}

          <div className="space-y-6">
            {sections.map((section, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">{section.title}</h3>

                  <button className="text-blue-600 text-sm">
                    + Add Lesson
                  </button>
                </div>

                {/* Example lessons */}

                <div className="mt-4 space-y-3">
                  <div className="flex justify-between border p-3 rounded">
                    <div>
                      <p className="font-medium">React Introduction</p>
                      <p className="text-sm text-gray-500">Video</p>
                    </div>

                    <button className="text-red-500 text-sm">Delete</button>
                  </div>

                  <div className="flex justify-between border p-3 rounded">
                    <div>
                      <p className="font-medium">React Notes</p>
                      <p className="text-sm text-gray-500">PDF</p>
                    </div>

                    <button className="text-red-500 text-sm">Delete</button>
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

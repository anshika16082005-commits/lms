import { BookOpen, Clock, BarChart3 } from "lucide-react";

type Course = {
  id: number;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  progress: number;
  category: string;
};

const courses: Course[] = [
  {
    id: 1,
    title: "Data Structures & Algorithms",
    description:
      "Arrays, linked lists, trees, graphs, and problem-solving techniques.",
    level: "Intermediate",
    duration: "12 weeks",
    progress: 65,
    category: "Core CS",
  },
  {
    id: 2,
    title: "Operating Systems",
    description: "Processes, threads, scheduling, memory, and file systems.",
    level: "Advanced",
    duration: "10 weeks",
    progress: 30,
    category: "Systems",
  },
  {
    id: 3,
    title: "Web Development with Next.js",
    description:
      "Build full-stack applications using React, Next.js, and APIs.",
    level: "Beginner",
    duration: "8 weeks",
    progress: 90,
    category: "Web",
  },
  {
    id: 4,
    title: "Database Systems",
    description:
      "Relational models, SQL, indexing, and transaction management.",
    level: "Intermediate",
    duration: "9 weeks",
    progress: 40,
    category: "Core CS",
  },
  {
    id: 5,
    title: "Computer Networks",
    description:
      "TCP/IP, routing, congestion control, and network security basics.",
    level: "Intermediate",
    duration: "8 weeks",
    progress: 20,
    category: "Systems",
  },
  {
    id: 6,
    title: "Introduction to Machine Learning",
    description: "Supervised learning, neural networks, and model evaluation.",
    level: "Advanced",
    duration: "11 weeks",
    progress: 10,
    category: "AI",
  },
];

export default function Page() {
  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      {/* Sidebar */}

      {/* Main Content */}
      <main className="flex-1 px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="text-slate-600 mt-1">
            Explore the complete Computer Science curriculum
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full md:w-1/3 rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select className="rounded-lg border border-slate-300 px-4 py-2">
            <option>All Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <select className="rounded-lg border border-slate-300 px-4 py-2">
            <option>All Categories</option>
            <option>Core CS</option>
            <option>Systems</option>
            <option>Web</option>
            <option>AI</option>
          </select>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-md transition"
            >
              <span className="text-xs font-medium text-indigo-600">
                {course.category}
              </span>

              <h2 className="text-xl font-semibold mt-2">{course.title}</h2>

              <p className="text-slate-600 text-sm mt-2">
                {course.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-slate-500 mt-4">
                <div className="flex items-center gap-1">
                  <BarChart3 size={16} />
                  {course.level}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  {course.duration}
                </div>
              </div>

              {/* Progress */}
              <div className="mt-5">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full">
                  <div
                    className="h-2 bg-indigo-600 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <button className="mt-6 w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition px-4 py-2 font-medium">
                <BookOpen size={18} />
                Continue Course
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

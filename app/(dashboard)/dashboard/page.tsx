export default function Page() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Enrolled Courses" value="12" />
          <StatCard title="Completed" value="7" />
          <StatCard title="Pending Assignments" value="3" />
        </div>

        {/* Courses */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Continue Learning
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CourseCard title="React for Beginners" progress={70} />
            <CourseCard title="Advanced TypeScript" progress={45} />
            <CourseCard title="UI/UX Fundamentals" progress={90} />
          </div>
        </section>
      </main>
    </div>
  );
}

/* Components */

function NavItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={`text-left px-4 py-2 rounded-md text-sm font-medium ${
        active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold text-gray-800 mt-2">{value}</p>
    </div>
  );
}

function CourseCard({ title, progress }: { title: string; progress: number }) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <h3 className="font-medium text-gray-800 mb-3">{title}</h3>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-sm text-gray-500">{progress}% completed</p>
    </div>
  );
}

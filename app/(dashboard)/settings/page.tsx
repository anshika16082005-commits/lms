import {} from "../profile/page";
import { User, Lock, Bell, Shield } from "lucide-react";

export default function Page() {
  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      {/* Sidebar */}

      {/* Main Content */}
      <main className="flex-1 px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-slate-600 mt-1">
            Manage your account and learning preferences
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-8 max-w-4xl">
          {/* Account Security */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="text-indigo-600" />
              <h2 className="text-xl font-semibold">Account Security</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Password</p>
                  <p className="text-sm text-slate-500">
                    Last updated 3 months ago
                  </p>
                </div>
                <button className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100">
                  Change Password
                </button>
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="text-indigo-600" />
              <h2 className="text-xl font-semibold">Preferences</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p>Email Notifications</p>
                <input type="checkbox" className="h-5 w-5 accent-indigo-600" />
              </div>

              <div className="flex items-center justify-between">
                <p>Course Progress Reminders</p>
                <input type="checkbox" className="h-5 w-5 accent-indigo-600" />
              </div>

              <div className="flex items-center justify-between">
                <p>New Course Announcements</p>
                <input type="checkbox" className="h-5 w-5 accent-indigo-600" />
              </div>
            </div>
          </section>

          {/* Privacy */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-indigo-600" />
              <h2 className="text-xl font-semibold">Privacy</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p>Public Profile</p>
                <input type="checkbox" className="h-5 w-5 accent-indigo-600" />
              </div>

              <div className="flex items-center justify-between">
                <p>Show Course Certificates</p>
                <input type="checkbox" className="h-5 w-5 accent-indigo-600" />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

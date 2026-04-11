"use client";

import { User, Lock, Bell, Shield, BarChart3, DollarSign } from "lucide-react";

export default function Page() {
  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      {/* Main Content */}
      <main className="flex-1 px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Instructor Settings</h1>
            <p className="text-slate-600 mt-1">
              Manage your teaching profile, earnings and preferences
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8 max-w-5xl">
          {/* Security */}
          <section className="bg-white rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="text-indigo-600" />
              <h2 className="text-xl font-semibold">Security</h2>
            </div>

            <div className="space-y-4">
              <ActionRow
                title="Password"
                desc="Update your password"
                btn="Change"
              />
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-white rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="text-indigo-600" />
              <h2 className="text-xl font-semibold">Notifications</h2>
            </div>

            <Toggle label="Student Enrollments" />
            <Toggle label="Course Reviews" />
            <Toggle label="Announcements" />
          </section>

          {/* Privacy */}
          <section className="bg-white rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-indigo-600" />
              <h2 className="text-xl font-semibold">Privacy</h2>
            </div>

            <Toggle label="Public Instructor Profile" />
            <Toggle label="Show Earnings" />
          </section>
        </div>
      </main>
    </div>
  );
}

/* Components */
function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="text-sm mb-1 block">{label}</label>
      <input
        {...props}
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-100"
      />
    </div>
  );
}

function StatCard({ title, value }: any) {
  return (
    <div className="border rounded-lg p-4">
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="text-xl font-semibold">{value}</h3>
    </div>
  );
}

function ActionRow({ title, desc, btn }: any) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-slate-500">{desc}</p>
      </div>
      <button className="border px-4 py-2 rounded-lg hover:bg-slate-100">
        {btn}
      </button>
    </div>
  );
}

function Toggle({ label }: any) {
  return (
    <div className="flex justify-between items-center py-2">
      <p>{label}</p>
      <input type="checkbox" className="h-5 w-5 accent-indigo-600" />
    </div>
  );
}

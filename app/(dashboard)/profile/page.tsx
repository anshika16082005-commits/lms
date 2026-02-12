"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  User,
  Settings,
  LogOut,
  Upload,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* =======================
   TYPES
======================= */
type UserType = {
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  bio: string;
};

type Certificate = {
  id: number;
  title: string;
  issuedOn: string;
  fileUrl?: string;
};

/* =======================
   PROFILE PAGE
======================= */
export default function ProfilePage() {
  const avatarRef = useRef<HTMLInputElement | null>(null);
  const certRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const [user, setUser] = useState<UserType>({
    name: "Aparna Yadav",
    email: "aparna@20e.com",
    role: "Student",
    avatarUrl: "/images/avatar.jpg",
    bio: "Passionate about teaching computer science and building scalable systems.",
  });

  const [certificates, setCertificates] = useState<Certificate[]>([
    { id: 1, title: "Data Structures & Algorithms", issuedOn: "March 2024" },
    { id: 2, title: "Full Stack Web Development", issuedOn: "January 2024" },
  ]);

  const [certTitle, setCertTitle] = useState("");
  const [certDate, setCertDate] = useState("");

  /* =======================
     HANDLERS
  ======================= */
  const handleAvatarUpload = (file: File) => {
    const preview = URL.createObjectURL(file);
    setUser({ ...user, avatarUrl: preview });
  };

  const handleCertificateUpload = (file: File) => {
    const fileUrl = URL.createObjectURL(file);
    setCertificates((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: certTitle || "New Certificate",
        issuedOn: certDate || "Recently",
        fileUrl,
      },
    ]);
    setCertTitle("");
    setCertDate("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* MAIN CONTENT */}

      {/* CONTENT */}
      <main className="p-4 md:p-8 space-y-8">
        {/* PROFILE CARD */}
        <div className="bg-white border rounded-xl shadow-sm p-6 flex gap-6 items-center">
          <div className="relative group">
            <div className="h-24 w-24 rounded-full overflow-hidden border">
              <Image
                src={user.avatarUrl}
                alt="avatar"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>

            <button
              onClick={() => avatarRef.current?.click()}
              className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 rounded-full flex items-center justify-center transition"
            >
              <Upload size={18} />
            </button>

            <input
              ref={avatarRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                e.target.files && handleAvatarUpload(e.target.files[0])
              }
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <span className="inline-block mt-2 text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {user.role}
            </span>
            <p className="mt-4 text-gray-600 max-w-xl">{user.bio}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

/* =======================
   SIDEBAR
======================= */
function SidebarWrapper({
  isOpen,
  setIsOpen,
  collapsed,
  setCollapsed,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* MOBILE BACKDROP */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`fixed top-0 left-0 z-50 h-screen bg-slate-900 text-slate-300
        ${collapsed ? "w-20" : "w-64"}
        hidden md:flex flex-col px-4 py-6`}
      >
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <span className="text-emerald-400 font-bold text-2xl">
              CS MAJOR
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded hover:bg-slate-800"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        <nav className="flex-1 space-y-3">
          <SidebarItem
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            href="/dashboard"
            active={pathname === "/dashboard"}
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<BookOpen size={18} />}
            label="Courses"
            href="/courses"
            active={pathname === "/courses"}
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<User size={18} />}
            label="Profile"
            href="/profile"
            active
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<Settings size={18} />}
            label="Settings"
            href="/settings"
            collapsed={collapsed}
          />
        </nav>

        <SidebarItem
          icon={<LogOut size={18} />}
          label="Logout"
          href="/"
          collapsed={collapsed}
        />
      </motion.aside>
    </>
  );
}

/* =======================
   SIDEBAR ITEM
======================= */
function SidebarItem({
  icon,
  label,
  href,
  active,
  collapsed,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
}) {
  return (
    <Link href={href}>
      <div
        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
        ${active ? "bg-blue-600 text-white" : "hover:bg-slate-800"}
        ${collapsed ? "justify-center" : ""}`}
      >
        {icon}
        {!collapsed && <span className="text-sm">{label}</span>}
      </div>
    </Link>
  );
}

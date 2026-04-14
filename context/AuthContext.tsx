"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the shape of your context
interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;

  role: string;
  setUserRole: (role: string) => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("student");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedStatus = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(JSON.parse(storedStatus || "false"));
    }
  }, []);
  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    router.replace("/");
  };

  const setUserRole = (role: string) => {
    setRole(role);
    localStorage.setItem("user-role", role);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, role, setUserRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

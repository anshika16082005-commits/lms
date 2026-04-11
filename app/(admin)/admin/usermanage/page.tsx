"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import toast from "react-hot-toast";

type user = {
  _id: string;
  name: string;
  email: string;
  role: string;
};
export default function UserManagement() {
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState<user[]>([]);

  const handleDelete = async (userId: string) => {
    try {
      const reponse = await fetch(`/api/admin/usermanage?uid=${userId}`, {
        method: "DELETE",
      });

      const { data } = await reponse.json();

      setUsers((prev) => prev.filter((c) => c._id !== userId));
      toast.success(
        `User with Name:${data.name}, Email:${data.email}, Role:${data.role} has been deleted successfully`,
      );
    } catch (error: any) {
      toast.error(`Error occures:${error}`);
      console.error("Fetch User:", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/usermanage");

        if (!response.ok) throw new Error("API error");

        const { data } = await response.json();
        setUsers(data);
      } catch (error: any) {
        console.error("Fetching User:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-500">Manage all users and instructors</p>
        </div>
        <Button className="rounded-xl">+ Add User</Button>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl">
        <CardContent className="p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 w-full md:w-1/3">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline">All</Button>
            <Button variant="outline">Students</Button>
            <Button variant="outline">Instructors</Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="rounded-2xl">
        <CardContent className="p-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-3">Name</th>
                <th>Email</th>
                <th>Role</th>
                {/* <th>Status</th> */}
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-medium">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  {/* <td>
                    <Badge
                      variant={
                        user.status === "Active"
                          ? "default"
                          : user.status === "Pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {user.status}
                    </Badge>
                  </td> */}
                  <td className="text-right space-x-2">
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

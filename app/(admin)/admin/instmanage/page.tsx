"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Ban,
  Eye,
} from "lucide-react";

export default function InstructorManagement() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const instructors = [
    {
      name: "John Doe",
      email: "john@example.com",
      expertise: "Web Development",
      students: 1200,
      earnings: "$12,000",
      status: "Pending",
    },
    {
      name: "Sarah Smith",
      email: "sarah@example.com",
      expertise: "Backend",
      students: 850,
      earnings: "$9,500",
      status: "Approved",
    },
    {
      name: "Alex Johnson",
      email: "alex@example.com",
      expertise: "AI/ML",
      students: 300,
      earnings: "$4,200",
      status: "Suspended",
    },
  ];

  const filters = ["All", "Pending", "Approved", "Suspended"];

  const filtered = instructors.filter((ins) => {
    return (
      (filter === "All" || ins.status === filter) &&
      ins.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Instructor Management
          </h1>
          <p className="text-gray-500">
            Review, approve and manage instructor performance
          </p>
        </div>

        <div />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Instructors</p>
            <h2 className="text-2xl font-semibold">2,340</h2>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Pending Approval</p>
            <h2 className="text-2xl font-semibold">120</h2>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Active Instructors</p>
            <h2 className="text-2xl font-semibold">2,050</h2>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl">
        <CardContent className="p-5 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 w-full lg:w-1/3">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search instructors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                onClick={() => setFilter(f)}
                className="rounded-xl"
              >
                {f}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="rounded-2xl">
        <CardContent className="p-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b text-gray-500">
                <th className="py-3">Instructor</th>
                <th>Expertise</th>
                <th>Students</th>
                <th>Earnings</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((ins, i) => (
                <tr key={i} className="border-b hover:bg-gray-50 transition">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{ins.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold">{ins.name}</span>
                        <span className="text-xs text-gray-400">
                          {ins.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>{ins.expertise}</td>
                  <td>{ins.students}</td>
                  <td className="font-medium">{ins.earnings}</td>

                  <td>
                    <Badge
                      variant={
                        ins.status === "Approved"
                          ? "default"
                          : ins.status === "Pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {ins.status}
                    </Badge>
                  </td>

                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      {ins.status === "Pending" && (
                        <>
                          <Button size="sm" className="gap-1">
                            <CheckCircle className="w-4 h-4" /> Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="gap-1"
                          >
                            <XCircle className="w-4 h-4" /> Reject
                          </Button>
                        </>
                      )}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="outline">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" /> View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Ban className="w-4 h-4 mr-2" /> Suspend
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              No instructors found
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination (UI only) */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <p>Showing 1-10 of 100 results</p>
        <div className="flex gap-2">
          <Button variant="outline">Previous</Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </div>
  );
}

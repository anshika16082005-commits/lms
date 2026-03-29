"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Eye, Trash2, CheckCircle, XCircle, Star } from "lucide-react";

export default function CourseManagement() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const courses = [
    {
      title: "React Bootcamp",
      instructor: "John Doe",
      price: "$49",
      status: "Pending",
      students: 1200,
    },
    {
      title: "Node.js Mastery",
      instructor: "Sarah Smith",
      price: "$59",
      status: "Approved",
      students: 850,
    },
    {
      title: "AI for Beginners",
      instructor: "Alex Johnson",
      price: "$79",
      status: "Rejected",
      students: 300,
    },
  ];

  const filters = ["All", "Pending", "Approved", "Rejected"];

  const filteredCourses = courses.filter((course) => {
    return (
      (activeFilter === "All" || course.status === activeFilter) &&
      course.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Course Management
          </h1>
          <p className="text-gray-500">Review, approve and manage courses</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl">
            Export
          </Button>
          <Button className="rounded-xl bg-black text-white hover:bg-gray-800">
            + Add Course
          </Button>
        </div>
      </div>

      {/* Filters + Search */}
      <Card className="rounded-2xl border shadow-sm">
        <CardContent className="p-5 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 w-full lg:w-1/3">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                onClick={() => setActiveFilter(filter)}
                className="rounded-xl"
              >
                {filter}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="rounded-2xl border shadow-sm">
        <CardContent className="p-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b text-gray-500">
                <th className="py-3">Course</th>
                <th>Instructor</th>
                <th>Students</th>
                <th>Price</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold">{course.title}</span>
                      <span className="text-xs text-gray-400">
                        Updated 2 days ago
                      </span>
                    </div>
                  </td>

                  <td>{course.instructor}</td>
                  <td>{course.students}</td>
                  <td className="font-medium">{course.price}</td>

                  <td>
                    <Badge
                      variant={
                        course.status === "Approved"
                          ? "default"
                          : course.status === "Pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {course.status}
                    </Badge>
                  </td>

                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      {course.status === "Pending" && (
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

                      <Button size="sm" variant="outline" className="gap-1">
                        <Eye className="w-4 h-4" /> View
                      </Button>

                      <Button size="sm" variant="outline" className="gap-1">
                        <Star className="w-4 h-4" /> Feature
                      </Button>

                      <Button size="sm" variant="destructive" className="gap-1">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCourses.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              No courses found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

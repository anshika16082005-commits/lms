"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function StudentProgress() {
  const [search, setSearch] = useState("");

  const students = [
    {
      name: "John Doe",
      course: "React Bootcamp",
      progress: 80,
      timeSpent: "12h",
      score: "85%",
    },
    {
      name: "Sarah Smith",
      course: "Node.js Mastery",
      progress: 55,
      timeSpent: "8h",
      score: "72%",
    },
  ];

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Progress</h1>
        <p className="text-gray-500">
          Track learning performance and engagement
        </p>
      </div>

      {/* Search */}
      <Card className="rounded-2xl">
        <CardContent className="p-5 flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((s, i) => (
          <Card key={i} className="rounded-2xl">
            <CardContent className="p-5 space-y-4">
              <div>
                <h2 className="font-semibold">{s.name}</h2>
                <p className="text-sm text-gray-400">{s.course}</p>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{s.progress}%</span>
                </div>
                <Progress value={s.progress} />
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <span>Time: {s.timeSpent}</span>
                <span>Score: {s.score}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-gray-400 py-10">No students found</div>
      )}
    </div>
  );
}

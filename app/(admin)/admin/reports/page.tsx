"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Eye, CheckCircle, XCircle, Flag } from "lucide-react";

export default function ReportsModeration() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const reports = [
    {
      type: "Course",
      target: "React Bootcamp",
      reportedBy: "User123",
      reason: "Inappropriate content",
      status: "Pending",
    },
    {
      type: "User",
      target: "John Doe",
      reportedBy: "User456",
      reason: "Spam",
      status: "Resolved",
    },
    {
      type: "Course",
      target: "AI for Beginners",
      reportedBy: "User789",
      reason: "Copyright issue",
      status: "Rejected",
    },
  ];

  const filters = ["All", "Pending", "Resolved", "Rejected"];

  const filtered = reports.filter((r) => {
    return (
      (filter === "All" || r.status === filter) &&
      r.target.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Reports & Moderation
        </h1>
        <p className="text-gray-500">Manage reported content and users</p>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl">
        <CardContent className="p-5 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 w-full lg:w-1/3">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search reports..."
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
                <th className="py-3">Type</th>
                <th>Target</th>
                <th>Reported By</th>
                <th>Reason</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((r, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <Flag className="w-4 h-4 text-red-500" />
                      {r.type}
                    </div>
                  </td>

                  <td className="font-medium">{r.target}</td>
                  <td>{r.reportedBy}</td>
                  <td>{r.reason}</td>

                  <td>
                    <Badge
                      variant={
                        r.status === "Resolved"
                          ? "default"
                          : r.status === "Pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {r.status}
                    </Badge>
                  </td>

                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" className="gap-1">
                        <Eye className="w-4 h-4" /> View
                      </Button>

                      {r.status === "Pending" && (
                        <>
                          <Button size="sm" className="gap-1">
                            <CheckCircle className="w-4 h-4" /> Resolve
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              No reports found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

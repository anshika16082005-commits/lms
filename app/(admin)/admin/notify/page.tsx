"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, Send } from "lucide-react";

export default function NotificationsPage() {
  const [message, setMessage] = useState("");

  const notifications = [
    {
      title: "New Course Launched",
      audience: "All Users",
      date: "25 Mar 2026",
    },
    {
      title: "Instructor Payout Processed",
      audience: "Instructors",
      date: "24 Mar 2026",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-gray-500">Send announcements and manage alerts</p>
      </div>

      {/* Create Notification */}
      <Card className="rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="font-semibold text-lg">Create Notification</h2>

          <Input
            placeholder="Enter message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select audience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="students">Students</SelectItem>
              <SelectItem value="instructors">Instructors</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex justify-end">
            <Button className="bg-black text-white gap-2">
              <Send className="w-4 h-4" /> Send
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sent Notifications */}
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <h2 className="font-semibold text-lg mb-4">Recent Notifications</h2>

          <div className="space-y-4">
            {notifications.map((n, i) => (
              <div
                key={i}
                className="flex justify-between items-center border p-4 rounded-xl hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{n.title}</p>
                    <p className="text-sm text-gray-400">{n.audience}</p>
                  </div>
                </div>

                <span className="text-sm text-gray-400">{n.date}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function AdminSettings() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-gray-500">Manage platform configuration</p>
      </div>

      {/* Platform Settings */}
      <Card className="rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Platform Settings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Platform Name" />
            <Input placeholder="Support Email" />
          </div>

          <div className="flex items-center justify-between">
            <span>Enable Registration</span>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card className="rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Payment Settings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Commission (%)" />
            <Input placeholder="Currency (USD, INR)" />
          </div>

          <div className="flex items-center justify-between">
            <span>Enable Payments</span>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Branding */}
      <Card className="rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Branding</h2>

          <Input placeholder="Upload Logo URL" />
          <Input placeholder="Website Title" />
        </CardContent>
      </Card>

      {/* Save */}
      <div className="flex justify-end">
        <Button className="bg-black text-white rounded-xl hover:bg-gray-800">
          Save Changes
        </Button>
      </div>
    </div>
  );
}

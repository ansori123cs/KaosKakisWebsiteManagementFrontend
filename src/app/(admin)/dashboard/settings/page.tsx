import React from "react";
import { Lock, Bell, Moon } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">
          Manage your account preferences and application settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Menu */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="space-y-2">
                {[
                  { label: "General", icon: "⚙️", active: true },
                  { label: "Security", icon: "🔒", active: false },
                  { label: "Notifications", icon: "🔔", active: false },
                  { label: "Theme", icon: "🌙", active: false },
                ].map((item) => (
                  <button
                    key={item.label}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      item.active
                        ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                General Settings
              </h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Admin User"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="admin@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Company
                </label>
                <input
                  type="text"
                  defaultValue="FaiSal Inc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <Button variant="primary">Save Changes</Button>
                <Button variant="secondary">Cancel</Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <h2 className="text-lg font-semibold text-red-900">
                Danger Zone
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-red-800 text-sm">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
              <Button variant="danger">Delete Account</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

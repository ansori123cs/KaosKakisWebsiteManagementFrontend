import React from "react";
import { TrendingUp, Users } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function AnalyticsPage() {
  const chartData = [
    { month: "Jan", revenue: 4000, users: 2400 },
    { month: "Feb", revenue: 3000, users: 1398 },
    { month: "Mar", revenue: 2000, users: 9800 },
    { month: "Apr", revenue: 2780, users: 3908 },
    { month: "May", revenue: 1890, users: 4800 },
    { month: "Jun", revenue: 2390, users: 3800 },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">
          Monitor your business metrics and performance indicators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Revenue Trend
              </h2>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-center">
                <p className="text-gray-600">Chart placeholder</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">$87,432</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                User Growth
              </h2>
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-center">
                <p className="text-gray-600">Chart placeholder</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  +2,543 users
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Monthly Data</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {chartData.map((item) => (
              <div
                key={item.month}
                className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0"
              >
                <span className="text-gray-700 font-medium">{item.month}</span>
                <div className="flex gap-8">
                  <div>
                    <p className="text-gray-600 text-sm">Revenue</p>
                    <p className="text-gray-900 font-semibold">
                      ${item.revenue}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Users</p>
                    <p className="text-gray-900 font-semibold">{item.users}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button variant="secondary">Export Data</Button>
      </div>
    </div>
  );
}

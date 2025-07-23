"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import Navbar from "@/components/navbar"

export default function ProgressPage() {
  const weightData = [
    { date: "2024-01-01", weight: 70 },
    { date: "2024-01-15", weight: 69.5 },
    { date: "2024-02-01", weight: 69.2 },
    { date: "2024-02-15", weight: 68.8 },
    { date: "2024-03-01", weight: 68.5 },
    { date: "2024-03-15", weight: 68.2 },
    { date: "2024-04-01", weight: 68.0 },
  ]

  const stats = [
    { title: "Starting Weight", value: "70.0 kg", change: null },
    { title: "Current Weight", value: "68.0 kg", change: null },
    { title: "Progress", value: "-2.0 kg", change: "-2.9%" },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Progress Tracking</h1>

        {/* Key Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-slate-600">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</div>
                {stat.change && <div className="text-sm text-green-600 font-medium">{stat.change}</div>}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Weight Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Weight Journey</CardTitle>
            <CardDescription>Track your weight progress over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                  <XAxis
                    dataKey="date"
                    className="text-slate-600"
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                    }
                  />
                  <YAxis className="text-slate-600" domain={["dataMin - 1", "dataMax + 1"]} />
                  <Tooltip
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value) => [`${value} kg`, "Weight"]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Clock, TrendingUp, Calendar } from 'lucide-react';

export function WorkMetricsPage() {
  // Example work metrics data
  const weeklyHours = [
    { day: 'Mon', hours: 8 },
    { day: 'Tue', hours: 7 },
    { day: 'Wed', hours: 6 },
    { day: 'Thu', hours: 9 },
    { day: 'Fri', hours: 8 },
    { day: 'Sat', hours: 4 },
    { day: 'Sun', hours: 2 }
  ];

  const metrics = [
    { title: 'Total Hours This Week', value: 44, icon: Clock },
    { title: 'Productivity Trend', value: '+12%', icon: TrendingUp },
    { title: 'Days Worked', value: 5, icon: Calendar }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Work Metrics</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <metric.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">{metric.title}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hours Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Weekly Hours Breakdown</h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyHours}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hours" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 
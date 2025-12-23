import { useState, useEffect } from "react";
import {
  BarChart3,
  Users,
  Clock,
  AlertTriangle,
  TrendingUp,
  MessageSquare,
  CheckCircle,
  XCircle,
  PieChart,
  FileText,
  HelpCircle,
  Download,
  Filter,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend: "positive" | "negative";
  description: string;
}

interface SatisfactionData {
  category: string;
  satisfaction: number;
  totalTickets: number;
}

interface PendingTicket {
  id: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  waitTime: string;
}

interface Alert {
  type: "warning" | "info" | "success";
  message: string;
}

export default function DashboardAdmin() {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("week");

  // Simulated data for metrics
  const metrics = {
    overallSatisfaction: 82,
    aiResponseRate: 68,
    pendingTickets: 24,
    escalationRate: 12,
    totalTickets: 156,
    avgResponseTime: 2.5, // hours
    aiVsHuman: {
      ai: 68,
      human: 32,
    },
  };

  // Data for satisfaction by category
  const satisfactionByCategory: SatisfactionData[] = [
    { category: "Technical Support", satisfaction: 85, totalTickets: 45 },
    { category: "Billing", satisfaction: 78, totalTickets: 32 },
    { category: "User Account", satisfaction: 90, totalTickets: 28 },
    { category: "Features", satisfaction: 75, totalTickets: 51 },
  ];

  // Data for pending tickets
  const pendingTickets: PendingTicket[] = [
    {
      id: "TKT-001",
      category: "Technical Support",
      priority: "High",
      waitTime: "48h",
    },
    { id: "TKT-002", category: "Billing", priority: "Medium", waitTime: "24h" },
    {
      id: "TKT-003",
      category: "User Account",
      priority: "Low",
      waitTime: "12h",
    },
    { id: "TKT-004", category: "Features", priority: "High", waitTime: "36h" },
  ];

  // Alerts
  const alerts: Alert[] = [
    { type: "warning", message: "Satisfaction < 75% for Features category" },
    { type: "info", message: "Escalation rate increased by 5% this week" },
    { type: "success", message: "AI response rate > 65% this week" },
  ];

  // Function to get alert color based on type
  const getAlertColor = (type: Alert["type"]) => {
    switch (type) {
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800";
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
    }
  };

  // Function to get icon based on alert type
  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-4 h-4" />;
      case "info":
        return <MessageSquare className="w-4 h-4" />;
      case "success":
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  // Metric Card component
  const MetricCard = ({
    title,
    value,
    icon,
    trend,
    description,
  }: MetricCardProps) => {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
          <span
            className={`text-sm font-medium px-2 py-1 rounded ${
              trend === "positive"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {trend === "positive" ? "✓ Good" : "✗ Critical"}
          </span>
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          <div className="text-sm font-medium text-gray-900">{title}</div>
          <div className="text-sm text-gray-500">{description}</div>
        </div>
      </div>
    );
  };

  // Function to export data
  const handleExportData = () => {
    // In a real app, this would trigger a CSV/Excel download
    alert("Exporting dashboard data...");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header with controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Support Performance Tracking</p>
          <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Last updated: Today</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
        </div>
      </div>

      {/* Automatic Alerts */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
          <AlertTriangle className="w-5 h-5" />
          Automatic Alerts
        </h2>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getAlertColor(
                alert.type
              )} flex items-center justify-between`}
            >
              <div className="flex items-center gap-2">
                {getAlertIcon(alert.type)}
                <span>{alert.message}</span>
              </div>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                View details →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <MetricCard
          title="Overall Satisfaction"
          value={`${metrics.overallSatisfaction}%`}
          icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
          trend={metrics.overallSatisfaction >= 75 ? "positive" : "negative"}
          description="Average satisfaction score"
        />

        <MetricCard
          title="AI Response Rate"
          value={`${metrics.aiResponseRate}%`}
          icon={<BarChart3 className="w-6 h-6 text-purple-600" />}
          trend={metrics.aiResponseRate >= 60 ? "positive" : "negative"}
          description="Tickets handled by AI"
        />

        <MetricCard
          title="Pending Tickets"
          value={metrics.pendingTickets}
          icon={<Clock className="w-6 h-6 text-orange-600" />}
          trend={metrics.pendingTickets <= 20 ? "positive" : "negative"}
          description="Unresolved tickets"
        />

        <MetricCard
          title="Escalation Rate"
          value={`${metrics.escalationRate}%`}
          icon={<Users className="w-6 h-6 text-red-600" />}
          trend={metrics.escalationRate <= 15 ? "positive" : "negative"}
          description="Transfers to human support"
        />
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "overview"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("satisfaction")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "satisfaction"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Satisfaction
          </button>
          <button
            onClick={() => setActiveTab("tickets")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "tickets"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Tickets
          </button>
          <button
            onClick={() => setActiveTab("performance")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "performance"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            AI Performance
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Satisfaction by Category */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                    <PieChart className="w-5 h-5" />
                    Satisfaction by Category
                  </h3>
                  <span className="text-sm text-gray-500">This week</span>
                </div>
                <div className="space-y-4">
                  {satisfactionByCategory.map((item) => (
                    <div key={item.category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">
                          {item.category}
                        </span>
                        <span
                          className={`font-semibold ${
                            item.satisfaction >= 75
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {item.satisfaction}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            item.satisfaction >= 75
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${item.satisfaction}%` }}
                        />
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.totalTickets} tickets handled
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI vs Human Distribution */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                    <Users className="w-5 h-5" />
                    Response Distribution
                  </h3>
                  <span className="text-sm text-gray-500">All time</span>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-center">
                    <div className="relative w-48 h-48">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-gray-900">
                            {metrics.aiResponseRate}%
                          </div>
                          <div className="text-gray-500">AI Responses</div>
                        </div>
                      </div>
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="8"
                          strokeDasharray={`${metrics.aiVsHuman.ai * 2.51} ${
                            100 * 2.51
                          }`}
                          strokeDashoffset="0"
                          transform="rotate(-90 50 50)"
                          strokeLinecap="round"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="8"
                          strokeDasharray={`${metrics.aiVsHuman.human * 2.51} ${
                            100 * 2.51
                          }`}
                          strokeDashoffset={`${-metrics.aiVsHuman.ai * 2.51}`}
                          transform="rotate(-90 50 50)"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex justify-center gap-8">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      <span className="text-gray-700">
                        AI: {metrics.aiVsHuman.ai}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-gray-700">
                        Human: {metrics.aiVsHuman.human}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "satisfaction" && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                  <CheckCircle className="w-5 h-5" />
                  Satisfaction Details
                </h3>
                <div className="text-sm text-gray-500">
                  Showing data for {timeRange}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Category
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Satisfaction
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Tickets
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {satisfactionByCategory.map((item) => (
                      <tr
                        key={item.category}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 text-gray-700">
                          {item.category}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`font-semibold ${
                              item.satisfaction >= 75
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {item.satisfaction}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {item.totalTickets}
                        </td>
                        <td className="py-3 px-4">
                          {item.satisfaction >= 75 ? (
                            <span className="inline-flex items-center gap-1 text-green-600">
                              <CheckCircle className="w-4 h-4" />
                              Target Achieved
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-red-600">
                              <XCircle className="w-4 h-4" />
                              Attention Required
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tickets" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                  <Clock className="w-5 h-5" />
                  Critical Pending Tickets
                </h3>
                <span className="text-sm text-red-600 font-medium">
                  {pendingTickets.length} tickets require attention
                </span>
              </div>
              <div className="space-y-4">
                {pendingTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-gray-800">
                        {ticket.id}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          ticket.priority === "High"
                            ? "bg-red-100 text-red-800"
                            : ticket.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {ticket.priority}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Category: {ticket.category}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      Waiting for: {ticket.waitTime}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                  <FileText className="w-5 h-5" />
                  Ticket Metrics
                </h3>
                <span className="text-sm text-gray-500">
                  Performance overview
                </span>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700">Total Tickets</span>
                    <span className="font-semibold text-gray-900">
                      {metrics.totalTickets}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700">Average Response Time</span>
                    <span className="font-semibold text-gray-900">
                      {metrics.avgResponseTime}h
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: "75%" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700">24h Resolution Rate</span>
                    <span className="font-semibold text-gray-900">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-purple-500"
                      style={{ width: "78%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "performance" && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                <HelpCircle className="w-5 h-5" />
                AI Performance Analytics
              </h3>
              <span className="text-sm text-gray-500">
                Real-time monitoring
              </span>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-blue-700 mb-1">AI Accuracy</div>
                  <div className="text-2xl font-bold text-blue-900">89%</div>
                  <div className="text-xs text-blue-600 mt-1">
                    +2% since last week
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-green-700 mb-1">
                    Self-resolved Tickets
                  </div>
                  <div className="text-2xl font-bold text-green-900">64%</div>
                  <div className="text-xs text-green-600 mt-1">
                    +5% since last month
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-sm text-purple-700 mb-1">
                    Average Confidence Score
                  </div>
                  <div className="text-2xl font-bold text-purple-900">92%</div>
                  <div className="text-xs text-purple-600 mt-1">
                    High in 8 out of 10 categories
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium text-gray-700 mb-4">
                  Recommended Improvements
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    Optimize AI responses for "Billing" category
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Add examples for complex feature-related questions
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Reduce average response time by 15 minutes
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer with additional info */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div>
            Data updates every 15 minutes • System status:{" "}
            <span className="text-green-600 font-medium">Normal</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-blue-600 hover:text-blue-800">
              Documentation
            </button>
            <button className="text-blue-600 hover:text-blue-800">
              API Status
            </button>
            <button className="text-blue-600 hover:text-blue-800">
              Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

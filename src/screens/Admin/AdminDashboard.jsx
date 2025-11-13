import React, { useEffect, useState } from "react";
import { getAdminStats } from "../../api";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getAdminStats();
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  if (!stats) return <p>Loading dashboard...</p>;

  // ✅ Pie chart data
  const userData = [
    { name: "Premium Users", value: stats.premiumUsers },
    { name: "Free Users", value: stats.totalUsers - stats.premiumUsers },
  ];

  const songData = [
  { name: "Admin Songs", value: stats.dbSongs },
  { name: "Static Songs", value: 9 }, // ✅ set static songs to 9 manually
];

  const COLORS = ["#00C49F", "#FF8042", "#0088FE", "#FFBB28"];

  return (
    <div className="admin-dashboard">
      <h2>📊 Admin Analytics Dashboard</h2>

      <div className="cards">
        <div className="card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="card">
          <h3>Premium Users</h3>
          <p>{stats.premiumUsers}</p>
        </div>
        <div className="card">
          <h3>Total Songs</h3>
          <p>{stats.dbSongs + 9}</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-box">
          <h3>User Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={userData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {userData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Song Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={songData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {songData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index + 1 % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

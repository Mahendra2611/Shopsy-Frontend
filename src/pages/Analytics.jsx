import { useEffect, useState, useMemo } from "react";
import { FaChartLine, FaShoppingCart, FaRupeeSign } from "react-icons/fa";
import useAPI from "../hooks/useAPI";
import { useParams } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const { shopId } = useParams();
  const { callApi } = useAPI();
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  
  useEffect(() => {
    if (!analytics?.dailyStats) return;
  
    // Compute daily stats
    const last7Days = analytics.dailyStats.slice(-7).map(day => ({
      date: new Date(day.date).toLocaleDateString(),
      quantitySold: day.quantitySold,
      profit: day.profit,
    }));
  
    // Compute monthly stats
    const monthlyStats = {};
    analytics.dailyStats.forEach(day => {
      const month = new Date(day.date).toLocaleString("default", { month: "short", year: "numeric" });
      if (!monthlyStats[month]) {
        monthlyStats[month] = { month, quantitySold: 0, profit: 0 };
      }
      monthlyStats[month].quantitySold += day.quantitySold;
      monthlyStats[month].profit += day.profit;
    });
  
    // Compute yearly stats
    const yearlyStats = {};
    analytics.dailyStats.forEach(day => {
      const year = new Date(day.date).getFullYear();
      if (!yearlyStats[year]) {
        yearlyStats[year] = { year, quantitySold: 0, profit: 0 };
      }
      yearlyStats[year].quantitySold += day.quantitySold;
      yearlyStats[year].profit += day.profit;
    });
  
    // Update state in a single batch
    setDailyData(last7Days);
    setMonthlyData(Object.values(monthlyStats));
    setYearlyData(Object.values(yearlyStats));
  
  }, [analytics?.dailyStats]); // Runs only when `analytics.dailyStats` changes
  
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await callApi({
          url: `api/analytics/${shopId}`,
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        setAnalytics(response.salesAnalytics);
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      }
    };
    fetchAnalytics();
  }, [shopId]);

  if (!analytics) {
    return <p className="text-center text-gray-500">Loading analytics...</p>;
  }


  return (
    <div className="p-6 max-w-6xl mx-auto bg-background-light dark:bg-background-dark min-h-screen transition-all">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Shop Analytics</h2>
  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md flex items-center gap-3">
          <FaShoppingCart size={28} />
          <div>
            <p className="text-sm">Total Quantity Sold</p>
            <h3 className="text-lg font-semibold">{analytics?.totalQuantitySold}</h3>
          </div>
        </div>
  
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md flex items-center gap-3">
          <FaRupeeSign size={28} />
          <div>
            <p className="text-sm">Total Profit</p>
            <h3 className="text-lg font-semibold">₹{analytics?.totalProfit}</h3>
          </div>
        </div>
  
        <div className="bg-purple-500 text-white p-4 rounded-lg shadow-md flex items-center gap-3">
          <FaChartLine size={28} />
          <div>
            <p className="text-sm">Total Sales Days</p>
            <h3 className="text-lg font-semibold">{analytics?.dailyStats?.length}</h3>
          </div>
        </div>
      </div>
  
      {/* 📊 Daily Sales Chart */}
      <div className="mt-6 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg transition-all">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Daily Sales (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantitySold" fill="#8884d8" name="Quantity Sold" />
            <Bar dataKey="profit" fill="#82ca9d" name="Profit (₹)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
  
      {/* 📅 Monthly Sales Chart */}
      <div className="mt-6 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg transition-all">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Monthly Sales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="quantitySold" stroke="#8884d8" name="Quantity Sold" />
            <Line type="monotone" dataKey="profit" stroke="#82ca9d" name="Profit (₹)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
  
      {/* 📆 Yearly Sales Chart */}
      <div className="mt-6 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg transition-all">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Yearly Sales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={yearlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantitySold" fill="#8884d8" name="Quantity Sold" />
            <Bar dataKey="profit" fill="#82ca9d" name="Profit (₹)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
  
      {/* Sales Data Table */}
      <div className="mt-6 bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-all">
        <table className="w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr className="text-gray-700 dark:text-gray-300">
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Quantity Sold</th>
              <th className="py-2 px-4">Profit</th>
            </tr>
          </thead>
          <tbody>
            {analytics?.dailyStats?.map((day, index) => (
              <tr key={index} className="border-t border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200">
                <td className="py-2 px-4">{new Date(day.date).toLocaleDateString()}</td>
                <td className="py-2 px-4">{day.quantitySold}</td>
                <td className="py-2 px-4">₹{day.profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default Analytics;

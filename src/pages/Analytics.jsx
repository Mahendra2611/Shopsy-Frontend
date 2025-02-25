import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Sun, Moon, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";

const data = [
  { month: "Jan", sales: 12000, profit: 5000 },
  { month: "Feb", sales: 15000, profit: 6000 },
  { month: "Mar", sales: 18000, profit: 7500 },
  { month: "Apr", sales: 21000, profit: 9000 },
  { month: "May", sales: 25000, profit: 11000 },
];

export default function Analytics() {
  

  return (
    <div className="dark:bg-gray-900 dark:text-white bg-white text-gray-900 min-h-screen p-6 transition-all">
      {/* Toggle Dark Mode */}
      {/* <button 
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 transition-all"
      >
        {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-900" />}
      </button> */}

      <h1 className="text-2xl font-semibold mt-4">Sales & Profit Analytics</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center space-x-4">
          <ShoppingCart className="w-10 h-10 text-blue-500" />
          <div>
            <p className="text-lg font-semibold">Total Sales</p>
            <p className="text-2xl font-bold">₹ 92,000</p>
          </div>
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center space-x-4">
          <DollarSign className="w-10 h-10 text-green-500" />
          <div>
            <p className="text-lg font-semibold">Total Profit</p>
            <p className="text-2xl font-bold">₹ 39,500</p>
          </div>
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center space-x-4">
          <TrendingUp className="w-10 h-10 text-yellow-500" />
          <div>
            <p className="text-lg font-semibold">Best-Selling Month</p>
            <p className="text-2xl font-bold">May (₹ 25,000)</p>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mt-6">
        <h2 className="text-xl font-semibold">Monthly Sales & Profit</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} className="mt-4">
            <XAxis dataKey="month"  />
            <YAxis  />
            <Tooltip />
            <Bar dataKey="sales" fill="#3b82f6" />
            <Bar dataKey="profit" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

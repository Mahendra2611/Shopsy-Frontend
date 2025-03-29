import { BarChart, LineChart, PieChart } from "lucide-react";

export default function AnalyticsSkeleton() {
  return (
    <div className="p-6 w-[100vw] h-[100vh] bg-white dark:bg-gray-900 rounded-2xl shadow-lg border dark:border-gray-700 max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        📊 Analytics Overview
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl flex flex-col items-center justify-center shadow">
          <BarChart className="w-10 h-10 text-blue-500" />
          <p className="text-gray-700 dark:text-gray-300 mt-2">Sales Performance</p>
          <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded mt-1 animate-pulse"></div>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl flex flex-col items-center justify-center shadow">
          <LineChart className="w-10 h-10 text-green-500" />
          <p className="text-gray-700 dark:text-gray-300 mt-2">User Growth</p>
          <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded mt-1 animate-pulse"></div>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl flex flex-col items-center justify-center shadow">
          <PieChart className="w-10 h-10 text-purple-500" />
          <p className="text-gray-700 dark:text-gray-300 mt-2">Revenue Share</p>
          <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded mt-1 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

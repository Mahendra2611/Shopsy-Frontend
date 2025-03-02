import { useEffect, useState } from "react";
import { FaChartLine, FaShoppingCart, FaRupeeSign } from "react-icons/fa";
import useAPI from "../hooks/useAPI";
import { useParams } from "react-router-dom";

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const {shopId} = useParams();
const {callApi} = useAPI();
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await callApi({
          url: `api/analytics/${shopId}`,
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        setAnalytics(response.data);
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
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Shop Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Quantity Sold */}
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md flex items-center gap-3">
          <FaShoppingCart size={28} />
          <div>
            <p className="text-sm">Total Quantity Sold</p>
            <h3 className="text-lg font-semibold">{analytics.totalQuantitySold}</h3>
          </div>
        </div>
        {/* Total Profit */}
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md flex items-center gap-3">
          <FaRupeeSign size={28} />
          <div>
            <p className="text-sm">Total Profit</p>
            <h3 className="text-lg font-semibold">₹{analytics.totalProfit}</h3>
          </div>
        </div>
        {/* Sales Trend */}
        <div className="bg-purple-500 text-white p-4 rounded-lg shadow-md flex items-center gap-3">
          <FaChartLine size={28} />
          <div>
            <p className="text-sm">Total Sales Days</p>
            <h3 className="text-lg font-semibold">{analytics.dailyStats.length}</h3>
          </div>
        </div>
      </div>
      {/* Sales Data Table */}
      <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Quantity Sold</th>
              <th className="py-2 px-4">Profit</th>
            </tr>
          </thead>
          <tbody>
            {analytics.dailyStats.map((day, index) => (
              <tr key={index} className="border-t">
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

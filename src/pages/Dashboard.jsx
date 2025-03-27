import { useState, useEffect } from "react";
import {PlusCircle, PackageCheck,Package,ShoppingCart,BarChart,AlertTriangle,User,} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAPI from "../hooks/useAPI";
import { DashboardSkeleton } from "../components/common/Skeleton";


const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ totalProducts: 0, lowStock: 0, pendingOrders: 0 });
  const { callApi, loading ,error} = useAPI();

  useEffect(() => {
    const fetchStats = async () => {
      const data = await callApi({
        url: "api/dashboard/stats",
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (data) {
        setStats({
          totalProducts: data?.totalProducts || 0,
          lowStock: data?.lowStock || 0,
          pendingOrders: data?.pendingOrders || 0,
        });
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  const menuItems = [
    { label: "Products", icon: Package, path: "/dashboard/products" },
    { label: "Orders", icon: ShoppingCart, path: "/dashboard/orders" },
    { label: "Analytics", icon: BarChart, path: "/dashboard/analytics/65d8c8e2a4f3b6b4c8a54321" },
    { label: "Low Stock", icon: AlertTriangle, path: "/dashboard/low-stock" },
    { label: "Profile", icon: User, path: "/dashboard/profile" },
  ];

  const statCards = [
    { label: "Total Products", value: stats.totalProducts, color: "from-blue-500 to-indigo-600", path: "/dashboard/products" },
    { label: "Low Stock Items", value: stats.lowStock, color: "from-yellow-500 to-orange-600", path: "/dashboard/low-stock" },
    { label: "Pending Orders", value: stats.pendingOrders, color: "from-green-500 to-emerald-600", path: "/dashboard/orders" },
  ];

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      {/* Sidebar */}
      <div
        className={`fixed top-16 md:top-0 left-0 h-[100vh] w-64 bg-white dark:bg-gray-900 shadow-xl p-6 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-60`}
      >
        <h2 className="text-xl text-center font-heading font-bold text-gray-700 dark:text-gray-200 mb-6">Dashboard</h2>
        <ul className="space-y-4 pl-2 dark:text-white">
          {menuItems.map(({ label, icon: Icon, path }) => (
            <li
              key={label}
              className="flex items-center font-sub-heading gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-500"
              onClick={() => navigate(path)}
            >
              <Icon size={20} className="text-gray-600 dark:text-gray-300" />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sidebar Toggle Button */}
      <button
        className="z-100 fixed left-0 md:hidden  top-1/2  transform  -translate-x-14 rotate-90 bg-gradient-to-r from-blue-500 to-purple-500  text-white px-4 py-2 rounded-t-lg shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "Close Dashboard" : "Open Dashboard"}
      </button>


      {/* Main Content */} 
      <div className="flex-1 pl-8 pr-4">
        <h2 className="text-2xl md:text-3xl mt-2 text-center font-heading font-bold md:font-extrabold text-gray-800 dark:text-gray-100 mb-6">Shop Dashboard</h2>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            className="flex hover:cursor-pointer font-sub-heading items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 text-white font-bold py-3 rounded-lg shadow-lg transition-all text-lg tracking-wide"
            onClick={() => navigate("/addProducts")}
          >
            <PlusCircle className="w-6 h-6" /> Add Product
          </button>
          <button
            className="flex hover:cursor-pointer items-center font-sub-heading justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-cyan-600 hover:to-teal-500 text-white font-bold py-3 rounded-lg shadow-lg transition-all text-lg tracking-wide"
            onClick={() => navigate("/dashboard/orders")}
          >
            <PackageCheck className="w-6 h-6" /> Handle Orders
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {statCards.map(({ label, value, color, path }) => (
            <div key={label} className={`bg-gradient-to-r ${color} text-white p-4 rounded-lg shadow-lg`}>
              <h3 className="text-sm font-sub-heading md:text-lg font-semibold">{label}</h3>
              <p className="text-2xl font-bold">{value}</p>
              <button
                className="mt-2 hover:cursor-pointer text-black bg-white px-3 py-1 rounded-md"
                onClick={() => navigate(path)}
              >
                Visit {label}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
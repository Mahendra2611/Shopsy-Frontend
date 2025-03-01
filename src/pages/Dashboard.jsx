import { useState } from "react";
import { Package, ShoppingCart, BarChart, AlertTriangle, User, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const navigate = useNavigate();
  const { shopDetails } = useSelector((state) => state.shop);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      {/* Sidebar */}
    

<div className={`fixed top-16 md:top-0  left-0 h-[100vh] w-64 bg-white dark:bg-gray-900 shadow-xl p-6 transition-transform transform ${
    sidebarOpen ? "translate-x-0" : "-translate-x-full"
  } md:relative md:translate-x-0 md:w-60`}
>
  <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-6">Dashboard</h2>
  
  <ul className="space-y-4 dark:text-white">
    <li className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-500" onClick={() => navigate("/dashboard/products")}>
      <Package size={20} className="text-gray-600 dark:text-gray-300" />
      <span>Products</span>
    </li>
    
    <li className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-500" onClick={() => navigate("/dashboard/orders")}>
      <ShoppingCart size={20} className="text-gray-600 dark:text-gray-300" />
      <span>Orders</span>
    </li>
    
    <li className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-500" onClick={() => navigate("/dashboard/analytics")}>
      <BarChart size={20} className="text-gray-600 dark:text-gray-300" />
      <span>Analytics</span>
    </li>
    
    <li className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-500" onClick={() => navigate("/dashboard/low-stock")}>
      <AlertTriangle size={20} className="text-gray-600 dark:text-gray-300" />
      <span>Low Stock</span>
    </li>
    
    <li className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-500" onClick={() => navigate("/dashboard/profile")}>
      <User size={20} className="text-gray-600 dark:text-gray-300" />
      <span>Profile</span>
    </li>
    
    <li className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-500" onClick={() => navigate("/dashboard/settings")}>
      <Settings size={20} className="text-gray-600 dark:text-gray-300" />
      <span>Account Settings</span>
    </li>
  </ul>
</div>

      {/* Sidebar Toggle Button */}
      <button 
  className="fixed right-6 top-1/2 md:hidden transform translate-y-1/2 rotate-90 bg-blue-500 text-white px-4 py-2 rounded-b-lg shadow-lg  origin-right"
  onClick={() => setSidebarOpen(!sidebarOpen)}
>
  {sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
</button>



      {/* Main Content */}
      <div className="flex-1 p-6  ">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Shop Dashboard</h2>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
  <button
    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 text-white font-bold py-3 rounded-lg shadow-lg transition-all text-lg tracking-wide "
    onClick={() => navigate("/addProducts")}
  >
    Add Product
  </button>

  <button
    className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-cyan-600 hover:to-teal-500 text-white font-bold py-3 rounded-lg shadow-lg transition-all text-lg tracking-wide "
    onClick={() => navigate("/dashboard/orders")}
  >
    Handle Orders
  </button>
</div>



        {/* Stats Cards */}
        <div className="grid  grid-cols-1  md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-lg shadow-lg">
            <h3 className="text-sm md:text-lg font-semibold">Total Products</h3>
            <p className="text-2xl font-bold">{shopDetails?.items?.length || 0}</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-4 rounded-lg shadow-lg">
            <h3 className="text-sm md:text-lg font-semibold">Low Stock Items</h3>
            <p className="text-2xl font-bold">3</p>
            <button className="mt-2 text-yellow-900 bg-white px-3 py-1 rounded-md" onClick={() => navigate("/dashboard/low-stock")}>Manage Stock</button>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-lg shadow-lg">
            <h3 className="text-sm md:text-lg font-semibold">Pending Orders</h3>
            <p className="text-2xl font-bold">5</p>
            <button className="mt-2 text-green-900 bg-white px-3 py-1 rounded-md" onClick={() => navigate("/dashboard/orders")}>Handle Orders</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
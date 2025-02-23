import { Package, ShoppingCart, Hourglass, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen px-1 sml:p-6 bg-background-light dark:bg-background-dark">
    <div className="max-w-5xl mx-auto bg-card-light dark:bg-card-dark shadow-2xl rounded-2xl p-8">
      <h2 className="text-3xl font-extrabold text-heading-light dark:text-heading-dark mb-6 text-center">
        Shop Dashboard
      </h2>
  
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white py-3 rounded-lg shadow-lg transition-all">
          Manage Products
        </button>
        <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 text-white py-3 rounded-lg shadow-lg transition-all">
          View Orders
        </button>
        <button onClick={()=>navigate("/addProducts")} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 text-white py-3 rounded-lg shadow-lg transition-all">
          Add Product
        </button>
      </div>
  
    
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  <div className=" bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all flex items-center justify-between">
    <div>
      <h3 className="text-lg font-semibold">Total Products</h3>
      <p className="text-3xl font-extrabold mt-2">24</p>
    </div>
    <Package className="w-12 h-12 text-white opacity-80" />
  </div>

  <div className="relative bg-gradient-to-br from-green-500 to-green-700 dark:from-green-600 dark:to-green-800 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all flex items-center justify-between">
    <div>
      <h3 className="text-lg font-semibold">Total Orders</h3>
      <p className="text-3xl font-extrabold mt-2">15</p>
    </div>
    <ShoppingCart className="w-12 h-12 text-white opacity-80" />
  </div>

  <div className="relative bg-gradient-to-br from-yellow-500 to-orange-500 dark:from-yellow-600 dark:to-orange-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all flex items-center justify-between">
    <div>
      <h3 className="text-lg font-semibold">Pending Orders</h3>
      <p className="text-3xl font-extrabold mt-2">5</p>
    </div>
    <Hourglass className="w-12 h-12 text-white opacity-80" />
  </div>

  <div className="relative bg-gradient-to-br from-red-500 to-pink-600 dark:from-red-600 dark:to-pink-700 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all flex items-center justify-between">
    <div>
      <h3 className="text-lg font-semibold">Revenue</h3>
      <p className="text-3xl font-extrabold mt-2">$1240</p>
    </div>
    <DollarSign className="w-12 h-12 text-white opacity-80" />
  </div>
</div>;

    </div>
  </div>
  
  
  );
};
export default Dashboard
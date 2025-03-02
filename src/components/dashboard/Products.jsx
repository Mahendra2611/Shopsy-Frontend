import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProducts } from "../../redux/ProductSlice";
import useAPI from "../../hooks/useAPI";
import toast from "react-hot-toast";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { callApi } = useAPI();
  const { products } = useSelector((state) => state.products);
  const shopId = "65d8c8e2a4f3b6b4c8a54321";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  

  useEffect(() => {
    const fetchProducts = async () => {
      console.log("called");
      const response = await callApi({
        url: `api/product/${shopId}/products`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
      if (response) {
        setSelectedCategory(response[0].category)
        dispatch(addProducts(response));
        toast.success("Products loaded successfully!");
      } else {
        toast.error("Failed to fetch products. Please try again.");
      }
    };
    fetchProducts();
  }, []);

  const categories = Object.keys(products || {});
  const filteredProducts = selectedCategory ? products[selectedCategory] || [] : [];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-800">
      {/* Sidebar */}
      <div className={`fixed top-16 md:top-0  left-0 h-[100vh] w-64 bg-white dark:bg-gray-900 shadow-xl p-6 transition-transform transform ${
    sidebarOpen ? "translate-x-0" : "-translate-x-full"
  } md:relative md:translate-x-0 md:w-60`}
>
        <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-6">Categories</h2>
        <ul className="spce-y-1 md:space-y-2 dark:text-white">
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-500 ${
                selectedCategory === category ? "bg-gray-300 dark:bg-gray-700" : ""
              }`}
              onClick={() => {setSelectedCategory(category);setSidebarOpen(false)}}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      

      <button 
  className="fixed right-6 top-1/2 md:hidden transform translate-y-1/2 rotate-90 bg-blue-500 text-white px-4 py-2 rounded-b-lg shadow-lg  origin-right"
  onClick={() => setSidebarOpen(!sidebarOpen)}
>
  {sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
</button>
      {/* Main Content */}
      <div className="flex-1 p-3 md:p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">
          {selectedCategory ? `${selectedCategory} Products` : "Select a Category"}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="bg-white dark:bg-gray-700 p-2 md:p-4 shadow-md rounded-lg">
                <img
                  src={product.image || "https://via.placeholder.com/150"}
                  alt={product.name}
                  className="w-full h-32 md:h-48 object-cover rounded-md"
                />
                <h3 className="text-sm md:text-lg font-semibold mt-2 text-black dark:text-white">{product.name}</h3>
                <p className="text-[13px] md:text-xl text-gray-600 dark:text-gray-300">Category: {product.category}</p>
                <p className="text-[13px] md:text-xl text-gray-600 dark:text-gray-300">Price: ₹{product.price}</p>
                <button
                  onClick={() => navigate(`/dashboard/products/details/${product._id}`)}
                  className="mt-3 w-full bg-blue-500 text-white p-1 md:py-2 rounded text-sm md:text-lg hover:bg-blue-600"
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-300">No products available for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;

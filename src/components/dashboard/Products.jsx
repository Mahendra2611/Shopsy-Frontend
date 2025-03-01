import React, { useEffect } from "react";
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

  useEffect(() => {
    const fetchProducts = async () => {
        console.log("called")
      const response = await callApi({ url: `api/product/${shopId}/products`, method: "GET", headers: { "Content-Type": "application/json" } });
      console.log(response)
      if (response) {
        dispatch(addProducts(response));
        toast.success("Products loaded successfully!"); 
      } else {
        toast.error("Failed to fetch products. Please try again.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">Products Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.length>0 && products?.map((product) => (
          <div key={product._id} className="bg-white dark:bg-gray-700 p-4 shadow-md rounded-lg">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-lg font-semibold mt-2 text-black dark:text-white">{product.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">Category: {product.category}</p>
            <p className="text-gray-600 dark:text-gray-300">Price: ₹{product.salesPrice}</p>
            <button
              onClick={() => navigate(`/products/${product._id}`)}
              className="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

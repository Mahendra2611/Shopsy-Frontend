import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProducts } from "../../redux/ProductSlice";
import useAPI from "../../hooks/useAPI";
import toast from "react-hot-toast";
import { deleteProduct } from "../../redux/ProductSlice";
import ProductDetails from "./ProductDetails";
import Skeleton from "../common/Skeleton";
import EmptyState from "../common/EmptyState";


const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { callApi ,loading} = useAPI();
  const { products } = useSelector((state) => state.products);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDetails,setShowDetails] = useState(false);
  const [product,setProduct] = useState({});

  const handleDelete = async () => {
    const response = await callApi({
      url: `api/products/delete/${product._id}`,
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    console.log(response)
    if (response) {
      dispatch(deleteProduct({ category: product.category, id: product.id }));
      toast.success("Product deleted successfully!");
      navigate("/dashboard/products");
    } else {
      //toast.error("Failed to delete product. Please try again.");
    }
    setShowConfirm(false);
    setShowDetails(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
     
      const response = await callApi({
        url: `api/products`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
     // console.log(response);
      if (response) {
        setSelectedCategory(response[0].category)
        dispatch(addProducts(response));
  
      } 
    };
    fetchProducts();
  }, []);


  const categories = Object.keys(products || {});
  const filteredProducts = selectedCategory ? products[selectedCategory] || [] : [];
  
   if(loading){
    return <Skeleton/>
   }

  return (!showDetails)?(
    <div className="flex min-h-screen pl-6 bg-gray-100 dark:bg-gray-800">
      {/* Sidebar */}
      <div className={`fixed top-16 md:top-0  left-0 h-[100vh] w-64 bg-white dark:bg-gray-900 shadow-xl p-6 transition-transform transform ${
    sidebarOpen ? "translate-x-0" : "-translate-x-full"
  } md:relative md:translate-x-0 md:w-60`}
>
        <h2 className="text-xl font-bold text-gray-700 font-heading text-center dark:text-gray-200 mb-6">Categories</h2>
        <ul className="spce-y-1 md:space-y-2 dark:text-white">
          {categories.map((category,index) => (
            <li
              key={index}
              className={`cursor-pointer font-sub-heading p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-500 ${
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
        className="z-100 fixed left-0 md:hidden  top-1/2  transform  -translate-x-14 rotate-90 bg-gradient-to-r from-blue-500 to-purple-500  text-white px-4 py-2 rounded-t-lg shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "Close Dashboard" : "Open Dashboard"}
      </button>
      {/* Main Content */}
      <div className="flex-1 p-3 md:p-6">
        <h2 className="text-2xl md:text-3xl md:font-extrabold font-bold font-heading text-center mb-6 text-black dark:text-white">
          {selectedCategory ? `${selectedCategory} Products` : "Select a Category"}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="bg-white dark:bg-gray-700 p-2 md:p-4 shadow-md rounded-lg">
                <img
                  src={product.image || "https://via.placeholder.com/150"}
                  alt={product.name}
                  className="w-full h-28 md:h-36 object-cover border-2 border-gray-400 rounded-md"
                />
                <h3 className="text-sm md:text-lg font-semibold mt-2 text-black dark:text-white">{product.name}</h3>
                <p className="text-[13px] md:text-xl text-gray-600 dark:text-gray-300">Category: {product.category}</p>
                <p className="text-[13px] md:text-xl text-gray-600 dark:text-gray-300">Price: ₹{product.salesPrice}</p>
                <button
                  onClick={() => {setShowDetails(true),setProduct(product)}}
                  className="mt-3 w-full bg-blue-500 text-white p-1 md:py-2 rounded text-sm md:text-lg hover:bg-blue-600"
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <EmptyState message="No Products Available"/>
          )}
        </div>
      </div>
    </div>
  ):(<ProductDetails product={product} handleDelete={handleDelete} showConfirm={showConfirm} setShowConfirm={setShowConfirm} navigate={navigate} loading={loading} setShowDetails={()=>setShowDetails(false)}/>);
};

export default Products;

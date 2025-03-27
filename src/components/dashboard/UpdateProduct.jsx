import { updateProduct } from "../../redux/ProductSlice";
import React, { useState } from "react";
import useAPI from "../../hooks/useAPI";
import { useNavigate, useParams } from "react-router-dom";
import { FaImage, FaMicrophone } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";



const UpdateProduct = () => {

    
  const categorizedProducts = useSelector((state) => state?.products?.products||{});
    let categories = [];
  if(categorizedProducts){
      for(const key in categorizedProducts){
        categories.push(key);
      }
    }
    const {productId }= useParams()
  let product = null;
  Object.values(categorizedProducts).forEach((category) => {
    const foundProduct = category.find((item) => item._id === productId);
    if (foundProduct) product = foundProduct;
  });

  const [formData, setFormData] = useState({
    name: product?.name ||"",
    category:product?.category || "",
    salesPrice: product?.salesPrice ||"",
    costPrice: product?.costPrice ||"",
    weight: product?.weight ||"",
    quantity: product?.quantity ||"",
    lowStockThreshold: product?.lowStockThreshold ||"",
    discount: product?.discount ||"",
    image: null,
    oldImageLink:product?.image||""
  });

  const [listeningField, setListeningField] = useState(null);
  const { callApi, loading ,error} = useAPI();
 console.log(loading)
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    console.log(e)
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const startListening = (field) => {
    setListeningField(field);
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setFormData((prev) => ({ ...prev, [field]: transcript }));
      setListeningField(null);
    };
    recognition.onerror = () => setListeningField(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    console.log(formData)
    try {
      const response = await callApi({
        url: `api/products/update/${productId}`,
        method: "PUT",
        data: formDataToSend,
      });
     
      if (response) {
       
        navigate("/dashboard/products");
      }
    } catch (err) {
     
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4">
  <div className="w-full max-w-lg p-6 sm:p-8 bg-white dark:bg-gray-900 shadow-xl rounded-2xl">
    <h2 className="text-3xl font-bold text-center font-heading mb-6 text-gray-900 dark:text-white">Update Product</h2>

    <form  className="space-y-5">
      {[
        { name: "name", label: "Product Name" },
        { name: "salesPrice", label: "Sales Price" },
        { name: "costPrice", label: "Cost Price" },
        { name: "weight", label: "Weight (e.g., 500g)" },
        { name: "quantity", label: "Quantity" },
        { name: "lowStockThreshold", label: "Low Stock Threshold" },
        { name: "discount", label: "Discount (e.g., 10 for 10%)" },
      ].map((field, index) => (
        <div key={index} className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {field.label}
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-100 dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500">
            <input
              type="text"
              name={field.name}
              placeholder={field.label}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              required
            />
            <button type="button" onClick={() => startListening(field.name)} className="ml-2">
              <FaMicrophone
                className={listeningField === field.name ? "text-red-500 animate-pulse" : "text-gray-500"}
              />
            </button>
          </div>
        </div>
      ))}

      {/* Category Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          required
        >

          <option value="" className="text-gray-500">Select Category</option>
          {categories.map((category)=>{
            return (<option value={category}>{category.replace(/^./,(str)=>str.toUpperCase())}</option>)
          })}
        
        </select>
      </div>

      {/* File Upload */}
      <div className="flex flex-col items-center border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg p-4 cursor-pointer">
        <label className="flex items-center space-x-2 text-gray-700 dark:text-white">
          <FaImage className="text-gray-500 dark:text-gray-300 text-lg" />
          <span>Upload Product Image</span>
        </label>
        <input type="file" name="image" onChange={handleFileChange} className="text-black dark:text-white text-center" required />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 rounded-lg hover:from-indigo-500 hover:to-blue-500 transition-all flex justify-center items-center"
        disabled={loading}
      >
        {loading ? (
          <svg className="animate-spin h-5 w-5 mr-2 border-4 border-white border-t-transparent rounded-full" />
        ) : (
          "Update Product"
        )}
      </button>
    </form>
  </div>
</div>

  );
};

export default UpdateProduct;

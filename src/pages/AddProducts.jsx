import React, { useState } from "react";
import useAPI from "../hooks/useAPI";
import { useNavigate } from "react-router-dom";
import { FaImage, FaMicrophone } from "react-icons/fa";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    salesPrice: "",
    costPrice: "",
    weight: "",
    quantity: "",
    lowStockThreshold: "",
    discount: "",
    image: null,
  });

  const [listeningField, setListeningField] = useState(null);
  const { callApi, loading } = useAPI();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
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

    try {
      const response = await callApi({
        url: "api/product/add",
        method: "POST",
        data: formDataToSend,
      });

      if (response) {
        toast.success("Product added successfully!");
        navigate("/dashboard/products");
      } else {
        toast.error("Error adding product");
      }
    } catch (err) {
      toast.error("Error adding product");
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
      <div className="w-full max-w-md p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "salesPrice", "costPrice", "weight", "quantity", "lowStockThreshold", "discount"].map((field, index) => (
  <div key={index} className="flex items-center border rounded p-2 bg-gray-100 dark:bg-gray-700">
    <input
      type="text"
      name={field}
      placeholder={`${field.replace(/([A-Z])/g, " $1")} ${field === "weight" ? "(e.g., 500g)" : (field === "discount" ? "(e.g 10 for 10%)":"")}`}
      value={formData[field]}
      onChange={handleChange}
      className="w-full bg-transparent outline-none text-black dark:text-white"
      required
    />
    <button type="button" onClick={() => startListening(field)} className="ml-2">
      <FaMicrophone className={listeningField === field ? "text-red-500 animate-pulse" : "text-gray-500"} />
    </button>
  </div>
))}

{/* Category Dropdown */}
<div className="flex items-center border rounded p-2 bg-gray-100 dark:bg-gray-700">
  <select
    name="category"
    value={formData.category}
    onChange={handleChange}
    className="w-full bg-transparent outline-none text-black dark:text-white"
    required
  >
    <option value="">Select Category</option>
    <option value="grocery">Grocery</option>
    <option value="electronics">Electronics</option>
    <option value="clothing">Clothing</option>
    <option value="accessories">Accessories</option>
  </select>
</div>


          {/* File Upload */}
          <label className="flex items-center cursor-pointer bg-gray-200 dark:bg-gray-600 p-2 rounded justify-center">
            <FaImage className="text-gray-600 dark:text-white mr-2" />
            <span className="text-gray-700 dark:text-white">Upload Product Image</span>
            <input type="file" name="image" onChange={handleFileChange} className="hidden" required />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2 border-4 border-white border-t-transparent rounded-full" />
            ) : (
              "Add Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

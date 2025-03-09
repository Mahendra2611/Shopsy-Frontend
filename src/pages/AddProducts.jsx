import React, { useEffect, useState } from "react";
import useAPI from "../hooks/useAPI";
import { useNavigate } from "react-router-dom";
import { Mic, MicOff, Upload, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AddProduct = () => {
 // console.log(availableCategories)
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
const [availableCategories,setCategories] = useState([]);
  const [listeningField, setListeningField] = useState(null);
  const { callApi, loading ,error} = useAPI();
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
        url: "api/products/add",
        method: "POST",
        data: formDataToSend,
        headers:{"Content-Type":"multipart/form-data"}
      });
      if (response) {
       // toast.success("Product added successfully!");
        navigate("/dashboard");
      }
    } catch (err) {
      //toast.error("Error adding product");
    }
  };
  useEffect(()=>{
   const getCategories = async()=>{
      const data = await callApi({
        url: "api/products/categories",
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      console.log(data);
      if (data) {
        setCategories(data?.categories?.itemCategories        );
      }
    }
    getCategories();
  },[])
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 sm:p-8 bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">Add Product</h2>
        <form  className="space-y-5">
  {["name", "salesPrice", "costPrice", "weight", "quantity", "lowStockThreshold", "discount"].map((field, index) => (
    <div key={index}>
      <label htmlFor={field} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
      </label>
      <div className="flex items-center border rounded-lg p-3 bg-gray-200 dark:bg-gray-700 mt-1">
        <input
          id={field}
          type="text"
          name={field}
          placeholder={
            `${field.replace(/([A-Z])/g, " $1")} ${
              field === "weight"
                ? "(e.g., 500g)"
                : field === "discount"
                ? "(e.g 10 for 10%)"
                : ""
            }`
          }
          value={formData[field]}
          onChange={handleChange}
          className="w-full bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400"
          required
        />
        <button type="button" onClick={() => startListening(field)} className="ml-2">
          {listeningField === field ? (
            <Mic className="text-red-500 animate-pulse" />
          ) : (
            <MicOff className="text-gray-500" />
          )}
        </button>
      </div>
    </div>
  ))}

  {/* Category Dropdown */}
  <div>
    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Category
    </label>
    <div className="flex items-center border rounded-lg p-3 bg-gray-200 dark:bg-gray-700 mt-1">
      <select
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full bg-transparent outline-none dark:bg-gray-900 text-gray-900 dark:text-white"
        required
      >
        <option value="">Select Category</option>
        {availableCategories?.map((category, index) => (
          <option key={index} value={category} >
            {category.replace(/^./, (str) => str.toUpperCase())}
          </option>
        ))}
      </select>
    </div>
  </div>

  {/* File Upload */}
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Product Image
    </label>
    <label className="flex items-center cursor-pointer bg-gray-300 dark:bg-gray-600 p-3 rounded-lg justify-center hover:bg-gray-400 dark:hover:bg-gray-500 mt-1">
      <Upload className="text-gray-700 dark:text-white mr-2" />
      <span className="text-gray-700 dark:text-white">Upload Product Image</span>
      <input type="file" name="image" onChange={handleFileChange} className="hidden" required />
    </label>
  </div>

  {/* Submit Button */}
  <button
    onClick={handleSubmit}
    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 flex justify-center items-center font-semibold mt-2"
    disabled={loading}
  >
    {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Add Product"}
  </button>
</form>

      </div>
    </div>
  );
};

export default AddProduct;
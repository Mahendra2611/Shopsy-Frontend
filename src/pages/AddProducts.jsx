import React, { useState, useRef } from "react";
import { UploadCloud, Mic, MicOff } from "lucide-react";
import { AiOutlineTag, AiOutlineDollar, AiOutlineNumber, AiOutlineInbox, AiOutlinePercentage, AiOutlineShop } from "react-icons/ai";
import { MdOutlinePriceChange, MdOutlineCategory } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useAPI from "../hooks/useAPI";
import toast from "react-hot-toast";
import Input from "../components/common/Input";
import { useSelector, useDispatch } from "react-redux";
import { addShopDetails } from "../redux/ShopSlice";

const AddProducts = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    salesPrice: "",
    costPrice: "",
    quantity: "",
    image: null,
    discount: "",
    newCategory: "",
  });

  const { shopDetails } = useSelector((state) => state.shop);
  const [categories, setCategories] = useState(shopDetails.itemsCategories || []);
  const { callApi, loading } = useAPI();
  const navigate = useNavigate();
  const { shop } = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const [listening, setListening] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const recognitionRef = useRef(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  // Handle adding a new category
  const handleAddCategory = () => {
    if (formData.newCategory.trim() && !categories.includes(formData.newCategory.trim())) {
      setCategories([...categories, formData.newCategory.trim()]);
      setFormData({ ...formData, category: formData.newCategory.trim(), newCategory: "" });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "newCategory") {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await callApi({
        url: `api/items/${shop._id}/items`,
        method: "POST",
        data: formDataToSend,
      });

      if (response) {
        dispatch(addShopDetails(response.shopDetails));
        navigate("/dashboard");
      } else {
        toast.error("Error while adding product");
      }
    } catch (err) {
      toast.error("Error while adding product");
    }
  };

  // Start voice recognition
  const startListening = (field) => {
    if (!("webkitSpeechRecognition" in window)) {
      toast.error("Speech recognition not supported in this browser");
      return;
    }

    setCurrentField(field);
    setListening(true);

    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setFormData((prev) => ({ ...prev, [field]: prev[field] + " " + transcript }));
    };

    recognitionRef.current.onend = () => {
      setListening(false);
    };

    recognitionRef.current.start();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      {/* Mic Status Indicator */}
      {listening && (
        <div className="fixed top-16 right-5 bg-red-500 text-white p-2 rounded-full shadow-lg flex items-center">
          <Mic className="w-6 h-6" />
        </div>
      )}

      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white mb-4">Add a New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div className="relative">
          
            <Input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className="pl-10"
              onFocus={() => startListening("name")}
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <div className="relative">
             
              <select
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                required
                className="w-full p-2 pl-10 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white"
              >
                <option value="" disabled>Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price, Cost Price & Quantity */}
          <div className="grid grid-cols-3 gap-4">
            <div className="relative">
            
              <Input
                type="number"
                name="salesPrice"
                placeholder="Sales Price"
                value={formData.salesPrice}
                onChange={handleChange}
                className="pl-10"
                onFocus={() => startListening("salesPrice")}
              />
            </div>
            <div className="relative">
            
              <Input
                type="number"
                name="costPrice"
                placeholder="Cost Price"
                value={formData.costPrice}
                onChange={handleChange}
                className="pl-10"
                onFocus={() => startListening("costPrice")}
              />
            </div>
            <div className="relative">
             
              <Input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="pl-10"
                onFocus={() => startListening("quantity")}
              />
            </div>
          </div>

          {/* Discount */}
          <div className="relative">
           
            <Input
              type="number"
              name="discount"
              placeholder="Discount %"
              value={formData.discount}
              onChange={handleChange}
              className="pl-10"
              onFocus={() => startListening("discount")}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 flex justify-center items-center">
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;

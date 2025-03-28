import React, { useState } from 'react';
import useAPI from '../hooks/useAPI';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaStore, FaMapMarkerAlt, FaList, FaImage, FaMicrophone } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { addOwner } from '../redux/AuthSlice';
import { availableCategories } from '../utils/helpers.js';
const RegisterShop = () => {
  const [formData, setFormData] = useState({
    shopName: '',
    shopAddress: '',
    ownerName: '',
    email: '',
    mobileNumber: '',
    password: '',
    shopCategory:'',
    itemCategories: [],
    shopImage:'',
    shopLocation: { type: 'Point', coordinates: [0, 0] },
    openingTime:'',
    closingTime:''

  });
console.log(formData)
  const [listeningField, setListeningField] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  const dispatch = useDispatch();
  const { callApi, loading } = useAPI();
  const navigate = useNavigate();
console.log(formData)
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name} ${value}`)
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const addCategory = () => {
    if (newCategory && !formData.itemCategories.includes(newCategory)) {
      setFormData({ ...formData, itemCategories: [...formData.itemCategories, newCategory] });
    }
    setNewCategory("");
  };

  // Handle Category Removal
  const removeCategory = (category) => {
    setFormData({
      ...formData,
      itemCategories: formData.itemCategories.filter((cat) => cat !== category),
    });
  };


  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prev) => ({
            ...prev,
            shopLocation: { coordinates: [latitude, longitude] },
          }));
          toast.success("Location fetched successfully!");
        },
        (error) => {
          toast.error("Failed to get location");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  };
  
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, shopImage: e.target.files[0] }));
  };

  const validateForm = () => {
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      toast.error("Mobile number must be 10 digits");
      return false;
    }
    if (formData.password.length < 5) {
      toast.error("Password must be at least 5 characters long");
      return false;
    }
    return true;
  };
 // console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    console.log(formData)
    try {
      const response = await callApi({
        url: "api/owner/register",
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response) {
        toast.success("Login successful!");
      console.log(response)
      const owner = {"email":response.owner.email,"name":response.owner.ownerName}
      console.log(owner);
      localStorage.setItem("owner", JSON.stringify(owner));
      dispatch(addOwner(owner));
     
      navigate("/dashboard");
      } else {
        toast.error("Error registering shop");
      }
    } catch (err) {
      toast.error(err?.message||"Error while registring") ;
    }
  };

  //mic function
  const startListening = (field) => {
    setListeningField(field);
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setFormData((prev) => ({ ...prev, [field]: transcript }));
      setListeningField(null);
    };
    recognition.onerror = () => setListeningField(null);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
      <div className="w-full max-w-md p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">Register Shop</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['shopName', 'shopAddress', 'ownerName', 'email', 'mobileNumber'].map((field, index) => 
          { const formattedLabel = field
           .replace(/([A-Z])/g, ' $1') 
           .replace(/^./, (char) => char.toUpperCase()); 
          return (
            <div>
              <label className="block text-gray-700 dark:text-gray-300">{formattedLabel}</label>
            <div key={index} className="flex items-center border rounded p-2 bg-gray-100 dark:bg-gray-700">
              <input
                type="text"
                name={field}
                placeholder={field.replace(/([A-Z])/g, ' $1')}
                value={formData[field]}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-black dark:text-white"
                required
              />
              <button type="button" onClick={() => startListening(field)} className="ml-2">
                <FaMicrophone className={listeningField === field ? "text-red-500 animate-pulse" : "text-gray-500"} />
              </button>
            </div>
            </div>
          )})}

          {/* shop category */}
          <div>
              <label className="block text-gray-700 dark:text-gray-300">Shop Category</label>
              <select
                name="shopCategory"
                value={formData.shopCategory}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black dark:text-white bg-gray-100 dark:bg-gray-800"
              >
                {availableCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            {/* Opening and closing Timing */}
            <div className="block text-gray-700 dark:text-gray-300">
            <label className="block text-gray-700 dark:text-gray-300">Opening Time</label>
            <input 
  type="time" 
  name="openingTime" 
  onChange={(e) => setFormData({ ...formData, openingTime: e.target.value })} 
  required 
  className="border p-2 rounded w-full"
/>
<label className="block text-gray-700 dark:text-gray-300">Closing Time</label>
<input 
  type="time" 
  name="closingTime" 
  onChange={(e) => setFormData({ ...formData, closingTime: e.target.value })} 
  required 
  className="border p-2 rounded w-full mt-2"
/>

            </div>

<div>
              <label className="block text-gray-700 dark:text-gray-300">Product Categories</label>
              <div className="flex flex-wrap gap-2">
                {formData.itemCategories.map((category, index) => (
                  <span
                    key={index}
                    className="bg-blue-500 text-white px-2 py-1 rounded flex items-center space-x-1"
                  >
                    {category}
                    <button
                      type="button"
                      className="ml-1 text-sm text-white hover:text-red-500"
                      onClick={() => removeCategory(category)}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex mt-2 dark:text-white">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Add new category"
                  className="w-full p-2 border  rounded bg-gray-100 dark:bg-gray-800"
                />
                <button
                  type="button"
                  onClick={addCategory}
                  className="ml-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Add
                </button>
              </div>
            </div>
          {/* Password Field - No Mic */}
          <div className="flex items-center border rounded p-2 bg-gray-100 dark:bg-gray-700">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-black dark:text-white"
              required
            />
          </div>

          {/* Location Input (Latitude & Longitude) */}
          <div className="flex items-center border rounded p-2 bg-gray-100 dark:bg-gray-700">
  <input
    type="number"
    step="any"
    placeholder="Latitude"
    value={formData.shopLocation?.coordinates[0] || ""}
    readOnly
    className="w-full bg-transparent outline-none text-black dark:text-white"
    required
  />
  <input
    type="number"
    step="any"
    placeholder="Longitude"
    value={formData.shopLocation?.coordinates[1] || ""}
    readOnly
    className="w-full bg-transparent outline-none text-black dark:text-white"
    required
  />
  <button
    type="button"
    onClick={fetchLocation}
    className="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
  >
    Get Location
  </button>
</div>


          {/* File Upload */}
          <label className="flex items-center cursor-pointer bg-gray-200 dark:bg-gray-600 p-2 rounded justify-center">
            <FaImage className="text-gray-600 dark:text-white mr-2" />
            <span className="text-gray-700 dark:text-white">Upload Shop Image</span>
            <input type="file" name="shopImage" onChange={handleFileChange} className="hidden" required />
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
              "Register Shop"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterShop;

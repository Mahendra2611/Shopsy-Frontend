import React, { useState } from 'react';
import useAPI from '../hooks/useAPI';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaStore, FaMapMarkerAlt, FaList, FaImage, FaMicrophone } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addShop } from '../redux/ShopSlice';
import toast from 'react-hot-toast';

const RegisterShop = () => {
  const [formData, setFormData] = useState({
    shopName: '',
    shopAddress: '',
    ownerName: '',
    email: '',
    mobileNumber: '',
    password: '',
    shopCategory: '',
    itemCategories: '',
    shopImage: null,
    shopLocation: { type: 'Point', coordinates: [0, 0] },
  });

  const [listeningField, setListeningField] = useState(null);

  const dispatch = useDispatch();
  const { callApi, loading } = useAPI();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await callApi({
        url: "api/owner/register",
        method: "POST",
        data: formDataToSend
      });

      if (response) {
        dispatch(addShop(response.shop));
        navigate("/dashboard");
      } else {
        toast.error("Error registering shop");
      }
    } catch (err) {
      toast.error("Error registering shop");
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
          {['shopName', 'shopAddress', 'ownerName', 'email', 'mobileNumber', 'shopCategory', 'itemCategories'].map((field, index) => (
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
          ))}

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

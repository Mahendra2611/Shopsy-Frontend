import React, { useState } from 'react';
import useAPI from '../hooks/useAPI';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaStore, FaMapMarkerAlt, FaList, FaImage } from "react-icons/fa"; // Import icons
import { useDispatch } from 'react-redux';
import { addShop } from '../redux/ShopSlice';
import toast from 'react-hot-toast';
const RegisterShop = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    shopCategory: '',
    shopName: '',
    address: '',
    image: null,
  });
 const dispatch = useDispatch();
  const { callApi, loading } = useAPI();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await callApi({
        url: "api/shops/registerShop",
        method: "POST",
        data: formDataToSend
      });

      console.log("Shop registered:", response);
      if (response) {
        dispatch(addShop(response.shop))
        navigate("/dashboard");
      } else {
        console.log("Error while registering");
        toast.error("Error registering shop")
      }
    } catch (err) {
      toast.error("Error registering shop")
      console.error("Error registering shop:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Register Shop</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Owner Name Input */}
          <div className="flex items-center border rounded p-2">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              name="ownerName"
              placeholder="Owner Name"
              value={formData.ownerName}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Shop Category Input */}
          <div className="flex items-center border rounded p-2">
            <FaList className="text-gray-500 mr-2" />
            <input
              type="text"
              name="shopCategory"
              placeholder="Shop Category"
              value={formData.shopCategory}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Shop Name Input */}
          <div className="flex items-center border rounded p-2">
            <FaStore className="text-gray-500 mr-2" />
            <input
              type="text"
              name="shopName"
              placeholder="Shop Name"
              value={formData.shopName}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Address Input */}
          <div className="flex items-center border rounded p-2">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          {/* File Upload with Custom Button */}
          <label className="flex items-center cursor-pointer bg-gray-200 p-2 rounded justify-center">
            <FaImage className="text-gray-600 mr-2" />
            <span className="text-gray-700">Upload Shop Image</span>
            <input type="file" name="image" onChange={handleFileChange} className="hidden" />
          </label>

          {/* Submit Button with Loading Spinner */}
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

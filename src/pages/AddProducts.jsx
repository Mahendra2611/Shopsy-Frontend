import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AiOutlineTag, AiOutlineDollar, AiOutlineNumber, AiOutlineInbox } from "react-icons/ai";
import useAPI from "../hooks/useAPI";
import Input from "../components/common/Input";

const AddProducts = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    image: null,
    newCategory: "",
  });

  const [categories, setCategories] = useState(["Electronics", "Clothing", "Home Appliances", "Accessories", "Books"]);
  const { callApi } = useAPI();
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e.target.value)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const handleAddCategory = () => {
    if (formData.newCategory.trim() && !categories.includes(formData.newCategory.trim())) {
      setCategories([...categories, formData.newCategory.trim()]);
      setFormData({ ...formData, category: formData.newCategory.trim(), newCategory: "" });
    }
  };

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
        url: "api/products/addProduct",
        method: "POST",
        data: formDataToSend,
      });

      console.log("Product added:", response);
      if (response) {
        navigate("/dashboard");
      } else {
        console.log("Error while adding product");
      }
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white mb-4">Add a New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div className="relative">
            {/* <AiOutlineTag className="absolute left-3 top-3 text-gray-500 dark:text-gray-300" /> */}
            <Input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className="pl-10"
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <div className="relative">
              {/* <AiOutlineInbox className="absolute left-3 top-3 text-gray-500 dark:text-gray-300" /> */}
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

            {/* Add New Category */}
            <div className="flex gap-2 mt-2">
              <div className="relative flex-grow">
                {/* <AiOutlineInbox className="absolute left-3 top-3 text-gray-500 dark:text-gray-300" /> */}
                <Input
                  type="text"
                  name="newCategory"
                  placeholder="New Category"
                  value={formData.newCategory}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
              <button
                type="button"
                onClick={handleAddCategory}
                className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md"
              >
                Add
              </button>
            </div>
          </div>

          {/* Price & Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              {/* <AiOutlineDollar className="absolute left-3 top-3 text-gray-500 dark:text-gray-300" /> */}
              <Input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
            <div className="relative">
              {/* //<AiOutlineNumber className="absolute left-3 top-3 text-gray-500 dark:text-gray-300" /> */}
              <Input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
          </div>

          {/* Image Upload */}
          <label className="flex flex-col items-center border-2 border-dashed rounded-lg p-4 w-full max-w-xs mx-auto sm:max-w-none hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            <UploadCloud className="w-10 h-10 text-gray-500 dark:text-gray-400" />
            <p className="text-sm text-gray-600 dark:text-gray-300">Upload product image</p>
            <input type="file" name="image" onChange={handleFileChange} className="hidden" />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;

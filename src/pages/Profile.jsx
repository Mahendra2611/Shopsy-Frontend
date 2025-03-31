import { useState, useEffect } from "react";
import useAPI from "../hooks/useAPI";
import { FaUser } from "react-icons/fa";
import { XCircle } from "lucide-react";
import ProfileSkeleton from "../components/common/ProfileSkeleton";
import ProfileLogo from "../assets/profile-logo.jpeg"
const Profile = () => {
  const [ownerData, setOwnerData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [availableCategories, setAvailableCategories] = useState([]); // Fetch from backend
  const [newCategory, setNewCategory] = useState("");

  // Fetch owner data on page load

  const {callApi,loading,error} = useAPI();
  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const response = await callApi({
          url: "api/owner/profile",
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        console.log(response)
        const shop = response;

        setOwnerData(shop);
        setFormData({
          shopName: shop.shopName,
          shopAddress: shop.shopAddress,
          shopCategory: shop.shopCategory,
          itemCategories: shop.itemCategories || [],
          shopImage: null,
          shopLocation: shop.shopLocation,
        });

        // Set available categories directly from response
        setAvailableCategories(shop.itemCategories || []);
      } catch (error) {
        console.error("Error fetching shop details", error);
      }
    };

    fetchOwnerData();
}, []);


  if (!ownerData || !formData) return <p><ProfileSkeleton/></p>;

  // Handle Form Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle File Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0] || null;
    setFormData({ ...formData, shopImage: file });
  };

  // Handle Adding New Category
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

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updateData = new FormData();
    updateData.append("shopName", formData.shopName);
    updateData.append("shopAddress", formData.shopAddress);
    updateData.append("shopCategory", formData.shopCategory);
    updateData.append("itemCategories", JSON.stringify(formData.itemCategories || []));
    updateData.append("shopLocation", JSON.stringify(formData.shopLocation || {}));
  
    if (formData.shopImage) {
      updateData.append("shopImage", formData.shopImage);
    }
  
    // Debugging FormData (Make sure data is correct)
    for (let pair of updateData.entries()) {
      console.log(pair[0], pair[1]);
    }
  
    try {
      const response = await callApi({
        url: "api/owner/update-shop",
        data: updateData,
        method: "PUT",
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log(response);
      setOwnerData(response.owner);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating shop details", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-gray-900 dark:text-white p-4 sm:p-6">
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
      {/* Profile Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <img
          src={ownerData?.shopImage ? ownerData?.shopImage : ProfileLogo}
          alt="Profile Image"
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-gray-300 dark:border-gray-700 object-cover shadow-md"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-heading  font-bold text-gray-900 dark:text-white">{ownerData.ownerName.replace(/^./,(match)=>match.toUpperCase())}</h2>
          <p className="text-gray-600 my-2 dark:text-gray-400 text-sm sm:text-base">{ownerData.email}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{ownerData.mobileNumber}</p>
        </div>
        <button
          className="sm:ml-auto w-full sm:w-auto px-5 py-2.5 rounded-lg text-white font-semibold transition bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>
  
      <hr className="my-6 border-gray-300 dark:border-gray-700" />
  
      {/* Edit Form */}
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Shop Name</label>
            <input
              type="text"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800"
              required
            />
          </div>
  
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Shop Address</label>
            <input
              type="text"
              name="shopAddress"
              value={formData.shopAddress}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800"
              required
            />
          </div>
  
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Shop Category</label>
            <select
              name="shopCategory"
              value={formData.shopCategory}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800"
            >
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
  
          {/* Item Categories */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Item Categories</label>
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
            <div className="flex flex-col sm:flex-row mt-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Add new category"
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800"
              />
              <button
                type="button"
                onClick={addCategory}
                className="mt-2 sm:mt-0 sm:ml-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add
              </button>
            </div>
          </div>
  
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Shop Image</label>
            <input
              type="file"
              name="shopImage"
              onChange={handleImageChange}
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800"
            />
          </div>
  
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <>
          {/* Shop Information */}
          <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border dark:border-gray-700 max-w-lg mx-auto">
      <h3 className="text-xl font-heading sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        🏪 Shop Information
      </h3>
      <div className="space-y-2 text-gray-700 dark:text-gray-400">
        <p className="text-base sm:text-lg"><strong>Shop Name:</strong> {ownerData.shopName}</p>
        <p className="text-base sm:text-lg"><strong>Category:</strong> {ownerData.shopCategory}</p>
        <p className="text-base sm:text-lg"><strong>Address:</strong> {ownerData.shopAddress}</p>
      </div>
      <div className="mt-4">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Item Categories</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {ownerData.itemCategories.map((category, index) => (
            <span
              key={index}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1.5 rounded-lg flex items-center space-x-2 shadow-md hover:bg-blue-700 transition"
            >
              <span className="text-sm font-medium">{category}</span>
              <button
                type="button"
                className="text-white hover:text-red-500 transition"
                onClick={() => removeCategory(category)}
              >
                <XCircle size={16} />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
          {/* Google Maps Location */}
          {ownerData.shopLocation?.coordinates && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Shop Location</h3>
              <a
                href={`https://www.google.com/maps?q=${ownerData.shopLocation.coordinates[1]},${ownerData.shopLocation.coordinates[0]}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3570.624735362084!2d80.27911047542528!3d26.500024976895574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDMwJzAwLjEiTiA4MMKwMTYnNTQuMSJF!5e0!3m2!1sen!2sin!4v1741094749090!5m2!1sen!2sin"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </a>
            </div>
          )}
        </>
      )}
    </div>
  </div>
  
  );
};

export default Profile;

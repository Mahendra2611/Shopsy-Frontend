import { useSelector } from "react-redux";
import { useState } from "react";

const AccountSetting = () => {
  const ownerData = useSelector((state) => state.auth.owner);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-gray-900 dark:text-white p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        {/* Profile Section */}
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full border border-gray-300 dark:border-gray-700"
          />
          <div>
            <h2 className="text-2xl font-semibold">{ownerData.ownerName}</h2>
            <p className="text-gray-600 dark:text-gray-400">{ownerData.email}</p>
            <p className="text-gray-600 dark:text-gray-400">{ownerData.mobileNumber}</p>
          </div>
          <button 
            className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        <hr className="my-6 border-gray-300 dark:border-gray-700" />

        {/* Shop Information */}
        <div>
          <h3 className="text-xl font-semibold">Shop Information</h3>
          <p className="text-gray-700 dark:text-gray-400">Shop Name: {ownerData.shopName}</p>
          <p className="text-gray-700 dark:text-gray-400">Category: {ownerData.shopCategory}</p>
          <p className="text-gray-700 dark:text-gray-400">Address: {ownerData.shopAddress}</p>
        </div>

        {/* Google Maps Location */}
        {ownerData.shopLocation?.coordinates && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Shop Location</h3>
            <a
              href={`https://www.google.com/maps?q=${ownerData.shopLocation.coordinates[0]},${ownerData.shopLocation.coordinates[1]}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <iframe
  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3570.624735362084!2d80.27911047542528!3d26.500024976895574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDMwJzAwLjEiTiA4MMKwMTYnNTQuMSJF!5e0!3m2!1sen!2sin!4v1741094749090!5m2!1sen!2sin"
  width="200"
  height="250"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSetting;

import { useState } from "react";
import { XCircle } from "lucide-react";

export default function ShopClosedPopup({ openShop }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-100 z-50">
      <div className="bg-white dark:bg-gray-900 text-center p-6 rounded-lg shadow-lg w-96 relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          onClick={() => setIsOpen(false)}
        >
          <XCircle size={24} />
        </button>

        {/* Message */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Your Shop is Currently Closed!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Click the button below to open your shop and start accepting orders.
        </p>

        {/* Open Shop Button */}
        <button
          onClick={() => {
            openShop();
            setIsOpen(false);
          }}
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Open Shop
        </button>
      </div>
    </div>
  );
}

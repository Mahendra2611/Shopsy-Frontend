import { MessageSquare } from "lucide-react";

const EmptyState = ({ message = "No items available", slogan = "Looks like it's empty here!" }) => {
  return (
    <div className="flex  flex-col items-center justify-center text-center py-10 px-5">
      {/* Icon */}
      <div className="p-4 bg-gradient-to-r  dark:bg-black from-blue-500 to-purple-500 text-white rounded-full shadow-lg">
        <MessageSquare size={40} />
      </div>

      {/* Message */}
      <h2 className="text-xl font-heading font-semibold mt-4 dark:text-gray-100 text-gray-800">{message}</h2>
      
      {/* Slogan */}
      <p className="text-gray-500 font-sub-heading dark:text-gray-400 mt-2">{slogan}</p>
    </div>
  );
};

export default EmptyState;

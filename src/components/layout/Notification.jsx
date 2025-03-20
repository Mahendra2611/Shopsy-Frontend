import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications,markAllAsRead } from "../../redux/NotificationSlice";
import { Bell, Info, CheckCircle, AlertTriangle } from "lucide-react";
import useAPI from "../../hooks/useAPI";

const NotificationBell = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notification.notifications);
  const [isOpen, setIsOpen] = useState(false);
const {callApi} = useAPI();
  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await callApi({ 
        url: "api/notifications/65d8c8e2a4f3b6b4c8a54321" ,
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
      if (data) {
        dispatch(setNotifications(data)); // Store notifications in Redux
      }
    };

    fetchNotifications();
  }, [dispatch]);
  
  const handleMarkAsRead = async () => {
    const response = await callApi({
         url: "api/notifications/mark-all-read/65d8c8e2a4f3b6b4c8a54321",
          method: "PUT" ,
          headers: { "Content-Type": "application/json" },
        });

    if (response) {
      dispatch(markAllAsRead()); // Update Redux state
      setIsOpen(false); // Close dropdown
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "order":
        return <CheckCircle className="text-green-500 w-5 h-5" />;
      case "lowStock":
        return <AlertTriangle className="text-yellow-500 w-5 h-5" />;
      default:
        return <Info className="text-blue-500 w-5 h-5" />;
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell Icon */}
      <button className="relative text-black dark:text-white focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
        <Bell className="w-6 h-6 " />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 md:w-72 bg-background-light dark:bg-background-dark shadow-lg rounded-lg p-3 border-2 dark:border-black dark:border-white">
          <h4 className="text-gray-800 dark:text-gray-200 font-semibold text-center">Notifications</h4>

          <ul className="mt-2 max-h-60 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notif, index) => (
                <li key={index} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 p-2 border-b last:border-none">
                  {getNotificationIcon(notif.type)}
                  <span>{notif.message}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500 dark:text-gray-400 p-2 text-center">No new notifications</li>
            )}
          </ul>

          {notifications.length > 0 && (
            <button className="w-full text-center text-sm text-blue-600 dark:text-blue-400 mt-2 hover:underline" onClick={handleMarkAsRead}>
              Mark all as read
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;

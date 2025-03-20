import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { addNotification } from "../redux/NotificationSlice";
import { updateOrder } from "../redux/OrderSlice";
import { addLowStock } from "../redux/LowStockSlice";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const owner = { shopId: "67c6f385a13214cb0b129350" };
    if (!owner?.shopId) return;

    const newSocket = io("http://localhost:3000", { withCredentials: true });

    newSocket.emit("joinShop", owner.shopId);

    newSocket.on("newOrder", (data) => {
      console.log("New order received:", data);
      dispatch(updateOrder(data?.order));
      dispatch(addNotification({ 
        type: "order", 
        message: data.message, 
      }));
    });

    newSocket.on("lowStockAlert", (data) => {
      console.log("Low stock alert:", data);
      dispatch(addLowStock(data.productId));
      dispatch(addNotification({ 
        type: "lowStock", 
        message: data.message, 
      }));
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [dispatch]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

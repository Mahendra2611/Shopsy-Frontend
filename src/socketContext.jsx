import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { updateOrder } from "./redux/OrderSlice"; // Redux action
import { addLowStock } from "./redux/LowStockSlice";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Only connect if user is logged in
   // const user = JSON.parse(localStorage.getItem("user"));
   const owner = {shopId:"65d8c8e2a4f3b6b4c8a54321"}
    if (!owner?.shopId) return;

    const newSocket = io("http://localhost:3000", { withCredentials: true });

    newSocket.emit("joinShop", owner.shopId);

    // Listen for new orders
    newSocket.on("newOrder", (data) => {
      console.log("New order received:", data);
      dispatch(updateOrder(data?.order))
      //dispatch(addOrder(data.order));
    });

    // Listen for low stock alerts
    newSocket.on("lowStockAlert", (data) => {
      console.log("Low stock alert:", data);
      //dispatch(LowStock(data));
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

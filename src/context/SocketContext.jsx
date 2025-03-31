import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch ,useSelector} from "react-redux";
import { addNotification } from "../redux/NotificationSlice";
import { updateOrder } from "../redux/OrderSlice";
import { addLowStock } from "../redux/LowStockSlice";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const {id} = useSelector((state)=>state?.auth?.owner || null)
  useEffect(() => {
    
    if (!id) return;

   const newSocket = io("http://localhost:3000", { withCredentials: true });

   //const newSocket = io("https://shopsy-backend-production.up.railway.app", { withCredentials: true });


    newSocket.emit("joinShop", id);

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
    newSocket.on("Logged-out",()=>{
      newSocket.emit("disconnect",id);
    })
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [dispatch,id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

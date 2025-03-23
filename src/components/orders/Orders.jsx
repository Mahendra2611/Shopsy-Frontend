import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../redux/OrderSlice";
import { useNavigate } from "react-router-dom";
import { addOrders } from "../../redux/OrderSlice";
import useAPI from "../../hooks/useAPI";
import toast from "react-hot-toast";
import OrderDetails from "./OrderDetails";
import Skeleton from "../common/Skeleton";
import EmptyState from "../common/EmptyState";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { callApi,loading ,error} = useAPI();
  const { orders } = useSelector((state) => state.orders);
  const shopId = "67c6f385a13214cb0b129350";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Pending");
const [viewDetails,setViewDetails] = useState(false);
  const [orderId,setOrderId] = useState(null);
  const [order, setOrder] = useState(null);
console.log(viewDetails)

useEffect(() => {
    // Find the order from Redux store
    if(!orderId)return;
    let foundOrder = null;
    for (const status in orders) {
      foundOrder = orders[status].find((o) => o._id === orderId);
      if (foundOrder) break;
    }
    setOrder(foundOrder);
  }, [orderId, orders]);

  useEffect(() => {
    const fetchOrders = async () => {
      //console.log("called");
      const response = await callApi({
        url: `api/order/shop/${shopId}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      //console.log(response);
      if (response) {
       
        dispatch(addOrders(response.orders));
        
      } else {
       
      }
    };
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (status) => {
    console.log("handle update called ",status)
    try {
        const response = await callApi({
            url: `api/order/${orderId}/status`,
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            data:{status}
          });
         //console.log(response)
      if (response) {
        //console.log("Dispatched")
        dispatch(updateOrder(response.order));
        toast.success(`Order ${status} successfully!`);
        
      }
    } catch (error) {
      
    }
    setViewDetails(false);
  };

  const statuses = ["Pending", "Accepted", "Cancelled", "Delivered"];
  const filteredOrders = selectedStatus ? orders[selectedStatus] || [] : [];
if(loading){
    return <Skeleton/>
   }

  return (!viewDetails)?(
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-800">
      {/* Sidebar */}
      <div className={`fixed top-16 md:top-0  left-0 h-[100vh] w-64 bg-white dark:bg-gray-900 shadow-xl p-6 transition-transform transform ${
    sidebarOpen ? "translate-x-0" : "-translate-x-full"
  } md:relative md:translate-x-0 md:w-60`}
>
        <h2 className="text-xl font-heading text-center font-bold text-gray-700 dark:text-gray-200 mb-6">Status</h2>
        <ul className="spce-y-1 md:space-y-2 dark:text-white">
          {statuses.map((status) => (
            <li
              key={status}
              className={`cursor-pointer p-3 font-sub-heading rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-500 ${
                selectedStatus === status ? "bg-gray-300 dark:bg-gray-700" : ""
              }`}
              onClick={() => {setSelectedStatus(status);setSidebarOpen(false)}}
            >
              {status}
            </li>
          ))}
        </ul>
      </div>
      

      <button
        className="z-100 fixed left-0 md:hidden  top-1/2  transform  -translate-x-14 rotate-90 bg-gradient-to-r from-blue-500 to-purple-500  text-white px-4 py-2 rounded-t-lg shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "Close Dashboard" : "Open Dashboard"}
      </button>

      {/* Main Content */}
      <div className="flex-1 pl-8 pr-2 md:p-6">
        <h2 className="text-2xl md:text-3xl font-bold font-heading  text-center mb-6 text-black dark:text-white">
          {selectedStatus ? `${selectedStatus} Products` : "Select a Category"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
  {filteredOrders.length > 0 ? (
    filteredOrders.map((order, index) => (
      <div key={index} className="bg-white dark:bg-gray-700 p-3 md:p-5 shadow-md rounded-lg">
        {/* Order Info */}
        <p className="text-sm text-black dark:text-white">
          Invoice ID:<span className="font-semibold text-gray-600 dark:text-gray-300"> {order.invoiceId}</span>
        </p>
        <p className="text-sm text-black dark:text-white">
          Status: <span className="font-semibold text-gray-600 dark:text-gray-300">{order.status}</span>
        </p>
        <p className="text-sm text-black dark:text-white ">
          Payment: <span className="font-semibold text-gray-600 dark:text-gray-300">{order.paymentStatus} ({order.paymentMethod})</span>
        </p>
        <p className="text-sm text-black dark:text-white ">
          Total Amount:<span className="font-semibold text-gray-600 dark:text-gray-300"> ₹{order.totalAmount}</span>
        </p>

        {/* Action Buttons */}
        <div className="mt-3 flex flex-col space-y-2">

          <button
            className="bg-blue-500 text-white p-1 md:py-2 rounded text-sm md:text-lg hover:bg-blue-600"
            onClick={() => {setViewDetails(true),setOrderId(order._id)}}
          >
            View Details
          </button>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-600 dark:text-gray-300">
      <EmptyState message="No Orders available."/>
    </p>
  )}
</div>

      </div>
    </div>
  ):(<OrderDetails handleUpdateStatus={handleUpdateStatus} order={order} setViewDetails={()=>setViewDetails(false)}/>);
};

export default Orders;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addOrders } from "../../redux/OrderSlice";
import useAPI from "../../hooks/useAPI";
import toast from "react-hot-toast";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { callApi } = useAPI();
  const { orders } = useSelector((state) => state.orders);
  const shopId = "65d8c8e2a4f3b6b4c8a54321";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Pending");

  

  useEffect(() => {
    const fetchOrders = async () => {
      console.log("called");
      const response = await callApi({
        url: `api/order/shop/${shopId}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
      if (response) {
       
        dispatch(addOrders(response.orders));
        toast.success("Products loaded successfully!");
      } else {
        toast.error("Failed to fetch products. Please try again.");
      }
    };
    fetchOrders();
  }, []);

  const statuses = ["Pending", "Accepted", "Cancelled", "Delivered"];
  const filteredOrders = selectedStatus ? orders[selectedStatus] || [] : [];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-800">
      {/* Sidebar */}
      <div className={`fixed top-16 md:top-0  left-0 h-[100vh] w-64 bg-white dark:bg-gray-900 shadow-xl p-6 transition-transform transform ${
    sidebarOpen ? "translate-x-0" : "-translate-x-full"
  } md:relative md:translate-x-0 md:w-60`}
>
        <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-6">Status</h2>
        <ul className="spce-y-1 md:space-y-2 dark:text-white">
          {statuses.map((status) => (
            <li
              key={status}
              className={`cursor-pointer p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-500 ${
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
  className="fixed bottom-0  md:hidden transform translate-x-1/2  bg-blue-500 text-white px-4 py-1 rounded-t-lg shadow-lg  origin-bottom "
  onClick={() => setSidebarOpen(!sidebarOpen)}
>
  {sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
</button>
      {/* Main Content */}
      <div className="flex-1 p-3 md:p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">
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

        {/* Products in Order */}
        {/* <div className="mt-3">
          <h4 className="text-sm font-semibold text-black dark:text-white">Products:</h4>
          {order.products.map((product) => (
            <div key={product._id} className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-xs md:text-sm text-black dark:text-white">
                {product.name} ({product.category})
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Qty: {product.quantity} | Price: ₹{product.price}
              </p>
            </div>
          ))}
        </div> */}

        {/* Action Buttons */}
        <div className="mt-3 flex flex-col space-y-2">
          {/* <button
            className="bg-green-500 text-white p-1 md:py-2 rounded text-sm md:text-lg hover:bg-green-600"
            onClick={() => updateOrderStatus(order._id, "Delivered")}
          >
            Mark as Accepted
          </button> */}
          <button
            className="bg-blue-500 text-white p-1 md:py-2 rounded text-sm md:text-lg hover:bg-blue-600"
            onClick={() => navigate(`/dashboard/orders/details/${order._id}`)}
          >
            View Details
          </button>
          {/* <button
            className="bg-red-500 text-white p-1 md:py-2 rounded text-sm md:text-lg hover:bg-red-600"
            onClick={() => cancelOrder(order._id)}
          >
            Cancel Order
          </button> */}
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-600 dark:text-gray-300">
      No Orders available.
    </p>
  )}
</div>

      </div>
    </div>
  );
};

export default Orders;

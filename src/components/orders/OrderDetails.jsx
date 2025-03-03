import { useParams,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import useAPI from "../../hooks/useAPI";
import { toast } from "react-toastify";
import { updateOrder } from "../../redux/OrderSlice";

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { orders} = useSelector((state) => state.orders);
  const [order, setOrder] = useState(null);
  const {callApi }= useAPI();
  const navigate = useNavigate();
  useEffect(() => {
    // Find the order from Redux store
    let foundOrder = null;
    for (const status in orders) {
      foundOrder = orders[status].find((o) => o._id === orderId);
      if (foundOrder) break;
    }
    setOrder(foundOrder);
  }, [orderId, orders]);

 

  if (!order) {
    return <p className="text-center text-gray-500">Order not found.</p>;
  }

  // Function to update order status
  const handleUpdateStatus = async (status) => {
    try {
        const response = await callApi({
            url: `api/order/${orderId}/status`,
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            data:{status}
          });
         
      if (response) {
        console.log("Dispatched")
        dispatch(updateOrder(response));
        toast.success(`Order ${status} successfully!`);
        navigate("/dashboard/orders")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-5 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Order Details</h2>

      <div className="space-y-3">
        <p className="text-gray-700 dark:text-gray-300"><strong>Order ID:</strong> {order._id}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Customer ID:</strong> {order.customerId}</p>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Products:</h3>
          {order.products.map((product) => (
            <div key={product._id} className="border-b border-gray-300 dark:border-gray-600 py-2">
              <p className="text-gray-700 dark:text-gray-300"><strong>Name:</strong> {product.name}</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>Category:</strong> {product.category}</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>Quantity:</strong> {product.quantity}</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>Price:</strong> ₹{product.price}</p>
            </div>
          ))}
        </div>

        <p className="text-gray-700 dark:text-gray-300"><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Profit:</strong> ₹{order.profit}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Status:</strong> {order.status}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Payment Status:</strong> {order.paymentStatus}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Payment Method:</strong> {order.paymentMethod}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      </div>

      {/* Buttons */}
      {order.status === "Accepted" ?( <div className="flex justify-center items-center mt-2">
        <button
          onClick={() => handleUpdateStatus("Delivered")}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
        >
          <FaCheckCircle className="h-5 w-5" /> Deliver Order
        </button>
        </div>
        ) 
        :
        (<div className="mt-5 flex gap-4">
        <button
          onClick={() => handleUpdateStatus("Accepted")}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
        >
          <FaCheckCircle className="h-5 w-5" /> Accept Order
        </button>

        <button
          onClick={() => handleUpdateStatus("Cancelled")}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
        >
          <FaTimesCircle className="h-5 w-5" /> Cancel Order
        </button>
      </div>)}
    </div>
  );
};

export default OrderDetails;

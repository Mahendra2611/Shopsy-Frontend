import { useState } from "react";
import { IoClose, IoTrash, IoPencil } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useAPI from "../../hooks/useAPI";
import toast from "react-hot-toast";
import { deleteProduct } from "../../redux/ProductSlice";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  // Get product from Redux store
  const categorizedProducts = useSelector((state) => state.products.products);
  let product = null;
  Object.values(categorizedProducts).forEach((category) => {
    const foundProduct = category.find((item) => item._id === (productId));
    if (foundProduct) product = foundProduct;
  });

  if (!product) {
    return <p className="text-center text-gray-600 dark:text-gray-300">Product not found.</p>;
  }

  // Delete Product
  const { callApi,loading } = useAPI();

const handleDelete = async () => {
  console.log("Delete called");
  
  const response = await callApi({
    url: `api/product/${product._id}/delete`,
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  console.log(response)
  if (response) {
    dispatch(deleteProduct({ category: product.category, id: product.id }));
    toast.success("Product deleted successfully!");
    navigate("/dashboard/products");
  } else {
    toast.error("Failed to delete product. Please try again.");
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 relative">
        {/* <button onClick={() => navigate(-1)} className="absolute top-3 right-3 text-gray-600 hover:text-red-500">
          <IoClose size={24} />
        </button> */}
        <img src={product.image || "https://via.placeholder.com/150"} alt={product.name} className="w-full h-40 object-cover rounded-md" />
        <h2 className="text-lg font-semibold mt-3 text-black dark:text-white">{product.name}</h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm">Category: {product.category}</p>

        <div className="mt-2 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
          <p><strong>Cost Price:</strong> ₹{product.costPrice}</p>
          <p><strong>Sales Price:</strong> ₹{product.salesPrice}</p>
          <p><strong>Offer Price:</strong> ₹{product.offerPrice}</p>
          <p><strong>Discount:</strong> {product.discount}%</p>
          <p><strong>Quantity Available:</strong> {product.quantity}</p>
          <p><strong>Low Stock Threshold:</strong> {product.lowStockThreshold}</p>
          <p><strong>Shop ID:</strong> {product.shopId}</p>
          <p className="text-xs text-gray-500">Added on: {new Date(product.createdAt).toLocaleDateString()}</p>
          <p className="text-xs text-gray-500">Last Updated: {new Date(product.updatedAt).toLocaleDateString()}</p>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-between">
          <button onClick={()=>navigate(`/dashboard/products/update/${product._id}`)} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            <IoPencil size={18} />
            Update
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            <IoTrash size={18} />
            Delete
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold text-black dark:text-white">Confirm Deletion</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">Are you sure you want to delete this product?</p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
               {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2 border-4 border-white border-t-transparent rounded-full" />
            ) : (
              "Confirm"
            )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

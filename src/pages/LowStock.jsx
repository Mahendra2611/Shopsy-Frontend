import { useState, useEffect } from "react";
import useAPI from "../hooks/useAPI";
import Skeleton from "../components/common/Skeleton";
const LowStock = () => {
  const [products, setProducts] = useState([]);
  const [updatedQuantities, setUpdatedQuantities] = useState({});
  const [flag,setFlag] = useState(false);
const {callApi,loading} = useAPI();
  useEffect(() => {
    const fetchLowStockProducts = async () => {
      const data = await callApi({ url: "api/product/low-stock/65d8c8e2a4f3b6b4c8a54321" });
      if (data) setProducts(data);
    };

    fetchLowStockProducts();
  }, [flag]);

  const handleQuantityChange = (productId, newQuantity) => {
    setUpdatedQuantities((prev) => ({ ...prev, [productId]: newQuantity }));
  };

  const handleUpdateQuantities = async () => {
    const updatedProducts = Object.keys(updatedQuantities).map((id) => ({
      _id: id,
      newQuantity: updatedQuantities[id],
    }));

    const response = await callApi({ url: "api/product/update-quantities", method: "PUT", data: { products: updatedProducts } });

    if (response) {
      setProducts((prev) =>
        prev.map((product) =>
          updatedQuantities[product._id] ? { ...product, quantity: updatedQuantities[product._id] } : product
        )
      );
      setUpdatedQuantities({});
      setFlag(true);
    }
  };
  if(loading){
    return <Skeleton/>
  }
  return (
    <div className="container mx-auto p-6 bg-background-light dark:bg-background-dark min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Low Stock Products</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="bg-white dark:bg-gray-700 p-3 md:p-4 shadow-md rounded-lg">
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
                className="w-full h-32 md:h-48 object-cover rounded-md"
              />
              <h3 className="text-sm md:text-lg font-semibold mt-2 text-black dark:text-white">{product.name}</h3>
              <p className="text-[13px] md:text-xl text-gray-600 dark:text-gray-300">Category: {product.category}</p>
              <p className="text-[13px] md:text-xl text-red-500">Remaining: {product.quantity}</p>

              <input
                type="number"
                placeholder="Enter new quantity"
                className="w-full p-2 border rounded mt-2 dark:bg-gray-800 dark:text-white"
                onChange={(e) => handleQuantityChange(product._id, e.target.value)}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">No low stock products found.</p>
        )}
      </div>

      {Object.keys(updatedQuantities).length > 0 && (
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mt-6 w-full hover:bg-blue-600"
          onClick={handleUpdateQuantities}
        >
          Update Quantities
        </button>
      )}
    </div>
  );
};

export default LowStock;

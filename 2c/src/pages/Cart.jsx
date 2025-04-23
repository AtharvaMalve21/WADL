import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext.jsx";
import { toast } from "react-hot-toast";

const Cart = () => {
  const {
    cartItems,
    totalPrice,
    setTotalPrice,
    items,
    setItems,
    setCartItems,
  } = useContext(ProductContext);

  console.log(cartItems);

  const placeOrder = () => {
    toast.success(
      `Your order is successfully placed. Total bill is Rs ${totalPrice}`
    );
  };

  const removeItemFromCart = (id) => {
    const newItem = cartItems.filter((p) => p.id !== id);
    const item = cartItems.find((p) => p.id == id);
    console.log(item);
    console.log(newItem);
    setCartItems(newItem);
    setTotalPrice((prevPrice) => prevPrice - item.price);
    setItems(items - 1);
    toast.success("Item removed from cart.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 px-4 sm:px-8 py-10">
  <h2 className="text-3xl font-bold text-gray-800 mb-10">🛒 Your Shopping Cart</h2>

  {cartItems.length > 0 ? (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Cart Items Section */}
      <div className="lg:col-span-2 space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-5">
              <img
                src={item.image}
                alt={item.title}
                className="w-28 h-28 object-cover rounded-xl border border-gray-200"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 mt-1">${item.price}</p>
              </div>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => removeItemFromCart(item.id)}
              className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-100 transition"
              title="Remove"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Checkout Summary */}
      <div className="bg-white p-8 rounded-2xl shadow-xl sticky top-20 h-fit">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">🧾 Checkout</h3>
        <div className="space-y-3 text-gray-700">
          <p className="flex justify-between">
            <span>Total Items:</span>
            <span className="font-semibold">{items}</span>
          </p>
          <p className="flex justify-between border-b pb-3">
            <span>Total Price:</span>
            <span className="font-semibold">${totalPrice}</span>
          </p>
        </div>
        <button
          onClick={placeOrder}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  ) : (
    <div className="text-center bg-white p-12 rounded-xl shadow-md text-gray-600 text-xl font-medium">
      <p>No Items Added to Cart.</p>
    </div>
  )}
</div>

  );
};

export default Cart;

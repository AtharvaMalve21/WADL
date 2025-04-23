import React, { useContext, useEffect } from "react";
import { productsData } from "../../data";
import { ProductContext } from "../context/ProductContext.jsx";
import { toast } from "react-hot-toast";

const Home = () => {
  var { products, setProducts, items, setItems, setCartItems, setTotalPrice } =
    useContext(ProductContext);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const deleteProduct = (id) => {
    const newProducts = products.filter((prev) => prev.id != id);
    setProducts(newProducts);
    toast.success("Item deleted.");
  };

  const addProductToCart = (id) => {
    toast.success("Item added to cart");
    const product = products.find((p) => p.id == id);
    console.log(product);
    setItems(items + 1);
    setTotalPrice((prevPrice) => prevPrice + product.price);
    console.log(product);
    setCartItems((prevItems) => [...prevItems, product]);
  };

  return (
    <div className="px-6 py-10 bg-gradient-to-br from-gray-100 to-white min-h-screen">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-5 flex flex-col justify-between group"
            >
              {/* Delete Icon */}
              <button
                onClick={() => deleteProduct(product.id)}
                className="absolute top-1 right-1 text-gray-400 hover:text-red-600 transition duration-200"
                title="Delete"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="overflow-hidden rounded-xl">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-52 object-cover rounded-xl transform group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="mt-4 flex flex-col flex-grow">
                <h1 className="text-lg font-semibold text-gray-800">
                  {product.title}
                </h1>
                <p className="text-sm text-gray-500 mt-1 flex-grow">
                  {product.description}
                </p>
                <p className="text-xl text-blue-600 font-bold mt-3">
                  ${product.price}
                </p>
              </div>
              <button
                onClick={() => {
                  addProductToCart(product.id);
                }}
                className="mt-4 flex items-center justify-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 text-lg font-medium">
          No Products Found!
        </div>
      )}
    </div>
  );
};

export default Home;

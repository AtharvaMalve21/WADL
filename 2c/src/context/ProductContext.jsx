import { createContext, useState } from "react";

export const ProductContext = createContext({});

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  var [items, setItems] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const value = {
    products,
    setProducts,
    items,
    setItems,
    cartItems,
    setCartItems,
    totalPrice,
    setTotalPrice,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ProductContextProvider } from "./context/ProductContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProductContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ProductContextProvider>
    <Toaster />
  </BrowserRouter>
);

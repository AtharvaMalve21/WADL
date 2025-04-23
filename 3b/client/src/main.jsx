import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserContextProvider } from "./context/UserContext.jsx";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BlogContextProvider } from "./context/BlogContext.jsx";
import { CommentContextProvider } from "./context/CommentContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserContextProvider>
      <BlogContextProvider>
        <CommentContextProvider>
          <App />
        </CommentContextProvider>
      </BlogContextProvider>
    </UserContextProvider>
    <ToastContainer />
  </BrowserRouter>
);

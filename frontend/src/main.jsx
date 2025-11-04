import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserContextProvider } from "../src/context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BlogContextProvider } from "./context/BlogContext";
import { ResourceContextProvider } from "./context/ResourceContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserContextProvider>
      <BlogContextProvider>
        <ResourceContextProvider>
          <App />
          <ToastContainer position="top-right" autoClose={3000} />
        </ResourceContextProvider>
      </BlogContextProvider>
    </UserContextProvider>
  </BrowserRouter>
);

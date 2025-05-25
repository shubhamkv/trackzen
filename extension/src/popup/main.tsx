import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import Popup from "./Popup.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Popup />
    <ToastContainer position="top-right" autoClose={1000} />
  </StrictMode>
);

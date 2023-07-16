import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./App";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import { register } from "swiper/element/bundle";


register()
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import 'swiper/css/pagination'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} /> 
    </AuthProvider>
  </React.StrictMode>
);

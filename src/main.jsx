import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home/Home";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 400,
  once: true,
});
const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Home />}></Route>),
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

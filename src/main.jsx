import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Home from "./components/Home/Home";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Statistics from "./components/Statistics/Statistics";
import Dashboard from "./components/Dashboard/Dashboard";
import WarrantyPolicy from "./components/WarrantyPolicy/WarrantyPolicy";
import Details from "./components/Details/Details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "statistics", element: <Statistics></Statistics> },
      { path: "dashboard", element: <Dashboard></Dashboard> },
      { path: "warranty-policy", element: <WarrantyPolicy></WarrantyPolicy> },
      {
        path: "details",
        element: <Details></Details>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "normalize.css"; // import normalize.css
import MapPage from "./pages/MapPage";
import LoginPage from "./pages/LoginPage";
import StartPage from "./pages/StartPage";
import RegisterPage from "./pages/RegisterPage";
import Test from "./test/Test";
import MyPage from "./pages/MyPage";
import ErrorPage from "./pages/ErrorPage";
import AdminPage from "./pages/AdminPage";
import SideBar from "./pages/SideBar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/map",
    element: <MapPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
  {
    path: "/sidebar",
    element: <SideBar />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default router;

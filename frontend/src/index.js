import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "normalize.css"; // import normalize.css
import MapPage from "@/pages/MainPage";
import LoginPage from "@/pages/LoginPage";
import StartPage from "@/pages/StartPage";
import RegisterPage from "@/pages/RegisterPage";
import MyPage from "@/pages/MyPage";
import ErrorPage from "@/pages/ErrorPage";
import AdminPage from "@/pages/AdminPage";
import FindPassword from "@/pages/FindPassword";
import { useSelector, Provider } from "react-redux";
import store from "@/store/store";

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
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
  {
    path: "/findpassword",
    element: <FindPassword />,
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

export default router;

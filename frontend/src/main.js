import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MapPage from './pages/MapPage';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>메인페이지</div>,
  },
  {
    path: '/map',
    element: <MapPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default router;
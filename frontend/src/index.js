import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MapPage from './pages/MapPage';
import StartPage from './pages/StartPage';
import 'normalize.css'; // import normalize.css
import ComponentPage from './pages/ComponentPage';
import RegisterPage from './pages/RegisterPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MapPage />,
  },
  {
    path: '/map',
    element: <MapPage />,
  },
  {
    path: '/component',
    element: <ComponentPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default router;

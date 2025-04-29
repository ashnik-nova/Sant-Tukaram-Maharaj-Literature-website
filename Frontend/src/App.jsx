import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { Outlet } from "react-router-dom";

import HomePage from "./components/HomePage";
import AbhangasPage from "./components/AbhangasPage";
import LifeStory from "./components/LifeStory";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import Philosophy from "./components/Philosophy";
import CustomNavbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import Books from "./components/Books";
import UserDashboard from "./components/UserDashboard";

import AdminDashboard from "./components/AdminDashboard/AdminDashboard"; // Layout with sidebar
import Dashboard from "./components/AdminDashboard/Dashboard";
import ManageBhanjans from "./components/AdminDashboard/ManageBhanjans"; // Manage Bhanjans
import ManageBooks from "./components/AdminDashboard/ManageBooks";
import ManageAbhangas from "./components/AdminDashboard/ManageAbhangas"; // Manage Abhangas
import BhajansPage from "./components/BhajansPage"; // Bhajan Page

// Layout with Navbar
const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomNavbar />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "abhangs", element: <AbhangasPage /> },
      { path: "lifestory", element: <LifeStory /> },
      { path: "philosophy", element: <Philosophy /> },
      { path: "gallery", element: <Gallery /> },
      { path: "books", element: <Books /> },
      { path: "dashboard", element: <UserDashboard /> },
      { path: "bhajans", element: <BhajansPage/> },
    ],
  },
  { path: "/signup", element: <SignupPage /> },
  { path: "/login", element: <LoginPage /> },

  {
    path: "/admin",
    element: <AdminDashboard />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "abhangas", element: <ManageAbhangas /> }, 
      { path: "bhanjans", element: <ManageBhanjans /> }, 
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

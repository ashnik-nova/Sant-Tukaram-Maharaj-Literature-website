import React from "react";
import { createBrowserRouter, RouterProvider, Route, Outlet } from "react-router-dom";
import HomePage from "./components/HomePage";
import AbhangasPage from "./components/AbhangasPage";
import LifeStory from "./components/LifeStory";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import Philosophy from "./components/Philosophy";
import CustomNavbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import Books from "./components/Books";
import AdminDashboard from "./components/AdminDashboard/DashboardHome"; // wrapper
import Dashboard from "./components/AdminDashboard/Dashboard"; // actual dashboard
import UserDashboard from "./components/UserDashboard";

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

// Admin layout with Navbar
const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomNavbar />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
    </div>
  );
};

// Define routes using createBrowserRouter
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
    ],
  },
  { path: "/signup", element: <SignupPage /> },
  { path: "/login", element: <LoginPage /> },
  {
    path: "/admin",
    element: <AdminDashboard/>,
    children: [
      {
        path: "dashboard",  // Use relative path here
        element: <Dashboard />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import AbhangasPage from "./components/AbhangasPage";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import Philosophy from "./components/Philosophy";
import Gallery from "./components/Gallery";
import Books from "./components/Books";
import AdminDashboard from "./components/AdminDashboard/DashboardHome";
import PrivateRoute from "./components/AdminDashboard/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/abhangs" element={<AbhangasPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />  
        <Route path="/philosophy" element={<Philosophy />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/books" element={<Books />} />

        {/* Protected Admin Dashboard Route */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

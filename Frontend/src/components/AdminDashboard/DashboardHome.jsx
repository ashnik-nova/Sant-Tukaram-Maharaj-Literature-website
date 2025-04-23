import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <Container className="mt-5 text-center">
      <h1>Welcome, Admin! 🔐</h1>
      <p>Use the panel to manage users, books, and content.</p>

      {/* You can link these to actual management pages */}
      <div className="mt-4">
        <Button variant="warning" className="m-2" onClick={() => navigate("/admin/users")}>
          Manage Users
        </Button>
        <Button variant="warning" className="m-2" onClick={() => navigate("/admin/books")}>
          Manage Book Store
        </Button>
        <Button variant="danger" className="m-2" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </Container>
  );
};

export default AdminDashboard;

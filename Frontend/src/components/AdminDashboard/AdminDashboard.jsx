import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { logoutUser } from "../../api/authUser";
import { useToast } from "../../context/Toast/ToastContext"; 

const AdminDashboard = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
 const { success, error } = useToast();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      const response = await logoutUser("admin");
      console.log(response);
      success("Logout Successful!");
      Cookies.remove("user");
      Cookies.remove("userType");
      Cookies.remove("role");
    } catch (err) {
      error(err.message || "Logout failed!");
    }
  }


  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className={`sidebar bg-dark ${collapsed ? "collapsed" : ""}`}
        style={{
          width: collapsed ? "80px" : "250px",
          minHeight: "100vh",
          transition: "width 0.3s",
          color: "white",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          overflowY: "auto",
        }}
      >
        <div className="p-3 d-flex justify-content-between align-items-center">
          {!collapsed && <h4 className="mb-0">Admin Panel</h4>}
          <Button
            variant="outline-light"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="border-0"
          >
            {collapsed ? "→" : "←"}
          </Button>
        </div>

        <div className="nav flex-column mt-3">
          <NavLink
            to="/admin/dashboard"
            className={`nav-link py-3 ${
              isActive("/admin/dashboard") ? "bg-warning text-dark" : "text-white"
            }`}
            style={{ textAlign: collapsed ? "center" : "left" }}
          >
            {collapsed ? "👤" : "Manage Users"}
          </NavLink>

          <NavLink
            to="/admin/abhangas"
            className={`nav-link py-3 ${
              isActive("/admin/abhangas") ? "bg-warning text-dark" : "text-white"
            }`}
            style={{ textAlign: collapsed ? "center" : "left" }}
          >
            {collapsed ? "📚" : "Manage User's Abhangas"}
          </NavLink>

          <NavLink
            to="/admin/bhanjans"
            className={`nav-link py-3 ${
              isActive("/admin/bhajans") ? "bg-warning text-dark" : "text-white"
            }`}
            style={{ textAlign: collapsed ? "center" : "left" }}
          >
            {collapsed ? "📚" : "Manage User's Bhanjans"}
          </NavLink>
          <div
            className="nav-link py-3 text-white mt-auto"
            onClick={handleLogout}
            style={{
              cursor: "pointer",
              textAlign: collapsed ? "center" : "left",
              marginTop: "50px",
            }}
          >
            {collapsed ? "🚪" : "Logout"}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          marginLeft: collapsed ? "80px" : "250px",
          width: collapsed ? "calc(100% - 80px)" : "calc(100% - 250px)",
          transition: "margin-left 0.3s, width 0.3s",
          padding: "20px",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useContext, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserContext from "../context/User/UserContext.js";
import "./Navbar.css";
import Cookies from "js-cookie";
import { logoutUser } from "../api/authUser.js";
import { useToast } from "../context/Toast/ToastContext.js";

const CustomNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userType, updateUserType } = useContext(UserContext);
  const { success, error } = useToast(); // Assuming you have a toast context for notifications
  const isActive = (path) => location.pathname === path;

  // Sync context with cookies on app load (using useEffect)
  useEffect(() => {
    const userCookie = Cookies.get("user");
    const userTypeCookie = Cookies.get("userType");

    if (userCookie && userTypeCookie) {
      updateUserType(userTypeCookie); // Set the user type from cookies
    } else {
      updateUserType(null); // If no cookies, ensure user type is null
    }
  }, [updateUserType]);

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await logoutUser(userType);
      console.log(response);
      success("Logout Successful!");
      Cookies.remove("user");
      Cookies.remove("userType");
      updateUserType(null); // Clear context state
      navigate("/"); // Navigate to home page
    } catch (error) {
      error(error.message || "Logout failed!");
    }
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="logo">
          🕉️ Sant Tukaram Maharaj
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className={isActive("/") ? "active-link" : ""}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/abhangs" className={isActive("/abhangs") ? "active-link" : ""}>
              Abhangs
            </Nav.Link>
            <Nav.Link as={Link} to="/lifestory" className={isActive("/lifestory") ? "active-link" : ""}>
              Life Story
            </Nav.Link>
            <Nav.Link as={Link} to="/philosophy" className={isActive("/philosophy") ? "active-link" : ""}>
              Philosophy
            </Nav.Link>
            <Nav.Link as={Link} to="/gallery" className={isActive("/gallery") ? "active-link" : ""}>
              Gallery
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className={isActive("/contact") ? "active-link" : ""}>
              Contact
            </Nav.Link>

            {!user ? (
              <>
                <Nav.Link as={Link} to="/signup" className={isActive("/signup") ? "active-link" : ""}>
                  SignUp
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className={isActive("/login") ? "active-link" : ""}>
                  Login
                </Nav.Link>
              </>
            ) : (
              <NavDropdown title={user.name || "User"} id="user-nav-dropdown" align="end">
                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-danger">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;

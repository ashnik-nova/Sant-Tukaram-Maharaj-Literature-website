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
  const { user, userType, updateUserType, updateUser } = useContext(UserContext);
  const { success, error } = useToast();
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const userCookie = Cookies.get("user");
    const userTypeCookie = Cookies.get("userType");

    // Only run this effect if there's no user in context but there are cookies
    // OR if there's a user in context but no cookies (inconsistent state)
    const shouldUpdateFromCookies = (!user && userCookie) || 
                                   (user && !userCookie);
    
    if (shouldUpdateFromCookies && userCookie && userTypeCookie) {
      try {
        const userObj = JSON.parse(userCookie);
        // Only update if values actually changed
        if (JSON.stringify(user) !== JSON.stringify(userObj)) {
          updateUser(userObj);
        }
        if (userType !== userTypeCookie) {
          updateUserType(userTypeCookie);
        }
      } catch (e) {
        console.error("Error parsing user cookie:", e);
      }
    }
  }, [user, userType, updateUser, updateUserType]);

  const handleLogout = async () => {
    try {
      const response = await logoutUser(userType);
      console.log(response);
      Cookies.remove("user");
      Cookies.remove("userType");
      updateUser(null);
      updateUserType(null);
      
      success("Logout Successful!");
      navigate("/");
    } catch (err) {
      error(err.message || "Logout failed!");
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
            <Nav.Link as={Link} to="/bhajans" className={isActive("/bhajans") ? "active-link" : ""}>
              Bhajans
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
              <NavDropdown title={user?.name || "User"} id="user-nav-dropdown" align="end">
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
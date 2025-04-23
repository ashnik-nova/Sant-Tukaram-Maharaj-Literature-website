// // src/components/Navbar.jsx
// import { Link } from "react-router-dom";
// import { Navbar, Container, Nav } from "react-bootstrap";
// import "./Navbar.css";

// const CustomNavbar = () => {
//   return (
//     <Navbar expand="lg" className="custom-navbar">
//       <Container>
//         <Navbar.Brand as={Link} to="/" className="logo">🕉️ Sant Tukaram Maharaj</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto">
//             <Nav.Link as={Link} to="/">Home</Nav.Link>
//             <Nav.Link as={Link} to="/abhangs">Abhangs</Nav.Link>
//             <Nav.Link as={Link} to="/lifestory">Life Story</Nav.Link>
//             <Nav.Link as={Link} to="/philosophy">Philosophy</Nav.Link>
//             <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
//             <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
//             <Nav.Link as={Link} to="/signup">SignUp</Nav.Link>
//             <Nav.Link as={Link} to="/login">Login</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default CustomNavbar;

// import React from "react";
// import { Navbar, Container, Nav } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import "./Navbar.css";

// const CustomNavbar = () => {
//   return (
//     <Navbar expand="lg" className="custom-navbar">
//       <Container>
//         {/* Use Link instead of a tag */}
//         <Navbar.Brand as={Link} to="/" className="logo">
//           🕉️ Sant Tukaram Maharaj
//         </Navbar.Brand>

//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto">
//             <Nav.Link as={Link} to="/">Home</Nav.Link>
//             <Nav.Link as={Link} to="/abhangs">Abhangs</Nav.Link>
//             <Nav.Link as={Link} to="/lifestory">Life Story</Nav.Link>
//             <Nav.Link as={Link} to="/philosophy">Philosophy</Nav.Link>
//             <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
//             <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
//             <Nav.Link as={Link} to="/signup">SignUp</Nav.Link>
//             <Nav.Link as={Link} to="/login">Login</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default CustomNavbar;

// src/components/CustomNavbar.jsx
import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const CustomNavbar = () => {
  const location = useLocation(); // Get current path

  // Helper function to check active link
  const isActive = (path) => location.pathname === path;

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="logo">
          🕉️ Sant Tukaram Maharaj
        </Navbar.Brand>

        {/* Mobile Toggle Button */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={isActive("/") ? "active-link" : ""}
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/abhangs"
              className={isActive("/abhangs") ? "active-link" : ""}
            >
              Abhangs
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/lifestory"
              className={isActive("/lifestory") ? "active-link" : ""}
            >
              Life Story
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/philosophy"
              className={isActive("/philosophy") ? "active-link" : ""}
            >
              Philosophy
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/gallery"
              className={isActive("/gallery") ? "active-link" : ""}
            >
              Gallery
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/contact"
              className={isActive("/contact") ? "active-link" : ""}
            >
              Contact
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/signup"
              className={isActive("/signup") ? "active-link" : ""}
            >
              SignUp
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/login"
              className={isActive("/login") ? "active-link" : ""}
            >
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;

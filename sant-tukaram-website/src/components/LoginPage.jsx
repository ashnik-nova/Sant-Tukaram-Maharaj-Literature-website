// src/components/LoginPage.jsx
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { Button, Form, Container, Row, Col } from "react-bootstrap";
// import "./AuthStyle.css";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Login Successful!");
//     navigate("/signup");
//   };

//   return (
//     <div className="auth-container">
//       <Container className="form-container">
//         <Row className="justify-content-center">
//           <Col md={6}>
//             <h2 className="title">🔆 Welcome Back!</h2>
//             <p className="subtitle">Enter the realm of wisdom and knowledge.</p>
//             <Form onSubmit={handleSubmit} className="auth-form">
//               <Form.Group className="mb-3">
//                 <Form.Label>Email Address</Form.Label>
//                 <Form.Control
//                   type="email"
//                   name="email"
//                   placeholder="Enter your email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   name="password"
//                   placeholder="Enter your password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               <Button variant="warning" type="submit" className="submit-btn">
//                 Login
//               </Button>

//               <p className="switch-text">
//                 Don't have an account?{" "}
//                 <span onClick={() => navigate("/signup")}>Sign Up</span>
//               </p>
//             </Form>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default LoginPage;

// src/components/LoginPage.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Form, Container, Row, Col, ToggleButton, ButtonGroup } from "react-bootstrap";
import "./AuthStyle.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [adminFormData, setAdminFormData] = useState({ adminEmail: "", adminPassword: "", adminCode: "" });

  const handleChange = (e, isAdmin = false) => {
    const { name, value } = e.target;
    isAdmin
      ? setAdminFormData({ ...adminFormData, [name]: value })
      : setUserFormData({ ...userFormData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (role === "admin") {
      if (adminFormData.adminCode !== "TUKARAM2024") {
        alert("Invalid Admin Code!");
        return;
      }
      alert("Admin Login Successful!");
      localStorage.setItem("isAdmin", true); // Set admin session
      navigate("/admin"); // Redirect to admin dashboard
    } else {
      alert("User Login Successful!");
      localStorage.removeItem("isAdmin"); // Just in case
      navigate("/"); // Redirect to homepage
    }
  };
  
  const handleGoogleLogin = () => {
    alert("Google Login Successful!");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <Container className="form-container">
        <Row className="justify-content-center align-items-center">
          <Col md={8} lg={6}>
            <h2 className="title">🔆 Welcome Back!</h2>
            <p className="subtitle">Enter the realm of wisdom and knowledge.</p>

            {/* User/Admin Toggle */}
            <ButtonGroup className="role-toggle mb-4 d-flex justify-content-center">
              <ToggleButton
                type="radio"
                variant="outline-warning"
                name="role"
                value="user"
                checked={role === "user"}
                onClick={() => setRole("user")}
              >
                User
              </ToggleButton>
              <ToggleButton
                type="radio"
                variant="outline-warning"
                name="role"
                value="admin"
                checked={role === "admin"}
                onClick={() => setRole("admin")}
              >
                Admin
              </ToggleButton>
            </ButtonGroup>

            {/* User Login Form */}
            {role === "user" && (
              <Form onSubmit={handleSubmit} className="auth-form">
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={userFormData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={userFormData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button variant="warning" type="submit" className="submit-btn">
                  Login as User
                </Button>

                <Button variant="outline-dark" onClick={handleGoogleLogin} className="google-btn mt-3">
                  Login with Google
                </Button>
              </Form>
            )}

            {/* Admin Login Form */}
            {role === "admin" && (
              <Form onSubmit={handleSubmit} className="auth-form">
                <Form.Group className="mb-3">
                  <Form.Label>Admin Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="adminEmail"
                    placeholder="Enter admin email"
                    value={adminFormData.adminEmail}
                    onChange={(e) => handleChange(e, true)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="adminPassword"
                    placeholder="Enter admin password"
                    value={adminFormData.adminPassword}
                    onChange={(e) => handleChange(e, true)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Admin Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="adminCode"
                    placeholder="Enter Admin Code"
                    value={adminFormData.adminCode}
                    onChange={(e) => handleChange(e, true)}
                    required
                  />
                </Form.Group>

                <Button variant="warning" type="submit" className="submit-btn">
                  Login as Admin
                </Button>
              </Form>
            )}

            <p className="switch-text">
              Don't have an account?{" "}
              <span onClick={() => navigate("/signup")}>Sign Up</span>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;

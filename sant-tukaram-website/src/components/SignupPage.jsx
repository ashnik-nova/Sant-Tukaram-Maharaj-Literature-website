// src/components/SignupPage.jsx
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { Button, Form, Container, Row, Col } from "react-bootstrap";
// import "./AuthStyle.css";

// const SignupPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Signup Successful!");
//     navigate("/login");
//   };

//   return (
//     <div className="auth-container">
//       <Container className="form-container">
//         <Row className="justify-content-center">
//           <Col md={6}>
//             <h2 className="title">📜 Join the Legacy</h2>
//             <p className="subtitle">
//               Embrace the teachings of Sant Tukaram Maharaj.
//             </p>

//             <Form onSubmit={handleSubmit} className="auth-form">
//               <Form.Group className="mb-3">
//                 <Form.Label>Full Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="name"
//                   placeholder="Enter your name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

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
//                   placeholder="Create a password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               <Button variant="warning" type="submit" className="submit-btn">
//                 Sign Up
//               </Button>

//               <p className="switch-text">
//                 Already have an account?{" "}
//                 <span onClick={() => navigate("/login")}>Login</span>
//               </p>
//             </Form>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default SignupPage;

// src/components/SignupPage.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Form, Container, Row, Col, ToggleButton, ButtonGroup } from "react-bootstrap";
import "./AuthStyle.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [userFormData, setUserFormData] = useState({ name: "", email: "", password: "" });
  const [adminFormData, setAdminFormData] = useState({
    adminName: "",
    adminEmail: "",
    adminPassword: "",
    adminCode: "",
  });

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
      alert("Admin Signup Successful!");
    } else {
      alert("User Signup Successful!");
    }
    navigate("/login");
  };

  const handleGoogleSignup = () => {
    alert("Google Signup Successful!");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <Container className="form-container">
        <Row className="justify-content-center align-items-center">
          <Col md={8} lg={6}>
            <h2 className="title">📜 Join the Legacy</h2>
            <p className="subtitle">Embrace the teachings of Sant Tukaram Maharaj.</p>

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

            {/* User Signup Form */}
            {role === "user" && (
              <Form onSubmit={handleSubmit} className="auth-form">
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={userFormData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

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
                    placeholder="Create a password"
                    value={userFormData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button variant="warning" type="submit" className="submit-btn">
                  SignUp as User
                </Button>

                <Button variant="outline-dark" onClick={handleGoogleSignup} className="google-btn mt-3">
                  SignUp with Google
                </Button>
              </Form>
            )}

            {/* Admin Signup Form */}
            {role === "admin" && (
              <Form onSubmit={handleSubmit} className="auth-form">
                <Form.Group className="mb-3">
                  <Form.Label>Admin Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="adminName"
                    placeholder="Enter admin name"
                    value={adminFormData.adminName}
                    onChange={(e) => handleChange(e, true)}
                    required
                  />
                </Form.Group>

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
                    placeholder="Create an admin password"
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
                  Sign Up as Admin
                </Button>
              </Form>
            )}

            <p className="switch-text">
              Already have an account?{" "}
              <span onClick={() => navigate("/login")}>Login</span>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignupPage;

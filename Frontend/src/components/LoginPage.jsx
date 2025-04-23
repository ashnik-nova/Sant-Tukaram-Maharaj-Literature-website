import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col, ToggleButton, ButtonGroup } from "react-bootstrap";
import { loginUser } from "../api/authUser"; // Adjust the path as per your folder structure
import UserContext from "../context/User/UserContext.js";  // Make sure the context is properly imported
import { useToast } from "../context/Toast/ToastContext.js"; // If you are using toast notifications
import "./AuthStyle.css";  // Assuming you have some custom styles

const LoginPage = () => {
  const { userType, updateUserType } = useContext(UserContext); // Access userType and updateUserType from context
  const navigate = useNavigate();
  const { success, error } = useToast();  // Assuming you're using react-toastify for toast notifications
  const [isLoading, setIsLoading] = useState(false);
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [adminFormData, setAdminFormData] = useState({ adminEmail: "", adminPassword: "", adminCode: "" });

  const handleChange = (e, isAdmin = false) => {
    const { name, value } = e.target;
    if (isAdmin) {
      setAdminFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setUserFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let payload = {};
    const endpoint = userType === "admin" ? "admins/login-admin" : "users/login-user";
  
    if (userType === "admin") {
      if (adminFormData.adminCode !== "TUKARAM2024") {
        error("Invalid Admin Code!");
        return;
      }
  
      payload = {
        email: adminFormData.adminEmail,
        password: adminFormData.adminPassword,
        adminCode: adminFormData.adminCode,
        role: "admin",
      };
    } else {
      payload = {
        email: userFormData.email,
        password: userFormData.password,
        role: "user",
      };
    }
  
    try {
      setIsLoading(true);
      const response = await loginUser(payload, endpoint); // <-- Pass object
      console.log(response);
      success(`${userType === "admin" ? "Admin" : "User"} Login Successful!`);
      updateUserType(userType);
  
      if (userType === "admin") {
        localStorage.setItem("isAdmin", true);
        navigate("/admin");
      } else {
        localStorage.removeItem("isAdmin");
        navigate("/");
      }
    } catch (err) {
      error(err.response?.data?.msg || err.message || "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleGoogleLogin = () => {
    success("Google Login Successful!");
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
                checked={userType === "user"}
                onClick={() => updateUserType("user")}
              >
                User
              </ToggleButton>
              <ToggleButton
                type="radio"
                variant="outline-warning"
                name="role"
                value="admin"
                checked={userType === "admin"}
                onClick={() => updateUserType("admin")}
              >
                Admin
              </ToggleButton>
            </ButtonGroup>

            {/* User Login Form */}
            {userType === "user" && (
              <Form onSubmit={handleSubmit} className="auth-form">
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={userFormData.email}
                    onChange={(e) => handleChange(e)}
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
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </Form.Group>

                <Button variant="warning" type="submit" className="submit-btn" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login as User"}
                </Button>

                <Button
                  variant="outline-dark"
                  onClick={handleGoogleLogin}
                  className="google-btn mt-3"
                >
                  Login with Google
                </Button>
              </Form>
            )}

            {/* Admin Login Form */}
            {userType === "admin" && (
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

                <Button variant="warning" type="submit" className="submit-btn" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login as Admin"}
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

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  ToggleButton,
  ButtonGroup,
} from "react-bootstrap";
import UserContext from "../context/User/UserContext.js";
import { useToast } from "../context/Toast/ToastContext.js";
import { signupUser } from "../api/authUser.js"; // Make sure this path is correct
import "./AuthStyle.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const { userType, updateUserType } = useContext(UserContext);
  const { success, error } = useToast();

  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [adminFormData, setAdminFormData] = useState({
    adminName: "",
    adminEmail: "",
    adminPassword: "",
    adminCode: "",
  });

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

    try {
      if (userType === "admin") {
        if (adminFormData.adminCode !== "TUKARAM2024") {
          error("Invalid Admin Code!");
          return;
        }

        const payload = {
          fullname: adminFormData.adminName,
          email: adminFormData.adminEmail,
          password: adminFormData.adminPassword,
          adminCode:adminFormData.adminCode
        };

        const response = await signupUser(payload, "/admins/register");

        if (response.success) {
          success("Admin Signup Successful!");
          navigate("/login");
        } else {
          error(response.message || "Signup failed");
        }

      } else {
        const payload = {
          fullname: userFormData.name,
          email: userFormData.email,
          password: userFormData.password,
        };

        console.log(payload);

        const response = await signupUser(payload, "/users/register");

        if (response.success) {
          success("User Signup Successful!");
          navigate("/login");
        } else {
          error(response.message || "Signup failed");
        }
      }
    } catch (err) {
      console.error(err);
      error(err.message || "Something went wrong");
    }
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
                name="userType"
                value="user"
                checked={userType === "user"}
                onClick={() => updateUserType("user")}
              >
                User
              </ToggleButton>
              <ToggleButton
                type="radio"
                variant="outline-warning"
                name="userType"
                value="admin"
                checked={userType === "admin"}
                onClick={() => updateUserType("admin")}
              >
                Admin
              </ToggleButton>
            </ButtonGroup>

            {/* User Signup Form */}
            {userType === "user" && (
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
                  Sign Up as User
                </Button>

                
              </Form>
            )}

            {/* Admin Signup Form */}
            {userType === "admin" && (
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

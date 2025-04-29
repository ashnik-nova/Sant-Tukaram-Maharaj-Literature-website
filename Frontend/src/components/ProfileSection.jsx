import React from "react";
import { Card, Button, Form, Row, Col, FormCheck } from "react-bootstrap";
import { BsPencilSquare, BsCheckLg, BsX } from "react-icons/bs";
import { useToast } from "../context/Toast/ToastContext"; // Adjust path if needed
import { updateUserDetails } from "../api/authUser"; // Adjust path if needed
import Cookies from "js-cookie"; // For handling cookies

export default function ProfileSection() {
  const [editMode, setEditMode] = React.useState(false);
  const [profile, setProfile] = React.useState({});
  const [tempProfile, setTempProfile] = React.useState({});
  const [formEnabled, setFormEnabled] = React.useState(false);
  const { success, error } = useToast(); // Use success and error from useToast

  // Initialize profile from cookies if not provided
  React.useEffect(() => {
    const userFromCookie = JSON.parse(Cookies.get("user") || "{}");
    console.log("User from cookie:", userFromCookie); // Debugging line

    const userData = {
      ...userFromCookie,
      fullname: userFromCookie.fullname || "",
      email: userFromCookie.email || "",
      phoneNo: userFromCookie.phoneNo || "",
      name: userFromCookie.name || "",
      lifestory: userFromCookie.lifestory || "",
    };

    setProfile(userData);
    setTempProfile(userData);
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const updatedProfile = await updateUserDetails(tempProfile);
      setProfile(updatedProfile); // Update profile state

      // Update the cookie with new data
      const currentUserData = JSON.parse(Cookies.get("user") || "{}");
      Cookies.set(
        "user",
        JSON.stringify({ ...currentUserData, ...updatedProfile })
      );

      success("Profile updated successfully!"); // Display success message
      setEditMode(false); // Exit edit mode
      setFormEnabled(false); // Disable form editing
    } catch (err) {
      error(err.message || "Failed to update profile"); // Display error message
    }
  };

  const handleCancel = () => {
    setTempProfile({ ...profile }); // Reset temp profile to current profile
    setEditMode(false);
  };

  return (
    <Card className="shadow-sm border-0 rounded-4">
      <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center rounded-top-4 px-4 py-3">
        <h5 className="mb-0">🧘‍♂️ Profile</h5>
      </Card.Header>
      <Card.Body className="p-4"> 
        {/* Additional Form with Toggle Switch */}
        <Card className="mt-4 shadow-sm border-0 rounded-4">
          <Card.Header className="bg-secondary text-white d-flex justify-content-between align-items-center rounded-top-4 px-4 py-3">
            <h5 className="mb-0">🔒 Account Details</h5>
            <FormCheck
              type="switch"
              id="form-toggle-switch"
              label="Enable Editing"
              checked={formEnabled}
              onChange={() => {
                if (!formEnabled) {
                  setTempProfile({ ...profile });
                }
                setFormEnabled(!formEnabled);
              }}
              className="text-white"
            />
          </Card.Header>
          <Card.Body className="p-4">
            <Form>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Full Name</Form.Label>
                    <Form.Control
                      name="fullname"
                      value={
                        formEnabled
                          ? tempProfile.fullname || ""
                          : profile.fullname || ""
                      }
                      onChange={handleProfileChange}
                      placeholder="Enter your full name"
                      className="rounded-3"
                      disabled={!formEnabled}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label className="fw-semibold">
                      Phone Number
                    </Form.Label>
                    <Form.Control
                      name="phoneNo"
                      value={
                        formEnabled
                          ? tempProfile.phoneNo || ""
                          : profile.phoneNo || ""
                      }
                      onChange={handleProfileChange}
                      placeholder="Enter your phone number"
                      className="rounded-3"
                      disabled={!formEnabled}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={
                        formEnabled
                          ? tempProfile.email || ""
                          : profile.email || ""
                      }
                      onChange={handleProfileChange}
                      placeholder="Enter your email"
                      className="rounded-3"
                      disabled={!formEnabled}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={
                        formEnabled ? tempProfile.password || "" : "********"
                      }
                      onChange={handleProfileChange}
                      placeholder="Enter your password"
                      className="rounded-3"
                      disabled={!formEnabled}
                    />
                  </Form.Group>
                </Col>
              </Row>
              {formEnabled && (
                <div className="d-flex gap-2">
                  <Button variant="success" onClick={handleSave}>
                    <BsCheckLg className="me-1" />
                    Save
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      setTempProfile({ ...profile });
                      setFormEnabled(false);
                    }}
                  >
                    <BsX className="me-1" />
                    Cancel
                  </Button>
                </div>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Card.Body>
    </Card>
  );
}

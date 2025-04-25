import React from "react";
import { Card, Button, Form, Row, Col, FormCheck } from "react-bootstrap";
import { BsPencilSquare, BsCheckLg, BsX } from "react-icons/bs";

export default function ProfileSection({ profile, setProfile }) {
  const [editMode, setEditMode] = React.useState(false);
  const [tempProfile, setTempProfile] = React.useState(profile);
  const [formEnabled, setFormEnabled] = React.useState(false);
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    setProfile(tempProfile);
    setEditMode(false);
  };
  
  const handleCancel = () => {
    setTempProfile(profile);
    setEditMode(false);
  };
  
  return (
    <Card className="shadow-sm border-0 rounded-4">
      <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center rounded-top-4 px-4 py-3">
        <h5 className="mb-0">🧘‍♂️ Profile</h5>
        <Button variant="light" size="sm" onClick={() => setEditMode(!editMode)}>
          <BsPencilSquare className="me-1" />
          {editMode ? "Cancel" : "Edit"}
        </Button>
      </Card.Header>
      <Card.Body className="p-4">
        {editMode ? (
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label className="fw-semibold">Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={tempProfile.name}
                    onChange={handleProfileChange}
                    placeholder="Enter your name"
                    className="rounded-3"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label className="fw-semibold">Life Story</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="lifestory"
                    value={tempProfile.lifestory}
                    onChange={handleProfileChange}
                    placeholder="Share your journey..."
                    className="rounded-3"
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex gap-2">
              <Button variant="success" onClick={handleSave}>
                <BsCheckLg className="me-1" />
                Save
              </Button>
              <Button variant="outline-secondary" onClick={handleCancel}>
                <BsX className="me-1" />
                Cancel
              </Button>
            </div>
          </Form>
        ) : (
          <div className="px-1">
            <h4 className="text-primary fw-bold">{profile.name || "No name provided"}</h4>
            <hr />
            <p className="text-muted" style={{ whiteSpace: "pre-wrap" }}>
              {profile.lifestory || "No life story provided yet."}
            </p>
          </div>
        )}

        {/* Additional Form with Toggle Switch */}
        <Card className="mt-4 shadow-sm border-0 rounded-4">
          <Card.Header className="bg-secondary text-white d-flex justify-content-between align-items-center rounded-top-4 px-4 py-3">
            <h5 className="mb-0">🔒 Account Details</h5>
            <Form.Check 
              type="switch"
              id="form-toggle-switch"
              label="Enable Editing"
              checked={formEnabled}
              onChange={() => setFormEnabled(!formEnabled)}
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
                      name="fullName"
                      value={tempProfile.fullName || ""}
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
                    <Form.Label className="fw-semibold">Phone Number</Form.Label>
                    <Form.Control
                      name="phoneNo"
                      value={tempProfile.phoneNo || ""}
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
                      value={tempProfile.email || ""}
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
                      value={tempProfile.password || ""}
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
                  <Button variant="outline-secondary" onClick={() => setFormEnabled(false)}>
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
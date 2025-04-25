import React, { useState } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { BsPlusLg, BsSend } from "react-icons/bs";

export default function AddAbhangaSection({ newAbhanga, setNewAbhanga, setAbhangas, abhangas }) {
  const [abhangaText, setAbhangaText] = useState("");
  const [language, setLanguage] = useState("marathi");
  
  const handleAddAbhanga = (e) => {
    e.preventDefault();
    if (newAbhanga.trim()) {
      setAbhangas([...abhangas, { id: Date.now(), title: newAbhanga, liked: false }]);
      setNewAbhanga("");
    }
  };
  
  const handleSubmitToAdmin = (e) => {
    e.preventDefault();
    if (newAbhanga.trim() && abhangaText.trim()) {
      // Here you would typically make an API call to send this to admin
      alert(`Abhanga "${newAbhanga}" in ${language} has been sent to admin for review`);
      setNewAbhanga("");
      setAbhangaText("");
    }
  };

  return (
    <Card border="success" className="bg-success-subtle">
      <Card.Header className="bg-success text-white">📜 Request to Add Abhanga</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmitToAdmin}>
          <Row className="mb-3">
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Abhanga Title</Form.Label>
                <Form.Control
                  placeholder="Enter Abhanga Title"
                  value={newAbhanga}
                  onChange={(e) => setNewAbhanga(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Row className="mb-3">
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Abhanga Text</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Paste the Abhanga text here"
                  value={abhangaText}
                  onChange={(e) => setAbhangaText(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Row className="mb-3">
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Select Language</Form.Label>
                <Form.Select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="marathi">Marathi</option>
                  <option value="hindi">Hindi</option>
                  <option value="sanskrit">Sanskrit</option>
                  <option value="english">English</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          
          <div className="d-flex gap-2">
            <Button type="submit" variant="success">
              <BsSend className="me-1" />
              Send to Admin
            </Button>
            <Button 
              type="button" 
              variant="warning" 
              onClick={handleAddAbhanga}
            >
              <BsPlusLg className="me-1" />
              Add to My List
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
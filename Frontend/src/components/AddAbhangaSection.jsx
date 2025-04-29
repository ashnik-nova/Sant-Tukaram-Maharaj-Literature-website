import React, { useState } from "react";
import { Button, Form, Spinner, Card, Container } from "react-bootstrap";
import { submitAbhanga } from "../api/abhanga.api"; 
import { useToast } from "../context/Toast/ToastContext"; // Adjust path if needed

const AddAbhangaSection = () => {
  const [newAbhanga, setNewAbhanga] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [abhangas, setAbhangas] = useState([]);
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast(); 

  // Handle submit of the new Abhanga (for review)
  const handleSubmitForReview = async () => {
    if (!newAbhanga.title.trim() || !newAbhanga.content.trim() || !newAbhanga.category.trim()) {
      alert("All fields (Title, Content, Category) are required!");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        title: newAbhanga.title,
        content: newAbhanga.content,
        category: newAbhanga.category
      };

      const response = await submitAbhanga(payload); // Assuming this function returns saved data
      setAbhangas((prev) => [...prev, response]);
      setNewAbhanga({ title: "", content: "", category: "" });
      success("Abhanga submitted for review!");
    } catch (error) {
      console.error("Submit Error:", error);
      alert(error.message || "Failed to submit abhanga.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <Container className="my-5" fluid>
      <Card className="shadow-lg rounded p-4">
        <Card.Body>
          <h3 className="text-center mb-4 text-primary">Add New Abhanga</h3>
          <Form>
            <Form.Group controlId="title" className="mb-3">
              <Form.Label className="fw-bold">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={newAbhanga.title}
                onChange={(e) =>
                  setNewAbhanga({ ...newAbhanga, title: e.target.value })
                }
                className="form-control-lg"
                style={{ borderRadius: "10px" }}
              />
            </Form.Group>

            <Form.Group controlId="content" className="mb-3">
              <Form.Label className="fw-bold">Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter Abhanga Content"
                value={newAbhanga.content}
                onChange={(e) =>
                  setNewAbhanga({ ...newAbhanga, content: e.target.value })
                }
                className="form-control-lg"
                style={{ borderRadius: "10px" }}
              />
            </Form.Group>

            <Form.Group controlId="category" className="mb-4">
              <Form.Label className="fw-bold">Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category (e.g., Devotion)"
                value={newAbhanga.category}
                onChange={(e) =>
                  setNewAbhanga({ ...newAbhanga, category: e.target.value })
                }
                className="form-control-lg"
                style={{ borderRadius: "10px" }}
              />
            </Form.Group>

            <div className="d-flex justify-content-center">
              {/* Submit for Review Button */}
              <Button
                variant="warning"
                onClick={handleSubmitForReview}
                disabled={loading}
                className="px-5 py-2 fs-5 me-3"
                style={{ borderRadius: "30px", width: "auto" }}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Submit for Review"}
              </Button>

              {/* Add to List Button */}
              
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddAbhangaSection;

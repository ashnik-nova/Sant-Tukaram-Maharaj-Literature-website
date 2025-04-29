import React, { useState } from "react";
import { Button, Form, Spinner, Card, Container } from "react-bootstrap";
import { submitBhajan } from "../api/bhajans.api.js"; // Adjust path if needed
import { useToast } from "../context/Toast/ToastContext"; // Adjust path if needed

const AddBhajanSection = () => {
  const [newBhajan, setNewBhajan] = useState({
    title: "",
    audio: null,
  });
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast(); 

  const handleSubmitForReview = async () => {
    if (!newBhajan.title.trim() || !newBhajan.audio) {
      alert("Both Title and Audio file are required!");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", newBhajan.title);
      formData.append("audio", newBhajan.audio);

      const response = await submitBhajan(formData); // Assume it handles multipart/form-data
      setNewBhajan({ title: "", audio: null });
      success("Bhajan submitted for review!");
    } catch (err) {
      console.error("Submit Error:", err);
      alert(err.message || "Failed to submit bhajan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5" fluid>
      <Card className="shadow-lg rounded p-4">
        <Card.Body>
          <h3 className="text-center mb-4 text-success">Add New Bhajan</h3>
          <Form encType="multipart/form-data">
            <Form.Group controlId="title" className="mb-3">
              <Form.Label className="fw-bold">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={newBhajan.title}
                onChange={(e) =>
                  setNewBhajan({ ...newBhajan, title: e.target.value })
                }
                className="form-control-lg"
                style={{ borderRadius: "10px" }}
              />
            </Form.Group>

            <Form.Group controlId="audio" className="mb-4">
              <Form.Label className="fw-bold">Upload Audio</Form.Label>
              <Form.Control
                type="file"
                accept="audio/*"
                onChange={(e) =>
                  setNewBhajan({ ...newBhajan, audio: e.target.files[0] })
                }
                className="form-control-lg"
                style={{ borderRadius: "10px" }}
              />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button
                variant="success"
                onClick={handleSubmitForReview}
                disabled={loading}
                className="px-5 py-2 fs-5"
                style={{ borderRadius: "30px", width: "auto" }}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Submit for Review"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddBhajanSection;

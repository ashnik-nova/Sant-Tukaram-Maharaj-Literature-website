import React, { useEffect, useState } from "react";
import {
  Card,
  ListGroup,
  Badge,
  Spinner,
  Alert,
  Modal,
  Button,
} from "react-bootstrap";
import { getUserBhajans } from "../api/bhajans.api.js"; // update your import path if needed

export default function BhajanList() {
  const [bhajans, setBhajans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBhajan, setSelectedBhajan] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBhajans = async () => {
      try {
        const response = await getUserBhajans();
        setBhajans(response.data);
        console.log("Fetched Bhajans:", response.data);
      } catch (err) {
        console.error("Failed to fetch user Bhajans:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBhajans();
  }, []);

  const getBadgeVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "success"; // Green
      case "pending":
        return "warning"; // Yellow
      case "rejected":
        return "danger"; // Red
      default:
        return "secondary"; // Default Gray
    }
  };

  const handleBhajanClick = (bhajan) => {
    setSelectedBhajan(bhajan);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBhajan(null);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
    );
  }

  return (
    <>
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-info text-white fs-5 fw-bold d-flex align-items-center">
          <span role="img" aria-label="music">🕉️</span>&nbsp;Your Bhajans
        </Card.Header>
        <Card.Body className="bg-light">
          {bhajans.length === 0 ? (
            <Alert variant="info" className="text-center mb-0">
              No Bhajans requested yet.
            </Alert>
          ) : (
            <ListGroup variant="flush">
              {bhajans.map((b) => (
                <ListGroup.Item
                  key={b._id}
                  action
                  onClick={() => handleBhajanClick(b)}
                  className="d-flex justify-content-between align-items-center py-3"
                  style={{ cursor: "pointer" }}
                >
                  <div className="fw-semibold text-truncate me-3" style={{ maxWidth: "70%" }}>
                    {b.title}
                  </div>
                  <Badge
                    bg={getBadgeVariant(b.status)}
                    className="px-3 py-2 text-uppercase"
                  >
                    {b.status || "Pending"}
                  </Badge>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>

      {/* Modal for Bhajan Details */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Bhajan Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBhajan && (
            <>
              <h5 className="fw-bold">{selectedBhajan.title}</h5>
              {selectedBhajan.audioUrl ? (
                <audio controls className="w-100 mt-3">
                  <source src={selectedBhajan.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <p className="text-muted mt-2">No audio available.</p>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

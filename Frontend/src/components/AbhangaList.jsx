import React, { useEffect, useState } from "react";
import {
  Card,
  ListGroup,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import { getUserAbhangas } from "../api/abhanga.api.js"; // update your import path if needed

export default function AbhangaList() {
  const [abhangas, setAbhangas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAbhangas = async () => {
      try {
        const response = await getUserAbhangas();
        setAbhangas(response.data);
        console.log("Fetched Abhangas:", response.data);
      } catch (err) {
        console.error("Failed to fetch user Abhangas:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAbhangas();
  }, []);

  const getBadgeVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "success";    // Green
      case "pending":
        return "warning";    // Yellow
      case "rejected":
        return "danger";     // Red
      default:
        return "secondary";  // Default Gray
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" variant="warning" />
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
    <Card className="shadow-sm border-0">
      <Card.Header className="bg-warning text-dark fs-5 fw-bold d-flex align-items-center">
        <span role="img" aria-label="music">🎶</span>&nbsp;Your Abhangas
      </Card.Header>
      <Card.Body className="bg-light">
        {abhangas.length === 0 ? (
          <Alert variant="info" className="text-center mb-0">
            No Abhangas requested yet.
          </Alert>
        ) : (
          <ListGroup variant="flush">
            {abhangas.map((a) => (
              <ListGroup.Item
                key={a._id}
                className="d-flex justify-content-between align-items-center py-3"
              >
                <div className="fw-semibold text-truncate me-3" style={{ maxWidth: "70%" }}>
                  {a.title}
                </div>
                <Badge
                  bg={getBadgeVariant(a.status)}
                  className="px-3 py-2 text-uppercase"
                >
                  {a.status || "Pending"}
                </Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}

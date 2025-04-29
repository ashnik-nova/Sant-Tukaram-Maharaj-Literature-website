import React, { useState, useEffect } from "react";
import { Button, Modal, Card, Row, Col, Form, Badge, Spinner } from "react-bootstrap";
import { getPendingAbhangas, updateAbhangaStatus } from "../../api/abhanga.api"; // Adjust path if needed
import { useToast } from "../../context/Toast/ToastContext";
import "./ManageAb.css"; 

// You can add these icons from react-bootstrap-icons
import { Book, Person, Clock, Calendar, CheckCircle, XCircle } from 'react-bootstrap-icons';

const ManageAbhangas = () => {
  const [abhangas, setAbhangas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAbhanga, setSelectedAbhanga] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const { success, error } = useToast(); 

  // Fetch pending Abhangas from backend
  const fetchAbhangas = async () => {
    setLoading(true);
    try {
      const data = await getPendingAbhangas();
      setAbhangas(data?.data || []); // assuming API response structure
    } catch (err) {
      error(err?.message || "Failed to fetch pending Abhangas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbhangas();
  }, []);

  // Show the modal with selected Abhanga
  const handleShowModal = (abhanga) => {
    setSelectedAbhanga(abhanga);
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAbhanga(null);
  };

  // Approve or Reject an Abhanga
  const handleReview = async (status) => {
    if (!selectedAbhanga) return;

    setActionLoading(true);
    try {
      await updateAbhangaStatus(selectedAbhanga._id, status); // `_id` from MongoDB
      success(`Abhanga ${status} successfully`);

      // After action, refetch fresh pending Abhangas
      fetchAbhangas();
    } catch (err) {
      error(err?.message || `Failed to ${status} Abhanga`);
    } finally {
      setActionLoading(false);
      handleCloseModal();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString || Date.now());
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="abhanga-container">
      <div className="header-section">
        <h2 className="page-title">Pending Abhangas Review</h2>
        <p className="page-description">Review and moderate user-submitted devotional poetry before publishing.</p>
      </div>

      {/* Show loading */}
      {loading ? (
        <div className="text-center my-5 loading-container">
          <Spinner animation="border" role="status" variant="warning" />
          <p className="mt-3">Loading submissions...</p>
        </div>
      ) : abhangas.length === 0 ? (
        <div className="empty-state">
          <Book size={48} className="empty-icon" />
          <h5>No pending Abhangas found</h5>
          <p>All submissions have been reviewed. Check back later.</p>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {abhangas.map((abhanga) => (
            <Col key={abhanga._id}>
              <Card className="abhanga-card">
                <Card.Body>
                  <div className="author-info">
                    <div className="author-avatar">
                      <Person size={18} />
                    </div>
                    <div className="author-details">
                      <span className="author-name">{abhanga.userName}</span>
                      <span className="submission-date">
                        <Clock size={12} className="me-1" />
                        {formatDate(abhanga.createdAt)}
                      </span>
                    </div>
                  </div>
                  
                  <Card.Title className="abhanga-title">{abhanga.title}</Card.Title>
                  <Card.Text className="abhanga-excerpt">
                    {abhanga.content.substring(0, 100)}
                    {abhanga.content.length > 100 && "..."}
                  </Card.Text>
                  
                  <div className="card-footer-area">
                    <Badge bg="warning" className="status-badge">
                      <Clock size={10} className="me-1" /> Pending
                    </Badge>
                    <Button
                      variant="primary"
                      onClick={() => handleShowModal(abhanga)}
                      className="review-button"
                    >
                      Review
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Modal for Reviewing Abhanga */}
      <Modal 
        show={showModal} 
        onHide={handleCloseModal} 
        centered 
        size="lg"
        className="abhanga-modal"
      >
        <Modal.Header closeButton className="modal-header">
          <Modal.Title className="d-flex align-items-center">
            <Book size={24} className="me-2 modal-icon" />
            Review Abhanga
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {selectedAbhanga && (
            <>
              <h5 className="abhanga-modal-title">{selectedAbhanga.title}</h5>
              
              <div className="author-section">
                <Person size={16} className="me-2" />
                <span className="modal-author-name">{selectedAbhanga.userName}</span>
              </div>
              
              <div className="content-section">
                <h6 className="content-label">CONTENT</h6>
                <div className="content-area">
                  {selectedAbhanga.content}
                </div>
              </div>
              
              <Form.Group className="mt-3 status-section">
                <Form.Label>Status:</Form.Label>
                <Badge bg="warning" className="ms-2">
                  <Clock size={10} className="me-1" /> Pending
                </Badge>
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => handleReview('rejected')}
            disabled={actionLoading}
            className="d-flex align-items-center justify-content-center"
          >
            {actionLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                <span>Rejecting...</span>
              </>
            ) : (
              <>
                <XCircle size={16} className="me-2" /> Reject
              </>
            )}
          </Button>
          <Button
            variant="success"
            onClick={() => handleReview('approved')}
            disabled={actionLoading}
            className="d-flex align-items-center justify-content-center"
          >
            {actionLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                <span>Approving...</span>
              </>
            ) : (
              <>
                <CheckCircle size={16} className="me-2" /> Approve
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageAbhangas;
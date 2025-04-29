import React, { useState, useEffect } from "react";
import { Button, Modal, Card, Row, Col, Spinner, Badge } from "react-bootstrap";
import { getPendingBhajans, updateBhajanStatus } from "../../api/bhajans.api"; // Adjust if needed
import { useToast } from "../../context/Toast/ToastContext";
import { MusicNoteBeamed, Person, Clock, PlayFill, CheckCircle, XCircle } from 'react-bootstrap-icons';


const ManageBhajans = () => {
  const [bhajans, setBhajans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBhajan, setSelectedBhajan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const { success, error } = useToast();

  // Fetch pending Bhajans
  const fetchBhajans = async () => {
    setLoading(true);
    try {
      const data = await getPendingBhajans();
      console.log("Pending Bhajans:", data.data); // Debugging line
      setBhajans(data?.data || []);
      // Debugging line
    } catch (err) {
      error(err?.message || "Failed to fetch pending Bhajans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBhajans();
  }, []);

  const handleShowModal = (bhajan) => {
    setSelectedBhajan(bhajan);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBhajan(null);
  };

  const handleReview = async (status) => {
    if (!selectedBhajan) return;
    setActionLoading(true);
    try {
      await updateBhajanStatus(selectedBhajan._id, status);
      success(`Bhajan ${status} successfully`);
      fetchBhajans();
    } catch (err) {
      error(err?.message || `Failed to ${status} Bhajan`);
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
    <div className="bhajan-container">
      <div className="header-section">
        <h2 className="page-title">Pending Bhajans Review</h2>
        <p className="page-description">Approve or reject user-submitted devotional songs before publishing.</p>
      </div>

      {loading ? (
        <div className="text-center my-5 loading-container">
          <Spinner animation="border" role="status" variant="primary" />
          <p className="mt-3">Loading submissions...</p>
        </div>
      ) : bhajans.length === 0 ? (
        <div className="empty-state">
          <MusicNoteBeamed size={48} className="empty-icon" />
          <h5>No pending Bhajans found</h5>
          <p>All submissions have been reviewed. Check back later.</p>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {bhajans.map((bhajan) => (
            <Col key={bhajan._id}>
              <Card className="bhajan-card">
                <Card.Body>
                  <div className="author-info">
                    <div className="author-avatar">
                      <Person size={18} />
                    </div>
                    <div className="author-details">
                      <span className="author-name">{bhajan.createdBy?.fullname || "Unknown User"}</span>
                      <span className="submission-date">
                        <Clock size={12} className="me-1" />
                        {formatDate(bhajan.createdAt)}
                      </span>
                    </div>
                  </div>

                  <Card.Title className="bhajan-title">{bhajan.title}</Card.Title>

                  <audio controls className="audio-player">
                    <source src={bhajan.audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>

                  <div className="card-footer-area">
                    <Badge bg="warning" className="status-badge">
                      <Clock size={10} className="me-1" /> Pending
                    </Badge>
                    <Button
                      variant="primary"
                      onClick={() => handleShowModal(bhajan)}
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

      {/* Review Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg" className="bhajan-modal">
        <Modal.Header closeButton className="modal-header">
          <Modal.Title className="d-flex align-items-center">
            <MusicNoteBeamed size={24} className="me-2 modal-icon" />
            Review Bhajan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {selectedBhajan && (
            <>
              <h5 className="bhajan-modal-title">{selectedBhajan.title}</h5>

              <div className="author-section">
                <Person size={16} className="me-2" />
                <span className="modal-author-name">{selectedBhajan.createdBy?.fullname || "Unknown"}</span>
              </div>

              <div className="content-section mt-3">
                <h6 className="content-label">Audio Preview</h6>
                <audio controls className="audio-preview">
                  <source src={selectedBhajan.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>

              <div className="mt-3 status-section">
                <Badge bg="warning">
                  <Clock size={10} className="me-1" /> Pending
                </Badge>
              </div>
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
                <Spinner as="span" animation="border" size="sm" className="me-2" />
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
                <Spinner as="span" animation="border" size="sm" className="me-2" />
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

export default ManageBhajans;

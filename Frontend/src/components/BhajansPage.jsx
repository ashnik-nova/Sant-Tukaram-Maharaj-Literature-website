import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Card, Badge, Spinner, Alert } from 'react-bootstrap';
import { getApprovedBhajans } from '../api/bhajans.api.js';

// AudioCard component to display an individual bhajan
const AudioCard = ({ bhajan }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(bhajan.audioUrl));

  // Handle play/pause functionality
  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      audio.pause();
    };
  }, [audio]);

  // Format timestamp to readable date
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown date';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="h-100 bhajan-card">
      <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
        <h5 className="mb-0">{bhajan.title}</h5>
      </Card.Header>
      <Card.Body>
        <div className="mb-3">

          {bhajan.tags && bhajan.tags.map((tag, index) => (
            <Badge key={index} bg="light" text="dark" className="me-1">
              {tag}
            </Badge>
          ))}
        </div>
        {bhajan.description && (
          <Card.Text className="mb-3">
            {bhajan.description.length > 100 
              ? `${bhajan.description.substring(0, 100)}...` 
              : bhajan.description}
          </Card.Text>
        )}
        <div className="text-muted small mb-3">
          Uploaded: {formatDate(bhajan.createdAt)}
        </div>
        <div className="audio-player mb-3">
          <audio controls className="w-100">
            <source src={bhajan.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
        <div className="d-flex justify-content-end">
          
        </div>
      </Card.Body>
    </Card>
  );
};

// Main BhajansPage component
const BhajansPage = () => {
  // State variables
  const [bhajans, setBhajans] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch approved bhajans on component mount
  useEffect(() => {
    const fetchBhajans = async () => {
      try {
        setLoading(true);
        const data = await getApprovedBhajans();
        // Filter to only include approved bhajans
        const approvedBhajans = data.data;
        setBhajans(approvedBhajans);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch bhajans');
        setLoading(false);
      }
    };
    
    fetchBhajans();
  }, []);
  
  // Filter bhajans based on search query and category
  const filteredBhajans = bhajans.filter(bhajan => {
    const matchesSearch = bhajan.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bhajan.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'All Categories' || bhajan.category === category;
    return matchesSearch && matchesCategory;
  });
  
  // Get available categories from bhajans
  const categories = ['All Categories', ...new Set(bhajans.map(bhajan => bhajan.category).filter(Boolean))];
  
  return (
    <div className="bhajans-page">
      {/* Hero Section */}
      <div className="hero-section bg-secondary text-white text-center py-5">
        <Container>
          <h1 className="display-4">Divine Bhajans Collection</h1>
          <p className="lead">Experience the spiritual journey through sacred bhajans.</p>
        </Container>
      </div>

      {/* Error Alert */}
      {error && (
        <Container className="mt-3">
          <Alert variant="danger" onClose={() => setError(null)} dismissible>
            {error}
          </Alert>
        </Container>
      )}

      <Container className="py-4">
        {/* Search Section */}
        <section className="search-section py-3 mb-4 bg-light rounded">
          <Row className="justify-content-center">
            <Col md={8}>
              <div className="d-flex gap-2">
                <Form.Control
                  type="search"
                  placeholder="Search Bhajans..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow-1"
                />
                
              </div>
            </Col>
          </Row>
        </section>

        {/* Bhajans Grid */}
        <section className="bhajans-grid py-3">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : filteredBhajans.length > 0 ? (
            <Row xs={1} md={2} lg={3} className="g-4">
              {filteredBhajans.map((bhajan) => (
                <Col key={bhajan._id || bhajan.id}>
                  <AudioCard bhajan={bhajan} />
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-5">
              <p className="lead text-muted">No bhajans found matching your search.</p>
            </div>
          )}
        </section>
      </Container>

      {/* Custom CSS */}
      <style jsx>{`
        .hero-section {
          background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
                      url('/api/placeholder/1200/300') center/cover !important;
          padding: 60px 0;
        }
        
        .bhajan-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .bhajan-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .card-header {
          background-color: #8B5A2B !important; /* Brown color matching navbar */
        }
        
        .btn-primary {
          background-color: #8B5A2B;
          border-color: #8B5A2B;
        }
        
        .btn-primary:hover {
          background-color: #704621;
          border-color: #704621;
        }
      `}</style>
    </div>
  );
};

export default BhajansPage;
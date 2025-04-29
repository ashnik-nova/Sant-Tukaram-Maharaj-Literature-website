import React, { useState, useEffect } from "react";
import CustomNavbar from "./Navbar";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Badge,
  Alert
} from "react-bootstrap";
import "./AbhangasPage.css";
import { getApprovedAbhangas } from "../api/abhanga.api.js";

const AbhangasPage = () => {
  const [abhangas, setAbhangas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("All");
  const [expandedAbhanga, setExpandedAbhanga] = useState(null);

  // Translation states
  const [translatedContent, setTranslatedContent] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [translationDirection, setTranslationDirection] = useState("mr-en");

  // TTS states
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsError, setTtsError] = useState(null);

  // Check if ResponsiveVoice is loaded
  useEffect(() => {
    if (!window.ResponsiveVoice) {
      console.warn("ResponsiveVoice is not loaded. TTS functionality will be limited.");
      setTtsError("Text-to-speech service is not available. Please make sure the ResponsiveVoice library is loaded.");
    }
  }, []);

  // Fetch Abhangas
  useEffect(() => {
    const fetchAbhangas = async () => {
      try {
        setLoading(true);
        const response = await getApprovedAbhangas();
        console.log("Fetched Abhangas:", response.data);
        setAbhangas(response.data);
        setError(null);
      } catch (err) {
        console.error("Error loading Abhangas:", err);
        setError("Failed to load Abhangas. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAbhangas();
  }, []);

  // Get unique categories for filtering
  const uniqueCategories = [...new Set(
    abhangas.map(abhang => abhang.category?.charAt(0).toUpperCase() + abhang.category?.slice(1).trim())
  )].filter(Boolean);

  const filteredAbhangas = abhangas.filter((abhang) => {
    const matchesSearch = abhang.content?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          abhang.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTheme = selectedTheme === "All" || 
                         abhang.category?.toLowerCase() === selectedTheme.toLowerCase();
    return matchesSearch && matchesTheme;
  });

  const handleReadMore = (abhang) => {
    setExpandedAbhanga(abhang);
    setShowTranslation(false);
    setTranslatedContent("");
    setTranslationError(null);
    setTtsError(null);
    
    // Stop any ongoing speech when changing abhanga
    if (window.ResponsiveVoice && window.ResponsiveVoice.isPlaying()) {
      window.ResponsiveVoice.cancel();
      setIsSpeaking(false);
    }
  };

  const handleClose = () => {
    setExpandedAbhanga(null);
    setShowTranslation(false);
    setTranslatedContent("");
    setTranslationError(null);
    setTtsError(null);
    
    // Stop any ongoing speech when closing
    if (window.ResponsiveVoice && window.ResponsiveVoice.isPlaying()) {
      window.ResponsiveVoice.cancel();
      setIsSpeaking(false);
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const formatContent = (content) => {
    if (!content) return "";
    return content.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const toggleTranslationDirection = () => {
    setTranslationDirection(prev => prev === "mr-en" ? "en-mr" : "mr-en");
    setShowTranslation(false);
    setTranslatedContent("");
  };


  const translateWithMyMemory = async (text, sourceLang, targetLang) => {
    try {
      const encodedText = encodeURIComponent(text);
      const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${sourceLang}|${targetLang}`;
      const response = await fetch(url);
      const data = await response.json();
      return data.responseData.translatedText;
    } catch (error) {
      console.error("Translation API Error:", error);
      throw error;
    }
  };

  // Use it in translation
  const handleTranslation = async () => {
    if (!expandedAbhanga || !expandedAbhanga.content) return;

    setIsTranslating(true);
    setTranslationError(null);

    try {
      const [sourceLang, targetLang] = translationDirection === "mr-en"
        ? ["mr", "en"]
        : ["en", "mr"];

      const textToTranslate = showTranslation ? translatedContent : expandedAbhanga.content;
      
      const translated = await translateWithMyMemory(textToTranslate, sourceLang, targetLang);

      setTranslatedContent(translated);
      setShowTranslation(true);
    } catch (err) {
      console.error("Translation error:", err);
      setTranslationError("Translation failed. Please try again later.");
    } finally {
      setIsTranslating(false);
    }
  };
  
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section text-center">
        <Container>
          <h1 className="hero-title">Explore the Divine Abhangas</h1>
          <p className="hero-text">
            Dive into the timeless wisdom of Sant Tukaram Maharaj's Abhangas.
          </p>
        </Container>
      </section>

      {/* Filter Section */}
      <Container className="filter-section my-4">
        <Row className="justify-content-between">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Search Abhangas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Form.Select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
            >
              <option value="All">All Themes</option>
              {uniqueCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Container>

      {/* Abhanga Collection */}
      <section className="abhang-collection">
        <Container>
          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p className="mt-2">Loading Abhangas...</p>
            </div>
          ) : error ? (
            <Alert variant="danger" className="text-center my-5">
              <p>{error}</p>
            </Alert>
          ) : (
            <Row>
              {expandedAbhanga ? (
                <Col md={12} className="expanded-abhanga">
                  <Card className="abhang-card expanded-card">
                    <Card.Body>
                      <h4 className="abhang-title">{expandedAbhanga.title}</h4>

                      {/* Translation Controls */}
                      <div className="translation-controls mb-3">
                        <Button
                          variant="outline-secondary"
                          onClick={toggleTranslationDirection}
                          disabled={isTranslating}
                        >
                          {translationDirection === "mr-en"
                            ? "Marathi → English"
                            : "English → Marathi"}
                        </Button>
                        <Button
                          variant="primary"
                          className="ms-2"
                          onClick={handleTranslation}
                          disabled={isTranslating}
                        >
                          {isTranslating ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                              <span className="ms-2">Translating...</span>
                            </>
                          ) : (
                            showTranslation ? "Translate Back" : "Translate"
                          )}
                        </Button>
                      </div>

                      {/* Translation error */}
                      {translationError && (
                        <Alert variant="danger">{translationError}</Alert>
                      )}

                      

                      {/* Content */}
                      <blockquote className="abhang-text">
                        {showTranslation
                          ? formatContent(translatedContent)
                          : formatContent(expandedAbhanga.content)}
                      </blockquote>

                      {/* Translation badge */}
                      {showTranslation && (
                        <Badge bg="info" className="translation-badge">
                          {translationDirection === "mr-en"
                            ? "English Translation"
                            : "मराठी अनुवाद"}
                        </Badge>
                      )}



                      <div className="theme-tag mb-3 mt-3">
                        {expandedAbhanga.category || "Miscellaneous"}
                      </div>

                      <Button
                        variant="danger"
                        className="close-btn"
                        onClick={handleClose}
                      >
                        ✖ Close
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ) : filteredAbhangas.length > 0 ? (
                filteredAbhangas.map((abhang) => (
                  <Col key={abhang._id} md={6} lg={4} className="mb-4">
                    <Card className="abhang-card h-100">
                      <Card.Body>
                        <h5 className="abhang-title">{abhang.title}</h5>
                        <blockquote className="abhang-text">
                          {truncateText(abhang.content, 120)}
                        </blockquote>
                        <div className="theme-tag">
                          {abhang.category || "Miscellaneous"}
                        </div>
                        <Button
                          variant="link"
                          className="read-more"
                          onClick={() => handleReadMore(abhang)}
                        >
                          Read More
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col md={12}>
                  <div className="text-center my-5">
                    <p>No Abhangas found matching your search criteria.</p>
                  </div>
                </Col>
              )}
            </Row>
          )}
        </Container>
      </section>

      {/* Footer */}
      <footer className="footer text-center">
        <Container>
          <p>&copy; {new Date().getFullYear()} Sant Tukaram Maharaj | All Rights Reserved</p>
        </Container>
      </footer>
    </div>
  );
};

export default AbhangasPage;
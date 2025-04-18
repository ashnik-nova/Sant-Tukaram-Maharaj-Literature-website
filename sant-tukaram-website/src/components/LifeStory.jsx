import React, { useState, useEffect } from "react";
import { lifeStory } from "../Data/LifeStory";
import CustomNavbar from "./Navbar.jsx";

function LifeStory() {
  const [expandedStory, setExpandedStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeStory();
      }
    };

    if (expandedStory) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expandedStory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const openStory = (story) => {
    setExpandedStory(story);
  };

  const closeStory = () => {
    setExpandedStory(null);
  };

  if (isLoading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading Sant Tukaram Maharaj's Life Story...</p>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      <CustomNavbar />

      {/* Header */}
      <div className="container py-5 text-center">
        <h1 className="display-5 fw-bold">
          The Inspiring Journey of <br />
          <span className="text-primary">Sant Tukaram Maharaj</span>
        </h1>
        <p className="lead">Explore the divine life and teachings of the great saint</p>
      </div>

      {/* Story Cards */}
      <div className="container pb-5">
        <div className="row">
          {lifeStory.map((story) => (
            <div className="col-lg-4 col-md-6 mb-4" key={story.id}>
              <div
                className="card h-100 shadow-sm"
                role="button"
                tabIndex={0}
                onClick={() => openStory(story)}
                onKeyPress={(e) => e.key === "Enter" && openStory(story)}
              >
                <img
                  src={story.image}
                  alt={story.title}
                  className="card-img-top"
                  loading="lazy"
                />
                <div className="card-body">
                  <h5 className="card-title">{story.title}</h5>
                  <p className="card-text">
                    {story.description.slice(0, 100)}...
                    <span className="text-primary fw-semibold"> Read More</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {expandedStory && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          role="dialog"
          onClick={closeStory}
        >
          <div
            className="modal-dialog modal-xl modal-dialog-centered"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{expandedStory.title}</h5>
                <button type="button" className="btn-close" onClick={closeStory} />
              </div>
              <div className="modal-body">
                <img
                  src={expandedStory.image}
                  className="img-fluid mb-3 rounded"
                  alt={expandedStory.title}
                />
                {expandedStory.description.split("\n").map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LifeStory;


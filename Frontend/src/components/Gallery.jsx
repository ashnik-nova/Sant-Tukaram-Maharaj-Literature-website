import React, { useState } from "react";
import "./Gallery.css";
import { galleryImages } from "../Data/GalleryData";
import Navbar from "./Navbar";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState(null);

  // Get unique categories
  const categories = ["All", ...new Set(galleryImages.map((img) => img.category))];

  // Filter images by category
  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  // Open lightbox
  const openLightbox = (image) => setLightboxImage(image);

  // Close lightbox
  const closeLightbox = () => setLightboxImage(null);

  return (
    <div className="gallery-page">
      {/* Navbar */}

      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="gallery-title">Gallery of Sant Tukaram Maharaj</h1>
        <p>Explore the divine journey through images</p>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="image-grid">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="image-card"
            onClick={() => openLightbox(image)}
          >
            <img src={image.src} alt={image.alt} />
            <p>{image.alt}</p>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeLightbox}>
              ✕
            </button>
            <img src={lightboxImage.src} alt={lightboxImage.alt} />
            <p>{lightboxImage.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

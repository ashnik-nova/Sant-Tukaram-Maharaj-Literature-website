// Philosophy.jsx
import React from "react";
import "./Philosophy.css";
import Navbar from "./Navbar";

const Philosophy = () => {
  const teachings = [
    {
      id: 1,
      title: "Bhakti Marg (Path of Devotion)",
      description:
        "Sant Tukaram emphasized pure, unconditional devotion to Lord Vitthal. He believed inner faith was more valuable than external rituals.",
      icon: "🕉️",
    },
    {
      id: 2,
      title: "Social Equality & Reform",
      description:
        "He rejected caste discrimination and preached spiritual equality, believing God is accessible to all, regardless of status.",
      icon: "🤝",
    },
    {
      id: 3,
      title: "Detachment & Simplicity",
      description:
        "He taught that true happiness lies in spiritual connection, not material wealth, and advocated for a simple and humble life.",
      icon: "🧘",
    },
    {
      id: 4,
      title: "Compassion & Service (Seva Dharma)",
      description:
        "Service to others is equivalent to service to God. He encouraged acts of kindness and humility as a form of worship.",
      icon: "❤️",
    },
    {
      id: 5,
      title: "Power of Abhangas",
      description:
        "Through his Abhangas (devotional hymns), Sant Tukaram conveyed timeless spiritual truths in simple language.",
      icon: "🎵",
    },
  ];

  const quotes = [
    "The one who embraces the poor and the oppressed is truly noble.",
    "In the pilgrimage to Pandharpur, Lord Vitthal stands as a witness to our devotion.",
    "Material possessions are fleeting, but the love for God is eternal.",
    "A simple heart, devoted to God, finds true peace.",
    "Service to humanity is service to God.",
  ];

  return (
    <div className="philosophy-page">
      {/* Navbar */}
      

      {/* Hero Section */}
      <section className="hero-section">
        <h1>Philosophy of Sant Tukaram Maharaj</h1>
        <p>
          Discover the timeless teachings of love, devotion, and social equality
          that continue to inspire generations.
        </p>
      </section>

      {/* Core Teachings Section */}
      <section className="teachings-section">
        <h2>Core Teachings</h2>
        <div className="teachings-grid">
          {teachings.map((item) => (
            <div key={item.id} className="teaching-card">
              <span className="icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quotes Carousel */}
      <section className="quotes-section">
        <h2>Words of Wisdom</h2>
        <div className="quotes-carousel">
          {quotes.map((quote, index) => (
            <div key={index} className="quote-card">
              <p>“{quote}”</p>
            </div>
          ))}
        </div>
      </section>

      {/* Legacy & Impact Section */}
      <section className="legacy-section">
        <h2>Legacy & Impact</h2>
        <p>
          Sant Tukaram Maharaj's legacy lives on through the Varkari tradition,
          which continues to inspire millions to walk the path of devotion,
          compassion, and humility. His timeless wisdom echoes across
          generations, encouraging spiritual equality and inner transformation.
        </p>
      </section>
    </div>
  );
};

export default Philosophy;

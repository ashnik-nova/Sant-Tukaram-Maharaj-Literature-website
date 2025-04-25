// import React, { useEffect } from "react";
// import { Container, Navbar, Nav, Button, Row, Col, Card } from "react-bootstrap";
// import "./HomePage.css";

// const HomePage = () => {
//   // Scroll Animation Function
//   useEffect(() => {
//     const handleScroll = () => {
//       const elements = document.querySelectorAll(".scroll-reveal");
//       elements.forEach((el) => {
//         const rect = el.getBoundingClientRect();
//         if (rect.top <= window.innerHeight * 0.85) {
//           el.classList.add("visible");
//         }
//       });
//     };

//     // Run on scroll and initial load
//     window.addEventListener("scroll", handleScroll);
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div>
//       {/* Navbar */}
//       <Navbar expand="lg" className="custom-navbar">
//         <Container>
//           <Navbar.Brand href="#" className="logo">🕉️ Sant Tukaram Maharaj</Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="ms-auto">
//               <Nav.Link href="#">Home</Nav.Link>
//               <Nav.Link href="#">Abhangs</Nav.Link>
//               <Nav.Link href="#">Life Story</Nav.Link>
//               <Nav.Link href="#">Philosophy</Nav.Link>
//               <Nav.Link href="#">Gallery</Nav.Link>
//               <Nav.Link href="#">Contact</Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {/* Intro Section */}
//       <section className="intro-section text-center">
//         <Container>
//           <h1 className="intro-title">Sant Tukaram Maharaj</h1>
//           <p className="intro-text">
//             Experience the divine wisdom and poetry of Sant Tukaram Maharaj, whose Abhangs echo the spirit of devotion and truth.
//           </p>
//           <Button variant="warning" size="lg" className="explore-btn">Explore Abhangs</Button>
//         </Container>
//       </section>

//       {/* Featured Abhang */}
//       <section className="featured-abhang text-center scroll-reveal">
//         <Container>
//           <h2 className="section-title">🌟 Featured Abhang</h2>
//           <Card className="abhang-card">
//             <Card.Body>
//               <blockquote className="abhang-text">
//                 "जाणता अजाणता हरिपाठ करा ।<br />
//                 मग तो सांगे पंथा संताचा ॥"
//               </blockquote>
//               <p className="abhang-meaning">
//                 Whether knowingly or unknowingly, chant the name of Hari (God), and he will guide you on the path of saints.
//               </p>
//             </Card.Body>
//           </Card>
//         </Container>
//       </section>

//       {/* Call to Action */}
//       <section className="cta-section text-center scroll-reveal">
//         <Container>
//           <h2 className="cta-title">📜 Embark on a Spiritual Journey</h2>
//           <p className="cta-text">Dive into the timeless teachings of Sant Tukaram Maharaj through his Abhangs and philosophy.</p>
//           <Button variant="outline-light" size="lg" className="cta-btn">Explore Philosophy</Button>
//         </Container>
//       </section>

//       {/* Footer */}
//       <footer className="footer text-center">
//         <Container>
//           <p>&copy; {new Date().getFullYear()} Sant Tukaram Maharaj | All Rights Reserved</p>
//         </Container>
//       </footer>
//     </div>
//   );
// };

// import React, { useEffect } from "react";
// import { Container, Navbar, Nav, Button, Row, Col, Card } from "react-bootstrap";
// import "./HomePage.css";

// const HomePage = () => {
//   // Scroll Animation
//   useEffect(() => {
//     const handleScroll = () => {
//       const elements = document.querySelectorAll(".scroll-reveal");
//       elements.forEach((el) => {
//         const rect = el.getBoundingClientRect();
//         if (rect.top <= window.innerHeight * 0.85) {
//           el.classList.add("visible");
//         }
//       });
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div>
//       {/* Navbar */}
//       <Navbar expand="lg" className="custom-navbar">
//         <Container>
//           <Navbar.Brand href="#" className="logo">🕉️ Sant Tukaram Maharaj</Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="ms-auto">
//               <Nav.Link href="#">Home</Nav.Link>
//               <Nav.Link href="#">Abhangs</Nav.Link>
//               <Nav.Link href="#">Life Story</Nav.Link>
//               <Nav.Link href="#">Philosophy</Nav.Link>
//               <Nav.Link href="#">Gallery</Nav.Link>
//               <Nav.Link href="#">Contact</Nav.Link>
//               <Nav.Link href="#">SignUp/Login</Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {/* Info Section */}
//       <section className="info-section scroll-reveal">
//         <Container>
//           <Row className="align-items-center">
//             <Col lg={6} className="info-text">
//               <h2>About Sant Tukaram Maharaj</h2>
//               <p>
//               Sant Tukaram Maharaj, also known as Tuka, Tukobaraya, Tukoba, was a Hindu,
//               Marathi Saint of Varkari sampradaya in Dehu village, Maharashtra in the 
//               17th century. He was a bhakt of the god Vithoba, also known as
//               Vitthal, of Pandharpur.He is best known for his devotional poetry 
//               called Abhanga, which are popular in Maharashtra, many of his poems 
//               deal with social reform.His poems are included in the school and 
//               college syllabuses prominently in the state of Maharashtra.
//               </p>
//               <Button
//                 variant="outline-dark"
//                 href="https://en.wikipedia.org/wiki/Tukaram"
//                 target="_blank"
//                 className="learn-more-btn"
//               >
//                 Learn More
//               </Button>
//             </Col>
//             <Col lg={6} className="info-image">
//               <img
//                 src="/src/assets/330px-Tukaram_by_Raja_Ravi_Varma.jpg"
//                 alt="Sant Tukaram Maharaj"
//                 className="info-img"
//               />
//             </Col>
//           </Row>
//         </Container>
//       </section>

//       {/* Intro Section */}
//       <section className="intro-section text-center">
//         <Container>
//           <h1 className="intro-title">Sant Tukaram Maharaj</h1>
//           <p className="intro-text">
//             Experience the divine wisdom and poetry of Sant Tukaram Maharaj, whose Abhangs echo the spirit of devotion and truth.
//           </p>
//           <Button variant="warning" size="lg" className="explore-btn">Explore Abhangs</Button>
//         </Container>
//       </section>

//       {/* Featured Abhang Section */}
//       <section className="featured-abhang scroll-reveal">
//         <Container>
//           <h2 className="text-center">📜 Featured Abhang</h2>
//           <Row className="justify-content-center mt-4">
//             <Col md={8}>
//               <Card className="abhang-card">
//                 <Card.Body>
//                   <blockquote className="abhang-text">
//                     "जे का रंजले गांजले त्यासी म्हणे जो आपुले। तोचि साधू ओळखावा देव तेथेंचि जाणावा॥"
//                   </blockquote>
//                   <p className="abhang-meaning">
//                     The one who identifies with the distressed and stands by them is the true saint – and that is where God resides.
//                   </p>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </section>

//       {/* Call to Action */}
//       <section className="cta-section text-center scroll-reveal">
//         <Container>
//           <h2 className="cta-title">📚 Explore the Teachings</h2>
//           <p className="cta-text">Immerse yourself in the timeless wisdom and spiritual devotion of Sant Tukaram Maharaj.</p>
//           <Button variant="outline-light" size="lg" className="cta-btn">Discover More</Button>
//         </Container>
//       </section>

//       {/* Footer */}
//       <footer className="footer text-center">
//         <Container>
//           <p>&copy; {new Date().getFullYear()} Sant Tukaram Maharaj | All Rights Reserved</p>
//         </Container>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;

import React, { useEffect } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 
import CustomNavbar from "./Navbar";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate(); 
  const [popupImage, setPopupImage] = React.useState(null);

  // Scroll Animation
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".scroll-reveal");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.85) {
          el.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* Imported Navbar */}


      {/* Info Section */}
      <section className="info-section scroll-reveal">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="info-text">
              <h2>About Sant Tukaram Maharaj</h2>
              <p>
                Sant Tukaram Maharaj, also known as Tuka, Tukobaraya, Tukoba, was a Hindu,
                Marathi Saint of Varkari sampradaya in Dehu village, Maharashtra in the
                17th century. He was a bhakt of the god Vithoba, also known as
                Vitthal, of Pandharpur. He is best known for his devotional poetry
                called Abhanga, which are popular in Maharashtra.
              </p>
              <Button
                variant="outline-dark"
                href="https://en.wikipedia.org/wiki/Tukaram"
                target="_blank"
                className="learn-more-btn"
              >
                Learn More
              </Button>
            </Col>
            <Col lg={6} className="info-image">
              <img
                src="/src/assets/330px-Tukaram_by_Raja_Ravi_Varma.jpg"
                alt="Sant Tukaram Maharaj"
                className="info-img"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Intro Section */}
      <section className="intro-section text-center">
        <Container>
          <h1 className="intro-title">Sant Tukaram Maharaj</h1>
          <p className="intro-text">
            Experience the divine wisdom and poetry of Sant Tukaram Maharaj, whose Abhangs echo the spirit of devotion and truth.
          </p>
          <Button
            variant="warning"
            size="lg"
            className="explore-btn"
            onClick={() => navigate("/abhangs")}
          >
            Explore Abhangs
          </Button>
        </Container>
      </section>

      {/* Featured Abhang Section */}
      <section className="featured-abhang scroll-reveal">
        <Container>
          <h2 className="text-center">📜 Featured Abhang</h2>
          <Row className="justify-content-center mt-4">
            <Col md={8}>
              <Card className="abhang-card">
                <Card.Body>
                  <blockquote className="abhang-text">
                    "जे का रंजले गांजले त्यासी म्हणे जो आपुले। तोचि साधू ओळखावा देव तेथेंचि जाणावा॥"
                  </blockquote>
                  <p className="abhang-meaning">
                    The one who identifies with the distressed and stands by them is the true saint – and that is where God resides.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="cta-section text-center scroll-reveal">
        <Container>
          <h2 className="cta-title">📚 Explore the Teachings</h2>
          <p className="cta-text">
            Immerse yourself in the timeless wisdom and spiritual devotion of Sant Tukaram Maharaj.
          </p>
          <Button
            variant="outline-light"
            size="lg"
            className="cta-btn"
            onClick={() => navigate("/LifeStory")} // ✅ Navigate correctly
          >
            Discover More
          </Button>
        </Container>
      </section>

      {/* Book Store Section */}
      <section className="bookstore-section text-center scroll-reveal">
        <Container>
          <h2 className="bookstore-title">📖 Buy Books</h2>
          <p className="bookstore-text">
            Discover literature and books inspired by the life and teachings of Sant Tukaram Maharaj.
          </p>
          <Button
            variant="success"
            size="lg"
            className="bookstore-btn"
            onClick={() => navigate("/books")}
          >
            Visit Book Store
          </Button>
        </Container>
      </section>

      {/* Palkhi Procession Section */}
      <section className="palkhi-section text-center scroll-reveal">
        <Container>
          <h2 className="palkhi-title">🚩 Palkhi Procession Route & Schedule 2025</h2>
          <p className="palkhi-text">
            Witness the divine journey of Tukaram Maharaj's Palkhi with detailed route and schedule.
          </p>

          <Row className="justify-content-center">
            <Col md={6} className="mb-4">
            <img
              src="/map.jpeg"
              alt="Palkhi Route Map"
              className="palkhi-image"
              onClick={() => setPopupImage("/map.jpeg")}
            />
              <p className="image-caption">📍 Route of the Palkhi Procession</p>
            </Col>
            <Col md={6}>
            <img
              src="/Schedule.png"
              alt="Palkhi Schedule 2025"
              className="palkhi-image"
              onClick={() => setPopupImage("/Schedule.png")}
            />
              <p className="image-caption">🗓️ Schedule of Palkhi Procession - 2025</p>
            </Col>
          </Row>
        </Container>
      </section>

      {popupImage && (
        <div className="popup-overlay" onClick={() => setPopupImage(null)}>
          <img src={popupImage} alt="Popup" className="popup-image" />
        </div>
      )}

      {/* Footer */}
      <footer className="footer text-center">
        <Container>
          <p>&copy; {new Date().getFullYear()} Sant Tukaram Maharaj | All Rights Reserved</p>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;


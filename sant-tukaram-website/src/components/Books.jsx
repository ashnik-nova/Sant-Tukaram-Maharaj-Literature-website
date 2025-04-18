import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import CustomNavbar from "./Navbar";
import "./Books.css";

const books = [
  {
    id: 1,
    title: "सार्थ श्रीतुकाराम गाथा",
    image: "/book1.png",
    description: "Shri Tukaram Story with Meaning (Marathi)",
    Author: "Diwakar Anant Ghaisas",
    buyLink: "https://www.exoticindiaart.com/book/details/shri-tukaram-story-with-meaning-marathi-nzw005/"
  },
  {
    id: 2,
    title: "संत तुकाराम (युगप्रवर्तक, अद्वितीय)",
    image: "/book2.png",
    description: "Saint Tukaram (Pioneer, Unique) Marathi.",
    Author: "Edited By Devidas Pote",
    buyLink: "https://www.exoticindiaart.com/book/details/saint-tukaram-pioneer-unique-marathi-hab243/"
  },
  {
    id: 3,
    title: "नाटाचे अभंग- Natache Abhang",
    image: "/book3.png",
    description: "Shri Sant Tukaram Maharaj Krit (Pocket Size in Marathi).",
    Author: "H. B. P. Gyaneshwar Madhukar Khairnar",
    buyLink: "https://www.exoticindiaart.com/book/details/natache-abhang-shri-sant-tukaram-maharaj-krit-pocket-size-in-marathi-hay265/"
  },
  {
    id: 4,
    title: "श्री संत तुकाराम चरित्र",
    image: "/book4.png",
    description: "Shri Saint Tukaram Character (Marathi)",
    Author: "Arvind Patole",
    buyLink: "https://www.exoticindiaart.com/book/details/shri-saint-tukaram-character-marathi-hak718/"
  },
  {
    id: 5,
    title: "संत तुकाराम महाराज कृत: सार्थ अभंग शतक व हरिपाठ",
    image: "/book5.png",
    description: "Sant Tukaram Maharaj Krit: Sarth Abhang Shatak Va Haripath (Marathi)",
    Author: "H. B. P. Gyaneshwar Madhukar Khairnar",
    buyLink: "https://www.exoticindiaart.com/book/details/sant-tukaram-maharaj-krit-sarth-abhang-shatak-va-haripath-marathi-hay033/",
  },
  {
    id: 6,
    title: "श्री संत तुकाराम",
    image: "/book6.png",
    description: "Shri Sant Tukaram (Marathi)",
    Author: "D. Da. Joshi",
    buyLink: "https://www.exoticindiaart.com/book/details/shri-saint-tukaram-marathi-hak246/"
  },
  {
    id: 7,
    title: "तुकाराम महाराजांचे चरित्र",
    image: "/book7.png",
    description: "Tukaram Maharaj's Character (Marathi)",
    Author: "Shri Dharam Maharaj More",
    buyLink: "https://www.exoticindiaart.com/book/details/tukaram-maharaj-charitra-marathi-azf523/"
  },
  {
    id: 8,
    title: "तुकाराम महाराजांचे निवडक एक हजार अभंग",
    image: "/book8.png",
    description: "Tukaram Maharaj's Chosen One Thousand Abhangas (Marathi)",
    Author: "G G Tipnis",
    buyLink: "https://www.exoticindiaart.com/book/details/tukaram-maharaj-s-chosen-one-thousand-abhangas-marathi-nzu843/"
  },
  {
    id: 9,
    title: "जगद्गुरु श्री तुकाराम महाराज",
    image: "/book9.png",
    description: "Jagadguru Shri Tukaram Maharaj (Marathi)",
    Author: "Deepak Bhagvat",
    buyLink: "https://www.exoticindiaart.com/book/details/jagadguru-shri-tukaram-maharaj-marathi-nzx882/"
  },
  {
    id: 10,
    title: "श्री तुकाराम चरित्र",
    image: "/book10.png",
    description: "Shri Tukaram Character (Marathi)",
    Author: "Smita Shrikant Pethe",
    buyLink: "https://www.exoticindiaart.com/book/details/shri-tukaram-character-marathi-nzw079/"
  },
  {
    id: 11,
    title: "श्री तुकाराम महाराज चरित्र",
    image: "/book11.png",
    description: "Shri Tukaram Maharaj Character (Marathi)",
    Author: "Ramanand Thakur",
    buyLink: "https://www.exoticindiaart.com/book/details/shri-tukaram-maharaj-character-marathi-nzv775/"
  },
  {
    id: 12,
    title: "श्री तुकाराम महाराजांची गाथा",
    image: "/book12.png",
    description: "Story of Shri Tukaram Maharaj (Marathi)",
    Author: "V. H. B. P Baburao Devdikar",
    buyLink: "https://www.exoticindiaart.com/book/details/story-of-shri-tukaram-maharaj-marathi-nzr477/",
  },
  {
    id: 13,
    title: "दैनंदिन तुकाराम गाथा",
    image: "/book13.png",
    description: "Daily Tukaram Saga (Marathi)",
    Author: "Diwakar Anant Ghaisas",
    buyLink: "https://www.exoticindiaart.com/book/details/daily-tukaram-saga-marathi-nzr452/"
  },
  {
    id: 14,
    title: "तुकाराम गाथा",
    image: "/book14.png",
    description: "The Sonnet of Shri Tukaram Maharaj (Marathi)",
    Author: "Dinkar Kshirsagar",
    buyLink: "https://www.exoticindiaart.com/book/details/sonnet-of-shri-tukaram-maharaj-marathi-nzk910/",
  },
  {
    id: 15,
    title: "संत तुकाराम चरित्र",
    image: "/book15.png",
    description: "Saint Tukaram Character (Marathi)",
    Author: "L. R. Pangarkar",
    buyLink: "https://www.exoticindiaart.com/book/details/sant-tukaram-character-marathi-nzu755/"
  },
  {
    id: 16,
    title: "देहूचे तुकाराम महाराज चरित्र",
    description: "Biography of Tukaram Maharaj of Dehu (Marathi)",
    image: "/book16.png",
    Author: "Yogiraj Prakashan",
    buyLink: "https://www.exoticindiaart.com/book/details/biography-of-tukaram-maharaj-of-dehu-marathi-hax998/"
  },
  {
    id: 17,
    title: "सार्थ उपदेशपर अभंग",
    image: "/book17.png",
    description: "Sarth Updeshpara Abhang: Sant Tukaram Maharaj Krit (Marathi)",
    Author: "H. B. P. Gyaneshwar Madhukar Khairnar",
    buyLink: "https://www.exoticindiaart.com/book/details/sarth-updeshpara-abhang-sant-tukaram-maharaj-krit-marathi-hax923/"
  },
  {
    id: 18,
    title: "महाराष्ट्र वेद संत तुकाराम",
    image: "/book18.png",
    description: "Maharashtra Veda Saint Tukaram (Marathi)",
    Author: "Govind Gopal Tipnis",
    buyLink: "https://www.exoticindiaart.com/book/details/maharashtra-veda-saint-tukaram-marathi-hav350/"
  },
  {
    id: 19,
    title: "संत श्री तुकाराम महाराज का संक्षिप्त चरित्र",
    image: "/book19.png",
    description: "Brief Biography of Sant Shri Tukaram Maharaj",
    Author: "Shaila Lalwani",
    buyLink: "https://www.exoticindiaart.com/book/details/brief-character-of-sant-shri-tukaram-maharaj-szz730/"
  },
  {
    id: 20,
    title: "समग्र तुकाराम",
    image: "/book20.png",
    description: "Samagra Tukaram (Marathi)",
    Author: "Madhukar Ramdas Joshi",
    buyLink: "https://www.exoticindiaart.com/book/details/samagra-tukarama-marathi-hav527/",
  },
  {
    id: 21,
    title: "सार्थ श्रीतुकारामांची गाथा",
    image: "/book21.png",
    description: "Pure Illustrated by the Blessings of Swananda Sukhnivasi Vishnubuwa Jog Maharaj in Marathi",
    Author: "Dr. Gopalrao Govind Benare",
    buyLink: "https://www.exoticindiaart.com/book/details/sarth-shri-tukaramanchi-gatha-pure-illustrated-by-blessings-of-swananda-sukhnivasi-vishnubuwa-jog-maharaj-in-marathi-hak802/",
  },
];

const Books = () => {
  return (
    <div>
      <CustomNavbar />
      <Container className="books-page">
        <h1 className="text-center mb-4">📚 Book Store</h1>
        <Row>
          {books.map((book) => (
            <Col md={6} lg={4} key={book.id} className="mb-4">
              <Card className="book-card h-100">
                <Card.Img variant="top" src={book.image} alt={book.title} />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>{book.description}</Card.Text>
                  <Card.Text>Author: {book.Author}</Card.Text>
                  <Button variant="primary" href={book.buyLink} target="_blank">
                    Buy Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Books;

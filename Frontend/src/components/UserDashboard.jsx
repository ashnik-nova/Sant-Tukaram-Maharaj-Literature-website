import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { submitAbhanga } from "../api/abhanga.api"; 
import Sidebar from "../components/Sidebar";
import ProfileSection from "../components/ProfileSection";
import AddAbhangaSection from "../components/AddAbhangaSection";
import AbhangaList from "../components/AbhangaList";
import BhajanList from "./BhajanList";
import AddBhajanSection from "./AddBhanjanSection";


const initialAbhangas = [
  { id: 1, title: "Abhanga 1", liked: false },
  { id: 2, title: "Abhanga 2", liked: false },
];

export default function UserDashboard() {
  const [active, setActive] = useState("profile");
  const [abhangas, setAbhangas] = useState(initialAbhangas);
  const [profile, setProfile] = useState({
    name: "Sant Tukaram",
    lifestory: "A revered Marathi saint and poet.",
  });
  const [newAbhanga, setNewAbhanga] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLike = (id) => {
    setAbhangas((prev) =>
      prev.map((a) => (a.id === id ? { ...a, liked: !a.liked } : a))
    );
  };

  const handleSubmitAbhanga = async () => {
    if (!newAbhanga.title.trim() || !newAbhanga.content.trim() || !newAbhanga.category.trim()) {
      alert("All fields (Title, Content, Category) are required!");
      return;
    }
  
    try {
      setLoading(true);
  
      const payload = {
        title: newAbhanga.title,
        content: newAbhanga.content,
        category: newAbhanga.category,
      };
  
      const response = await submitAbhanga(payload);
      setAbhangas((prev) => [...prev, savedAbhanga]);
      setNewAbhanga({ title: "", content: "", category: "" });
      alert("Abhanga submitted successfully!");
    } catch (error) {
      console.error("Submit Error:", error);
      alert(error.message || "Failed to submit abhanga.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={3}>
          <Sidebar active={active} setActive={setActive} />
        </Col>
        <Col md={9}>
          {active === "profile" && <ProfileSection />}
          {active === "addAbhanga" && ( <AddAbhangaSection /> )}
          {active === "list" && <AbhangaList  />}
          {active === "addBhajan" && ( <AddBhajanSection /> )}
          {active === "Bhajanlist" && <BhajanList  />}
        </Col>
      </Row>
    </Container>
  );
}

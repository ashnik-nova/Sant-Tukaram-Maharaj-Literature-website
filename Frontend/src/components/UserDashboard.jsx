import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import ProfileSection from "../components/ProfileSection";
import AddAbhangaSection from "../components/AddAbhangaSection";
import AbhangaList from "../components/AbhangaList";

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

  const handleLike = (id) => {
    setAbhangas((prev) =>
      prev.map((a) => (a.id === id ? { ...a, liked: !a.liked } : a))
    );
  };

  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={3}>
          <Sidebar active={active} setActive={setActive} />
        </Col>
        <Col md={9}>
          {active === "profile" && <ProfileSection profile={profile} setProfile={setProfile} />}
          {active === "addAbhanga" && (
            <AddAbhangaSection
              newAbhanga={newAbhanga}
              setNewAbhanga={setNewAbhanga}
              abhangas={abhangas}
              setAbhangas={setAbhangas}
            />
          )}
          {active === "list" && <AbhangaList abhangas={abhangas} handleLike={handleLike} />}
        </Col>
      </Row>
    </Container>
  );
}

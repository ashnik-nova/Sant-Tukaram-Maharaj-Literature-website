import React from "react";
import { Nav } from "react-bootstrap";
import { FaUserCircle, FaPlusCircle, FaListUl } from "react-icons/fa";

export default function Sidebar({ active, setActive }) {
  return (
    <div className="bg-white border-end shadow-sm h-100 p-3" style={{ minHeight: "100vh", width: "250px" }}>
      <h4 className="mb-4 text-center fw-bold text-primary">Dashboard</h4>
      <Nav className="flex-column gap-2">
        <Nav.Link
          onClick={() => setActive("profile")}
          active={active === "profile"}
          className={`d-flex align-items-center gap-2 py-2 px-3 rounded ${active === "profile" ? "bg-primary text-white" : "text-dark"}`}
          style={{ cursor: "pointer", transition: "all 0.3s ease" }}
        >
          <FaUserCircle size={20} />
          <span>Profile</span>
        </Nav.Link>

        <Nav.Link
          onClick={() => setActive("addAbhanga")}
          active={active === "addAbhanga"}
          className={`d-flex align-items-center gap-2 py-2 px-3 rounded ${active === "addAbhanga" ? "bg-primary text-white" : "text-dark"}`}
          style={{ cursor: "pointer", transition: "all 0.3s ease" }}
        >
          <FaPlusCircle size={20} />
          <span>Add Abhanga</span>
        </Nav.Link>



        <Nav.Link
          onClick={() => setActive("addBhajan")}
          active={active === "addBhajan"}
          className={`d-flex align-items-center gap-2 py-2 px-3 rounded ${active === "addBhajan" ? "bg-primary text-white" : "text-dark"}`}
          style={{ cursor: "pointer", transition: "all 0.3s ease" }}
        >
          <FaPlusCircle size={20} />
          <span>Add Bhanjan</span>
        </Nav.Link>
        <Nav.Link
          onClick={() => setActive("list")}
          active={active === "list"}
          className={`d-flex align-items-center gap-2 py-2 px-3 rounded ${active === "list" ? "bg-primary text-white" : "text-dark"}`}
          style={{ cursor: "pointer", transition: "all 0.3s ease" }}
        >
          <FaListUl size={20} />
          <span>Abhanga List</span>
        </Nav.Link>
        <Nav.Link
          onClick={() => setActive("Bhajanlist")}
          active={active === "Bhajanlist"}
          className={`d-flex align-items-center gap-2 py-2 px-3 rounded ${active === "Bhajanlist" ? "bg-primary text-white" : "text-dark"}`}
          style={{ cursor: "pointer", transition: "all 0.3s ease" }}
        >
          <FaListUl size={20} />
          <span>Bhanjan's List</span>
        </Nav.Link>
      </Nav>
    </div>
  );
}

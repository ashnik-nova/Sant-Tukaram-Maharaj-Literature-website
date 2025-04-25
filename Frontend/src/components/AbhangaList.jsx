import React from "react";
import {
  Card,
  ListGroup,
  Button,
  Badge,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { BsHeart, BsHeartFill } from "react-icons/bs";

// Subcomponent for individual Abhanga entry
const AbhangaItem = ({ abhanga, handleLike, renderTooltip }) => {
  const { id, title, liked } = abhanga;

  return (
    <ListGroup.Item
      key={id}
      className="d-flex justify-content-between align-items-center py-3"
    >
      <div className="fw-semibold text-truncate me-3" style={{ maxWidth: "70%" }}>
        {title}
      </div>
      <OverlayTrigger placement="top" overlay={renderTooltip(liked ? "Unlike" : "Like")}>
        <Button
          variant={liked ? "danger" : "outline-secondary"}
          size="sm"
          onClick={() => handleLike(id)}
          aria-label={liked ? "Unlike this Abhanga" : "Like this Abhanga"}
        >
          {liked ? <BsHeartFill /> : <BsHeart />}
          <Badge bg={liked ? "danger" : "secondary"} className="ms-2">
            {liked ? "Liked" : "Like"}
          </Badge>
        </Button>
      </OverlayTrigger>
    </ListGroup.Item>
  );
};

export default function AbhangaList({ abhangas, handleLike }) {
  const renderTooltip = (text) => <Tooltip id="like-tooltip">{text}</Tooltip>;

  return (
    <Card className="shadow-sm border-0">
      <Card.Header className="bg-warning text-dark fs-5 fw-bold d-flex align-items-center">
        <span role="img" aria-label="music">🎶</span>&nbsp;Your Abhangas
      </Card.Header>
      <Card.Body className="bg-light">
        {abhangas.length === 0 ? (
          <div className="alert alert-info text-center mb-0">
            No Abhangas requested yet.
          </div>
        ) : (
          <ListGroup variant="flush">
            {abhangas.map((a) => (
              <AbhangaItem
                key={a.id}
                abhanga={a}
                handleLike={handleLike}
                renderTooltip={renderTooltip}
              />
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}

// src/components/OptionCard.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faTruck,
  faTools,
  faBullhorn,
} from "@fortawesome/free-solid-svg-icons";

interface OptionCardProps {
  title:
    | "Shipment Management"
    | "Fleet Management"
    | "Service Management"
    | "Advertisement Management"; // Union type for specific titles
  description: string;
  onClick: () => void;
}

const icons = {
  "Shipment Management": faBox,
  "Fleet Management": faTruck,
  "Service Management": faTools,
  "Advertisement Management": faBullhorn,
};

const OptionCard: React.FC<OptionCardProps> = ({
  title,
  description,
  onClick,
}) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        margin: "10px",
        cursor: "pointer",
        textAlign: "center", // Center align text and icon
        borderRadius: "8px", // Rounded corners
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
        transition: "transform 0.2s, box-shadow 0.2s",
        backgroundColor: "#fff", // White background
      }}
      onClick={onClick}
    >
      <div style={{ marginBottom: "10px", color: "#007bff" }}>
        <FontAwesomeIcon icon={icons[title]} size="2x" />
      </div>
      <h2 style={{ color: "#dc3545" }}>{title}</h2> {/* Red color for title */}
      <p>{description}</p>
    </div>
  );
};

export default OptionCard;

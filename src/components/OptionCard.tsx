// src/components/OptionCard.tsx
import React from "react";

interface OptionCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

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
      }}
      onClick={onClick}
    >
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default OptionCard;

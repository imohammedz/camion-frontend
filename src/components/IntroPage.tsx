// src/components/IntroPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import OptionCard from "./OptionCard";

const IntroPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to Camion</h1>
      <p>Select an option to get started:</p>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <OptionCard
          title="Shipment Management"
          description="Manage all shipments efficiently."
          onClick={() => navigate("/create-order")} // Navigate to the create order page
        />
        <OptionCard
          title="Fleet Management"
          description="Track and manage your fleet."
          onClick={() => navigate("/create-fleet")} // Navigate to the create fleet page
        />
        <OptionCard
          title="Service Management"
          description="Handle service requests and records."
          onClick={() => alert("Navigate to Service Management")}
        />
        <OptionCard
          title="Advertisement Management"
          description="Manage your advertisements."
          onClick={() => alert("Navigate to Advertisement Management")}
        />
      </div>
    </div>
  );
};

export default IntroPage;

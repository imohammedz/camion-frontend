import React from "react";
import { useNavigate } from "react-router-dom";
import OptionCard from "./OptionCard";
import "../styles/IntroPage.css"; // Custom styles for the IntroPage

const IntroPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="intro-container">
      <h1 className="welcome-title">Welcome to Camion</h1>
      <p className="intro-text">Select an option to get started:</p>
      <div className="options-container">
        <OptionCard
          title="Shipment Management"
          description="Manage all shipments efficiently."
          onClick={() => navigate("/create-order")}
        />
        <OptionCard
          title="Fleet Management"
          description="Track and manage your fleet."
          onClick={() => navigate("/fleet-management")}
        />
        <OptionCard
          title="Service Management"
          description="Handle service requests and records."
          onClick={() => alert("Navigate to Service Management")}
        />
        <OptionCard
          title="Advertisement Management"
          description="Manage your advertisements."
          onClick={() => navigate("/create-advertisement")}
        />
      </div>
    </div>
  );
};

export default IntroPage;

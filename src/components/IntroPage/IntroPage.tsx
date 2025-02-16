// IntroPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./IntroPage.module.css";
import backgroundImage from "../../assets/camion_intro_page_bg.jpg";
import fleetIcon from "../../assets/fleet.jpg";
import truckLocationIcon from "../../assets/truck.jpg";
import serviceIcon from "../../assets/service.jpg";
import advertiseIcon from "../../assets/advertise.jpg";
import settingsIcon from "../../assets/settings.jpg";
import shippingIcon from "../../assets/shipping.jpg";

interface OptionCardProps {
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({
  title,
  description,
  icon,
  onClick,
}) => (
  <div className={styles["option-card"]} onClick={onClick}>
    <img src={icon} alt={title} className={styles["card-icon"]} />
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const IntroPage: React.FC = () => {
  const navigate = useNavigate();

  const options = [
    {
      icon: shippingIcon,
      title: "Shipment Management",
      description: "Manage all shipments efficiently.",
      path: "/create-order",
    },
    {
      icon: fleetIcon,
      title: "Fleet Management",
      description: "Track and manage your fleet.",
      path: "/fleet-management",
    },
    {
      icon: serviceIcon,
      title: "Service Management",
      description: "Handle service requests and records.",
      path: "/service-management",
    },
    {
      icon: advertiseIcon,
      title: "Advertisement Management",
      description: "Advertisements.",
      path: "/create-advertisement",
    },
    {
      icon: truckLocationIcon,
      title: "Truck Location Tracking",
      description: "Track your truck from anywhere",
      path: "/truck-tracking",
    },
    {
      icon: settingsIcon,
      title: "Settings",
      description: "Change settings",
      path: "/settings",
    },
  ];

  return (
    <div
      className={styles["intro-container"]}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1 className={styles["welcome-title"]}>Welcome to Camion</h1>
      <p className={styles["intro-text"]}>Select an option to get started</p>

      <div className={styles["options-container"]}>
        {options.map((option, index) => (
          <OptionCard
            key={index}
            icon={option.icon}
            title={option.title}
            description={option.description}
            onClick={() =>
              option.title === "Service Management"
                ? alert("Navigate to Service Management")
                : navigate(option.path)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default IntroPage;

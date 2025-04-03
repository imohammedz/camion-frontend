import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./IntroPage.module.css";
import fleetIcon from "/assets/fleet.jpg";
import shippingIcon from "/assets/shipping.jpg";
import AccessModal from "../ui/AccessModal"; // Import the modal component

const IntroPage: React.FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [darkMode, setDarkMode] = useState(false); // Track dark mode state

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setDarkMode(theme === "dark");
  }, []);

  const userRole = localStorage.getItem("role")?.toUpperCase().trim(); // Normalize role

  // Function to remove underscores and format role names
  const formatRole = (role: string | null) =>
    role ? role.replace(/_/g, " ") : "";

  // Function to handle navigation based on role
  const handleNavigation = (
    title: string,
    path: string,
    requiredRoles: string[]
  ) => {
    console.log("User Role:", userRole);
    console.log("Required Roles:", requiredRoles);

    if (!userRole) {
      setModalTitle("Access Restricted");
      setModalDescription(
        `You need to log in or sign up with a valid ${requiredRoles
          .map(formatRole)
          .join(" or ")} role to access ${title}.`
      );
      setModalOpen(true);
      return;
    }

    if (!requiredRoles.includes(userRole)) {
      setModalTitle("Access Restricted");
      setModalDescription(
        `You are logged in as ${formatRole(
          userRole
        )}, but you need a ${requiredRoles
          .map(formatRole)
          .join(" or ")} role to access ${title}.`
      );
      setModalOpen(true);
      return;
    }

    navigate(path);
  };

  const options = [
    {
      icon: shippingIcon,
      title: "Shipment Management",
      description: "Manage all shipments efficiently.",
      path: "/create-order",
      roles: ["SHIPMENT_OWNER"],
    },
    {
      icon: fleetIcon,
      title: "Fleet Management",
      description: "Track and manage your fleet.",
      path: "/fleet-management",
      roles: ["FLEET_OWNER"],
    },
  ];

  return (
    <div
      className={styles["intro-container"]}
      style={{ color: darkMode ? "white" : "black" }}
    >
      <h1 className={styles["welcome-title"]}>Welcome to Camion</h1>
      <p className={styles["intro-text"]}>Select an option to get started</p>

      <div className={styles["options-container"]}>
        {options.map((option, index) => (
          <div
            key={index}
            className={styles["option-card"]}
            onClick={() =>
              handleNavigation(option.title, option.path, option.roles)
            }
          >
            <img
              src={option.icon}
              alt={option.title}
              className={styles["card-icon"]}
            />
            <h3>{option.title}</h3>
            <p>{option.description}</p>
          </div>
        ))}
      </div>

      <AccessModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        description={modalDescription}
        darkMode={darkMode}
      />
    </div>
  );
};

export default IntroPage;

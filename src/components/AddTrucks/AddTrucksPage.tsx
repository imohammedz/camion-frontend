import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import TruckDetails from "../TruckDetails";
import styles from "./AddTrucks.module.css";

const AddTrucksPage: React.FC = () => {
  const [truckDetails, setTruckDetails] = useState([
    {
      truck_model: "",
      registration_number: "",
      manufacturer: "",
      year_of_manufacture: "",
      capacity: "",
      dimensions: "",
      fuel_type: "diesel", // Default fuel type
      mileage: "",
      status: "available",
    },
  ]);
  const { fleetId } = useParams(); // Get fleetId from route parameter
  const navigate = useNavigate();

  const handleAddTruck = () => {
    setTruckDetails([
      ...truckDetails,
      {
        truck_model: "",
        registration_number: "",
        manufacturer: "",
        year_of_manufacture: "",
        capacity: "",
        dimensions: "",
        fuel_type: "diesel", // Default fuel type
        mileage: "",
        status: "available",
      },
    ]);
  };

  const handleTruckChange = (index: number, field: string, value: any) => {
    const updatedTrucks = [...truckDetails];
    updatedTrucks[index] = { ...updatedTrucks[index], [field]: value };
    setTruckDetails(updatedTrucks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      for (const truck of truckDetails) {
        await axios.post(
          "http://localhost:5000/api/trucks",
          {
            ...truck,
            fleet_id: fleetId, // Associate the truck with fleetId
          },
          {
            headers: {
              Authorization: `${token}`, // Include token in headers
            },
          }
        );
      }

      navigate(`/fleets/${fleetId}`); // Redirect to fleet detail page after adding trucks
    } catch (error) {
      console.error("Error adding trucks:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.title}>Add Trucks to Fleet</h2>
      {truckDetails.map((truck, index) => (
        <TruckDetails
          key={index}
          truck={truck}
          index={index}
          handleTruckChange={handleTruckChange}
        />
      ))}

      <button
        type="button"
        className={styles.addButton}
        onClick={handleAddTruck}
      >
        Add Another Truck
      </button>
      <button type="submit" className={styles.submitButton}>
        Add Trucks
      </button>
    </form>
  );
};

export default AddTrucksPage;

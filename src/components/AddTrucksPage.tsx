import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import TruckDetails from "./TruckDetails";

const AddTrucksPage: React.FC = () => {
  const [truckDetails, setTruckDetails] = useState([
    {
      truck_model: "",
      registration_number: "",
      manufacturer: "",
      year_of_manufacture: "",
      capacity: "",
      dimensions: "",
      fuel_type: "diesel", // Set default fuel type
      mileage: "",
      status: "available",
    },
  ]);
  const { fleetId } = useParams(); // Get fleetId from the route parameter
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
        fuel_type: "diesel", // Set default fuel type
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
      const token = localStorage.getItem("token"); // Retrieve the token once

      if (!token) {
        console.error("No token found");
        return;
      }

      for (const truck of truckDetails) {
        await axios.post(
          "http://localhost:5000/api/trucks",
          {
            ...truck,
            fleet_id: fleetId, // Associate the truck with the fleetId
          },
          {
            headers: {
              Authorization: `${token}`, // Include the token in the request headers
            },
          }
        );
      }

      navigate(`/fleets/${fleetId}`); // Redirect to fleets page after adding trucks
    } catch (error) {
      console.error("Error adding trucks:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2>Add Trucks to Fleet</h2>
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
        className="btn btn-primary"
        onClick={handleAddTruck}
      >
        Add Another Truck
      </button>
      <button type="submit" className="btn btn-success mt-4">
        Add Trucks
      </button>
    </form>
  );
};

export default AddTrucksPage;

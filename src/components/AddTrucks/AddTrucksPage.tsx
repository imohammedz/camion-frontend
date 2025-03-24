import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import TruckDetails from "../TruckDetails";
import styles from "./AddTrucks.module.css";
import { Truck } from "../../interfaces/Truck";
import { TruckStatus } from "../../../public/enums/TruckStatus";

const initialTruck: Truck = {
  truck_model: "",
  registration_number: "",
  manufacturer: "",
  year_of_manufacture: "",
  capacity: "",
  dimensions: "",
  fuel_type: "diesel",
  mileage: "",
  status: TruckStatus.AVAILABLE,
  fleet_id: "", 
  driver_id: undefined,
};

const AddTrucksPage: React.FC = () => {
  const { fleetId } = useParams<{ fleetId: string }>();
  const navigate = useNavigate();
  const [truck, setTruck] = useState<Truck>({ ...initialTruck, fleet_id: fleetId || "" });

  // Function to update truck details (without index)
  const handleTruckChange = (field: string, value: any) => {
    setTruck((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/trucks", truck, {
        headers: { Authorization: `${token}` },
      });
      navigate(`/fleets/${fleetId}`);
    } catch (error) {
      console.error("Error adding truck:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.title}>Add a Truck to Fleet</h2>
      <TruckDetails truck={truck} handleTruckChange={handleTruckChange} />
      <button type="submit" className={styles.submitButton}>Add Truck</button>
    </form>
  );
};

export default AddTrucksPage;

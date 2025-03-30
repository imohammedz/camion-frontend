import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import TruckDetails from "../TruckDetails";
import { Truck } from "../../interfaces/Truck"; // Import Truck interface
import { TruckStatus } from "../../../public/enums/TruckStatus"; // Import TruckStatus enum

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

interface AddTrucksModalProps {
  open: boolean;
  onClose: () => void;
  fleetId?: string;
  onTruckAdded: () => void; // Callback function to refresh data after adding a truck
}

const AddTrucksModal: React.FC<AddTrucksModalProps> = ({
  open,
  onClose,
  fleetId,
  onTruckAdded,
}) => {
  const [truck, setTruck] = useState<Truck>({ ...initialTruck, fleet_id: fleetId });

  // Function to handle input changes
  const handleTruckChange = (field: keyof Truck, value: string) => {
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
      onTruckAdded(); // Refresh truck list after adding
      onClose(); // Close modal
    } catch (error) {
      console.error("Error adding truck:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add a Truck to Fleet</DialogTitle>
      <DialogContent>
        <TruckDetails truck={truck} handleTruckChange={handleTruckChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Add Truck
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTrucksModal;

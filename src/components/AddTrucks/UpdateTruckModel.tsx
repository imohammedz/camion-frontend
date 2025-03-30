import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import TruckDetails from "../TruckDetails";
import { Truck } from "../../interfaces/Truck";

interface UpdateTruckModalProps {
  open: boolean;
  onClose: () => void;
  truckId: string;
  onTruckUpdated: () => void; // Callback to refresh data after updating
}

const UpdateTruckModal: React.FC<UpdateTruckModalProps> = ({
  open,
  onClose,
  truckId,
  onTruckUpdated,
}) => {
  const [truck, setTruck] = useState<Truck | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (truckId && open) {
      fetchTruckDetails();
    }
  }, [truckId, open]);

  const fetchTruckDetails = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.get<Truck>(
        `http://localhost:5000/api/trucks/${truckId}`,
        { headers: { Authorization: `${token}` } }
      );
      setTruck(response.data);
    } catch (error) {
      console.error("Error fetching truck details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTruckChange = (field: keyof Truck, value: string) => {
    setTruck((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!truck) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await axios.put(`http://localhost:5000/api/trucks/${truckId}`, truck, {
        headers: { Authorization: `${token}` },
      });

      onTruckUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating truck:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Truck</DialogTitle>
      <DialogContent>
        {loading ? (
          <p>Loading...</p>
        ) : truck ? (
          <TruckDetails truck={truck} handleTruckChange={handleTruckChange} />
        ) : (
          <p>Error loading truck details.</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained" disabled={loading}>
          Update Truck
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateTruckModal;

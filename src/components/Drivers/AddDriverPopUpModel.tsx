import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DriverDetails from "../../components/ui/DriverDetails";
import { Driver } from "../../interfaces/Driver";
import { DriverStatus } from "../../../public/enums/DriverStatus";

interface Truck {
  id: string;
  registration_number: string;
}

interface AddDriverModalProps {
  open: boolean;
  onClose: () => void;
  fleetId?: string;
  onDriverAdded: () => void;
}

const initialDriver: Driver = {
  name: "",
  email: "",
  phone: "",
  truckRegisteredId: "",
  license: "",
  experience: "",
  status: DriverStatus.AVAILABLE,
  fleetId: "",
};

const AddDriverModal: React.FC<AddDriverModalProps> = ({
  open,
  fleetId,
  onClose,
  onDriverAdded,
}) => {
  const [driver, setDriver] = useState<Driver>({ ...initialDriver, fleetId });
  const [trucks, setTrucks] = useState<Truck[]>([]);

  useEffect(() => {
    if (!fleetId) return;
    const fetchTrucks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/fleets/${fleetId}/trucks`,
          { headers: { Authorization: `${token}` } }
        );
        setTrucks(response.data);
      } catch (error) {
        console.error("Error fetching trucks:", error);
      }
    };
    fetchTrucks();
  }, [fleetId]);

  const handleDriverChange = (field: keyof Driver, value: string) => {
    setDriver((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/drivers", driver, {
        headers: { Authorization: `${token}` },
      });
      onDriverAdded();
      onClose();
    } catch (error) {
      console.error("Error adding driver:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Driver</DialogTitle>
      <DialogContent>
        <DriverDetails
          driver={driver}
          handleDriverChange={handleDriverChange}
          trucks={trucks}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDriverModal;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FleetOperationalStatus } from "../../../public/enums/FleetOperationalStatus";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, FormControl, InputLabel, TextField } from "@mui/material";

const UpdateFleetDialog: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { fleetId } = useParams<{ fleetId: string }>();
  const [fleetName, setFleetName] = useState("");
  const [fleetBaseLocation, setFleetBaseLocation] = useState("");
  const [operationalStatus, setOperationalStatus] = useState(FleetOperationalStatus.FULLY_OPERATIONAL);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFleet = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/api/fleets/${fleetId}`, {
          headers: { Authorization: `${token}` },
        });

        if (response.status === 200 && response.data) {
          const fleetData = response.data;
          setFleetName(fleetData.fleet_name || "");
          setFleetBaseLocation(fleetData.fleet_base_location || "");
          setOperationalStatus(fleetData.operational_status || FleetOperationalStatus.FULLY_OPERATIONAL);
        } else {
          throw new Error("Fleet not found");
        }
      } catch (error) {
        console.error("Error fetching fleet:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchFleet();
    }
  }, [fleetId, open]);

  const handleUpdateFleet = async () => {
    try {
      const token = localStorage.getItem("token");

      const updatedFleetData = {
        fleet_name: fleetName,
        fleet_base_location: fleetBaseLocation,
        operational_status: operationalStatus,
      };

      await axios.put(`http://localhost:5000/api/fleets/${fleetId}`, updatedFleetData, {
        headers: { Authorization: `${token}` },
      });
      
      setFleetName(updatedFleetData.fleet_name);
      setFleetBaseLocation(updatedFleetData.fleet_base_location);
      setOperationalStatus(updatedFleetData.operational_status);

      onClose(); // Close the popup
    } catch (error) {
      console.error("Error updating fleet:", error);
    }
  };

  if (loading) return null;
  if (error) return <p>Error loading fleet data.</p>;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Fleet</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Fleet Name"
          variant="outlined"
          margin="dense"
          value={fleetName}
          onChange={(e) => setFleetName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Fleet Base Location"
          variant="outlined"
          margin="dense"
          value={fleetBaseLocation}
          onChange={(e) => setFleetBaseLocation(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Operational Status</InputLabel>
          <Select value={operationalStatus} onChange={(e) => setOperationalStatus(e.target.value as FleetOperationalStatus)}>
            <MenuItem value={FleetOperationalStatus.FULLY_OPERATIONAL}>Fully Operational</MenuItem>
            <MenuItem value={FleetOperationalStatus.PARTIALLY_OPERATIONAL}>Partially Operational</MenuItem>
            <MenuItem value={FleetOperationalStatus.UNDER_MAINTENANCE}>Under Maintenance</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleUpdateFleet} variant="contained" color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateFleetDialog;

// src/components/UpdateFleetPage.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FleetOperationalStatus } from "../../public/enums/FleetOperationalStatus";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const UpdateFleetPage: React.FC = () => {
  const { fleetId } = useParams<{ fleetId: string }>();
  const [fleet, setFleet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const [fleetName, setFleetName] = useState("");
  const [fleetBaseLocation, setFleetBaseLocation] = useState("");
  const [operationalStatus, setOperationalStatus] = useState(FleetOperationalStatus.FULLY_OPERATIONAL);

  useEffect(() => {
    const fetchFleet = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/fleets/${fleetId}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        if (response.status === 200 && response.data) {
          const fleetData = response.data;
          setFleet(fleetData);
          setFleetName(fleetData.fleet_name || "");
          setFleetBaseLocation(fleetData.fleet_base_location || "");
          setOperationalStatus(fleetData.operational_status as FleetOperationalStatus || FleetOperationalStatus.FULLY_OPERATIONAL);
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
    fetchFleet();
  }, [fleetId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const updatedFleetData = {
        fleet_name: fleetName,
        fleet_base_location: fleetBaseLocation,
        operational_status: operationalStatus,
      };

      await axios.put(
        `http://localhost:5000/api/fleets/${fleetId}`,
        updatedFleetData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      alert("Fleet updated successfully");
      navigate(`/fleets/${fleetId}`);
    } catch (error) {
      console.error("Error updating fleet:", error);
      alert("Failed to update the fleet.");
    }
  };

  if (loading) {
    return <p>Loading fleet data...</p>;
  }

  if (error) {
    return <p>Error loading fleet data.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2>Edit Fleet</h2>
      <div className="form-group mb-3">
        <label>Fleet Name:</label>
        <input
          type="text"
          className="form-control"
          value={fleetName}
          onChange={(e) => setFleetName(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label>Fleet Base Location:</label>
        <input
          type="text"
          className="form-control"
          value={fleetBaseLocation}
          onChange={(e) => setFleetBaseLocation(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <FormControl fullWidth variant="outlined">
          <InputLabel id="operational-status-label">Operational Status</InputLabel>
          <Select
            labelId="operational-status-label"
            value={operationalStatus}
            onChange={(e) => setOperationalStatus(e.target.value as FleetOperationalStatus)}
            label="Operational Status"
          >
            <MenuItem value={FleetOperationalStatus.FULLY_OPERATIONAL}>Fully Operational</MenuItem>
            <MenuItem value={FleetOperationalStatus.PARTIALLY_OPERATIONAL}>Partially Operational</MenuItem>
            <MenuItem value={FleetOperationalStatus.UNDER_MAINTENANCE}>Under Maintenance</MenuItem>
          </Select>
        </FormControl>
      </div>
      <button type="submit" className="btn btn-success mt-4">
        Update Fleet
      </button>
    </form>
  );
};

export default UpdateFleetPage;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FleetOperationalStatus } from "./../../public/enums/FleetOperationalStatus";

const CreateFleetPage: React.FC = () => {
  const [fleetName, setFleetName] = useState("");
  const [fleetBaseLocation, setFleetBaseLocation] = useState("");
  const [operationalStatus, setOperationalStatus] = useState<FleetOperationalStatus>(
    FleetOperationalStatus.FULLY_OPERATIONAL
  );

  const [successMessage, setSuccessMessage] = useState("");
  const [createdFleetId, setCreatedFleetId] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const fleetData = {
        fleet_name: fleetName,
        fleet_base_location: fleetBaseLocation,
        operational_status: operationalStatus, // Using enum directly
      };

      const token = localStorage.getItem("token");

      const fleetResponse = await axios.post(
        "http://localhost:5000/api/fleets",
        fleetData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      const fleetId = fleetResponse.data._id;
      setCreatedFleetId(fleetId);
      setSuccessMessage(`${fleetName} fleet created successfully!`);

      if (fleetResponse.data.token) {
        localStorage.setItem("token", fleetResponse.data.token);
      }

      // Reset form
      setFleetName("");
      setFleetBaseLocation("");
      setOperationalStatus(FleetOperationalStatus.FULLY_OPERATIONAL);
    } catch (error) {
      console.error("Error creating fleet:", error);
    }
  };

  const handleAddTrucks = () => {
    if (createdFleetId) {
      navigate(`/fleets/${createdFleetId}/add-trucks`);
    }
  };

  const handleEditFleet = () => {
    if (createdFleetId) {
      navigate(`/fleets/${createdFleetId}/edit`);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Fleet</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Operational Status:</label>
          <select
            className="form-control"
            value={operationalStatus}
            onChange={(e) => setOperationalStatus(e.target.value as FleetOperationalStatus)}
          >
            <option value={FleetOperationalStatus.FULLY_OPERATIONAL}>Fully Operational</option>
            <option value={FleetOperationalStatus.PARTIALLY_OPERATIONAL}>Partially Operational</option>
            <option value={FleetOperationalStatus.UNDER_MAINTENANCE}>Under Maintenance</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success mt-4">
          Create Fleet
        </button>
      </form>

      {successMessage && (
        <div className="alert alert-success mt-4" role="alert">
          {successMessage}
        </div>
      )}

      {createdFleetId && (
        <div className="mt-4">
          <button className="btn btn-primary me-2" onClick={handleAddTrucks}>
            Add Trucks
          </button>
          <button className="btn btn-secondary" onClick={handleEditFleet}>
            Edit Fleet
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateFleetPage;

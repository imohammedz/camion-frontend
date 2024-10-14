import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFleetPage: React.FC = () => {
  const [fleetName, setFleetName] = useState("");
  const [fleetManager, setFleetManager] = useState("");
  const [fleetBaseLocation, setFleetBaseLocation] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [operationalStatus, setOperationalStatus] =
    useState("fully operational");
  const [fleetImageUrl, setFleetImageUrl] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const fleetData = {
        fleet_name: fleetName,
        fleet_manager: fleetManager,
        fleet_base_location: fleetBaseLocation,
        max_capacity: parseInt(maxCapacity),
        fleet_image_url: fleetImageUrl,
        operational_status: operationalStatus,
      };

      // Retrieve the token from localStorage or wherever it's stored
      const token = localStorage.getItem("token");

      const fleetResponse = await axios.post(
        "http://localhost:5000/api/fleets",
        fleetData,
        {
          headers: {
            Authorization: `${token}`, // Include the token in the request headers
          },
        }
      );

      const fleetId = fleetResponse.data._id;

      // Navigate to the add truck page and pass the created fleet ID
      navigate(`/fleets/${fleetId}/add-trucks`);
    } catch (error) {
      console.error("Error creating fleet:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2>Create Fleet</h2>
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
        <label>Fleet Manager:</label>
        <input
          type="text"
          className="form-control"
          value={fleetManager}
          onChange={(e) => setFleetManager(e.target.value)}
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
        <label>Max Capacity (tons):</label>
        <input
          type="text"
          className="form-control"
          value={maxCapacity}
          onChange={(e) => setMaxCapacity(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label>Operational Status:</label>
        <select
          className="form-control"
          value={operationalStatus}
          onChange={(e) => setOperationalStatus(e.target.value)}
        >
          <option value="fully operational">Fully Operational</option>
          <option value="partially operational">Partially Operational</option>
          <option value="under maintenance">Under Maintenance</option>
        </select>
      </div>
      <div className="form-group mb-3">
        <label>Fleet Image URL:</label>
        <input
          type="text"
          className="form-control"
          value={fleetImageUrl}
          onChange={(e) => setFleetImageUrl(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-success mt-4">
        Create Fleet
      </button>
    </form>
  );
};

export default CreateFleetPage;

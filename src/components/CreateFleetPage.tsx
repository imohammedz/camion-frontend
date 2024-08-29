import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFleetPage: React.FC = () => {
  const [fleetName, setFleetName] = useState("");
  const [fleetManager, setFleetManager] = useState("");
  const [fleetBaseLocation, setFleetBaseLocation] = useState("");
  const [averageAgeOfFleet, setAverageAgeOfFleet] = useState("");
  const [totalCapacity, setTotalCapacity] = useState("");
  const [totalMileage, setTotalMileage] = useState("");
  const [operationalStatus, setOperationalStatus] =
    useState("fully operational");
  const [serviceRecords, setServiceRecords] = useState("");
  const [fleetImageUrl, setFleetImageUrl] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const fleetData = {
        fleet_name: fleetName,
        fleet_manager: fleetManager,
        fleet_base_location: fleetBaseLocation,
        average_age_of_fleet: parseFloat(averageAgeOfFleet),
        total_capacity: parseInt(totalCapacity),
        total_mileage: parseInt(totalMileage),
        fleet_image_url: fleetImageUrl,
        operational_status: operationalStatus,
        service_records: serviceRecords,
      };

      const fleetResponse = await axios.post(
        "http://localhost:5000/api/fleets",
        fleetData
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
        <label>Average Age of Fleet:</label>
        <input
          type="text"
          className="form-control"
          value={averageAgeOfFleet}
          onChange={(e) => setAverageAgeOfFleet(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label>Total Capacity (tons):</label>
        <input
          type="text"
          className="form-control"
          value={totalCapacity}
          onChange={(e) => setTotalCapacity(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label>Total Mileage (km):</label>
        <input
          type="text"
          className="form-control"
          value={totalMileage}
          onChange={(e) => setTotalMileage(e.target.value)}
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
        <label>Service Records:</label>
        <textarea
          className="form-control"
          value={serviceRecords}
          onChange={(e) => setServiceRecords(e.target.value)}
        />
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

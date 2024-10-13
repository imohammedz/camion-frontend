// src/components/UpdateFleetPage.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateFleetPage: React.FC = () => {
  const { fleetId } = useParams<{ fleetId: string }>();
  const [fleet, setFleet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const [fleetName, setFleetName] = useState("");
  const [fleetManager, setFleetManager] = useState("");
  const [fleetBaseLocation, setFleetBaseLocation] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [operationalStatus, setOperationalStatus] =
    useState("fully operational");
  const [fleetImageUrl, setFleetImageUrl] = useState("");

  useEffect(() => {
    const fetchFleet = async () => {
      try {
        // Retrieve the token from localStorage or wherever it's stored
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/fleets/${fleetId}`,
          {
            headers: {
              Authorization: `${token}`, // Include the token in the request headers
            },
          }
        );
        if (response.status === 200 && response.data) {
          const fleetData = response.data;
          setFleet(fleetData);
          setFleetName(fleetData.fleet_name || "");
          setFleetManager(fleetData.fleet_manager || "");
          setFleetBaseLocation(fleetData.fleet_base_location || "");
          setMaxCapacity(fleetData.max_capacity?.toString() || "0");
          setOperationalStatus(
            fleetData.operational_status || "fully operational"
          );
          setFleetImageUrl(fleetData.fleet_image_url || "");
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
      // Retrieve the token from localStorage or wherever it's stored
      const token = localStorage.getItem("token");

      const updatedFleetData = {
        fleet_name: fleetName,
        fleet_manager: fleetManager,
        fleet_base_location: fleetBaseLocation,
        max_capacity: parseInt(maxCapacity),
        fleet_image_url: fleetImageUrl,
        operational_status: operationalStatus,
      };

      await axios.put(
        `http://localhost:5000/api/fleets/${fleetId}`,
        updatedFleetData,
        {
          headers: {
            Authorization: `${token}`, // Include the token in the request headers
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
        Update Fleet
      </button>
    </form>
  );
};

export default UpdateFleetPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEdit,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

const FleetDetailPage: React.FC = () => {
  const { fleetId } = useParams<{ fleetId: string }>();
  const [fleet, setFleet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [trucks, setTrucks] = useState<any[]>([]);
  const [viewTrucks, setViewTrucks] = useState(false); // State to toggle the trucks list
  const navigate = useNavigate();

  // Fetch fleet details
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
        if (response.status === 200) {
          setFleet(response.data);
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

  // Handle fetching trucks for the fleet
  const handleViewTrucks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/fleets/${fleetId}/trucks`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setTrucks(response.data);
      setViewTrucks(true); // Show the trucks list
    } catch (error) {
      console.error("Error fetching trucks:", error);
      alert("Failed to fetch trucks.");
    }
  };

  // Handle deleting a fleet
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/fleets/${fleetId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      alert("Fleet deleted successfully");
      navigate("/fleets"); // Redirect after deletion
    } catch (error) {
      console.error("Error deleting fleet:", error);
      alert("Failed to delete the fleet.");
    }
  };

  // Handle editing a fleet
  const handleEdit = () => {
    navigate(`/fleets/${fleetId}/edit`);
  };

  // Handle deleting a truck
  const handleDeleteTruck = async (truckId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/trucks/${truckId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      // Remove the truck from the state after successful deletion
      setTrucks(trucks.filter((truck) => truck._id !== truckId));
    } catch (error) {
      console.error("Error deleting truck:", error);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error!</h1>
        <p className="text-lg text-gray-700">Fleet not found.</p>
        <button className="btn btn-secondary mt-4" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back
      </button>

      {loading ? (
        <p>Loading fleet data...</p>
      ) : fleet ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">{fleet.fleet_name}</h2>
          <p>
            <strong>Fleet Manager:</strong> {fleet.fleet_manager}
          </p>
          <p>
            <strong>Base Location:</strong> {fleet.fleet_base_location}
          </p>
          <p>
            <strong>Total Trucks:</strong> {fleet.total_trucks}
          </p>
          <p>
            <strong>Max Capacity (tons):</strong> {fleet.max_capacity}
          </p>
          <p>
            <strong>Operational Status:</strong> {fleet.operational_status}
          </p>

          {/* Buttons for Edit, Delete, and View Trucks */}
          <div className="flex justify-end mt-6">
            <button className="btn btn-warning mr-4" onClick={handleEdit}>
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Edit
            </button>
            <button className="btn btn-danger mr-4" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} className="mr-2" />
              Delete
            </button>
            <button className="btn btn-info" onClick={handleViewTrucks}>
              <FontAwesomeIcon icon={faEye} className="mr-2" />
              View Trucks
            </button>
          </div>

          {/* Display Trucks */}
          {viewTrucks && (
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">Truck List</h3>
              {trucks.length > 0 ? (
                <ul className="list-group">
                  {trucks.map((truck) => (
                    <li
                      key={truck._id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span>
                        {truck.registration_number} - {truck.truck_name}
                      </span>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteTruck(truck._id)}
                      >
                        &#10006;
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No trucks available for this fleet.</p>
              )}
            </div>
          )}
        </div>
      ) : (
        <p>No fleet data available.</p>
      )}
    </div>
  );
};

export default FleetDetailPage;

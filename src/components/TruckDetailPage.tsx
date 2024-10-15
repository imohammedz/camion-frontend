import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const TruckDetailPage: React.FC = () => {
  const { truckId } = useParams<{ truckId: string }>();
  const [truck, setTruck] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Fetch truck details
  useEffect(() => {
    const fetchTruck = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/trucks/${truckId}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        if (response.status === 200) {
          setTruck(response.data);
        } else {
          throw new Error("Truck not found");
        }
      } catch (error) {
        console.error("Error fetching truck:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTruck();
  }, [truckId]);

  // Handle truck deletion
  const handleDeleteTruck = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/trucks/${truckId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      // TODO : please rename the fields in backend [Look at the GET Truck by ID response...]
      navigate(`/fleets/${truck.fleet_id._id}`); // Redirect to fleet page after deletion
    } catch (error) {
      console.error("Error deleting truck:", error);
    }
  };

  // Redirect to truck edit page
  const handleEditTruck = () => {
    navigate(`/trucks/${truckId}/edit`);
  };

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error!</h1>
        <p className="text-lg text-gray-700">Truck not found.</p>
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
        <p>Loading truck data...</p>
      ) : truck ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">{truck.truck_name}</h2>
          <p>
            <strong>Registration Number:</strong> {truck.registration_number}
          </p>
          <p>
            <strong>Manufacturer:</strong> {truck.manufacturer}
          </p>
          <p>
            <strong>Year of Manufacture:</strong> {truck.year_of_manufacture}
          </p>
          <p>
            <strong>Capacity:</strong> {truck.capacity}
          </p>
          <p>
            <strong>Mileage:</strong> {truck.mileage}
          </p>
          <p>
            <strong>Status:</strong> {truck.status}
          </p>
          {/* Add more truck fields as needed */}
          <div className="mt-4">
            <button className="btn btn-warning mr-4" onClick={handleEditTruck}>
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Edit Truck
            </button>
            <button className="btn btn-danger" onClick={handleDeleteTruck}>
              <FontAwesomeIcon icon={faTrash} className="mr-2" />
              Delete Truck
            </button>
          </div>
        </div>
      ) : (
        <p>No truck data available.</p>
      )}
    </div>
  );
};

export default TruckDetailPage;

// src/components/EditTruckPage.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface Truck {
  truck_name: string;
  registration_number: string;
  manufacturer: string;
  year_of_manufacture: number;
  capacity: string;
  mileage: number;
  status: string;
}

const EditTruckPage: React.FC = () => {
  const { truckId } = useParams<{ truckId: string }>();
  const [truck, setTruck] = useState<Truck | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  // Fetch the truck details
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
        setTruck(response.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTruck();
  }, [truckId]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!truck) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/trucks/${truckId}`,
        truck,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        navigate(`/trucks/${truckId}`);
      }
    } catch (error) {
      setFormError("Error updating truck. Please try again.");
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (truck) {
      setTruck({ ...truck, [name]: value });
    }
  };

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error!</h1>
        <p>Truck not found or failed to load truck data.</p>
        <button className="btn btn-secondary mt-4" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Go Back
        </button>
      </div>
    );
  }

  if (loading || !truck) {
    return <div>Loading truck data...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back
      </button>
      <h2 className="text-2xl font-bold mb-4">Edit Truck</h2>
      {formError && <p className="text-red-500">{formError}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold mb-1">Truck Name</label>
          <input
            type="text"
            name="truck_name"
            value={truck.truck_name}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Registration Number</label>
          <input
            type="text"
            name="registration_number"
            value={truck.registration_number}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Manufacturer</label>
          <input
            type="text"
            name="manufacturer"
            value={truck.manufacturer}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Year of Manufacture</label>
          <input
            type="number"
            name="year_of_manufacture"
            value={truck.year_of_manufacture}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Capacity</label>
          <input
            type="text"
            name="capacity"
            value={truck.capacity}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Mileage</label>
          <input
            type="number"
            name="mileage"
            value={truck.mileage}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Status</label>
          <input
            type="text"
            name="status"
            value={truck.status}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditTruckPage;

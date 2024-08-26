// src/components/FleetManagementPage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const FleetManagementPage: React.FC = () => {
  const [fleets, setFleets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Fetch fleets from the backend
  useEffect(() => {
    const fetchFleets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/fleets");
        if (response.status === 200) {
          setFleets(response.data);
        } else {
          throw new Error("Failed to fetch fleet data");
        }
      } catch (error) {
        console.error("Error fetching fleets:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchFleets();
  }, []);

  // If there's an error, show a generic error message
  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error!</h1>
        <p className="text-lg text-gray-700">
          Something went wrong. Please try again later.
        </p>
        <button className="btn btn-secondary mt-4" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Fleet Management</h1>

      <div className="flex justify-between mb-4">
        {/* Circular Back Button on the left */}
        <button
          className="btn btn-secondary flex items-center w-10 h-10 rounded-full justify-center"
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        {/* Create New Fleet Button on the right */}
        <button
          className="btn btn-primary flex items-center"
          onClick={() => navigate("/create-fleet")}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Create New Fleet
        </button>
      </div>

      {loading ? (
        <p className="text-center text-lg text-gray-700">Loading...</p>
      ) : fleets.length === 0 ? (
        <p className="text-center text-lg text-gray-700">No data found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-striped table-bordered w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Fleet ID</th>
                <th className="px-4 py-2">Fleet Name</th>
                <th className="px-4 py-2">Fleet Manager</th>
                <th className="px-4 py-2">Base Location</th>
                <th className="px-4 py-2">Total Trucks</th>
                <th className="px-4 py-2">Average Age of Fleet</th>
                <th className="px-4 py-2">Total Capacity</th>
                <th className="px-4 py-2">Total Mileage</th>
                <th className="px-4 py-2">Operational Status</th>
                <th className="px-4 py-2">Service Records</th>
              </tr>
            </thead>
            <tbody>
              {fleets.map((fleet) => (
                <tr key={fleet._id}>
                  <td className="border px-4 py-2">{fleet._id}</td>
                  <td className="border px-4 py-2">{fleet.fleet_name}</td>
                  <td className="border px-4 py-2">{fleet.fleet_manager}</td>
                  <td className="border px-4 py-2">
                    {fleet.fleet_base_location}
                  </td>
                  <td className="border px-4 py-2">{fleet.total_trucks}</td>
                  <td className="border px-4 py-2">
                    {fleet.average_age_of_fleet}
                  </td>
                  <td className="border px-4 py-2">{fleet.total_capacity}</td>
                  <td className="border px-4 py-2">{fleet.total_mileage}</td>
                  <td className="border px-4 py-2">
                    {fleet.operational_status}
                  </td>
                  <td className="border px-4 py-2">{fleet.service_records}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FleetManagementPage;

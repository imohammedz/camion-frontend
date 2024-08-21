// src/components/CreateFleetPage.tsx
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
  const [truckDetails, setTruckDetails] = useState([
    {
      truck_name: "",
      registration_number: "",
      manufacturer: "",
      year_of_manufacture: "",
      capacity: "",
      dimensions: "",
      fuel_type: "",
      mileage: "",
      engine_type: "",
      status: "available",
      image_url: "",
      last_service_date: "",
      next_service_due_date: "",
      current_location: "",
      gps_installed: false,
    },
  ]);

  const navigate = useNavigate();

  const handleAddTruck = () => {
    setTruckDetails([
      ...truckDetails,
      {
        truck_name: "",
        registration_number: "",
        manufacturer: "",
        year_of_manufacture: "",
        capacity: "",
        dimensions: "",
        fuel_type: "",
        mileage: "",
        engine_type: "",
        status: "available",
        image_url: "",
        last_service_date: "",
        next_service_due_date: "",
        current_location: "",
        gps_installed: false,
      },
    ]);
  };

  const handleTruckChange = (index: number, field: string, value: any) => {
    const updatedTrucks = [...truckDetails];
    updatedTrucks[index] = { ...updatedTrucks[index], [field]: value };
    setTruckDetails(updatedTrucks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Fleet Data
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
        total_trucks: truckDetails.length,
      };

      // POST Fleet Data
      const fleetResponse = await axios.post(
        "http://localhost:5000/api/fleets",
        fleetData
      );
      const fleetId = fleetResponse.data._id; // Get the created fleet ID

      // POST Truck Data for each truck
      await Promise.all(
        truckDetails.map((truck) => {
          const truckData = {
            ...truck,
            fleet_id: fleetId,
          };
          return axios.post("http://localhost:5000/api/trucks", truckData);
        })
      );

      alert(`Fleet "${fleetName}" created with ${truckDetails.length} trucks.`);
      navigate("/fleet-management"); // Redirect to Fleet Management page after creation
    } catch (error) {
      console.error("Error creating fleet or trucks:", error);
      alert("Failed to create fleet. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Fleet</h1>
      <form onSubmit={handleSubmit}>
        {/* Fleet Input Fields */}
        <div className="form-group mb-4">
          <label>Fleet Name:</label>
          <input
            type="text"
            className="form-control"
            value={fleetName}
            onChange={(e) => setFleetName(e.target.value)}
          />
        </div>
        <div className="form-group mb-4">
          <label>Fleet Manager:</label>
          <input
            type="text"
            className="form-control"
            value={fleetManager}
            onChange={(e) => setFleetManager(e.target.value)}
          />
        </div>
        <div className="form-group mb-4">
          <label>Fleet Base Location:</label>
          <input
            type="text"
            className="form-control"
            value={fleetBaseLocation}
            onChange={(e) => setFleetBaseLocation(e.target.value)}
          />
        </div>
        <div className="form-group mb-4">
          <label>Average Age of Fleet:</label>
          <input
            type="text"
            className="form-control"
            value={averageAgeOfFleet}
            onChange={(e) => setAverageAgeOfFleet(e.target.value)}
          />
        </div>
        <div className="form-group mb-4">
          <label>Total Capacity:</label>
          <input
            type="text"
            className="form-control"
            value={totalCapacity}
            onChange={(e) => setTotalCapacity(e.target.value)}
          />
        </div>
        <div className="form-group mb-4">
          <label>Total Mileage:</label>
          <input
            type="text"
            className="form-control"
            value={totalMileage}
            onChange={(e) => setTotalMileage(e.target.value)}
          />
        </div>
        <div className="form-group mb-4">
          <label>Operational Status:</label>
          <input
            type="text"
            className="form-control"
            value={operationalStatus}
            onChange={(e) => setOperationalStatus(e.target.value)}
          />
        </div>
        <div className="form-group mb-4">
          <label>Service Records:</label>
          <input
            type="text"
            className="form-control"
            value={serviceRecords}
            onChange={(e) => setServiceRecords(e.target.value)}
          />
        </div>
        <div className="form-group mb-4">
          <label>Fleet Image URL:</label>
          <input
            type="text"
            className="form-control"
            value={fleetImageUrl}
            onChange={(e) => setFleetImageUrl(e.target.value)}
          />
        </div>

        <h2 className="text-xl font-semibold mb-3">Truck Details</h2>
        {truckDetails.map((truck, index) => (
          <div key={index} className="mb-4">
            {/* Truck Input Fields */}
            <div className="form-group mb-2">
              <label>Truck Name:</label>
              <input
                type="text"
                className="form-control"
                value={truck.truck_name}
                onChange={(e) =>
                  handleTruckChange(index, "truck_name", e.target.value)
                }
              />
            </div>
            <div className="form-group mb-2">
              <label>Registration Number:</label>
              <input
                type="text"
                className="form-control"
                value={truck.registration_number}
                onChange={(e) =>
                  handleTruckChange(
                    index,
                    "registration_number",
                    e.target.value
                  )
                }
              />
            </div>
            <div className="form-group mb-2">
              <label>Manufacturer:</label>
              <input
                type="text"
                className="form-control"
                value={truck.manufacturer}
                onChange={(e) =>
                  handleTruckChange(index, "manufacturer", e.target.value)
                }
              />
            </div>
            <div className="form-group mb-2">
              <label>Year of Manufacture:</label>
              <input
                type="text"
                className="form-control"
                value={truck.year_of_manufacture}
                onChange={(e) =>
                  handleTruckChange(
                    index,
                    "year_of_manufacture",
                    e.target.value
                  )
                }
              />
            </div>
            <div className="form-group mb-2">
              <label>Capacity (tons):</label>
              <input
                type="text"
                className="form-control"
                value={truck.capacity}
                onChange={(e) =>
                  handleTruckChange(index, "capacity", e.target.value)
                }
              />
            </div>
            <div className="form-group mb-2">
              <label>Dimensions:</label>
              <input
                type="text"
                className="form-control"
                value={truck.dimensions}
                onChange={(e) =>
                  handleTruckChange(index, "dimensions", e.target.value)
                }
              />
            </div>
            <div className="form-group mb-2">
              <label>Fuel Type:</label>
              <input
                type="text"
                className="form-control"
                value={truck.fuel_type}
                onChange={(e) =>
                  handleTruckChange(index, "fuel_type", e.target.value)
                }
              />
            </div>
            <div className="form-group mb-2">
              <label>Mileage (km/l):</label>
              <input
                type="text"
                className="form-control"
                value={truck.mileage}
                onChange={(e) =>
                  handleTruckChange(index, "mileage", e.target.value)
                }
              />
            </div>
            <div className="form-group mb-2">
              <label>Engine Type:</label>
              <input
                type="text"
                className="form-control"
                value={truck.engine_type}
                onChange={(e) =>
                  handleTruckChange(index, "engine_type", e.target.value)
                }
              />
            </div>
            <div className="form-group mb-2">
              <label>Status:</label>
              <input
                type="text"
                className="form-control"
                value={truck.status}
                onChange={(e) =>
                  handleTruckChange(index, "status", e.target.value)
                }
              />
            </div>
            <div className="form-group mb-2">
              <label>Image URL:</label>
              <input
                type="text"
                className="form-control"
                value={truck.image_url}
                onChange={(e) =>
                  handleTruckChange(index, "image_url", e.target.value)
                }
              />
            </div>
            <div className="form-group mb-2">
              <label>Last Service Date:</label>
              <input
                type="date"
                className="form-control"
                value={truck.last_service_date}
                onChange={(e) =>
                  handleTruckChange(index, "last_service_date", e.target.value)
                }
              />
            </div>
            <div className="form-group mb-2">
              <label>Next Service Due Date:</label>
              <input
                type="date"
                className="form-control"
                value={truck.next_service_due_date}
                onChange={(e) =>
                  handleTruckChange(
                    index,
                    "next_service_due_date",
                    e.target.value
                  )
                }
              />
            </div>
            <div className="form-group mb-2">
              <label>Current Location:</label>
              <input
                type="text"
                className="form-control"
                value={truck.current_location}
                onChange={(e) =>
                  handleTruckChange(index, "current_location", e.target.value)
                }
              />
            </div>
            <div className="form-group mb-2">
              <label>GPS Installed:</label>
              <input
                type="checkbox"
                className="form-checkbox"
                checked={truck.gps_installed}
                onChange={(e) =>
                  handleTruckChange(index, "gps_installed", e.target.checked)
                }
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-secondary mb-4"
          onClick={handleAddTruck}
        >
          Add Another Truck
        </button>

        <div className="flex justify-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/fleet-management")}
          >
            Back
          </button>
          <button type="submit" className="btn btn-primary">
            Create Fleet
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFleetPage;

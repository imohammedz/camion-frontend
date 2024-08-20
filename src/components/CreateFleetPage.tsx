// src/components/CreateFleetPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateFleetPage: React.FC = () => {
  const [fleetName, setFleetName] = useState("");
  const [fleetManager, setFleetManager] = useState("");
  const [baseLocation, setBaseLocation] = useState("");
  const [truckDetails, setTruckDetails] = useState([
    {
      truckId: "",
      model: "",
      registrationNumber: "",
      manufacturer: "",
      yearOfManufacture: "",
      capacity: "",
      dimensions: "",
      fuelType: "",
      mileage: "",
      engineType: "",
      emissionDetails: "",
      kycStatus: "pending",
      status: "",
      image: "",
      lastServiceDate: "",
      nextServiceDueDate: "",
      currentLocation: "",
    },
  ]);

  const navigate = useNavigate();

  const handleAddTruck = () => {
    setTruckDetails([
      ...truckDetails,
      {
        truckId: "",
        model: "",
        registrationNumber: "",
        manufacturer: "",
        yearOfManufacture: "",
        capacity: "",
        dimensions: "",
        fuelType: "",
        mileage: "",
        engineType: "",
        emissionDetails: "",
        kycStatus: "pending",
        status: "",
        image: "",
        lastServiceDate: "",
        nextServiceDueDate: "",
        currentLocation: "",
      },
    ]);
  };

  const handleTruckChange = (index: number, field: string, value: string) => {
    const updatedTrucks = [...truckDetails];
    updatedTrucks[index] = { ...updatedTrucks[index], [field]: value };
    setTruckDetails(updatedTrucks);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !fleetName ||
      truckDetails.some(
        (truck) =>
          !truck.truckId ||
          !truck.model ||
          !truck.registrationNumber ||
          !truck.manufacturer ||
          !truck.yearOfManufacture ||
          !truck.capacity
      )
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    alert(`Fleet "${fleetName}" created with ${truckDetails.length} trucks.`);
    // Further processing logic here
  };

  const handleKyc = (index: number) => {
    const updatedTrucks = [...truckDetails];
    updatedTrucks[index] = { ...updatedTrucks[index], kycStatus: "done" };
    setTruckDetails(updatedTrucks);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Fleet</h1>
      <form onSubmit={handleSubmit}>
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
            value={baseLocation}
            onChange={(e) => setBaseLocation(e.target.value)}
          />
        </div>

        <h2 className="text-xl font-semibold mb-3">Truck Details</h2>
        {truckDetails.map((truck, index) => (
          <div key={index} className="mb-4">
            <div className="form-group mb-2">
              <label>Truck ID:</label>
              <input
                type="text"
                className="form-control"
                value={truck.truckId}
                onChange={(e) =>
                  handleTruckChange(index, "truckId", e.target.value)
                }
              />
            </div>
            <div className="form-group mb-2">
              <label>Model:</label>
              <input
                type="text"
                className="form-control"
                value={truck.model}
                onChange={(e) =>
                  handleTruckChange(index, "model", e.target.value)
                }
              />
            </div>
            <div className="form-group mb-2">
              <label>Registration Number:</label>
              <input
                type="text"
                className="form-control"
                value={truck.registrationNumber}
                onChange={(e) =>
                  handleTruckChange(index, "registrationNumber", e.target.value)
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
                value={truck.yearOfManufacture}
                onChange={(e) =>
                  handleTruckChange(index, "yearOfManufacture", e.target.value)
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
                value={truck.fuelType}
                onChange={(e) =>
                  handleTruckChange(index, "fuelType", e.target.value)
                }
              />
            </div>
            <div className="form-group mb-2">
              <label>Mileage (km/liter):</label>
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
                value={truck.engineType}
                onChange={(e) =>
                  handleTruckChange(index, "engineType", e.target.value)
                }
              />
            </div>
            <div className="form-group mb-2">
              <label>Emission Details:</label>
              <input
                type="text"
                className="form-control"
                value={truck.emissionDetails}
                onChange={(e) =>
                  handleTruckChange(index, "emissionDetails", e.target.value)
                }
              />
            </div>
            <div className="form-group mb-2">
              <label>KYC Status:</label>
              <p>{truck.kycStatus}</p>
              {truck.kycStatus === "pending" && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleKyc(index)}
                >
                  Complete KYC
                </button>
              )}
            </div>
            <div className="form-group mb-2">
              <label>Current Status:</label>
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
              <label>Last Service Date:</label>
              <input
                type="date"
                className="form-control"
                value={truck.lastServiceDate}
                onChange={(e) =>
                  handleTruckChange(index, "lastServiceDate", e.target.value)
                }
              />
            </div>
            <div className="form-group mb-2">
              <label>Next Service Due Date:</label>
              <input
                type="date"
                className="form-control"
                value={truck.nextServiceDueDate}
                onChange={(e) =>
                  handleTruckChange(index, "nextServiceDueDate", e.target.value)
                }
              />
            </div>
            <div className="form-group mb-2">
              <label>Current Location:</label>
              <input
                type="text"
                className="form-control"
                value={truck.currentLocation}
                onChange={(e) =>
                  handleTruckChange(index, "currentLocation", e.target.value)
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
            onClick={() => navigate("/")}
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
